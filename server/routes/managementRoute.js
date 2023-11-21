import express from "express";

const manageRouter = express.Router();

manageRouter.post('/create', (req, res) => {
    res.send('create')
})