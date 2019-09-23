const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var NotesSchema = new Schema ({

    note: {
        Type: String,
        required: true
    }

});

const Note = mongoose.model("Note", NotesSchema);

module.exports = Note;