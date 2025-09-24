import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/3t.css";
import { Link } from "react-router-dom";
import {Footer} from "./Footer";

gsap.registerPlugin(ScrollTrigger);

const images = [
  {
    src: "https://eponline.com/-/media/ENV/eponline/Images/2023/08,-d-,17,-d-,23pollution.jpg",
    text: "Our emissions currently exceed our Carbon Quota by a whopping",
    button: "Learn More",
  },
  {
    src: "https://ilotusland.com/wp-content/uploads/2023/11/ella-ivanescu-JbfhNrpQ_dw-unsplash-1-scaled.jpg",
    text: "ClimeScore develops Carbon Dioxide Removal Programs across scalable pathways, to enable a billion ton removal at",
    button: "Learn More",
  },
  {
    src: "https://images.theconversation.com/files/562291/original/file-20231128-23-zrg8sr.jpg",
    text: "ClimeScore helps you accurately measure, reduce & analyse your Scope 1, 2 & 3 emissions with our",
    button: "Learn More",
  },
  {
    src: "https://22313216.fs1.hubspotusercontent-na1.net/hubfs/22313216/co2e-meaning-definition-calculation-and-examples.png",
    text: "To be ClimeScore in time we will all need to",
    button: "Learn More",
  },
];

const slides = [
  {
    title: "Measure Carbon Emission",
    contents: [
      {
        img: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=600&h=400&fit=crop",
        text: "Track and measure your carbon emissions with advanced analytics and real-time monitoring systems.",
      },
      {
        img: "https://unearthed.greenpeace.org/wp-content/uploads/2018/05/GettyImages-625668026-600x396.jpg",
        text: "Generate accurate reports with scientific methods and internationally recognized standards.",
      },
      {
        img: "https://iasgyan.in/ig-uploads/images/CO2_EMISSIONS.jpg",
        text: "Identify key hotspots of your organization's carbon footprint with detailed analysis.",
      },
    ],
  },
  {
    title: "Earn / Buy Carbon Credits",
    contents: [
      {
        img: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=400&fit=crop",
        text: "Earn credits by reducing emissions through verified sustainability initiatives.",
      },
      {
        img: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop",
        text: "Buy certified credits to offset your impact and achieve carbon neutrality.",
      },
      {
        img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop",
        text: "Participate in verified climate-positive projects around the globe.",
      },
    ],
  },
  {
    title: "Explore Sustainable Marketplace",
    contents: [
      {
        img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop",
        text: "Discover eco-friendly products and services from sustainable brands.",
      },
      {
        img: "https://images.unsplash.com/photo-1523906921802-b5d2d899e93b?w=600&h=400&fit=crop",
        text: "Support businesses contributing to sustainability and environmental protection.",
      },
      {
        img: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&h=400&fit=crop",
        text: "Build a green supply chain with trusted partners and verified suppliers.",
      },
    ],
  },
];

// flatten steps
const steps = slides.flatMap((slide) =>
  slide.contents.map((c) => ({
    title: slide.title,
    ...c,
  }))
);

export const Testing3 = () => {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
const [activeTitleIndex, setActiveTitleIndex] = useState(0);

  

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
  ScrollTrigger.create({
    trigger: ".numberdiv",
    start: "top 85%", // when 80% of viewport reaches numberdiv
    once: true,
    onEnter: () => setStart(true),
  });

  return () => ScrollTrigger.getAll().forEach(t => t.kill());
}, []);
;



  useEffect(() => {
    const sections = gsap.utils.toArray(".step");

    gsap.set(sections, { autoAlpha: 0 });
    gsap.set(sections[0], { autoAlpha: 1 });

    // Dynamically size sticky-box to tallest content
    let maxHeight = 0;
    sections.forEach((step) => {
      maxHeight = Math.max(maxHeight, step.offsetHeight);
    });
    if (stickyRef.current) {
      stickyRef.current.style.height = `${maxHeight}px`;
    }

    // Step transitions
   sections.forEach((step, i) => {
  ScrollTrigger.create({
    trigger: containerRef.current,
    start: () => `top+=${i * window.innerHeight} top`,
    end: () => `+=${window.innerHeight}`,
    onEnter: () => {
      gsap.to(sections, { autoAlpha: 0, duration: 0.5 });
      gsap.to(step, { autoAlpha: 1, duration: 0.5 });

      // Update active title based on which slide this step belongs to
      const slideIndex = Math.floor(i / slides[0].contents.length); 
      setActiveTitleIndex(slideIndex);
    },
    onEnterBack: () => {
      gsap.to(sections, { autoAlpha: 0, duration: 0.5 });
      gsap.to(step, { autoAlpha: 1, duration: 0.5 });

      const slideIndex = Math.floor(i / slides[0].contents.length); 
      setActiveTitleIndex(slideIndex);
    },
  });
});


    // Pin section 2
    ScrollTrigger.create({
      trigger: containerRef.current,
      pin: true,
      start: "top top",
      end: `+=${steps.length * window.innerHeight}`,
      scrub: false,
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // State for Div1 carousel
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleButtonClick = () => {
    alert(`You clicked: ${images[current].text}`);
  };

  return (
    <div className="wrapper">
      <nav className="navbar">
        <div className="logo">
  <Link to="/">
    <img src="/ClimeScore.png" alt="Climescore Logo" />
  </Link>
</div>
        <ul className="nav-links">
          <li><Link to="/client/login">Measure Carbon Emission</Link></li>
          <li><Link to="/marketplacehome">Carbon Credits</Link></li>
          <li><Link to="/marketplace">Green Marketplace</Link></li>
          <li><Link to="/blog">Resources</Link></li>
          <li><Link to="/jobs">Jobs</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>

      {/* Div 1 */}
      <section className="section section1">
        <div className="firstdiv">
          <img
            src={images[current].src}
            alt="carousel"
            className="carousel-image"
          />
          <div className="overlay-content">
            <h2 className="overlay-text">{images[current].text}</h2>
            <button className="overlay-btn" onClick={handleButtonClick}>
              {images[current].button}
            </button>
          </div>
          <button onClick={prevSlide} className="nav-button prev">◀</button>
          <button onClick={nextSlide} className="nav-button next">▶</button>
        </div>
        {/* <hr /> */}
      </section>

     {/* Div 2 */}
<section className="section section2" ref={containerRef}>
  <div className="sticky-box" ref={stickyRef}>
  <h1 className="sticky-title">Clime Score Suite</h1>
    {/* Top buttons */}
    <div className="title-buttons">
      {slides.map((slide, idx) => (
        <button
          key={idx}
          className={`title-btn ${activeTitleIndex === idx ? "active" : ""}`}
        >
          {slide.title}
        </button>
      ))}
    </div>

    {steps.map((s, i) => (
      <div key={i} className="step">
        <img src={s.img} alt={s.text} />
        <div className="conbox">
          <h2>{s.title}</h2>
          <hr />
          <p>{s.text}</p>
        </div>
      </div>
    ))}
  </div>
</section>


      {/* Div 3 */}
      <section className="section section3" ref={sectionRef}>
  <div>
    <h1 className="sticky-title">ClimeScore in Numbers</h1>
    <div className="numberdiv">
      {countersData.map((item, i) => (
        <div key={i}>
          <div className="numcontent">
            <h3>{item.label}</h3>
            <p>{item.desc}</p>
          </div>
          <div className="counternum">
            <h1>{start ? <Counter target={item.value} /> : "0"}</h1>
          </div>
        </div>
      ))}
    </div>
  </div>

       {/* <hr /> */}

        <div className="hero-content">
          <h1 className="sticky-title">The ClimeScore Footprint</h1>
          <div className="hero-image-container">
            <img 
              src="http://nettzero.world/wp-content/uploads/2025/03/Locality-Name-Nubra-Valley-State-Laddakh-UT.gif" 
              alt="Nubra Valley" 
              className="hero-image"
            />
          </div>
        </div>
               <h1 className="sticky-title">ClimeScore For You</h1>
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
      </section>
      <Footer />
    </div>
  );
};


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