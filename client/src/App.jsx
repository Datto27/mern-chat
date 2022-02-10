import React, { useEffect, useState } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Authenticate from "./Pages/Authenticate";
import Home from "./Pages/Home";


function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="login" element={<Authenticate />} />
          <Route path="/" element={<Home/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
