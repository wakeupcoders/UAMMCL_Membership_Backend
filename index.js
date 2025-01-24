const express = require("express");
const app = express();
const mongoose = require("mongoose");
var path=require('path');
const dotenv = require("dotenv");
dotenv.config();
const ordinaryRoute = require("./routes/ordinary");
const reportRoute = require("./routes/report");


const Sentry = require("@sentry/node");

const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");

Sentry.init({ dsn: "https://41afc8113ed144a0a209cb9e53cea55a@o1287528.ingest.sentry.io/4503925429501952" });

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
        console.log(err);
    });

app.use("/images", express.static('uploads'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/OM", ordinaryRoute);
app.use("/api/reports", reportRoute);


// app.use(express.static('dist'));
app.use(errorHandler);

app.use(express.static(path.join(__dirname,'dist')));
app.use("/*", function(req, res){
    res.sendFile(path.join(__dirname+'/dist/index.html'))
})

// Catch-All Route for Unmatched Endpoints
app.use((req, res, next) => {
  res.status(200).json({
    error: "Route not found",
    message: `The endpoint ${req.originalUrl} does not exist, Please connect with wakeupcoders.com/contact for more information.`,
  });
});


const server = app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running!");
});