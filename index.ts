import DbStorage from "./src/DbStorage.js";

const dbStorage = new DbStorage({ name: "node_modules/local-db-storage" });

export { DbStorage };
export default dbStorage;
