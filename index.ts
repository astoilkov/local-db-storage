import DbStorage from "./src/DbStorage";

export { DbStorage };

const dbStorage = new DbStorage({ name: "node_modules/db-storage2" });
export default dbStorage;
