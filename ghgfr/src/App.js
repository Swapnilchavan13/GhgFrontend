import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Seendelete } from './Component/Seendelete';
import { Selectdata } from './Component/Selectdata';
import Uploaddata from './Component/Uploaddata';
import { Navbar } from './Component/Navbar';
import { Demoselect } from './Component/Demoselect';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
       <Navbar />
      <Routes>
          <Route path="upload" element={<Uploaddata />} />
          <Route path="see" element={<Seendelete />} />
          {/* <Route path="select" element={<Selectdata />} /> */}
          <Route path="demo" element={<Demoselect />} />

      </Routes>
    </BrowserRouter>
     
    </div>
  );
}

export default App;
