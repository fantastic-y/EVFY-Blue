const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const path = require("path");
const auth = require("http-auth");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const Contact = require("../models/contact");
const router = express.Router();
const basic = auth.basic({
    file: path.join(__dirname, "../users.htpasswd"),
});
const app = express();

const expSession = require("express-session")({
    secret: "mysecret", //decode or encode session
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: true,
        maxAge: 1 * 60 * 1000,
    },
});

passport.serializeUser(User.serializeUser()); //session encoding
passport.deserializeUser(User.deserializeUser()); //session decoding
passport.use(new LocalStrategy(User.authenticate()));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(expSession);
app.use(passport.initialize());
app.use(passport.session());

router.get("/", (req, res) => {
    res.sendFile("/html/index.html", {
        root: path.join(__dirname, ".."),
    });
});
router.get("/about", (req, res) => {
    res.sendFile("/html/about.html", {
        root: path.join(__dirname, ".."),
    });
});
router.get("/contact", (req, res) => {
    res.sendFile("/html/contact.html", {
        root: path.join(__dirname, ".."),
    });
});
router.get("/partners", (req, res) => {
    res.sendFile("/html/partners.html", {
        root: path.join(__dirname, ".."),
    });
});
router.get("/sustainabilityindex", (req, res) => {
    res.sendFile("/html/sustainabilityindex.html", {
        root: path.join(__dirname, ".."),
    });
});
router.get("/sustainabilityroadmap", (req, res) => {
    res.sendFile("/html/subscription-tiers.html", {
        root: path.join(__dirname, ".."),
    });
});

router.get("/login", (req, res) => {
    res.sendFile("/html/login.html", {
        root: path.join(__dirname, ".."),
    });
});

router.get("/profile", (req, res) => {
    res.sendFile("/html/profile.html", {
        root: path.join(__dirname, ".."),
    });
});

app.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/userprofile",
        failureRedirect: "/login",
    }),
    function (req, res) {}
);

router.get(
    "/register",
    basic.check((req, res) => {
        res.render("form", {
            title: "Registration form",
        });
    })
);

router.post(
    "/register",
    [
        check("username")
            .isLength({
                min: 1,
            })
            .withMessage("Please enter a username"),
        check("password")
            .isLength({
                min: 1,
            })
            .withMessage("Please enter an password"),
    ],
    async (req, res) => {
        User.register(
            new User({ username: req.body.username }),
            req.body.password,
            function (err, user) {
                if (err) {
                    console.log(err);
                    res.render("register");
                }
                passport.authenticate("local")(req, res, function () {
                    res.redirect("/login");
                });
            }
        );
    }
);

router.post(
    "/savecontact",
    [
        check("email")
            .isLength({
                min: 1,
            })
            .withMessage("Please enter your email"),
    ],
    (req, res) => {
        const contact = new Contact(req.body);
        console.log(req.body);
        contact
            .save()
            .then(() => {
                res.sendFile("/html/contact.html", {
                    root: path.join(__dirname, ".."),
                });
            })
            .catch((err) => {
                console.log(err);
                res.send("Sorry! Something went wrong.");
            });
    }
);
module.exports = router;
