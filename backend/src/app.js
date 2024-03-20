const express = require("express");
const cors = require("cors");
const router = require("./routers/Router");
const cookieParser = require("cookie-parser");
const {connect} = require("mongoose");
const connection = require("./services/db");

//express app
const app = express();

//enable all CORS requests
app.use(cors({origin: true}));

//middleware
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

//routes
app.use("/api", router);

// app listening for requests
app.listen(process.env.PORT || 2000, () =>
    console.log(`Listening o99oon port ${process.env.PORT || 2000}`)
);

//connect to db
(async () => {
    await connection();
})();
