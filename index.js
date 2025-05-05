const express = require("express");
const app = express();
const mongoose = require("mongoose");
var path=require('path');
const dotenv = require("dotenv");
dotenv.config();
const ordinaryRoute = require("./routes/ordinary");
const nominalRoute = require("./routes/nominal");
const publicAssociatesRoute = require("./routes/public_associates");
const reportRoute = require("./routes/report");
const uploaderRoute = require("./routes/fileuploader");

const authRoutes = require("./routes/auth");
const {exec}  = require("child_process");


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

app.use("/uploads", express.static('uploads'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/PA", publicAssociatesRoute);
app.use("/api/OM", ordinaryRoute);
app.use("/api/NM", nominalRoute);
app.use("/api/reports", reportRoute);
app.use("/api/uploads", uploaderRoute);
app.use("/api/auth", authRoutes);


// app.use(express.static('dist'));
app.use(errorHandler);

app.use(express.static(path.join(__dirname,'dist')));
app.post("/github-webhook", (req, res) => {
  const payload = req.body;

  if (payload.ref === "refs/heads/main") {
      console.log("Received push event. Deploying...");

      exec("/bin/bash deploy.sh", (error, stdout, stderr) => {
          if (error) {
              console.error(`Deployment failed: ${error}`);
              return res.status(500).send("Deployment failed");
          }
          console.log(`STDOUT: ${stdout}`);
          console.error(`STDERR: ${stderr}`);
          res.status(200).send("Deployment successful");
      });
  } else {
      res.status(400).send("Not a push to the main branch");
  }
});
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