import waitRequest from "./waitRequest.js";

export default class DbStorage {
    #name: string;
    #db: Promise<IDBDatabase> | undefined;

    constructor({ name }: { name: string }) {
        this.#name = name;
    }

    async getItem<T>(key: string): Promise<T | undefined> {
        const store = await this.#getStore();
        return waitRequest(store.get(key), "Failed to get item");
    }

    async setItem(key: string, value: unknown): Promise<void> {
        const store = await this.#getStore();
        return waitRequest(store.put(value, key), "Failed to set item");
    }

    async removeItem(key: string): Promise<void> {
        const store = await this.#getStore();
        return waitRequest(store.delete(key), "Failed to remove item");
    }

    async clear(): Promise<void> {
        const store = await this.#getStore();
        return waitRequest(store.clear(), "Failed to clear store");
    }

    async #getStore(): Promise<IDBObjectStore> {
        const db = await this.#getOrCreateDb();
        return db.transaction("store", "readwrite").objectStore("store");
    }

    async #getOrCreateDb(): Promise<IDBDatabase> {
        if (this.#db === undefined) {
            this.#db = this.#openDb();
        }
        return this.#db;
    }

    async #openDb(): Promise<IDBDatabase> {
        const request = indexedDB.open(this.#name, 1);

        request.addEventListener("upgradeneeded", () => {
            // e.oldVersion
            // e.newVersion
            const db = request.result;
            db.createObjectStore("store");
        });

        return waitRequest(request, "Failed to open IndexedDB");
    }
}
