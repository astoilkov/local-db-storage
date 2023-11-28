import DbStorage from "./src/DbStorage";

const dbStorage = new DbStorage({ name: "node_modules/local-db-storage" });

export { DbStorage };
export default dbStorage;
