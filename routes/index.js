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
// const app = express();

const expSession = require("express-session")({
    secret: "mysecret", //decode or encode session
    resave: false,
    saveUninitialized: true,
    cookie: {
        // httpOnly: true,
        secure: true,
        maxAge: 1 * 60 * 1000,
    },
});

passport.serializeUser(User.serializeUser()); //session encoding
passport.deserializeUser(User.deserializeUser()); //session decoding
passport.use(
    new LocalStrategy(function (username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: "Incorrect username." });
            }
            // if (!user.validPassword(password)) {
            //     return done(null, false, { message: "Incorrect password." });
            // }
            return done(null, user);
        });
    })
);

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.use(expSession);

router.use(passport.initialize());
router.use(passport.session());

// router.use(passport.initialize());
// router.use(passport.session());

router.get("/", (req, res) => {
    res.sendFile("index.html", {
        root: path.join(__dirname, "../public"),
    });
});

router.get("/about", (req, res) => {
    res.sendFile("about.html", {
        root: path.join(__dirname, "../public"),
    });
});
router.get("/contact", (req, res) => {
    res.sendFile("contact.html", {
        root: path.join(__dirname, "../public"),
    });
});
router.get("/partners", (req, res) => {
    res.sendFile("partners.html", {
        root: path.join(__dirname, "../public"),
    });
});
router.get("/sustainabilityindex", (req, res) => {
    res.sendFile("sustainabilityindex.html", {
        root: path.join(__dirname, "../public"),
    });
});
router.get("/sustainabilityroadmap", (req, res) => {
    res.sendFile("subscription-tiers.html", {
        root: path.join(__dirname, "../public"),
    });
});

router.get("/login", (req, res) => {
    res.sendFile("login.html", {
        root: path.join(__dirname, "../public"),
    });
});

router.get("/profile", (req, res) => {
    User.findOne(
        { username: req.body.username || "test" },
        function (err, user) {
            if (err) {
                err.message = "No user found!";
                res.render("error", { user: user, error: err });
            }
            if (!user) {
                let error = {};
                error.message = "No user found!";
                res.render("profile", { user, error });
            }

            res.render("profile", { user });
            // if (!user.validPassword(password)) {
            //     return done(null, false, { message: "Incorrect password." });
            // }
        }
    );
});

// router.post(
//     "/signin",
//     passport.authenticate("local", {
//         successRedirect: "/profile",
//         failureRedirect: "/login",
//     }),
//     function (req, res) {
//         console.log(res);
//     }
// );

router.post("/signin", function (req, res) {
    // console.log(res);
    User.findOne({ username: req.body.username }, function (err, user) {
        if (err) {
            res.render("error", { user: user, error: err });
        }
        if (!user) {
            res.render("error", { user: user, error: err });
        }

        res.render("profile", { user });
        // if (!user.validPassword(password)) {
        //     return done(null, false, { message: "Incorrect password." });
        // }
    });
});

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
            new User({
                username: req.body.username,
                password: req.body.password,
                firstname: "",
                lastname: "",
                email: "",
            }),
            req.body.password,
            function (err, user) {
                if (err) {
                    console.log(err);
                    res.render("error", { user: user, error: err });
                } else {
                    passport.authenticate("local")(req, res, function () {
                        res.redirect("/login");
                    });
                }
            }
        );
    }
);

router.post(
    "/edituser",
    [
        check("email")
            .isLength({
                min: 1,
            })
            .withMessage("Please enter your email"),
    ],
    async (req, res) => {
        let user = await User.findOne({ username: req.body.username });
        console.log(user);
        User.findOneAndUpdate(
            { username: req.body.username },
            {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
            }
        )
            .then(async (user) => {
                user = await User.findOne({ username: req.body.username });
                res.render("profile", { user });
            })
            .catch((err) => {
                console.log(err);
                res.send("Sorry! Something went wrong.");
            });
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
                res.sendFile("contact.html", {
                    root: path.join(__dirname, "../public"),
                });
            })
            .catch((err) => {
                console.log(err);
                res.send("Sorry! Something went wrong.");
            });
    }
);
module.exports = router;
