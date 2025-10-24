import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";


import "../styles/3t.css";
import { Link } from "react-router-dom";
import { Footer } from "./Footer";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
// gsap.registerPlugin(ScrollTrigger);


{/* <a href="https://freeimage.host/i/KgfuZbV"><img src="https://iili.io/KgfuZbV.md.png" alt="KgfuZbV.md.png" border="0"></a>
<a href="https://freeimage.host/i/KgfuUW7"><img src="https://iili.io/KgfuUW7.md.png" alt="KgfuUW7.md.png" border="0"></a>
<a href="https://freeimage.host/i/KgfuSxS"><img src="https://iili.io/KgfuSxS.md.png" alt="KgfuSxS.md.png" border="0"></a>
<a href="https://freeimage.host/i/KgfukOl"><img src="https://iili.io/KgfukOl.md.png" alt="KgfukOl.md.png" border="0"></a>
<a href="https://freeimage.host/i/KgfR1nI"><img src="https://iili.io/KgfR1nI.md.png" alt="KgfR1nI.md.png" border="0"></a>
<a href="https://freeimage.host/i/KgfRcjp"><img src="https://iili.io/KgfRcjp.md.png" alt="KgfRcjp.md.png" border="0"></a>
<a href="https://freeimage.host/i/KgfREGt"><img src="https://iili.io/KgfREGt.md.png" alt="KgfREGt.md.png" border="0"></a>
<a href="https://freeimage.host/i/KgfRG6X"><img src="https://iili.io/KgfRG6X.md.png" alt="KgfRG6X.md.png" border="0"></a>
<a href="https://freeimage.host/i/Kgf5wUg"><img src="https://iili.io/Kgf5wUg.md.png" alt="Kgf5wUg.md.png" border="0"></a>
<a href="https://freeimage.host/i/KgfG7f4"><img src="https://iili.io/KgfG7f4.md.png" alt="KgfG7f4.md.png" border="0"></a>
<a href="https://freeimage.host/i/KgfGRsf"><img src="https://iili.io/KgfGRsf.md.png" alt="KgfGRsf.md.png" border="0"></a>
<a href="https://freeimage.host/i/KgfGAWG"><img src="https://iili.io/KgfGAWG.md.png" alt="KgfGAWG.md.png" border="0"></a>
<a href="https://freeimage.host/i/KgfGzOX"><img src="https://iili.io/KgfGzOX.md.png" alt="KgfGzOX.md.png" border="0"></a>
<a href="https://freeimage.host/i/KgfMUy7"><img src="https://iili.io/KgfMUy7.md.png" alt="KgfMUy7.md.png" border="0"></a>
<a href="https://freeimage.host/i/KgfM4je"><img src="https://iili.io/KgfM4je.md.png" alt="KgfM4je.md.png" border="0"></a>
<a href="https://freeimage.host/i/KgfMru9"><img src="https://iili.io/KgfMru9.md.png" alt="KgfMru9.md.png" border="0"></a>
<a href="https://freeimage.host/i/KgfM7hg"><img src="https://iili.io/KgfM7hg.md.png" alt="KgfM7hg.md.png" border="0"></a> */}

/* -- your top carousel images -- */
const images = [
  { src: "https://iili.io/KgfG7f4.png", text: "ClimeScore helps you measure, reduce and analyze your carbon emissions", dec: "Our AI-driven platform has accurately measured over 300,000 tons of CO₂" },
  { src: "https://iili.io/KgfRG6X.png", text: "ClimeScore develops valuable, high-integrity carbon credits", dec: "We do scalable CDR through Biochar, Enhanced Rock Weathering, Tree Plantation and DAC projects — creating carbon sinks that you can be part of." },
  { src: "https://images.theconversation.com/files/562291/original/file-20231128-23-zrg8sr.jpg", text: "ClimeScore curates high-integrity carbon credits based on transparency, impact and methodology", dec: "Our Carbon Credit Marketplace hosts meticulously selected CDR projects to ensure your offsetting is robust, hassle-free and cost-effective" },
  { src: "https://iili.io/KgfGRsf.png", text: "ClimeScore delivers customized, implementation-oriented training related to sustainability and climate change and carbon credits", dec: "Our precise and effective modules are delivered by experts with thousands of hours in corporate education" },
];

const slides = [
  {
    title: "Manage Carbon Emission",
    contents: [
      { title2: "Measure",img: "https://iili.io/KgfGzOX.png",imgtext:'Carbon Emission', text: "ClimeScore’s AI powered emissions measurement helps you track your Carbon Footprint in real time across Scope 1 , Scope 2 and Scope 3. It is robust, globally validated and incredibly simple." },
      { title2: "Report",img: "https://iili.io/KgfMru9.png", imgtext:'Carbon Emission',text: "ClimeScore provides you with a simplified, yet reliable framework for your sustainability reporting as per GRI standards. Generate globally valid reports with a few simple clicks and analyse your carbon footprint in real time - across departments, locations, business verticals, vendors and more." },
      { title2: "Offset",img: "https://iili.io/KgfGAWG.png", imgtext:'Carbon Emission',text: "ClimeScore helps you become Carbon Neutral through a process of reduction and offsetting. Take the second step, after accurate carbon measurement, to offset emissions and become Verified Carbon Neutral." },
    ],
  },
  {
    title: "Manage Carbon Credits",
    contents: [
      { title2: "Generate",img: "https://iili.io/KgfukOl.png",imgtext:'Carbon Credits', text: "ClimeScore is an experienced developer of high integrity and high value credits using Carbon Dixide Removal pathways such as Biomass Carbon Removal & Storage (e.g. Biochar), Field Weathering (I.e. Enhanced Rock Weathering) and Direct Air Capture. Work with us to generate your own Carbon Credits and head to your Net Zero goals." },
      { title2: "Invest",img: "https://iili.io/KgfuSxS.png",imgtext:'Carbon Credits', text: "ClimeScore actively identifies in-development projects that desire to make an impact by building a more sustainable planet. Support projects from across the world that are engaged in Carbon Dioxide Removal by investing in Offtake agreements." },
      { title2: "Purchase",img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop",imgtext:'Carbon Credits', text: "ClimeScore sifts through hundreds of Carbon Credit projects across various registries to rate and curate the most genuine and impactfuln ones. Simplify your offsetting journey by selecting credits that have been meticulously handpicked by our team of impact assessors." },
    ],
  },
  {
    title: "Explore Sustainable Marketplace",
    title2: "Offset",
    contents: [
      { title2: "Decarbonise Supply Chain",img: "https://iili.io/KgfuZbV.png",imgtext:'Sustainable Marketplace', text: "Scope 3 emissions from your supply chain are actually the largest contributor to overall emissions. Cut undesirable emissions by shifting to certified sustainable vendors and decarbonise your iupstream and downstream emissions." },
      { title2: "Reduce Costs",img: "https://iili.io/KgfRcjp.png",imgtext:'Sustainable Marketplace', text: "Moving to sustainable vendors need not be expensive. In facts, it’s quite the contrary. ClimeScore aggregates suppliers for products and services that measure, declare, reduce and offset their carbon emissions - so that your eventual carbon footprint is also minimised." },
      {title2: "Support Green Businesses",img: "https://iili.io/KgfuUW7.png",imgtext:'Sustainable Marketplace', text: "Businesses promoting and adopting sustainability need validation. Encourage entrepreneurs and risk takers who take the path less polluting to be more climate positive - you and your customers, in turn will be supporting a healthier way of doing business." },
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
    title:"Biochar",
    label: "LITRES OF BIOCHAR PRODUCED", 
    desc: "Our Biochar Project in Bandhavgarh works with 100’s of farmers to create over 1 ton of biochar everyday, while positively impacting a fragile forest ecosystem.",
    image: "https://iili.io/KgfM4je.png"
  },
  { 
    value: 120, 
    title:"Field Weathering",
    label: "HECTARES", 
    desc: "Our Field Weathering Projects are being deployed at 3 unique locations in India over a surface area of over 120 hectares.",
    image: "https://iili.io/KgfREGt.png"
  },
  { 
    value: 40000, 
    label: "TREES", 
    title:"Direction Capture",
    desc: "Our Tree C-Sink is creating agro-forestry by planting over 40,000 trees of various native species.",
    image: "https://iili.io/KgfR1nI.png"
  },
  { 
    value: 250, 
    label: "GMS/HOUR", 
     title:"Direction Capture",

    desc: "The capacity of the Direct Air Capture consumer machine prototyped by us.",
    image: "https://iili.io/Kgf5wUg.png"
  },
  { 
    value: 300000, 
    label: "TONS OF CO2", 
     title:"Direction Capture",

    desc: "Emissions accurately measured & reported as per GRJ standards on our platform – ClimeScore",
    image: "https://iili.io/KgfMUy7.png"
  },
];


const Partners = [
  // CUSTOMERS
  {
    title: "Customers",
    label: "Varun Hooja - Founder & Partner, Machan Resorts LLP",
    desc: "“NettZero is a company founded with a shared vision to create a positive impact on the planet, one step at a time. Their commitment to emissions measurement and reporting is both rigorous and purpose-driven, making sustainability actionable for organizations of all sizes. The effort they put into their work is truly commendable, and I would strongly recommend their services to any company serious about reducing its environmental footprint.”",
    image: "https://iili.io/KgfM7hg.png",
  },
  {
    title: "Customers",
    label: "Shobha Rudra - Founder, RARE India",
    desc: "“ClimeScore has been a great partner in measuring emissions of Bridges by RARE.”",
    image: "https://iili.io/KgfM7hg.png",
  },
  {
    title: "Customers",
    label: "Hashim Tyebji - Director, Kafila & Tiger Conservationist",
    desc: "“It takes a huge amount of single-minded commitment and optimism to do the pioneering work you are doing.”",
    image: "https://iili.io/KgfM7hg.png",
  },

  // PARTNERS
  {
    title: "Partners",
    label: "Carbon Standards International",
    desc: "Working with global organizations to ensure carbon projects follow internationally recognized standards.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
  },
  {
    title: "Partners",
    label: "Circonomy",
    desc: "Supporting circular economy initiatives that reduce waste and improve sustainability.",
    image: "https://images.unsplash.com/photo-1532635241-17e820acc59f",
  },
  {
    title: "Partners",
    label: "RARE India",
    desc: "A long-term sustainability partner promoting responsible tourism.",
    image: "https://images.unsplash.com/photo-1534854638093-bada1813ca19",
  },
  {
    title: "Partners",
    label: "ISN (Indian Sustainability Network)",
    desc: "Collaborating to develop India-specific sustainability benchmarks.",
    image: "https://www.udgamschool.com/wp-content/uploads/2023/05/dummy-image-grey-e1398449111870.jpg",
  },

  // STANDARDS
  {
    title: "Standards",
    label: "GHG Protocol",
    desc: "Provides globally accepted tools to measure and manage GHG emissions.",
    image: "https://www.udgamschool.com/wp-content/uploads/2023/05/dummy-image-grey-e1398449111870.jpg",
  },
  {
    title: "Standards",
    label: "PAS 2060",
    desc: "International standard for demonstrating carbon neutrality.",
    image: "https://www.udgamschool.com/wp-content/uploads/2023/05/dummy-image-grey-e1398449111870.jpg",
  },
  {
    title: "Standards",
    label: "GRI – Global Reporting Initiative",
    desc: "Used for sustainability reporting ensuring transparency and accountability.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
  },
  {
    title: "Standards",
    label: "CSI – C-Sink Methodologies",
    desc: "Defines robust, science-based approaches for verifying carbon sink projects.",
    image: "https://images.unsplash.com/photo-1542744095-291d1f67b221",
  },
  {
    title: "Standards",
    label: "ISO 14068",
    desc: "A new ISO framework for climate change management and carbon neutrality.",
    image: "https://www.udgamschool.com/wp-content/uploads/2023/05/dummy-image-grey-e1398449111870.jpg",
  },
];




const testimonials = [
  {
    img: "https://www.shutterstock.com/image-photo/business-team-meeting-600nw-107480708.jpg", 
    name: "Varun Hooja",
    designation: "Founder & Partner, Machan Resorts LLP",
    text: `“NettZero is a company founded with a shared vision to create a positive impact on the planet, one step at a time. Their commitment to emissions measurement and reporting is both rigorous and purpose-driven, making sustainability actionable for organizations of all sizes. The effort they put into their work is truly commendable, and I would strongly recommend their services to any company serious about reducing its environmental footprint.”`
  },
  {
    img: "https://parsadi.com/wp-content/uploads/2022/05/Business.jpg", 
    name: "Ananya Mehta",
    designation: "CEO, GreenWatt Energy",
    text: `“Working with NettZero transformed our approach to sustainability. Their insights on carbon accounting and project implementation were invaluable.”`
  },
  {
    img: "https://www.marketing91.com/wp-content/uploads/2021/02/Business.jpg", 
    name: "Rohit Sharma",
    designation: "Director, EcoBuild Solutions",
    text: `“The team’s expertise and attention to detail make NettZero a trusted partner for any organization aiming to achieve real climate impact.”`
  },
  {
    img: "https://www.marketing91.com/wp-content/uploads/2021/02/Business.jpg", 
    name: "Priya Desai",
    designation: "Sustainability Head, AgroPure Pvt Ltd",
    text: `“NettZero helped us measure and offset emissions across our operations. The process was smooth and the results were transparent.”`
  },
  {
    img: "https://www.marketing91.com/wp-content/uploads/2021/02/Business.jpg", 
    name: "Aditya Rao",
    designation: "Managing Partner, EnviroEdge Consulting",
    text: `“Their technology-driven approach brings both accuracy and accountability to sustainability efforts. Highly recommended!”`
  },
  {
    img: "https://www.winsavvy.com/wp-content/uploads/2024/06/60255e7341de62c988dd08aa_DigitalAdvertising.jpg",
    name: "Sneha Kapoor",
    designation: "Founder, Urban Roots Foundation",
    text: `“The NettZero team truly understands the balance between business goals and environmental responsibility.”`
  }
];


const mapPoints = [
  {
    Locality: "Nubra Vally",
    District: "Laddakh (UH)",
    State: "NA",
    desc: "ClimeScore deployment to create Ladakh`s first carbon Neutral Resort.",
    x: "50%", // x position of point on map
    y: "10%",
  },
  {
    Locality: "Phagu",
    District: "Sirmaur",
    State: "Himachal Pradesh",
    desc: "Biochar Project with installed capacity of 2,000 tons per year.",
    x: "45%",
    y: "20%",
  },
  {
    Locality: "Sukki",
    District: "Uttarkashi",
    State: "Uttarakhand",
    desc: "Biochar Project with installed capacity of 2,000 tons per year.",
    x: "55%",
    y: "24%",
  },
  {
    Locality: "Mandawa",
    District: "NA",
    State: "Rajastan",
    desc: "ClimeScore deployment to create Rajastan`s first Carbon Neutral Resort.",
    x: "35%",
    y: "35%",
  },
  {
    Locality: "Bandhavgarh",
    District: "Umaria",
    State: "Madhya Pradesh",
    desc: "Biochar Project with an inastalled capacity of 2,000 tons per year and over 1.5 lakh litres of biochar already produced.",
    x: "48%",
    y: "60%",
  },
  {
    Locality: "Sawantwadi",
    District: "NA",
    State: "Maharashtra",
    desc: "Biochar Project with installed capacity of 2,000 tons per year",
    x: "42%",
    y: "65%",
  },
  {
    Locality: "Lonavla",
    District: "Pune",
    State: "Maharashtra",
    desc: "ClimeScore deployment to create India`s first Carbon Neural resort chain.",
    x: "40%",
    y: "66%",
  },
  {
    Locality: "Mumbai",
    District: "Mumbai",
    State: "Maharashtra",
    desc: "Construction Conglamerate adopting Carbon Removalmaterials for Construction C-Sinks.",
    x: "48%",
    y: "72%",
  },
  {
    Locality: "Coorg",
    District: "Kodagu",
    State: "Karnataka",
    desc: "VlimeScore deployment and Biochar Project with installed capacity 2,000 tons per year.",
    x: "34%",
    y: "80%",
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

    const [menuOpen, setMenuOpen] = useState(false);

  // section2 refs & state
  const containerRef = useRef(null); // section2 trigger
  const stickyRef = useRef(null); // section2 sticky box
  const [activeTitleIndex, setActiveTitleIndex] = useState(0);

  // section3 refs & state
  const countersContainerRef = useRef(null); // section3 trigger element
  const countersStickyRef = useRef(null); // inner sticky box for counters
  const [activeCounterIndex, setActiveCounterIndex] = useState(0);



  const partnersContainerRef = useRef(null);
const partnersStickyRef = useRef(null);
const [activePartnersIndex, setActivePartnersIndex] = useState(0);




const mapContainerRef = useRef(null);
const mapStickyRef = useRef(null);
const mapPointRef = useRef(null);
const [activeMapIndex, setActiveMapIndex] = useState(0);



  // Div1 carousel
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setCurrent((p) => (p + 1) % images.length), 10000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrent((p) => (p + 1) % images.length);
  const prevSlide = () => setCurrent((p) => (p - 1 + images.length) % images.length);

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
  gsap.killTweensOf(sectionSteps);
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
  id: "section3Pin",  // ✅ add this line
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


  useEffect(() => {
  const partnerSteps = gsap.utils.toArray(".partner-step");
  if (!partnerSteps.length) return;

  gsap.set(partnerSteps, { autoAlpha: 0 });
  gsap.set(partnerSteps[0], { autoAlpha: 1 });

  const measureAndSet = () => {
    let maxH = 0;
    partnerSteps.forEach((el) => (maxH = Math.max(maxH, el.offsetHeight)));
    if (partnersStickyRef.current)
      partnersStickyRef.current.style.height = `${maxH}px`;
  };

  setTimeout(measureAndSet, 80);
  window.addEventListener("resize", measureAndSet);

  const stepTriggers = partnerSteps.map((step, i) =>
    ScrollTrigger.create({
      trigger: partnersContainerRef.current,
      start: () => `top+=${i * window.innerHeight} top`,
      end: () => `+=${window.innerHeight}`,
      onEnter: () => {
        gsap.to(partnerSteps, { autoAlpha: 0, duration: 0.45 });
        gsap.to(step, { autoAlpha: 1, duration: 0.45 });
        setActivePartnersIndex(i);
      },
      onEnterBack: () => {
        gsap.to(partnerSteps, { autoAlpha: 0, duration: 0.45 });
        gsap.to(step, { autoAlpha: 1, duration: 0.45 });
        setActivePartnersIndex(i);
      },
    })
  );

  const pinTrigger = ScrollTrigger.create({
    id: "section4Pin",
    trigger: partnersContainerRef.current,
    pin: true,
    start: "top top",
    end: `+=${partnerSteps.length * window.innerHeight}`,
    scrub: false,
  });

  return () => {
    window.removeEventListener("resize", measureAndSet);
    stepTriggers.forEach((t) => t.kill());
    pinTrigger.kill();
  };
}, []);



useEffect(() => {
  if (!mapPoints.length) return;

  const total = mapPoints.length;
  const mapPoint = mapPointRef.current;

  gsap.set(mapPoint, {
    xPercent: -50,
    yPercent: -50,
    left: mapPoints[0].x,
    top: mapPoints[0].y,
  });

  const triggers = mapPoints.map((point, i) =>
    ScrollTrigger.create({
      trigger: mapContainerRef.current,
      start: () => `top+=${i * window.innerHeight} top`,
      end: () => `+=${window.innerHeight}`,
      onEnter: () => {
        gsap.to(mapPoint, {
          left: point.x,
          top: point.y,
          duration: 1,
          ease: "power2.inOut",
        });
        setActiveMapIndex(i);
      },
      onEnterBack: () => {
        gsap.to(mapPoint, {
          left: point.x,
          top: point.y,
          duration: 1,
          ease: "power2.inOut",
        });
        setActiveMapIndex(i);
      },
    })
  );

  const pinTrigger = ScrollTrigger.create({
    id: "sectionMapPin",
    trigger: mapContainerRef.current,
    pin: true,
    start: "top top",
    end: `+=${total * window.innerHeight}`,
    scrub: false,
  });

  return () => {
    triggers.forEach((t) => t.kill());
    pinTrigger.kill();
  };
}, []);


// Smoothly scroll to the specific step within Section 2 (3x slower)
const handleTitleClick = (index) => {
  const section = containerRef.current;
  if (!section) return;

  const stepsPerSlide = steps.length / slides.length;
  const lastStepIndex = (index + 1) * stepsPerSlide - 1;
  const totalSteps = document.querySelectorAll(".step").length;

  const clampedStepIndex = Math.min(lastStepIndex, totalSteps - 1);
  const targetY = section.offsetTop + clampedStepIndex * window.innerHeight;

  gsap.to(window, {
    scrollTo: { y: targetY, autoKill: true },
    duration: 2.5,
    ease: "power2.inOut",
  });

  setActiveTitleIndex(index);
};


const handleTitleClick2 = (index) => {
  const counterSteps = gsap.utils.toArray(".counter-step");
  if (!counterSteps.length) return;

  const clampedIndex = Math.min(index, counterSteps.length - 1);
  const trigger = ScrollTrigger.getById("section3Pin");

  if (trigger) {
    // Calculate scroll distance relative to the pinned section
    const targetY =
      trigger.start + clampedIndex * window.innerHeight + 100;

    gsap.to(window, {
      scrollTo: { y: targetY, autoKill: true },
      duration: 2,
      ease: "power2.inOut",
    });
  }

  setActiveCounterIndex(clampedIndex);
};



const handlePartnersCategoryClick = (category) => {
  const partnerSteps = gsap.utils.toArray(".partner-step");
  if (!partnerSteps.length) return;

  // Find first item index matching that title
  const targetIndex = Partners.findIndex((p) => p.title === category);
  if (targetIndex === -1) return;

  const trigger = ScrollTrigger.getById("section4Pin");
  if (trigger) {
    const targetY = trigger.start + targetIndex * window.innerHeight;
    gsap.to(window, {
      scrollTo: { y: targetY, autoKill: true },
      duration: 1.5,
      ease: "power2.inOut",
    });
  }
};





  return (
    <div className="wrapper">
     <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src="/ClimeScore.png" alt="Climescore Logo" />
        </Link>
        <span style={{ fontSize: "12px", marginTop: "16px" }}>By NettZero</span>
      </div>

      {/* Hamburger Button */}
      <div
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Nav Links */}
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li><Link to="/client/login">Measure Carbon Emission</Link></li>
        <li><Link to="/marketplacehome">Carbon Credits</Link></li>

        <li className="dropdown">
          <span>Our Scope ▾</span>
          <ul className="dropdown-menu">
            <li><Link to="/scope/clime">Clime Score</Link></li>
            <li><Link to="/scope/credits">Carbon Credits</Link></li>
            <li><Link to="/scope/plastic">Plastic Credits</Link></li>
            <li><Link to="/scope/climate">Climate Literacy</Link></li>
          </ul>
        </li>

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
            {/* <button className="overlay-btn" onClick={handleButtonClick}>{images[current].button}</button> */}
            <h3 className="overlay-dec">{images[current].dec}</h3>
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
    <button
      key={idx}
      className={`title-btn ${activeTitleIndex === idx ? "active" : ""}`}
      onClick={() => handleTitleClick(idx)}
    >
      {slide.title}
    </button>
  ))}
          </div>

        {steps.map((s, i) => (
  <div key={i} className="step">
    <div className="step-image-wrapper">
      <img src={s.img} alt={s.text} />
      <span className="step-image-text">{s.imgtext}</span>
    </div>

    <div className="conbox">
      <h2>{s.title2}</h2>
      <hr />
      <p>{s.text}</p>
    </div>
    <div className="greybox"></div>
  </div>
))}
        </div>
      </section>

      {/* Div 3 — counters: pinned, step-by-step, image + running number + text */}
      <section className="section section3">
        <div className="counters-container" ref={countersContainerRef}>
          <div className="sticky-box counters-sticky" ref={countersStickyRef}>
            <h1 className="sticky-title2">ClimeScore in Numbers</h1>
<div className="title-buttons2">
  {countersData.slice(0, 3).map((item, idx) => (
    <button
      key={idx}
      className={`title-btn ${activeCounterIndex === idx ? "active" : ""}`}
      onClick={() => handleTitleClick2(idx)}
    >
      {item.title}
    </button>
  ))}
</div>


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
                <div className="greybox2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>






    <section className="section section4">
  <div className="partners-container" ref={partnersContainerRef}>
    <div className="sticky-box partners-sticky" ref={partnersStickyRef}>
      <h1 className="sticky-title3">ClimeScore Partners</h1>

      {/* ✅ Only 3 main buttons */}
      <div className="title-buttons3">
        {["Customers", "Partners", "Standards"].map((category, idx) => (
          <button
            key={idx}
            className={`title-btn ${activePartnersIndex === idx ? "active" : ""}`}
            onClick={() => handlePartnersCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {Partners.map((item, i) => (
        <div key={i} className="partner-step">
          <div className="partner-left">
            <div className="partner-image-box">
              <img src={item.image} alt={item.label} />
            </div>
          </div>
          <div className="partner-right">
            <h2>{item.label}</h2>
            <hr />
            <p>{item.desc}</p>
          </div>
            <div className="greybox3"></div>
        </div>
      ))}
    </div>
  </div>
</section>

{/* <section className="section section-testimonials">
  <h1 className="testimonial-title">What Our Clients Say</h1>
  
  <div className="testimonial-carousel">
    <img
      src={testimonials[current].img}
      alt={testimonials[current].name}
      className="carousel-image2"
    />

    <div className="overlay-content">
      <h2 className="customer-name">{testimonials[current].name}</h2>
      <h3 className="customer-designation">{testimonials[current].designation}</h3>
      <p className="testimonial-text">{testimonials[current].text}</p>
    </div>

    <button onClick={prevSlide} className="nav-button prev">◀</button>
    <button onClick={nextSlide} className="nav-button next">▶</button>
  </div>
</section> */}


      {/* rest of page content */}
      {/* <div className="hero-content">
        <h1 className="sticky-title">The ClimeScore Footprint</h1>
        <div className="hero-image-container">
          <img src="http://nettzero.world/wp-content/uploads/2025/03/Locality-Name-Nubra-Valley-State-Laddakh-UT.gif" alt="Nubra Valley" className="hero-image" />
        </div>
      </div> */}

  <section className="section section-map">
  <div className="map-container" ref={mapContainerRef}>
    <div className="sticky-box map-sticky" ref={mapStickyRef}>
      <h1 className="sticky-title4">The ClimeScore Footprint</h1>

      <div className="map-box">
        {/* Map background */}
        <div className="map-image-wrapper">
          <img
            // src="https://maps-india-in.com/img/1200/3d-map-of-india.jpg"
            src="https://static.vecteezy.com/system/resources/previews/025/842/873/non_2x/flat-simple-india-map-free-vector.jpg"

            
            alt="India Map"
            className="india-map"
          />
          {/* Moving point */}
          <div className="map-point" ref={mapPointRef}></div>
        </div>

        {/* Right side info box */}
        <div className="map-info-box">
          <h2>{mapPoints[activeMapIndex].Locality}</h2>
          <h2>{mapPoints[activeMapIndex].District}</h2>
          <h2>{mapPoints[activeMapIndex].State}</h2>
          <hr />
          <p>{mapPoints[activeMapIndex].desc}</p>
        </div>
      </div>
    </div>
  </div>
</section>







      <h1 className="sticky-titlediv">ClimeScore For You</h1>
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
