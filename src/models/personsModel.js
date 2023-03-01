const mongoose = require("mongoose");

const PersonSchema = new mongoose.Schema({
    // PersonID: Its generated by MongoDB
    // We can generate an ID with a extension: uuid or another 

    name1Person: {
        type: String,
        require: true
    },    
    
    lastname2Person: {
        type: String,
        require: false
    },

    documentPerson: {
        type: Number,
        require: true
    },

    emailPerson: {
        type: String,
        require: true
    },

    profilePerson: {
        type: Number,
        require: true
    },
    institutionPerson: {
        type: String,
        require: false
    },

    passwordPerson: {
        type: String,
        require: true,
        pattern: "^[A-Z-a-z-0-9]{8,}$"
    },

    agePerson: {
        type: Number,
        require: false
    },

    positionPerson: {
        type: String,
        require: false,
    }
})

module.exports = mongoose.model("PersonModel", PersonSchema)
