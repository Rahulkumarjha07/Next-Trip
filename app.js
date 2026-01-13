const express = require("express");
const app = express();

const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");

const Listing = require("./models/listing");

// DB
mongoose.connect("mongodb://127.0.0.1:27017/wanderlast")
  .then(() => console.log("Connected!"));

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// INDEX
app.get("/listings", async (req, res) => {
  const allistings = await Listing.find({});
  res.render("listing/index", { allistings });
});

// NEW
app.get("/listings/new", (req, res) => {
  res.render("listing/newform");
});

// CREATE
app.post("/listings", async (req, res) => {
  const listing = new Listing(req.body.listing);
  listing.image.filename = "listingimage";
  await listing.save();
  res.redirect("/listings");
});

// EDIT
app.get("/listings/:id/edit", async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  res.render("listing/edit", { listing });
});

// UPDATE
app.put("/listings/:id", async (req, res) => {
  console.log(req.body.listing); // 👈 DEBUG
  await Listing.findByIdAndUpdate(req.params.id, {
    $set: req.body.listing
  });
  res.redirect(`/listings/${req.params.id}`);
});



// SHOW
app.get("/listings/:id", async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  res.render("listing/show", { listing });
});

// DELETE
app.delete("/listings/:id", async (req, res) => {
  await Listing.findByIdAndDelete(req.params.id);
  res.redirect("/listings");
});



app.listen(8080, () => {
  console.log("server is listening on port 8080");
});
