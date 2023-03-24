const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config/serverConfig");
const db = require("./models/index");
const apiRoutes = require("./routes/index");

const setupAndStartServer = async () => {
    const app = new express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use("/api", apiRoutes);

    app.listen(PORT, async () => {
        console.log(`Server has started at ${PORT}`);
        if (process.env.DB_SYNC) {
            db.sequelize.sync({ alter: true });
        }
    });

}

setupAndStartServer();