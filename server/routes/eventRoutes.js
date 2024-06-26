const express = require('express');
const Event = require('../models/Event');
const User = require('../models/User');
const router = express.Router();
const jsonWebToken = require('jsonwebtoken');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// create a new event
router.post('/create-event', async (req, res) => {

    console.log("CREATING EVENT")
    console.log(req.body);
    try {

        const {eventName} = req.body;

        // checks if event already exists in database
        const eventExists = await Event.findOne({eventName});
        if(eventExists){
            return res.status(400).send({message: "Event already exists."});
        }

        // mongo implementation
        const event = new Event({
            eventName: req.body.eventName,
            eventDescription: req.body.eventDescription,
            eventDate: req.body.eventDate,
            eventStartTime: req.body.eventStartTime,
            eventEndTime: req.body.eventEndTime,
            eventType: req.body.eventType,
            eventLocation: req.body.eventLocation,
            eventInvitedFriends: req.body.eventInvitedFriends,
            eventUser: new ObjectId(req.body.eventUser),
        });
        
        const newEvent = await event.save(); // save event
        
        const user = await User.findById(req.body.eventUser);
        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }
        else {
            user.events.push(newEvent._id);
            await user.save();
            console.log("user has the event saved!");
        }

        console.log('New event:', newEvent);
        res.status(201).send({ message: "Event created successfully!"});

        

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Create Event failed!" });
    }

});

router.get('/read-events', async (req, res) => {

    console.log("arrived at /read-events")

    try {
        const id = req.query.id;
        console.log(id);
        const user = await User.findById(new ObjectId(id))
            .populate('events') 
            .exec()
        if(!user){
            return res.status(404).send({message: 'User ID not found.'});
        }
        res.status(200).send(user.events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error: could not display events." });
    }
});

module.exports = router;