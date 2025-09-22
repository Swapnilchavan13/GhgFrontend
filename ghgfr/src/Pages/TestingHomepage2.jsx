import React, { useEffect, useRef, useState } from "react";
import "../styles/testcss2.css"; // Import the CSS file
import ScrollSection from "./ScrollSection";

// ---------------- Counter Component ----------------
export const Counter = ({ target, duration = 3500 }) => {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);
  const finishedRef = useRef(false);

  useEffect(() => {
    if (finishedRef.current) return;

    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const current = Math.round(progress * target);
      setCount(current);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setCount(target);
        finishedRef.current = true;
      }
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return <>{count.toLocaleString()}</>;
};

// ---------------- Footer Component ----------------
const Footer = () => (
  <footer className="footer">
    <div className="footer-inner">
      <p>&copy; 2024 ClimeScore. All rights reserved.</p>
    </div>
  </footer>
);

// ---------------- Main Page ----------------
export const TestingHomepage2 = () => {
  const countersData = [
    { value: 200000, label: "LITRES OF BIOCHAR PRODUCED", desc: "Our Biochar Project in Bandhavgarh works with 100's of farmers to create over 1 ton of biochar everyday, while positively impacting a fragile forest ecosystem." },
    { value: 120, label: "HECTARES", desc: "Our Field Weathering Projects are being deployed at 3 unique locations in India over a surface area of over 120 hectares, with over 1000 tons of rock powder being applied." },
    { value: 40000, label: "TREES", desc: "Our Tree C-Sink is creating agro-forestry by planting over 40,000 trees of various native species in the Himachal Pradesh Region of India." },
    { value: 250, label: "GMS/HOUR", desc: "The capacity of the Direct Air Capture consumer machine prototyped by us. It can enable large scale Carbon Dioxide Removal." },
    { value: 300000, label: "TONS OF CO2", desc: "Emissions accurately measured & reported as per GRJ standards on our platform – CLIME SCORE" },
  ];

  const [start, setStart] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStart(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // ---------------- Slides ----------------
  const slides = [
    {
      title: "Measure Carbon Emission",
      contents: [
        { img: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=600&h=400&fit=crop", text: "Track and measure your carbon emissions with advanced analytics and real-time monitoring systems." },
        { img: "https://images.unsplash.com/photo-1569163139394-de4e5f43e4e3?w=600&h=400&fit=crop", text: "Generate accurate reports with scientific methods and internationally recognized standards." },
        { img: "https://images.unsplash.com/photo-1497436072909-f5e4be2e61e6?w=600&h=400&fit=crop", text: "Identify key hotspots of your organization's carbon footprint with detailed analysis." },
      ],
    },
    {
      title: "Earn / Buy Carbon Credits",
      contents: [
        { img: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=400&fit=crop", text: "Earn credits by reducing emissions through verified sustainability initiatives." },
        { img: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop", text: "Buy certified credits to offset your impact and achieve carbon neutrality." },
        { img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop", text: "Participate in verified climate-positive projects around the globe." },
      ],
    },
    {
      title: "Explore Sustainable Marketplace",
      contents: [
        { img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop", text: "Discover eco-friendly products and services from sustainable brands." },
        { img: "https://images.unsplash.com/photo-1523906921802-b5d2d899e93b?w=600&h=400&fit=crop", text: "Support businesses contributing to sustainability and environmental protection." },
        { img: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&h=400&fit=crop", text: "Build a green supply chain with trusted partners and verified suppliers." },
      ],
    },
  ];

  const totalItems = slides.reduce((acc, slide) => acc + slide.contents.length, 0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentText, setCurrentText] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // -------- Sticky Scroll Handler --------
  useEffect(() => {
    const section = document.getElementById("scroll-section");
    const handleScroll = () => {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight - window.innerHeight;
      const scrollY = -rect.top;
      
      if (scrollY < 0 || scrollY > sectionHeight) return;
      
      const progress = Math.min(Math.max(scrollY / sectionHeight, 0), 1);
      const totalSteps = totalItems;
      const step = Math.floor(progress * (totalSteps - 0.01));
      
      let slideIndex = 0, textIndex = 0, itemCount = 0;
      for (let i = 0; i < slides.length; i++) {
        if (step >= itemCount && step < itemCount + slides[i].contents.length) {
          slideIndex = i;
          textIndex = step - itemCount;
          break;
        }
        itemCount += slides[i].contents.length;
      }
      
      setCurrentSlide(slideIndex);
      setCurrentText(textIndex);
      setScrollProgress(progress);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [totalItems, slides]);

  return (
    <div className="page-wrapper">
      {/* Fixed Navbar */}
      <nav className="navbar">
        <div className="navbar-inner">
          <a href="/" className="navbar-logo">Climescore</a>
          <div className="navbar-links">
            <a href="/client/login">Measure Carbon Emission</a>
            <a href="/marketplacehome">Carbon Credits</a>
            <a href="/marketplace">Green Marketplace</a>
            <a href="/blog">Resources</a>
            <a href="/jobs">Jobs</a>
            <a href="/about">About</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">The ClimeScore Footprint</h1>
          <div className="hero-image-container">
            <img 
              src="http://nettzero.world/wp-content/uploads/2025/03/Locality-Name-Nubra-Valley-State-Laddakh-UT.gif" 
              alt="Nubra Valley" 
              className="hero-image"
            />
          </div>
        </div>
      </div>
      



{/* Your scroll effect section */}
<ScrollSection />



        
        
      


      <Footer />
    </div>
  );
};

export default TestingHomepage2;