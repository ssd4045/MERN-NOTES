const { Router } = require("express");
const router = Router();

const {
  getUsers,
  createUser,
  deleteUser
} = require("../controllers/users.controller");

router
  .route("/")
  .get(getUsers)
  .post(createUser);

router.route("/:id").delete(deleteUser);

// .post()

// router.route("/:id")
// .get()
// .update()
// .delete()

module.exports = router;
