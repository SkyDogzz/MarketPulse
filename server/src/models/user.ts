import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export interface UserInstance extends Model {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
  }
  
const User = sequelize.define<UserInstance>("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
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
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});


export default User;
