import server from "./App.js";

server.listen(process.env.PORT || 3000, '0.0.0.0',() => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})



