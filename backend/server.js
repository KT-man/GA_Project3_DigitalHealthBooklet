require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db");
const users = require("./router/users");
const clinics = require("./router/clinics");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cors());
connectDB(process.env.MONGODB_URI);
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", users);
app.use("/clinics", clinics);

const PORT = process.env.PORT || 5001;

app.listen(PORT);
