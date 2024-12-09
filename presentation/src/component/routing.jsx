import Cookies from 'js-cookie';
import Dashboard from './dashboard';
import SignIn from './SignIn';
import Home from './home';
import Login from './HomeSection';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Signup2 from './signIn2';
const Router=()=>{
    return(
        <>
        
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignIn />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup2" element={<Signup2 />} />
        </Routes>
      </BrowserRouter>
      <div>
        <h2>Fetched Cookie Value:</h2>
        {/* <p>{cookieValue}</p> */}
      </div>
        </>
    )
}

export default Router