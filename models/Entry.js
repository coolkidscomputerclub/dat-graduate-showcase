/**
 * Dependencies
 */

var mongoose = require("mongoose");

/**
 * Entry Schema
 */

var EntrySchema = mongoose.Schema({
    student: {
        slug: { type: String, required: true, unique: true },
        name: String,
        pathway: String,
        bio: String,
        profileImage: String,
        links: {
            twitter: String,
            website: String
        },
    },
    project: {
        slug: { type: String, required: true, unique: true },
        title: String,
        description: String,
        tags: [String],
        images: [String],
        vimeoURL: String,
        links: {
            website: String
        }
    }
});

var Entry = mongoose.model("Entry", EntrySchema);

module.exports = Entry;