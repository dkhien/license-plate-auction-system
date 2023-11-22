import express from "express";

const manageRouter = express.Router();

manageRouter.get('/create', (req, res) => {
    res.send('create')
})