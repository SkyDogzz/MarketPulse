import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

interface PostInstance extends Model {
  id: number;
  userId: number;
  title: string;
  body: string;
}

const Post = sequelize.define<PostInstance>("Post", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
    },
    title: {
        type: DataTypes.STRING,
    },
    body: {
        type: DataTypes.STRING,
    },
});

export default Post;
