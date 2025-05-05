const express = require("express");
const asyncHandler = require("express-async-handler");
const validateUser = require("../middleware/validatetoken");
const contacts = require("../models/contactmodel");

const router = express.Router();

// Middleware to protect routes
router.use(validateUser);

// GET all contacts
router.get("/", asyncHandler(async (req, res) => {
    const find = await contacts.find({ user_id: req.user.id });
    res.json({ contacts: find });
}));

// POST create contact
router.post("/", asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are required");
    }

    const newContact = await contacts.create({
        name,
        email,
        phone,
        user_id: req.user.id,
    });

    res.status(201).json({ contact: newContact });
}));

// GET single contact
router.get("/:id", asyncHandler(async (req, res) => {
    const contact = await contacts.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("Unauthorized access");
    }

    res.json({ contact });
}));

// PUT update contact
router.put("/:id", asyncHandler(async (req, res) => {
    const contact = await contacts.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("Unauthorized access");
    }

    const updatedContact = await contacts.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json({ contact: updatedContact });
}));

// DELETE contact
router.delete("/:id", asyncHandler(async (req, res) => {
    const contact = await contacts.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("Unauthorized access");
    }

    await contact.deleteOne();

    res.json({ message: "Contact deleted successfully" });
}));

module.exports = router;
