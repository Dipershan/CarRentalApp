// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import BookingCar from './pages/BookingCar';
import UserBookings from './pages/UserBookings';
import AdminHome from './pages/AdminHome';
import EditCar from './pages/EditCar';
import Home from './pages/Home';
import "antd/dist/reset.css";
import AddCar from './pages/AddCar';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/booking/:carid" element={<BookingCar />} />
          <Route path="/userbookings" element={<UserBookings />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/editcar/:carid" element={<EditCar />} />
          <Route path="/addcar" element={<AddCar />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
