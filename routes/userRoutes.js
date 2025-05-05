const express = require("express");
const { registeruser, loginuser, currentuser } = require("../controllers/userController");
const validateToken = require("../middleware/validatetoken");
const router = express.Router(); // ✅ FIXED: 'Router' should be capitalized

router.post("/register", registeruser );

router.post("/login",loginuser );

router.get("/current",validateToken, currentuser);

module.exports = router;
