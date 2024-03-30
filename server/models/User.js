require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');

const newUser = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: {
        type: String,
        unique: true,
        require: true
    },
    password: { type: String, required: true },
    calendar: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Event',
        required: false 
    }],
    friends: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('User', newUser);