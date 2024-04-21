import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import SubmitButton from '../components/submitButton';
import EventButton from '../components/eventButton';

export default function UserHome({}) {
    const navigate = useNavigate();

    // Event handler for Plan an Event button click
    const handleEventButtonClick = () => {
    navigate('/event');
    }

    // Event handler for Your Schedule button click
    const handleScheduleButtonClick = () => {
    navigate('/calendar');
    }

    // Event handler for Friends button click
    const handleFriendsButtonClick = () => {
    navigate('/friends');
    }

    const [eventsData, setEventsData] = useState([]);

    useEffect(() => {
        getEvents();
    }, []); // Empty dependency array to run once on component mount

    const getEvents = async () => {
        try {
            const id = localStorage.getItem('id');
            console.log(id);
            const events = await axios.get('http://localhost:5200/api/events/read-events', {
            params: {
                id: id
            }
        });
            // prints on front end for testing
            console.log('My events:', events.data);
            setEventsData(events.data);
        } catch (error) {
            alert("Error fetching events: " + error.message);
        }
    }

    return (
        <div className='UserHome h-screen bg-blue-200 overflow-hidden'>
            <div className='flex text-center justify-center bg-blue-400 text-5xl pt-8 text-white pb-4'>
                Welcome to Time2Meet!
            </div>
            <div className='flex text-center justify-center	bg-blue-400 text-2xl pb-8 text-white'>
                In this website you are able to create schedule and share your plans with friends without the extra hassle.
            </div>
            <div className='grid grid-cols-3 content-center justify-center place-content-center'>
                <div className='flex col-start-1 align-center grid grid-rows-4 h-full bg-blue-400 rounded-3xl p-4 m-4'>
                    <div className='flex justify-center text-white text-4xl'>
                        Things to Do!
                    </div>
                    <button className='bg-blue-800 text-white border-2 border-blue-500 hover:bg-white hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 font-medium rounded-2xl text-sm px-5 py-2.5 mr-2 mb-2'onClick={handleEventButtonClick}>
                        Plan an Event
                    </button>
                    <button className='bg-blue-800 text-white border-2 border-blue-500 hover:bg-white hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 font-medium rounded-2xl text-sm px-5 py-2.5 mr-2 mb-2'onClick={handleScheduleButtonClick}>
                        Your Schedule
                    </button>
                    <button className='bg-blue-800 text-white border-2 border-blue-500 hover:bg-white hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 font-medium rounded-2xl text-sm px-5 py-2.5 mr-2 mb-2'onClick={handleFriendsButtonClick}>
                        Friends
                    </button>
                </div>
                <div className='flex col-start-2 align-center grid grid-rows-4 h-full bg-blue-400 rounded-3xl p-4 m-4'>
                    <div className='flex justify-center text-white text-4xl'>
                        Upcoming Events
                    </div>
                    <button
                        type=""
                        className="flex justify-between items-center bg-blue-800 text-white border-2 border-blue-500 hover:bg-white hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                    >
                        <span>Event Name</span>
                        <span>Event Time</span>
                    </button>

                    <button
                        type=""
                        className="flex justify-between items-center bg-blue-800 text-white border-2 border-blue-500 hover:bg-white hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                    >
                        <span>Event Name</span>
                        <span>Event Time</span>
                    </button>

                    <button
                        type=""
                        className="flex justify-between items-center bg-blue-800 text-white border-2 border-blue-500 hover:bg-white hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                    >
                        <span>Event Name</span>
                        <span>Event Time</span>
                    </button>

                </div>
                <div className='flex col-start-3 align-center grid grid-rows-4 h-full bg-blue-400 rounded-3xl p-4 m-4'>
                    <div className='flex justify-center text-white text-4xl'>
                        Event Invites   
                    </div>
                    <EventButton></EventButton>
                    <EventButton></EventButton>
                    <EventButton></EventButton>
                </div>
            </div>
        </div>
    );
}