import { Sequelize } from "sequelize";
const db = new Sequelize("nodecourse", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

export default db;
