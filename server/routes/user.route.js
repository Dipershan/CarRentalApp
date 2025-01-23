const express = require('express');
const router = express.Router();
const userController = require("../controllers/user.controller");

router.route("/signup").post(userController.register);
router.route("/login").post(userController.login);
router.route("/listUsers").get(userController.listUsers);
router.route("/delete/:id").delete(userController.deleteUser);
router.route("/reset-password").patch(userController.resetUserPassword);

module.exports =  router;
    