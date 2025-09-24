import './App.css';
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";

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
import { ProductDetail } from './Pages/ProductDetail';
import { CategoryPage } from './Pages/CategoryPage';
import { ProductForm } from './CMS/ProductForm.jsx';
import { Marketplace } from './Pages/Marketplace.jsx';
import { Reports } from './Component/Reports.jsx';
import LandingPage from './Pages/LandingPage.jsx';
import BlogResources from './Pages/BlogResources.jsx';
import Ecomemission from './Ecom/Ecomemission.jsx';
import AdminDashboard from './Ecom/AdminDashboard.jsx';
import AdminLogin from './Ecom/EcomAdminLogin.jsx';
import EcomAdminLogin from './Ecom/EcomAdminLogin.jsx';
import BusinessLogin from './Ecom/BusinessLogin.jsx';
import AdminRegister from './Ecom/AdminRegister.jsx';
import BusinessDashboard from './Ecom/BusinessDashboard.jsx';
import MeasureEmissions from './Pages/MeasureEmissions.jsx';
import EmissionsWorkflow from './Pages/EmissionsWorkflow.jsx';
import EmissionsWorkflowDasboard from './Pages/EmissionsWorkflowDasboard.jsx';
import ReviewAndAction from './Pages/ReviewAndAction.jsx';
import { CMSDashboard } from './CMS/CMSDashboard.jsx';
import { ProjectDetail } from './Pages/ProjectDetail.jsx';
import { Checkout } from './Pages/Checkout.jsx';
import { MarketplaceHome } from './Pages/MarketplaceHome.jsx';
import { ClientRegister } from './Component/ClientRegister.jsx';
import BlogCMS from './CMS/BlogCMS.jsx';
import { BuyersData } from './CMS/BuyersData.jsx';
import { NewHomePage } from './Pages/NewHomePage.jsx';
import { Jobs } from './Pages/Jobs.jsx';
import ScrollSection from './Pages/ScrollSection.jsx';
import { Testing3 } from './Pages/Testing3.jsx';
import ExternalRedirect from './Component/ExternalRedirect.jsx';

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
       {/* <Navbar /> */}
      <Routes>
      {/* <Route path="/" element={<Homepage />} /> */}

      {/* <Route path="/" element={<LandingPage />} /> */}

      {/* <Route path="/" element={<NewHomePage />} /> */}

      {/* <Route path="/" element={<Testing3 />} /> */}

<Route path="/" element={<ExternalRedirect />} />



      <Route path="/blog" element={<BlogResources />} />

          <Route path="/admin" element={<Adminlogin />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path='/allnews' element={<Allnews />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path="/news/:newsId" element={<FullNews />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/marketplace" element={<Marketplace />} />


          <Route path="addemission" element={<Addemission />} />
          <Route path="allemissions" element={<Allemissions />} />
          <Route path="addclients" element={<Addclient />} />
          <Route path="allclients" element={<Allclients />} />
          <Route path="clientregister" element={<ClientRegister />} />


          <Route path="client" element={<Myemission />} />
          <Route path="client/myemission" element={<Myemission />} />
          <Route path="client/addusers" element={<Addusers />} />
          <Route path="client/login" element={<Login />} />
          <Route path="client/myusers" element={<Myusers />} />
          <Route path="client/reports" element={<Reports />} />


          <Route path="user" element={<Useremission />} />
          <Route path="user/useremission" element={<Useremission />} />
          <Route path="user/login" element={<Userlogin />} />

          <Route path="email" element={<Email />} />
{/* ECOM EMISSION */}

      <Route path="/admindashboard" element={<AdminDashboard />} />
      <Route path="/ecomadminlogin" element={<EcomAdminLogin />} />
      <Route path="/businesslogin" element={<BusinessLogin />} />
      <Route path="/ecomadminregister" element={<AdminRegister />} />
      <Route path="/businessdashboard" element={<BusinessDashboard />} />

      {/* Measure Your Emissions */}

      <Route path="/measureemission" element={<MeasureEmissions />} />
      <Route path="/emissionworkflow" element={<EmissionsWorkflow />} />
      <Route path="/emissionworkflowdashboard" element={<EmissionsWorkflowDasboard />} />
      <Route path="/review" element={<ReviewAndAction />} />

      <Route path="/ecomemissions" element={<Ecomemission />} />
      <Route path="/jobs" element={<Jobs />} />


{/* ////CMS//// */}
          <Route path="newsform" element={<Newsform/>} />
          <Route path="productform" element={<ProductForm/>} />
          <Route path="carboncms" element={<CMSDashboard/>} />
          <Route path="blogcms" element={<BlogCMS/>} />

          <Route path="buyerscms" element={<BuyersData/>} />


{/* Carbon Marketplace */}

      <Route path="/marketplacehome" element={<MarketplaceHome />} />
      <Route path="/project/:id" element={<ProjectDetail />} />
      <Route path="/checkout/:id" element={<Checkout />} />


      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
     
    </div>
  );
}

export default App;
