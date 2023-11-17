import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

interface ProductInstance extends Model {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
}

const Product = sequelize.define<ProductInstance>("Product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Product;
