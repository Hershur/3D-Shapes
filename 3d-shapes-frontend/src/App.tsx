import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Cube from './components/Cube';
import Sphere from './components/Sphere';
import Cylinder from './components/Cylinder';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cube" element={<Cube />} />
            <Route path="/sphere" element={<Sphere />} />
            <Route path="/cylinder" element={<Cylinder />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
