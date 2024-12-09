// App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import Dashboard from './component/dashboard';
import SignIn from './component/SignIn';
import Home from './component/HomePage';
import Login from './component/HomeSection';
import Signup2 from './component/signIn2';
import Request from './component/request'
import Socketclient from './component/clientsocket'
import Myreceiverlocation from './component/myreceiverlocation';
import Underservice from './component/underservice';
import Demosocket from './component/demosocket';
import Yourdeliveryguy from './component/yourdeliveryguy';
import Providereceiverlocation from './component/providereceiverlocation';
import UserList from './admin/UserList';
import MyStatus from './component/mystatus'
function App() {
  
  const [cookieValue, setCookieValue] = useState('');
  const [changer,setChanger]=useState()


   // Fetch the cookie from the server

    
  useEffect(()=>{
    const fetchCookie = async () => {
      try {
        const response = await fetch('http://localhost:3000/get-cookie', {
          method: 'GET',
          credentials: 'include', // Ensure cookies are sent with the request
        });
        const data = await response.json();
        setCookieValue(data.cookieValue || 'No cookie found');
      } catch (error) {
        console.error('Error fetching cookie:', error);
      }
    };

    fetchCookie();
  })
// Empty dependency array means this effect runs once on mount
// setInterval(() => {
//   // Generate a random number between 0 and 100
//   const randomValue = Math.floor(Math.random() * 101); 
//   setChanger(randomValue);
// }, 1000);



  return (
    <>
  <BrowserRouter>
        <Routes>
          <Route path="/" element={cookieValue=='No cookie found' || cookieValue==''?<Home />:<Dashboard/>} />
          <Route path="/signup" element={<SignIn />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/signup2" element={<Signup2 />} />
          <Route path="/request" element={<Request />} />
          <Route path="/socket" element={<Socketclient />} />
          <Route path="/underservice" element={<Underservice />} />
          <Route path="/demosocket" element={<Demosocket />} />
          <Route path="/prl" element={<Providereceiverlocation />} />
          <Route path="/myreceiverlocation" element={<Myreceiverlocation />} />
          <Route path="/admin" element={<UserList />} />
          <Route path="/mystatus" element={<MyStatus />} />
          <Route path="/yourdeliveryguy" element={<Yourdeliveryguy />} />
        </Routes>
      </BrowserRouter>
      <div>
      
      </div>
    </>
  );
}

export default App;
