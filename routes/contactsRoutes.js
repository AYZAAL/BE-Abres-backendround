// routes/contactsRoutes.js

const express = require("express");
const router = express.Router();
const { getContact,creatContacts,updateControler, deletecontroller ,getContacts} = require("../controllers/contactscontrollers");
const validateToken = require("../middleware/validatetoken");

router.use(validateToken);
// Define routes
router.route('/').get(getContact);

router.route('/').post(creatContacts);

router.route('/:id').put(updateControler).get(getContacts)


router.route('/:id').delete(deletecontroller);

module.exports = router;
