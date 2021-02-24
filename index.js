"use strict";

const express = require("express");
const { parse } = require("path");
const path = require("path");

const logger = require("./middleware/logger");

const app = express();

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(logger);

//Members API routes
app.use("/api/members", require("./routes/api/members"));
//set a static folder
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("server started"));
