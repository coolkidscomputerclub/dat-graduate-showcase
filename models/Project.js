/**
 * Dependencies
 */

var mongoose = require("mongoose");

/**
 * Project Schema
 */

var ProjectSchema = mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: String,
    description: String,
    tags: [String],
    vimeoURL: String,
    links: {
        website: String
    },
    slug: String,
    student: String
});

var Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;