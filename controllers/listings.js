const Listing = require("../models/listing.js");

//Index
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}

//New
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
}

//Create
module.exports.createListing = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    await newListing.save();
    req.flash("success", "New Listing Added!");
    res.redirect("/listings");
}

//Show
module.exports.showListing = async (req, res) => {
    const { id } = req.params;
    const listing =await Listing.findById(id)
    .populate({
        path:"reviews",
        populate: {
            path: "author"
        }
    }).
    populate("owner");
    if(!listing) {
        req.flash("error", "Listing you requested for does not exit!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
}

//Edit
module.exports.renderEditForm = async (req, res, next) => {
    const { id } = req.params;
    const listing =await Listing.findById(id);
    if(!listing) {
        req.flash("error", "Listing you requested for edit does not exit!");
        res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
}

//Update
module.exports.updateListing = async (req, res) => {
    const { id } = req.params;

    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    if(typeof req.file != "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename}
        await listing.save();
    }
    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
}

//Delete
module.exports.destroyListing = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
}