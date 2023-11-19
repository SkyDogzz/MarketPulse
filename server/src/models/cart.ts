import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

interface CartInstance extends Model {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
}

const Cart = sequelize.define<CartInstance>("Cart", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
    },
    productId: {
        type: DataTypes.INTEGER,
    },
    quantity: {
        type: DataTypes.INTEGER,
    },
});

export default Cart;
