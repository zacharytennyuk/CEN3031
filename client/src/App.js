//import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage';
import Login from './pages/LoginPage';
import CreateAccount from './pages/CreateAccountPage';
import Calendar from './pages/CalendarPage';
import UserHome from './pages/UserHomePage';
import Friends from './pages/FriendsPage';
import Event from './pages/EventPage';
import AuthRoute from './components/AuthRoute';
import './App.css';
import { useState } from 'react';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/calendar" element={<AuthRoute> <Calendar /> </AuthRoute>} />
          <Route path="/user-home" element={<AuthRoute> <UserHome /> </AuthRoute>} />
          <Route path="/friends" element={<AuthRoute> <Friends /> </AuthRoute>} />
          <Route path="/event" element={<AuthRoute> <Event /> </AuthRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
