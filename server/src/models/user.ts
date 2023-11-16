import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

interface UserInstance extends Model {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }
  
const User = sequelize.define<UserInstance>("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
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
