import React from "react"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import { About } from "./components/About"
import { Users } from "./components/Users"
import { Navbar } from "./components/Navbar"

function App() {
  return (
    <Router>
      <Navbar/>
      <div className="container p-4">
        <Routes>
          <Route path="/users" element={<Colors />} />
          <Route path="/users" element={<Users />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
