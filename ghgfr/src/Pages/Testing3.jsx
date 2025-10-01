import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/3t.css";
import { Link } from "react-router-dom";
import { Footer } from "./Footer";

gsap.registerPlugin(ScrollTrigger);

/* -- your top carousel images -- */
const images = [
  { src: "https://eponline.com/-/media/ENV/eponline/Images/2023/08,-d-,17,-d-,23pollution.jpg", text: "Our emissions currently exceed our Carbon Quota by a whopping", button: "Learn More" },
  { src: "https://ilotusland.com/wp-content/uploads/2023/11/ella-ivanescu-JbfhNrpQ_dw-unsplash-1-scaled.jpg", text: "ClimeScore develops Carbon Dioxide Removal Programs across scalable pathways, to enable a billion ton removal at", button: "Learn More" },
  { src: "https://images.theconversation.com/files/562291/original/file-20231128-23-zrg8sr.jpg", text: "ClimeScore helps you accurately measure, reduce & analyse your Scope 1, 2 & 3 emissions with our", button: "Learn More" },
  { src: "https://22313216.fs1.hubspotusercontent-na1.net/hubfs/22313216/co2e-meaning-definition-calculation-and-examples.png", text: "To be ClimeScore in time we will all need to", button: "Learn More" },
];

const slides = [
  {
    title: "Measure Carbon Emission",
    contents: [
      { img: "https://nettzero.world/wp-content/uploads/2024/02/Frame-6-3-2.png", text: "Track and measure your carbon emissions with advanced analytics and real-time monitoring systems." },
      { img: "https://nettzero.world/wp-content/uploads/2024/02/Frame-7-1.png", text: "Generate accurate reports with scientific methods and internationally recognized standards." },
      { img: "https://iasgyan.in/ig-uploads/images/CO2_EMISSIONS.jpg", text: "Identify key hotspots of your organization's carbon footprint with detailed analysis." },
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

// flatten steps (each content item => one step)
const steps = slides.flatMap((slide) =>
  slide.contents.map((c) => ({ title: slide.title, ...c }))
);

/* -------- counters data -------- */
const countersData = [
  { 
    value: 200000, 
    label: "LITRES OF BIOCHAR PRODUCED", 
    desc: "Our Biochar Project in Bandhavgarh works with 100’s of farmers to create over 1 ton of biochar everyday, while positively impacting a fragile forest ecosystem.",
    image: "https://lumenor.ai/cdn-cgi/imagedelivery/F5KOmplEz0rStV2qDKhYag/adb828ab-680a-40dd-1d04-6862026c9e00/tn"
  },
  { 
    value: 120, 
    label: "HECTARES", 
    desc: "Our Field Weathering Projects are being deployed at 3 unique locations in India over a surface area of over 120 hectares...",
    image: "https://t3.ftcdn.net/jpg/07/56/60/38/360_F_756603814_ukzf1prOo54RBS8Q3bZfyeG2CvZSnPIK.jpg"
  },
  { 
    value: 40000, 
    label: "TREES", 
    desc: "Our Tree C-Sink is creating agro-forestry by planting over 40,000 trees of various native species...",
    image: "https://static.vecteezy.com/system/resources/previews/035/884/391/non_2x/green-nature-forest-background-template-green-nature-landscape-and-forest-with-origami-paper-layer-cut-abstract-background-ecology-and-environment-conservation-concept-vector.jpg"
  },
  { 
    value: 250, 
    label: "GMS/HOUR", 
    desc: "The capacity of the Direct Air Capture consumer machine prototyped by us...",
    image: "https://img.freepik.com/premium-photo/concept-carbon-emissions-represented-by-smoke-ai-generative_407474-11204.jpg"
  },
  { 
    value: 300000, 
    label: "TONS OF CO2", 
    desc: "Emissions accurately measured & reported as per GRJ standards on our platform – CLIME SCORE",
    image: "https://lumenor.ai/cdn-cgi/imagedelivery/F5KOmplEz0rStV2qDKhYag/61b93862-53c6-4eb6-0699-eadad982bd00/tn"
  },
];


/* ---------- Counter component (keeps same behaviour) ---------- */
export const Counter = ({ target, duration = 1200 }) => {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.round(progress * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return <>{count.toLocaleString()}</>;
};

/* -------------------- Main component -------------------- */
export const Testing3 = () => {
  // section2 refs & state
  const containerRef = useRef(null); // section2 trigger
  const stickyRef = useRef(null); // section2 sticky box
  const [activeTitleIndex, setActiveTitleIndex] = useState(0);

  // section3 refs & state
  const countersContainerRef = useRef(null); // section3 trigger element
  const countersStickyRef = useRef(null); // inner sticky box for counters
  const [activeCounterIndex, setActiveCounterIndex] = useState(0);

  // Div1 carousel
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setCurrent((p) => (p + 1) % images.length), 3000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrent((p) => (p + 1) % images.length);
  const prevSlide = () => setCurrent((p) => (p - 1 + images.length) % images.length);
  const handleButtonClick = () => alert(`You clicked: ${images[current].text}`);

  /* ---------------- Section 2 Setup (same pattern you've been using) ---------------- */
  useEffect(() => {
    const sectionSteps = gsap.utils.toArray(".step");
    if (!sectionSteps.length) return;

    gsap.set(sectionSteps, { autoAlpha: 0 }); // hide all
    gsap.set(sectionSteps[0], { autoAlpha: 1 });

    // measure after images/fonts have had a chance to load
    const measureAndSet = () => {
      let maxH = 0;
      sectionSteps.forEach((el) => (maxH = Math.max(maxH, el.offsetHeight)));
      if (stickyRef.current) stickyRef.current.style.height = `${maxH}px`;
    };
    // small delay to allow images to layout
    setTimeout(measureAndSet, 80);
    window.addEventListener("resize", measureAndSet);

    // create ScrollTriggers for each step (fade-in/out)
    const stepTriggers = sectionSteps.map((step, i) =>
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: () => `top+=${i * window.innerHeight} top`,
        end: () => `+=${window.innerHeight}`,
        onEnter: () => {
          gsap.to(sectionSteps, { autoAlpha: 0, duration: 0.45 });
          gsap.to(step, { autoAlpha: 1, duration: 0.45 });
          const slideIndex = slides.findIndex((sl) => sl.title === steps[i].title);
          setActiveTitleIndex(slideIndex >= 0 ? slideIndex : 0);
        },
        onEnterBack: () => {
          gsap.to(sectionSteps, { autoAlpha: 0, duration: 0.45 });
          gsap.to(step, { autoAlpha: 1, duration: 0.45 });
          const slideIndex = slides.findIndex((sl) => sl.title === steps[i].title);
          setActiveTitleIndex(slideIndex >= 0 ? slideIndex : 0);
        },
      })
    );

    // pin the whole section & let GSAP manage the scroll distance
    const pinTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      pin: true,
      start: "top top",
      end: `+=${sectionSteps.length * window.innerHeight}`,
      scrub: false,
    });

    return () => {
      window.removeEventListener("resize", measureAndSet);
      stepTriggers.forEach((t) => t.kill());
      pinTrigger.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------------- Section 3 (counters) Setup - mirrored behavior like Section 2 ---------------- */
  useEffect(() => {
    const counterSteps = gsap.utils.toArray(".counter-step");
    if (!counterSteps.length) return;

    gsap.set(counterSteps, { autoAlpha: 0 });
    gsap.set(counterSteps[0], { autoAlpha: 1 });

    const measureAndSet = () => {
      let maxH = 0;
      counterSteps.forEach((el) => (maxH = Math.max(maxH, el.offsetHeight)));
      if (countersStickyRef.current) countersStickyRef.current.style.height = `${maxH}px`;
    };
    setTimeout(measureAndSet, 80);
    window.addEventListener("resize", measureAndSet);

    const stepTriggers = counterSteps.map((step, i) =>
      ScrollTrigger.create({
        trigger: countersContainerRef.current,
        start: () => `top+=${i * window.innerHeight} top`,
        end: () => `+=${window.innerHeight}`,
        onEnter: () => {
          gsap.to(counterSteps, { autoAlpha: 0, duration: 0.45 });
          gsap.to(step, { autoAlpha: 1, duration: 0.45 });
          setActiveCounterIndex(i);
        },
        onEnterBack: () => {
          gsap.to(counterSteps, { autoAlpha: 0, duration: 0.45 });
          gsap.to(step, { autoAlpha: 1, duration: 0.45 });
          setActiveCounterIndex(i);
        },
      })
    );

    const pinTrigger = ScrollTrigger.create({
      trigger: countersContainerRef.current,
      pin: true,
      start: "top top",
      end: `+=${counterSteps.length * window.innerHeight}`,
      scrub: false,
    });

    return () => {
      window.removeEventListener("resize", measureAndSet);
      stepTriggers.forEach((t) => t.kill());
      pinTrigger.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="wrapper">
      <nav className="navbar">
        <div className="logo">
          <Link to="/"><img src="/ClimeScore.png" alt="Climescore Logo" /></Link>
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

      {/* Div 1 — top carousel */}
      <section className="section section1">
        <div className="firstdiv">
          <img src={images[current].src} alt="carousel" className="carousel-image" />
          <div className="overlay-content">
            <h2 className="overlay-text">{images[current].text}</h2>
            <button className="overlay-btn" onClick={handleButtonClick}>{images[current].button}</button>
          </div>
          <button onClick={prevSlide} className="nav-button prev">◀</button>
          <button onClick={nextSlide} className="nav-button next">▶</button>
        </div>
      </section>

      {/* Div 2 — pinned slideshow (unchanged UX) */}
      <section className="section section2" ref={containerRef}>
        <div className="sticky-box" ref={stickyRef}>
          <h1 className="sticky-title">The ClimeScore Suite</h1>

          <div className="title-buttons">
            {slides.map((slide, idx) => (
              <button key={idx} className={`title-btn ${activeTitleIndex === idx ? "active" : ""}`}>
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

      {/* Div 3 — counters: pinned, step-by-step, image + running number + text */}
      <section className="section section3">
        <div className="counters-container" ref={countersContainerRef}>
          <div className="sticky-box counters-sticky" ref={countersStickyRef}>
            <h1 className="sticky-title2">ClimeScore in Numbers</h1>

            {countersData.map((item, i) => (
              <div key={i} className="counter-step">
                <div className="counter-left">
                  <div className="counter-image-box">
  <img src={item.image} alt={item.label} />
  <div className="counter-overlay">
    <h1 className="counter-number">
      {activeCounterIndex === i ? <Counter key={i} target={item.value} /> : "0"}
    </h1>
  </div>
</div>

                </div>

                <div className="counter-right">
                  <h2>{item.label}</h2>
                  <hr />
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* rest of page content */}
      <div className="hero-content">
        <h1 className="sticky-title">The ClimeScore Footprint</h1>
        <div className="hero-image-container">
          <img src="http://nettzero.world/wp-content/uploads/2025/03/Locality-Name-Nubra-Valley-State-Laddakh-UT.gif" alt="Nubra Valley" className="hero-image" />
        </div>
      </div>

      <h1 className="sticky-title">ClimeScore For You</h1>
      <div className="divfour">
        {/* sample boxes — keep as you had them */}
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
  );
};
