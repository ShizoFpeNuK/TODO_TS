const { Sequelize } = require("sequelize");

const sequelizeInstance = new Sequelize({
    dialect: "postgres",
    host: "localhost",
    port: "5432",
    database: "ToDo",
    username: "root",
    password: "root",
});

const initDB = async () => {
    try {
        await sequelizeInstance.authenticate(); //Авторизация нашей ORM в БД
        await sequelizeInstance.sync(); //Синхронизация МОДЕЛЕЙ
        console.log("Sequelize was initialized");
    } catch (error) {
        console.log("Sequelize ERROR (initDB)", error);
        process.exit();
    }
};

module.exports = {
    sequelizeInstance,
    initDB,
};