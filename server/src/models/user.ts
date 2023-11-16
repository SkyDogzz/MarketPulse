import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/database";

const User = sequelize.define("User", {
  // Model attributes are defined here
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  firstName: {
    type: DataTypes.STRING,

  },
  lastName: {
    type: DataTypes.STRING,
  },
  
});

export default User;
