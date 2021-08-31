import Sequelize from "sequelize";
import { sequelize } from "../config/db.js";

const User = sequelize.define(
  "users",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Email not valid",
        },
        isUnique(value) {
          return User.findOne({ where: { email: value } }).then((email) => {
            if (email) {
              throw new Error("Email already exist");
            }
          });
        },
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    avatar: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

export default User;
