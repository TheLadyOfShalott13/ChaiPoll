// server.js

const express = require("express");
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const port = 5000;

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        credentials: true
    }
});


const frameworks = {
    "0": { votes: 0, label: "Django" },
    "1": { votes: 0, label: "Express.js" },
    "2": { votes: 0, label: "Spring Boot" },
    "3": { votes: 0, label: "Laravel" },
    "4": { votes: 0, label: "Flask" }
};

io.on("connection", (socket) => {
    console.log("User", socket.id)

    io.emit("update", frameworks);

    socket.on("vote", (index) => {
        if (frameworks[index]) {
            frameworks[index].votes += 1;
        }
        io.emit("update", frameworks);
    });
});

server.listen(port, () =>
    console.log(`Listening at http://localhost:${port}`)
);
