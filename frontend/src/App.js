import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home";
import Refreshpage from "./Components/Refreshpage";


function App() {
  const [isauthenticated , setAuthenticated] = useState(false);

  const Privateroute  = ({element})=>{
    return isauthenticated ? element : <Navigate to="/login"/>
  }

  return (<>
    <Router>
   <Refreshpage setAuthenticated = {setAuthenticated}/>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Privateroute element={<Home/>}/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
