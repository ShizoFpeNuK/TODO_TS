"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const { initDB } = require('../db');
const ToDo = require('../db/models/ToDo.models');
const ServerPort = 4000;
const app = (0, fastify_1.default)();
app.register(cors_1.default);
initDB();
app.post("/todos", async (req, res) => {
    try {
        const result = await ToDo.create({
            title: req.body.title,
            description: req.body.description,
            isCompleted: req.body.isCompleted,
        });
        return { result };
    }
    catch (error) {
        console.log(error);
        res.type('application/json').code(500);
    }
});
app.get("/todos", async (req, res) => {
    try {
        const result = await ToDo.findAll();
        return { result };
    }
    catch (error) {
        console.log(error);
        res.type('application/json').code(500);
    }
});
app.get("/todos/:id", async (req, res) => {
    try {
        const result = await ToDo.findByPk(req.params.id);
        if (!result) {
            res.type('application/json').code(404);
            return {
                massage: `Not found ${req.params.id}`,
            };
        }
        return { result };
    }
    catch (error) {
        console.log(error);
        res.type('application/json').code(500);
    }
});
app.patch("/todos/:id", async (req, res) => {
    try {
        const ToDoFind = await ToDo.findByPk(req.params.id);
        if (!ToDoFind) {
            res.type('application/json').code(404);
            return {
                massage: `Not found ${req.params.id}`,
            };
        }
        await ToDoFind.update({
            title: req.body.title,
            description: req.body.description,
            isCompleted: req.body.isCompleted,
        });
        const result = await ToDo.findByPk(req.params.id);
        return { result };
    }
    catch (error) {
        console.log(error);
        res.type('application/json').code(500);
    }
});
app.delete("/todos", async (req, res) => {
    try {
        await ToDo.destroy({
            truncate: true
        });
        return { massage: "Ok" };
    }
    catch (error) {
        console.log(error);
        res.type('application/json').code(500);
    }
});
app.delete("/todos/:id", async (req, res) => {
    try {
        const result = await ToDo.findByPk(req.params.id);
        if (!result) {
            res.type('application/json').code(404);
            return {
                massage: `Not found ${req.params.id}`,
            };
        }
        await result.destroy();
        return { massage: "Ok" };
    }
    catch (error) {
        console.log(error);
        res.type('application/json').code(500);
    }
});
app.listen({ port: ServerPort }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
