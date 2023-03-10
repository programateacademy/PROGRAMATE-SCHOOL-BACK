const router = require('express').Router();
const LoginController = require("../../controllers/LoginController");
const GetAllPersonsController = require("../../controllers/GetAllPersonsController");
const SignUp =require ('../../controllers/RegisterController');
const NewAdmin = require('../../controllers/NewAdminController')
const AdminListController = require("../../controllers/AdminListController");
const StudentListController = require("../../controllers/StudentListController") 
const ScoreAnnouncement = require("../../controllers/HandleDataController");



//This is an inicial version of the router, might change due to Functionality & new features

router
    .get("/persons", GetAllPersonsController.getAllPersons) //Custom route used to get all persons
    .get("/confirm/:token",  SignUp.confirm)
    .get("/getAdmin", AdminListController.getAdminList) // Custom route used to get all Admins
    .get("/getUsers", StudentListController.getAllStudents) //Custom route used to get all students
    
    .post("/login", LoginController.loginPerson) //Custom route for Log In 
    .post("/signUp", SignUp.SignUp) //Custom route for SignUp
    .post("/newAdmin", NewAdmin.NewAdmin)
    .post("/scoreannouncement", ScoreAnnouncement.scoreForm)
    .post("/SignUp", SignUp.SignUp) //Custom route for SignUp
    .post("/scoreannouncement", ScoreAnnouncement.scoreForm);



module.exports = router;