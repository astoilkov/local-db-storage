import "fake-indexeddb/auto";

import dbStorage from "./index";
import { beforeEach, describe, expect, test } from "vitest";

describe("db-storage", () => {
    beforeEach(async () => {
        await dbStorage.clear();
    });

    test("setItem() — string", async () => {
        await dbStorage.setItem("key", "value");
        expect(await dbStorage.getItem("key")).toBe("value");
    });

    test("setItem() — number", async () => {
        await dbStorage.setItem("key", 123);
        expect(await dbStorage.getItem("key")).toBe(123);
    });

    test("setItem() — object", async () => {
        await dbStorage.setItem("key", { foo: "bar" });
        expect(await dbStorage.getItem("key")).toEqual({ foo: "bar" });
    });

    test("setItem() — circular object", async () => {
        const objA: any = { foo: "bar" };
        objA.obj = objA;
        await dbStorage.setItem("key", objA);

        const objB: any = { foo: "bar" };
        objB.obj = objB;
        expect(await dbStorage.getItem("key")).toEqual(objB);
        expect(await dbStorage.getItem("key")).not.toBe(objA);
    });

    test("getItem() that doesn't exist", async () => {
        expect(await dbStorage.getItem("key")).toBe(undefined);
    });

    test("removeItem()", async () => {
        await dbStorage.setItem("key", "value");
        await dbStorage.setItem("key2", "value2");
        await dbStorage.removeItem("key");
        expect(await dbStorage.getItem("key")).toBe(undefined);
        expect(await dbStorage.getItem("key2")).toBe("value2");
    });

    test("clear()", async () => {
        await dbStorage.setItem("key", "value");
        await dbStorage.setItem("key2", "value2");
        await dbStorage.clear();
        expect(await dbStorage.getItem("key")).toBe(undefined);
        expect(await dbStorage.getItem("key2")).toBe(undefined);
    });
});
