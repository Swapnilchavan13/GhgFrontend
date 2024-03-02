import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Seendelete } from './Component/Seendelete';
import { Selectdata } from './Component/Selectdata';
import Uploaddata from './Component/Uploaddata';
import { Navbar } from './Component/Navbar';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
       <Navbar />
      <Routes>
          <Route path="upload" element={<Uploaddata />} />
          <Route path="see" element={<Seendelete />} />
          <Route path="select" element={<Selectdata />} />
      </Routes>
    </BrowserRouter>
     
    </div>
  );
}

export default App;
