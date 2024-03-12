import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Allemissions } from './Component/Allemissions';
import { Myemission } from './Component/Myemission';
import { Addclient } from './Component/Addclient';
import  Addemission from './Component/Addemission';
import { Allclients } from './Component/Allclients';
import { Login } from './Component/Login';
import { Imageupload } from './Component/Imageupload';


function App() {
  return (
    <div className="App">
       <BrowserRouter>
      <Routes>
          <Route path="/" element={<Addemission />} />
          <Route path="addemission" element={<Addemission />} />
          <Route path="allemissions" element={<Allemissions />} />
          <Route path="addclient" element={<Addclient />} />
          <Route path="allclients" element={<Allclients />} />

          <Route path="client" element={<Myemission />} />
          <Route path="client/img" element={<Imageupload />} />

          <Route path="client/myemission" element={<Myemission />} />

          <Route path="client/login" element={<Login />} />

      </Routes>
    </BrowserRouter>
     
    </div>
  );
}

export default App;
