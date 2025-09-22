import React, { useEffect, useRef, useState } from "react";
import "../styles/testcss.css";
import { Link } from "react-router-dom";
import { Footer } from "./Footer";

const images = [
  {
    src: "https://eponline.com/-/media/ENV/eponline/Images/2023/08,-d-,17,-d-,23pollution.jpg",
    text: "Our emissions currently exceed our Carbon Quota by a whopping",
    button: "Learn More"
  },
  {
    src: "https://ilotusland.com/wp-content/uploads/2023/11/ella-ivanescu-JbfhNrpQ_dw-unsplash-1-scaled.jpg",
    text: "ClimeScore develops Carbon Dioxide Removal Programs across scalable pathways, to enable a billion ton removal at",
    button: "Learn More"
  },
  {
    src: "https://images.theconversation.com/files/562291/original/file-20231128-23-zrg8sr.jpg?ixlib=rb-4.1.0&rect=0%2C49%2C6636%2C4357&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip",
    text: "ClimeScore helps you accurately measure, reduce & analyse your Scope 1, 2 & 3 emissions with our",
    button: "Learn More"
  },
  {
    src: "https://22313216.fs1.hubspotusercontent-na1.net/hubfs/22313216/co2e-meaning-definition-calculation-and-examples.png",
    text: "To be ClimeScore in time we will all need to",
    button: "Learn More"
  }
];


export const TestingHomepage = () => {

    const rafRef = useRef(null);
      const finishedRef = useRef(false);

    const countersData = [
  {
    value: 200000,
    label: "LITRES OF BIOCHAR PRODUCED",
    desc: "Our Biochar Project in Bandhavgarh works with 100’s of farmers to create over 1 ton of biochar everyday, while positively impacting a fragile forest ecosystem."
  },
  {
    value: 120,
    label: "HECTARES",
    desc: "Our Field Weathering Projects are being deployed at 3 unique locations in India over a surface area of over 120 hectares, with over 1000 tons of rock powder being applied. The projects are located in Uttarakhand, Madhya Pradesh and Himachal Pradesh."
  },
  {
    value: 40000,
    label: "TREES",
    desc: "Our Tree C-Sink is creating agro-forestry by planting over 40,000 trees of various native species in the Himachal Pradesh Region of India. The plantations will also provide employment to 100s of local residents by creating opportunities in the area of agro-packaging and processing."
  },
  {
    value: 250,
    label: "GMS/HOUR",
    desc: "The capacity of the Direct Air Capture consumer machine prototyped by us. It can enable large scale Carbon Dioxide Removal. The DAC unit works at an extremely low price point and can be deployed anywhere that has CO2 density."
  },
  {
    value: 300000,
    label: "TONS OF CO2",
    desc: "Emissions accurately measured & reported as per GRJ standards on our platform – CLIME SCORE"
  }
];

  const [start, setStart] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStart(true);
          observer.disconnect(); // trigger only once
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);



// ---------------- Slides ----------------
  const slides = [
    {
      title: "Measure Carbon Emission",
      contents: [
        { img: "https://www.carbongate.io/Assets/images/services/carbonemission.png", text: "Track and measure your carbon emissions with advanced analytics and real-time monitoring systems." },
        { img: "https://miro.medium.com/1*YMLLZCyqIap586ayhcaqdQ.jpeg", text: "Generate accurate reports with scientific methods and internationally recognized standards." },
        { img: "https://cdn.tapinvest.in/strapi-assets/Credit_Creation_1_8ac29ba9ba.jpg", text: "Identify key hotspots of your organization's carbon footprint with detailed analysis." },
      ],
    },
    {
      title: "Earn / Buy Carbon Credits",
      contents: [
        { img: "https://climatecarbon.com/wp-content/uploads/2023/05/Carbon-Credit.jpg", text: "Earn credits by reducing emissions through verified sustainability initiatives." },
        { img: "https://static1.squarespace.com/static/650bf3ee96714871f4364ce8/652d0ba2958f231b73106e32/67125d543943cf1dbe41a26a/1752728063907/epr+-+Copy.png", text: "Buy certified credits to offset your impact and achieve carbon neutrality." },
        { img: "https://i0.wp.com/highschool.latimes.com/wp-content/uploads/2025/07/climate-literacy-image.png?fit=1280%2C720&ssl=1", text: "Participate in verified climate-positive projects around the globe." },
      ],
    },
    {
      title: "Explore Sustainable Marketplace",
      contents: [
        { img: "https://miro.medium.com/1*YMLLZCyqIap586ayhcaqdQ.jpeg", text: "Discover eco-friendly products and services from sustainable brands." },
        { img: "https://shopequo.com/cdn/shop/articles/Cover_642d8475-e5b3-4074-a452-8d054a621b9e.jpg?v=1709275662&width=1600", text: "Support businesses contributing to sustainability and environmental protection." },
        { img: "https://climatecarbon.com/wp-content/uploads/2023/05/Carbon-Credit.jpg", text: "Build a green supply chain with trusted partners and verified suppliers." },
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
      const sectionTop = section.offsetTop;
      const sectionHeight = window.innerHeight * 4; // 400vh
      const scrollY = window.scrollY - sectionTop;
      if (scrollY < 0 || scrollY > sectionHeight) return;
      const progress = scrollY / sectionHeight;
      const totalSteps = totalItems;
      const step = Math.floor(progress * (totalSteps - 1.01));
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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [totalItems, slides]);



    const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // 4 seconds interval
    return () => clearInterval(interval); // cleanup
  }, []);

  const handleButtonClick = () => {
    alert(`You clicked: ${images[current].text}`);
  };


  const [mode, setMode] = useState("sticky"); // sticky | fixed | released

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY < 500) {
        setMode("sticky"); // up to 50vh
      } else if (scrollY >= 500 && scrollY < 2500) {
        setMode("fixed"); // fixed for next 200vh
      } else {
        setMode("released"); // released afterwards
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
        
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        {/* Left side logo */}
        <div className="logo"><Link to="/">Climescore</Link></div>

        {/* Right side menu */}
       <ul className="nav-links">
  <li><Link to="/client/login">Measure Carbon Emission</Link></li>
  <li><Link to="/marketplacehome">Carbon Credits</Link></li>
  <li><Link to="/marketplace">Green Marketplace</Link></li>
  <li><Link to="/blog">Resources</Link></li>
  <li><Link to="/jobs">Jobs</Link></li>
  <li><Link to="/about">About</Link></li>
</ul>
      </nav>

      {/* Page Content */}
     <div className="content">
      <div className="firstdiv">
        <img
          src={images[current].src}
          alt="carousel"
          className="carousel-image"
        />

        {/* Text & Button Overlay */}
        <div className="overlay-content">
          <h2 className="overlay-text">{images[current].text}</h2>
          <button className="overlay-btn" onClick={handleButtonClick}>
            {images[current].button}
          </button>
        </div>

        {/* Navigation Buttons */}
        <button onClick={prevSlide} className="nav-button prev">◀</button>
        <button onClick={nextSlide} className="nav-button next">▶</button>
      </div>
      <hr />
    </div>


      <div className="clime-wrapper">
  


  <div id="scroll-section">
        <h1 className="sticky-title">Clime Score Suite</h1>
        <div className="sticky-container">
          <div className="sticky-inner">
            {/* Left */}
            <div>
              <h2 className="sticky-subtitle">{slides[currentSlide]?.title}</h2>
              <div className="sticky-text-container">
                {slides[currentSlide]?.contents.map((content, index) => (
                  <p
                    key={index}
                    className={`sticky-text ${currentText === index ? "active" : ""}`}
                  >
                    {content.text}
                  </p>
                ))}
              </div>
            </div>
            {/* Right */}
            <div className="sticky-image-wrapper">
              <div className="sticky-image">
                <img src={slides[currentSlide]?.contents[currentText]?.img} alt="Content visual" />
              </div>
            </div>
          </div>
        </div>
        {/* Progress */}
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill" style={{ height: `${scrollProgress * 100}%` }}></div>
          </div>
        </div>
      </div>


 

   
<hr />

    <div className="divthree">
        <div>
        <h1 style={{"color":"#03AFF8"}}>The ClimeScore Footprint</h1>
        <img src="http://nettzero.world/wp-content/uploads/2025/03/Locality-Name-Nubra-Valley-State-Laddakh-UT.gif" alt="" />
        </div>
    <hr />

    <div>
        <h1 style={{"color":"#03AFF8"}}>ClimeScore in Numbers</h1>
         <div className="numberdiv" ref={sectionRef}>
      {countersData.map((item, i) => (
        <div key={i}>
          <h1>
            {start ? <Counter target={item.value} /> : "0"}
          </h1>
          <h3>{item.label}</h3>
          <p>{item.desc}</p>
        </div>
      ))}
    </div>
    </div>
<hr />
        <h1 style={{"color":"#03AFF8"}}>ClimeScore For You</h1>
    <div className="divfour">
<div>
    <img src="https://shopequo.com/cdn/shop/articles/Cover_642d8475-e5b3-4074-a452-8d054a621b9e.jpg?v=1709275662&width=1600" alt="" />
    <h2>Carbon Neutrality</h2>
    <p>NettZero offers the best of breed global standards & practices to make your organisation certified as Carbon Neutral​</p>
    <button>Read More</button>
</div>
<div>
    <img src="https://climatecarbon.com/wp-content/uploads/2023/05/Carbon-Credit.jpg" alt="" />
    <h2>Carbon Credits</h2>
    <p>NettZero works with the industry leaders to provide bonafide & legitimate Carbon Credits. 10 or 10,000, we've got them</p>
    <button>Read More</button>
</div>
<div>
    <img src="https://cdn.tapinvest.in/strapi-assets/Credit_Creation_1_8ac29ba9ba.jpg" alt="" />
    <h2>Credit Creation</h2>
    <p>If you have projects that need development and promotion to earn Carbon Credits, we get you listed on top registries​</p>
    <button>Read More</button>
</div>
<div>
    <img src="https://i0.wp.com/highschool.latimes.com/wp-content/uploads/2025/07/climate-literacy-image.png?fit=1280%2C720&ssl=1" alt="" />
    <h2>Climate Literacy​</h2>
    <p>If you need to educate & coach your company on the impact of various developments, NettZero Trains delivers​</p>
    <button>Read More</button>
</div>
<div>
    <img src="https://static1.squarespace.com/static/650bf3ee96714871f4364ce8/652d0ba2958f231b73106e32/67125d543943cf1dbe41a26a/1752728063907/epr+-+Copy.png?format=1500w" alt="" />
    <h2>EPR & Plastic Credits​</h2>
    <p>We work with brands and Plastic Project developers to create value in terms of credits and social development. ​</p>
    <button>Book Demo</button>

</div>
    </div>
    <Footer />
    </div>
    </div>
     </div>
  );
};


// import React, { useEffect, useRef, useState } from "react";

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