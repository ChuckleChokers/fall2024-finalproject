<<<<<<< HEAD
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect(
"mongodb://localhost:27017/newCollection",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

const contactSchema = {
    email: String,
    query: String,
};

const Contact =
    mongoose.model("Contact", contactSchema);

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(__dirname + '/public'));

app.get("/contact",
    function (req, res) {
        res.render("contact");
    });

app.post("/contact",
    function (req, res) {
        console.log(req.body.email);
        const contact = new Contact({
            email: req.body.email,
            query: req.body.query,
        });
        contact.save(function (err) {
            if (err) {
                throw err;
            } else {
                res.render("contact");
            }
        });
    });

app.listen(3000,
    function () {
        console.log("App is running on Port 3000");
    });
=======

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Search from "./components/Search";
import Results from "./components/Results";

//routing between pages
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/search" element={<Search/>} />
        <Route path="/results" element={<Results/>} />
      </Routes>
    </Router>
  );
}
>>>>>>> 479233c4013e07da72f02c52f679b03435746b8d

export default App;
