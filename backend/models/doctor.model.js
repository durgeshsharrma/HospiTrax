const mongoose = require('mongoose');


const doctorSchema = new mongoose.Schema({

    //name of doctor
    name: {
        type: String,
        required: true,
    },

    //email of doctor   
    email: {
        type: String,
        required: true,
        unique: true,
    },

    //password of doctor
    password: {
        type: String,
        required: true,
    },


    speciality: {
        type: String,
        required: true,
    },


    experience: {
        type: Number,
        required: true,
    },


    // phoneNumber: {
    //     type: String,
    //     required: true,
    // },

    degree: {
        type: String,
        required: true,
    },



    image: {
        type: String, // URL to the image
        default: 'https://example.com/default-profile.png', // Default profile picture URL
    },

    about: {
        type: String,
        required: true,
    },

    //availability of doctor
    availability: {
        type: Boolean,
        default: true, // Default to available
    },

    fees: {
        type: Number,
        required: true,
    },

    address: {
        type: String,
        required: true,
    },

    date: {
        type: Number, 
        required: true,
    },

    slots_booked: {
        type: Object, // Array of booked slot times
        default: {}, // Default to an empty array
    },


}, { minimize: false });

        


const doctorModel = mongoose.model('Doctor', doctorSchema);
module.exports = doctorModel;