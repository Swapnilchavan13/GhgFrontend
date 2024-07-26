import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Allemissions } from './Component/Allemissions';
import { Myemission } from './Component/Myemission';
import { Addclient } from './Component/Addclient';
import  Addemission from './Component/Addemission';
import { Allclients } from './Component/Allclients';
import { Login } from './Component/Login';
import { Addusers } from './Component/Addusers';
import { Useremission } from './Component/Useremission';
import { Userlogin } from './Component/Userlogin';
import { Myusers } from './Component/Myusers';
import { Adminlogin } from './Component/Adminlogin';
import { Email } from './Component/Email';
import { Homepage } from './Pages/Homepage';
import { Navbar } from './Pages/Navbar';
import { Footer } from './Pages/Footer';
import { Newsform } from './CMS/Newsform';
import { Allnews } from './Pages/Allnews';
import { About } from './Pages/About';
import { Contact } from './Pages/Contact';
import { Mobilemessage } from './Pages/Mobilemessage';
import { useEffect, useState } from 'react';
import { FullNews } from './Pages/FullNews';

function App() {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
      const handleResize = () => {
          setIsMobile(window.innerWidth <= 768); // Adjust the width as needed for your mobile breakpoint
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      return () => {
          window.removeEventListener('resize', handleResize);
      };
  }, []);

  if (isMobile) {
      return <Mobilemessage />;
  }

  return (
    <div className="App">
       <BrowserRouter>
       <Navbar />
      <Routes>
      <Route path="/" element={<Homepage />} />

          <Route path="/admin" element={<Adminlogin />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path='/allnews' element={<Allnews />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path="/news/:newsId" element={<FullNews />} />


          <Route path="addemission" element={<Addemission />} />
          <Route path="allemissions" element={<Allemissions />} />
          <Route path="addclient" element={<Addclient />} />
          <Route path="allclients" element={<Allclients />} />

          <Route path="client" element={<Myemission />} />
          <Route path="client/myemission" element={<Myemission />} />
          <Route path="client/addusers" element={<Addusers />} />
          <Route path="client/login" element={<Login />} />
          <Route path="client/myusers" element={<Myusers />} />

          <Route path="user" element={<Useremission />} />
          <Route path="user/useremission" element={<Useremission />} />
          <Route path="user/login" element={<Userlogin />} />

          <Route path="email" element={<Email />} />



{/* ////CMS//// */}
          <Route path="newsform" element={<Newsform/>} />

      </Routes>
      <Footer />
    </BrowserRouter>
     
    </div>
  );
}

export default App;
