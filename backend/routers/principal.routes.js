const router = require("express").Router();
const users = require("../controller/user.controller");

router.get("/user/list", users.getUsers);

router.post("/user/add", users.addUser);

router.post("/user/edit", users.updateUsers);

router.post("/user/delete", users.deleteUsers);


module.exports = router;