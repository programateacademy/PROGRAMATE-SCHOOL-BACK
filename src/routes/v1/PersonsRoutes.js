const express = require("express");
const LoginController = require("../../controllers/LoginController");
const GetAllPersonsController = require("../../controllers/GetAllPersonsController");
const SignUp = require ("../controllers/RegisterController");

const router = express.Router();

//This is an inicial version of the router, might change due to Functionality & new features

router
    .get("/persons", GetAllPersonsController.getAllPersons) //Custom route used to get all persons
    .post("/login", LoginController.loginPerson) //Custom route for Log In 
    .post("/SignUp", SignUp.SignUp) //Custom route for SignUp

module.exports = router;