const router = require('express').Router()

const Controller = require("../controller/activityController")
const UserController = require("../controller/userController")

router.get("/activities",Controller.getProds)
router.get("/activities/:id",Controller.getProdsByid)
router.delete("/activities/:id",Controller.deleteProd)
router.patch("/activities/id",Controller.updateProd)
router.put("/activities/:id",Controller.updateAll)
router.post("/activities",Controller.postProd)

router.get("/users",UserController.getUsers)
router.get("/users/:id",UserController.getUserById)
router.delete("/users/:id", UserController.deleteUser)
router.patch("/users/:id",UserController.updateUser)
router.put("/users/:id", UserController.putUser)
router.post("/users",UserController.postUser)


module.exports = router