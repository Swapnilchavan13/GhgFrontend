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
  {img:'https://iili.io/KLQzN8x.png', src: "https://iili.io/KgfG7f4.png", text: "ClimeScore helps you measure, reduce and analyze your carbon emissions", dec: "Our AI-driven platform has accurately measured over 300,000 tons of CO₂" },
  {img:'https://iili.io/KLQzi8v.png',src: "https://iili.io/KgfRG6X.png", text: "ClimeScore develops valuable, high-integrity carbon credits", dec: "We do scalable CDR through Biochar, Enhanced Rock Weathering, Tree Plantation and DAC projects — creating carbon sinks that you can be part of." },
  {img:'https://iili.io/KLQzwaj.png',src: "https://iili.io/Kr1giR1.png", text: "ClimeScore curates high-integrity carbon credits based on transparency, impact and methodology", dec: "Our Carbon Credit Marketplace hosts meticulously selected CDR projects to ensure your offsetting is robust, hassle-free and cost-effective" },
  {img:'https://iili.io/KLQzj3b.png',src: "https://iili.io/KgfGRsf.png", text: "A marketplace of sustainable goods and services that verify their Carbon Emissions", dec: "Decarbonise your supply chain and reduce your Scope 3 emissions" },
  {img:'https://iili.io/KLQzkuV.png',src: "https://iili.io/KgfGRsf.png", text: "ClimeScore delivers customized, implementation-oriented training related to sustainability and climate change and carbon credits", dec: "Our precise and effective modules are delivered by experts with thousands of hours in corporate education" },
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
    label: "Liters Of Biochar Produced", 
    desc: "Our Biochar Project in Bandhavgarh works with 100’s of farmers to create over 1 ton of biochar everyday, while positively impacting a fragile forest ecosystem.",
    image: "https://iili.io/KgfM4je.png"
  },
  { 
    value: 120, 
    title:"Field Weathering",
    label: "Hectares", 
    desc: "Our Field Weathering Projects are being deployed at 3 unique locations in India over a surface area of over 120 hectares.",
    image: "https://iili.io/KgfREGt.png"
  },
  { 
    value: 40000, 
    label: "Three", 
    title:"Direction Capture",
    desc: "Our Tree C-Sink is creating agro-forestry by planting over 40,000 trees of various native species.",
    image: "https://iili.io/KgfR1nI.png"
  },
  { 
    value: 250, 
    label: "GMS/Hour", 
     title:"Direction Capture",

    desc: "The capacity of the Direct Air Capture consumer machine prototyped by us.",
    image: "https://iili.io/Kgf5wUg.png"
  },
  { 
    value: 300000, 
    label: "Tons Of Co2", 
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
    image: "https://iili.io/KQOD5Kl.jpg",
  },
  {
    title: "Customers",
    label: "Shobha Rudra - Founder, RARE India",
    desc: "“ClimeScore has been a great partner in measuring emissions of Bridges by RARE.”",
    image: "https://iili.io/KQOD7l2.jpg",
  },
  {
    title: "Customers",
    label: "Hashim Tyebji - Director, Kafila and renowned Tiger Conservationist",
    desc: "“It takes a huge amount of single-minded commitment and optimism to do the pioneering work you are doing.”",
    image: "https://iili.io/KrXt6vt.jpg",
  },

  // PARTNERS
  {
    title: "Partners",
    label: "Carbon Standards International",
    desc: "ClimeScore by NettZero is a member of Carbon Standards International since 2023, making it one of the earliest organizations from India to be aligned with the vision of enabling Carbon Dioxide Removal through widespread adoption. CSI is one of the most respected and leading registries for CDR in the world, with a focus on fundamental methodologies that create robust, transparent and impactful Carbon Sinks. ",
    image: "https://iili.io/KrXtLjs.jpg",
  },
  {
    title: "Partners",
    label: "Circonomy",
    desc: "ClimeScore by NettZero partners with Circonomy for their reliable, globally renowned SOP’s and dMRV tools, since 2023. Through this partnership, we will have created over 500,000 litres of biochar in 2025.",
    image: "https://iili.io/KQeFxnI.jpg",
  },
  {
    title: "Partners",
    label: "RARE India",
    desc: "RARE India is a community of owner-run boutique hotels, heritage palaces, wildlife lodges, homestays and retreats across the Indian subcontinentRARE India is a community of owner-run boutique hotels, heritage palaces, wildlife lodges, homestays and retreats across the Indian subcontinent ClimeScore by NettZero has been partnering with Rare since 2023 to enable their member hotels to become Carbon Neutral and also ensuring that RARE’s annual event, BRIDGES, is Carbon Neutral across Scope 1, 2 and 3.",
    image: "https://iili.io/KrXuvIe.jpg",
  },
  {
    title: "Partners",
    label: "ISN (Indian Sustainability Network)",
    desc: "ClimeScore by NettZero drives the engine behind Indian School of Nature’s sustainability portal. As technology developers of the platform and the Carbon managers for its network, we power the members of ISN who want to migrate onto the path of sustainability. ISN is unique and progressive organization founded by doyens in sustainability and conservation, including Mr. Hashim Tyebji and Mr. Ram Pratap Singh. ",
    image: "https://iili.io/KrXu8hu.jpg",
  },

  // STANDARDS
  {
    title: "Standards",
    label: "GHG Protocol",
    desc: "Provides globally accepted tools to measure and manage GHG emissions.",
    image: "https://iili.io/KrXhabs.jpg",
  },
  {
    title: "Standards",
    label: "PAS 2060",
    desc: "International standard for demonstrating carbon neutrality.",
    image: "https://iili.io/KrXurEx.jpg",
  },
  {
    title: "Standards",
    label: "GRI – Global Reporting Initiative",
    desc: "Used for sustainability reporting ensuring transparency and accountability.",
    image: "https://iili.io/KrXt4aI.jpg",
  },
  {
    title: "Standards",
    label: "CSI – C-Sink Methodologies",
    desc: "Defines robust, science-based approaches for verifying carbon sink projects.",
    image: "https://iili.io/KrXtr3N.jpg",
  },
  {
    title: "Standards",
    label: "ISO 14068",
    desc: "A new ISO framework for climate change management and carbon neutrality.",
    image: "https://iili.io/KrXtU4p.jpg",
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
     img: "https://cdnbbsr.s3waas.gov.in/s395192c98732387165bf8e396c0f2dad2/uploads/2019/10/2019102917.jpg",
  },
  {
    Locality: "Phagu",
    District: "Sirmaur",
    State: "Himachal Pradesh",
    desc: "Biochar Project with installed capacity of 2,000 tons per year.",
     img: "https://www.thehillgypsy.com/wp-content/uploads/2020/02/cover-image-11.jpg",
  },
  {
    Locality: "Sukki",
    District: "Uttarkashi",
    State: "Uttarakhand",
    desc: "Biochar Project with installed capacity of 2,000 tons per year.",
     img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/b8/55/15/kharsali.jpg",
  },
   {
    Locality: "Rudrapur",
    District: "Pant Nagar",
    State: "Uttarakhand",
    desc: "One of the Nettzero`s Biochar Production installalation",
     img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/VC_Office_building_Pantnagar.JPG/640px-VC_Office_building_Pantnagar.JPG",
  },
  {
    Locality: "Mandawa",
    District: "Shekhawati",
    State: "Rajastan",
    desc: "ClimeScore deployment to create Rajastan`s first Carbon Neutral Resort.",
    img: "https://www.rajasthantourplanner.com/blog/wp-content/uploads/2018/04/mandawa-tour1-1.jpg",
  },
  {
    Locality: "Bandhavgarh",
    District: "Umaria",
    State: "Madhya Pradesh",
    desc: "Biochar Project with an inastalled capacity of 2,000 tons per year and over 1.5 lakh litres of biochar already produced.",
     img: "https://www.bandhavgarh-national-park.com/images/flora-in-bandhavgarh.jpg",
  },
 
  {
    Locality: "Lonavla",
    District: "Pune",
    State: "Maharashtra",
    desc: "ClimeScore deployment to create India`s first Carbon Neural resort chain.",
     img: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Mumbai_Pune_Expressway2.jpg",
  },
  // {
  //   Locality: "Mumbai",
  //   District: "Mumbai",
  //   State: "Maharashtra",
  //   desc: "Construction Conglamerate adopting Carbon Removalmaterials for Construction C-Sinks.",
  //    img: "https://iili.io/KrXt6vt.jpg",
  // },
  {
    Locality: "Coorg",
    District: "Kodagu",
    State: "Karnataka",
    desc: "ClimeScore deployment at Tamara coorg for Scope-1, Scope-2 and Scope-3 for emission management.",
     img: "https://www.easeindiatrip.com/blog/wp-content/uploads/2025/01/Coorg-by-Train-1024x576.jpg",
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


  const [showScroll, setShowScroll] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setShowScroll(window.scrollY > 300);
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);


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



const mapsContainerRef = useRef(null);
const mapsStickyRef = useRef(null);





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


  // Section 4???///

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

  // 🔹 Get all categories in order
  const categories = ["Customers", "Partners", "Standards"];

  // 🔹 Map each category to its index range in the Partners array
  const categoryRanges = categories.map((cat) => {
    const start = Partners.findIndex((p) => p.title === cat);
    const end =
      Partners.findLastIndex?.((p) => p.title === cat) ??
      [...Partners].reverse().findIndex((p) => p.title === cat);
    return { title: cat, start, end: end + 1 };
  });

  const stepTriggers = partnerSteps.map((step, i) =>
    ScrollTrigger.create({
      trigger: partnersContainerRef.current,
      start: () => `top+=${i * window.innerHeight} top`,
      end: () => `+=${window.innerHeight}`,
      onEnter: () => {
        gsap.to(partnerSteps, { autoAlpha: 0, duration: 0.45 });
        gsap.to(step, { autoAlpha: 1, duration: 0.45 });

        // 🔹 Find which category this index belongs to
        const activeCatIndex = categoryRanges.findIndex(
          (r) => i >= r.start && i < r.end
        );
        setActivePartnersIndex(activeCatIndex);
      },
      onEnterBack: () => {
        gsap.to(partnerSteps, { autoAlpha: 0, duration: 0.45 });
        gsap.to(step, { autoAlpha: 1, duration: 0.45 });

        const activeCatIndex = categoryRanges.findIndex(
          (r) => i >= r.start && i < r.end
        );
        setActivePartnersIndex(activeCatIndex);
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


// ???? Section 5??

/* ---------- Section 5 Scroll Setup ---------- */
  useEffect(() => {
    const mapSteps = gsap.utils.toArray(".map-step");
    if (!mapSteps.length) return;
    gsap.set(mapSteps, { autoAlpha: 0 });
    gsap.set(mapSteps[0], { autoAlpha: 1 });

    const stepTriggers = mapSteps.map((step, i) =>
      ScrollTrigger.create({
        trigger: mapsContainerRef.current,
        start: () => `top+=${i * window.innerHeight} top`,
        end: () => `+=${window.innerHeight}`,
        onEnter: () => {
          gsap.to(mapSteps, { autoAlpha: 0, duration: 0.45 });
          gsap.to(step, { autoAlpha: 1, duration: 0.45 });
        },
        onEnterBack: () => {
          gsap.to(mapSteps, { autoAlpha: 0, duration: 0.45 });
          gsap.to(step, { autoAlpha: 1, duration: 0.45 });
        },
      })
    );

    const pinTrigger = ScrollTrigger.create({
      id: "section5Pin",
      trigger: mapsContainerRef.current,
      pin: true,
      start: "top top",
      end: `+=${mapSteps.length * window.innerHeight}`,
      scrub: false,
    });

    return () => {
      stepTriggers.forEach((t) => t.kill());
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
    const targetY = trigger.start + targetIndex * window.innerHeight +100;
    gsap.to(window, {
      scrollTo: { y: targetY, autoKill: true },
      duration: 1.5,
      ease: "power2.inOut",
    });
  }
};



// Scroll smoothly to a specific section by selector or ref
const handleScroll = (target) => {
  let y = 0;
  if (target === "top") {
    y = 0;
  } else if (target?.current) {
    y = target.current.offsetTop;
  } else if (typeof target === "string") {
    const el = document.querySelector(target);
    if (el) y = el.offsetTop;
  }

  gsap.to(window, {
    scrollTo: { y, autoKill: true },
    duration: 1.5,
    ease: "power2.inOut",
  });
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
          <img src={images[current].img} alt="carousel" className="img-image" />

            <h2 className="overlay-text">{images[current].text}</h2>
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
 <div className="section2btn">
  <button onClick={() => handleScroll(".section1")}>Previous Section</button>
  <button onClick={() => handleScroll(".section3")}>Next Section</button>
  <button onClick={() => handleScroll("top")}>Back To Top</button>
</div>
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
            <div className="section3btn">
  <button onClick={() => handleScroll(".section2")}>Previous Section</button>
  <button onClick={() => handleScroll(".section4")}>Next Section</button>
  <button onClick={() => handleScroll("top")}>Back To Top</button>
</div>
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
       <div className="section4btn">
  <button onClick={() => handleScroll(".section3")}>Previous Section</button>
  <button onClick={() => handleScroll(".section5")}>Next Section</button>
  <button onClick={() => handleScroll("top")}>Back To Top</button>
</div>
    </div>
  </div>
  

</section>


 <section className="section section5">
        <div className="maps-container" ref={mapsContainerRef}>
          <div className="sticky-box maps-sticky" ref={mapsStickyRef}>
            <h1 className="sticky-title5">The ClimeScore Footprint</h1>
            {mapPoints.map((point, i) => (
              <div key={i} className="map-step">
                <div className="map-left">
                  <img src={point.img} alt={point.Locality} />
                </div>
                <div className="map-right">
                  <h2>{point.Locality}</h2>
                  <p><b>District:</b> {point.District}</p>
                  <p><b>State:</b> {point.State}</p>
                  <hr />
                  <p className="descpt">{point.desc}</p>
                </div>
                <div className="greybox5"></div>
              </div>
            ))}
              <div className="section5btn">
  <button onClick={() => handleScroll(".section4")}>Previous Section</button>
  <button onClick={() => handleScroll(".sticky-titlediv")}>Next Section</button>
  <button onClick={() => handleScroll("top")}>Back To Top</button>
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
          <button>Get In Touch</button>
        </div>
        <div>
          <img src="https://climatecarbon.com/wp-content/uploads/2023/05/Carbon-Credit.jpg" alt="" />
          <h2>Carbon Credits</h2>
          <p>NettZero works with the industry leaders to provide bonafide & legitimate Carbon Credits. 10 or 10,000, we've got them</p>
          <button>Get In Touch</button>
        </div>
        <div>
          <img src="https://cdn.tapinvest.in/strapi-assets/Credit_Creation_1_8ac29ba9ba.jpg" alt="" />
          <h2>Credit Creation</h2>
          <p>If you have projects that need development and promotion to earn Carbon Credits, we get you listed on top registries​</p>
          <button>Get In Touch</button>
        </div>
        <div>
          <img src="https://i0.wp.com/highschool.latimes.com/wp-content/uploads/2025/07/climate-literacy-image.png?fit=1280%2C720&ssl=1" alt="" />
          <h2>Climate Literacy​</h2>
          <p>If you need to educate & coach your company on the impact of various developments, NettZero Trains delivers​</p>
          <button>Get In Touch</button>
        </div>
        <div>
          <img src="https://static1.squarespace.com/static/650bf3ee96714871f4364ce8/652d0ba2958f231b73106e32/67125d543943cf1dbe41a26a/1752728063907/epr+-+Copy.png?format=1500w" alt="" />
          <h2>EPR & Plastic Credits​</h2>
          <p>We work with brands and Plastic Project developers to create value in terms of credits and social development. ​</p>
          <button>Get In Touch</button>
        </div>
      </div>

      <Footer />
      {/* Scroll to Top Button */}
<button
  className="scroll-to-top"
  onClick={() => {
    gsap.to(window, {
      scrollTo: { y: 0, autoKill: true },
      duration: 1.5,
      ease: "power2.inOut",
    });
  }}
>
  ↑
</button>

    </div>
  );
};
