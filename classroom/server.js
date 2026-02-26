const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const ejsMate = require("ejs-mate");   // ✅ required
const path = require("path");          // ✅ move to top

// EJS setup
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Session setup
const sessions = {
    secret: "mysuperstringkey",
    resave: false,
    saveUninitialized: true
};

app.use(session(sessions));
app.use(flash());

// Register Route
app.get("/register", (req, res) => {
    let { name = "stranger" } = req.query;

    req.session.name = name;
    console.log(req.session.name);

    req.flash("success", "User registered successfully");

    res.redirect("/hello");   // ✅ FIXED
});

// Hello Route
app.get("/hello", (req, res) => {
    res.render("page.ejs", {
        name: req.session.name ,msg: req.flash("success")  
    });
});

app.listen(8080, () => {
    console.log("app is listening on port 8080");
});