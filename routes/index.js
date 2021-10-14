const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const auth = require("http-auth");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");

const router = express.Router();
const Registration = mongoose.model("Registration");
const basic = auth.basic({
    file: path.join(__dirname, "../users.htpasswd"),
});

router.get("/", (req, res) => {
    //res.send('It works!');
    res.sendFile("/html/index.html", {
        root: path.join(__dirname, ".."),
    });
});
router.get("/about", (req, res) => {
    //res.send('It works!');
    res.sendFile("/html/about.html", {
        root: path.join(__dirname, ".."),
    });
});
router.get("/contact", (req, res) => {
    //res.send('It works!');
    res.sendFile("/html/contact.html", {
        root: path.join(__dirname, ".."),
    });
});
router.get("/partners", (req, res) => {
    //res.send('It works!');
    res.sendFile("/html/partners.html", {
        root: path.join(__dirname, ".."),
    });
});
router.get("/sustainabilityindex", (req, res) => {
    //res.send('It works!');
    res.sendFile("/html/sustainabilityindex.html", {
        root: path.join(__dirname, ".."),
    });
});
router.get("/sustainabilityroadmap", (req, res) => {
    //res.send('It works!');
    res.sendFile("/html/subscription-tiers.html", {
        root: path.join(__dirname, ".."),
    });
});

router.get("/login", (req, res) => {
    //res.send('It works!');
    res.sendFile("/html/login.html", {
        root: path.join(__dirname, ".."),
    });
});

router.get(
    "/register",
    basic.check((req, res) => {
        res.render("form", {
            title: "Registration form",
        });
    })
);

router.get(
    "/registrants",
    basic.check((req, res) => {
        Registration.find()
            .then((registrations) => {
                res.render("registrants", {
                    title: "Listing registrations",
                    registrations,
                });
            })
            .catch(() => {
                res.send("Sorry! Something went wrong.");
            });
    })
);

router.post(
    "/register",
    [
        check("name")
            .isLength({
                min: 1,
            })
            .withMessage("Please enter a name"),
        check("email")
            .isLength({
                min: 1,
            })
            .withMessage("Please enter an email"),
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
        //console.log(req.body);
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const registration = new Registration(req.body);

            const salt = await bcrypt.genSalt(10);
            registration.password = await bcrypt.hash(
                registration.password,
                salt
            );
            registration
                .save()
                .then(() => {
                    res.render("success", {
                        title: "Success!",
                    });
                })
                .catch((err) => {
                    console.log(err);
                    res.send("Sorry! Something went wrong.");
                });
        } else {
            res.render("form", {
                title: "Registration form",
                errors: errors.array(),
                data: req.body,
            });
        }
    }
);

module.exports = router;
