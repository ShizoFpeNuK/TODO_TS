"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const { sequelizeInstance } = require("..");
class ToDo extends sequelize_1.default.Model {
}
ToDo.init({
    id: {
        type: sequelize_1.default.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.default.DataTypes.UUIDV4,
    },
    title: {
        type: sequelize_1.default.STRING,
        defaultValue: "Title",
    },
    description: {
        type: sequelize_1.default.STRING,
        defaultValue: "",
    },
    isCompleted: {
        type: sequelize_1.default.BOOLEAN,
        defaultValue: false,
    },
}, { sequelize: sequelizeInstance, underscored: true, modelName: "todo" });
module.exports = ToDo;
