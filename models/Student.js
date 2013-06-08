/**
 * Dependencies
 */

var mongoose = require("mongoose");

/**
 * Student Schema
 */

var StudentSchema = mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: String,
    bio: String,
    profileImage: String,
    links: {
        twitter: String,
        website: String
    },
    slug: String,
    project: String
});

var Student = mongoose.model("Student", StudentSchema);

module.exports = Student;