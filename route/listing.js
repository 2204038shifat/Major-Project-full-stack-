
const express = require("express");
const router = express.Router();

const { isLoggedIn, isOwner } = require("../middleware.js");

const {
    deleteListing,
    deleteAndUpdate,
    UpdateListing,
    CreateNewListing,
    postListing,
    IndexRoute,
    ShowListing
} = require("../controllers/listings.js");

const multer  = require('multer')

const {storage}= require("../cloudConfig.js")

const upload = multer({ storage })

// Create New Route
router.get("/new", isLoggedIn, CreateNewListing);

// Index Route
router.route("/")
    .get(IndexRoute)
    .post(isLoggedIn,upload.single("listing[image]"), postListing);

// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, deleteAndUpdate);

// Show, Update and Delete Route
router.route("/:id")
    .get(ShowListing)
    .put(isLoggedIn, isOwner, UpdateListing)
    .delete(isLoggedIn, isOwner, deleteListing);

module.exports = router;
