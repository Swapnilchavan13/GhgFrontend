import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";


import "../styles/3t.css";
import { Link } from "react-router-dom";
import { Footer } from "./Footer";



gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
// gsap.registerPlugin(ScrollTrigger);


/* -- your top carousel images -- */
const images = [
  {img:'https://iili.io/KLQzN8x.png',src: "https://iili.io/KgfG7f4.png", text: "Measure, Reduce & Analyse your Carbon Emissions", dec: "Our AI-driven platform has accurately measured over 300,000 tons of CO₂" },
  {img:'https://iili.io/KLQzi8v.png',src: "https://iili.io/Kr1giR1.png", text: "High integrity Carbon Credits from across the world", dec: "Our Carbon Credit Marketplace features carefully vetted CDR projects for robust, hassle-free and cost-effective offsetting" },
  {img:'https://iili.io/KLQzwaj.png',src: "https://iili.io/KgfRG6X.png", text: "Develop valuable, high integrity Carbon Credits", dec: "We deliver scalable CDR through Biochar, ERW, Tree Plantation and DAC projects—creating carbon sinks you can join" },
  {img:'https://iili.io/KLQzj3b.png',src: "https://iili.io/KZaYnFS.png", text: "A marketplace for verified green vendors and services", dec: "Decarbonise your supply chain and reduce your Scope 3 emissions" },
  {img:'https://iili.io/KLQzkuV.png',src: "https://iili.io/KgfGRsf.png", text: "Tailored Training Programs on Sustainability, Climate Action & Carbon Credits", dec: "Our precise and effective modules are delivered by experts with thousands of hours in corporate education" },
];

/*
https://iili.io/fToWQNp.jpg
https://iili.io/fToWPUJ.jpg
https://iili.io/fToW6la.jpg-
https://iili.io/fToWgiF.jpg-
https://iili.io/fToWbVt.jpg-
https://iili.io/fToWyfn.jpg-
https://iili.io/fToX9ls.jpg-
https://iili.io/fToXHUG.jpg-
https://iili.io/fToXdJf.jpg-
https://iili.io/fToX2R4.jpg-
https://iili.io/fToX3Ol.jpg-
https://iili.io/fToXfxS.jpg
*/ 

const slides = [
  {
    title: "Manage Carbon Emission",
    contents: [
      { title2: "Measure",mob:"https://iili.io/fToWbVt.jpg",img: "https://iili.io/fnREPxS.jpg",imgtext:'Carbon Emissions', text: "ClimeScore’s AI powered emissions measurement helps you track your Carbon Footprint in real time across Scope 1 , Scope 2 and Scope 3. It is robust, globally validated and incredibly simple." },
      { title2: "Report",mob:"https://iili.io/fToXfxS.jpg",img: "https://iili.io/fnREZ0u.jpg", imgtext:'Carbon Emissions',text: "ClimeScore provides you with a simplified, yet reliable framework for your sustainability reporting as per GRI standards. Generate globally valid reports with a few simple clicks and analyse your carbon footprint in real time - across departments, locations, business verticals, vendors and more." },
      { title2: "Offset",mob:"https://iili.io/fToWyfn.jpg",img: "https://iili.io/fnREQfe.jpg", imgtext:'Carbon Emissions',text: "ClimeScore helps you achieve Carbon Neutrality through a structured approach of reduction and offsetting. Once your carbon footprint is accurately measured, take the next step by offsetting your remaining emissions to become Verified Carbon Neutral." }],
  },
  {
    title: "Manage Carbon Credits",
    contents: [
      { title2: "Generate",mob:"https://iili.io/fToWgiF.jpg",img: "https://iili.io/fnRENVt.jpg",img2:"https://iili.io/KLQzN8x.png",imgtext:'Carbon Credits', text: "ClimeGrove is an experienced developer of high integrity and high value credits using Carbon Dioxide Removal pathways such as Biomass Carbon Removal & Storage (e.g. Biochar), Field Weathering (I.e. Enhanced Rock Weathering) and Direct Air Capture. Work with us to generate your own Carbon Credits and head to your Net Zero goals." },
      { title2: "Invest",mob:"https://iili.io/fToWgiF.jpg",img: "https://iili.io/fnREOiX.jpg",img2:"https://iili.io/KLQzN8x.png",imgtext:'Carbon Credits', text: "ClimeFolio actively identifies in-development projects that desire to make an impact by building a more sustainable planet. Support projects from across the world that are engaged in Carbon Dioxide Removal by investing in Offtake agreements." },
      { title2: "Purchase",mob:"https://iili.io/fToX3Ol.jpg",img: "https://iili.io/f5GSMJt.jpg",img2:"https://iili.io/KLQzN8x.png",imgtext:'Carbon Credits', text: "ClimeFolio sifts through hundreds of Carbon Credit projects across various registries to rate and curate the most genuine and impactful ones. Simplify your offsetting journey by selecting credits that have been meticulously handpicked by our team of impact assessors." },
    ],
  },
  {
    title: "Explore Sustainable Marketplace",
    title2: "Offset",
    contents: [
      { title2: "Decarbonise Supply Chain",mob:"https://iili.io/fToWQNp.jpg",img: "https://iili.io/fnRE8UG.jpg",img2:"https://iili.io/KLQzN8x.png",imgtext:'Sustainable Marketplace', text: "Scope 3 emissions from your supply chain are actually the largest contributor to overall emissions. Cut undesirable emissions by shifting to certified sustainable vendors and decarbonise your upstream and downstream emissions." },
      { title2: "Reduce Costs",mob:"https://iili.io/fToXHUG.jpg",img: "https://iili.io/fnREiW7.jpg",img2:"https://iili.io/KLQzN8x.png",imgtext:'Sustainable Marketplace', text: "Moving to sustainable vendors need not be expensive. In facts, it’s quite the contrary. ClimeStore aggregates suppliers for products and services that measure, declare, reduce and offset their carbon emissions - so that your eventual carbon footprint is also minimised." },
      {title2: "Support Green Businesses",mob:"https://iili.io/fToWPUJ.jpg",img: "https://iili.io/fnREkfn.jpg",img2:"https://iili.io/KLQzN8x.png",imgtext:'Sustainable Marketplace', text: "Businesses that promote and adopt sustainability deserve recognition. By supporting entrepreneurs and innovators who choose cleaner, climate-positive pathways, you—and your customers—contribute to a healthier, more responsible way of doing business" },
    ],
  },
  {
    title: "Climate Literacy",
    contents: [
      { title2: "Empower Your Leadership",mob:"https://iili.io/fToX9ls.jpg",img: "https://iili.io/fCRiMDG.jpg", img2:"https://iili.io/KLQzN8x.png",imgtext:'Corporate Training', text: "ClimeSchool brings decades of climate & academic expertise to empower your leadership to understand fundaments, global trends and carbon credit economics that are shaping the world. We build bespoke programs that suit your audience, timings and budgets" },
      { title2: "Equip your Faculty",mob:"https://iili.io/fToX2R4.jpg",img: "https://iili.io/fCRiclI.jpg",img2:"https://iili.io/KLQzN8x.png",imgtext:'Faculty Training', text: "ClimeSchool empowers your faculty and academic staff on the accurate science and global trends in Climate & Sustainability. Teachers & Faculty are the bedrock of tomorrow’s change makers’ outlooks and aptitude - at ClimeSchool, we ensure that they are fully equipped to provide relevant Climate Literacy to students + build impact activities on Campus" },
      { title2: "Upskill your Resume",mob:"https://iili.io/fToXdJf.jpg",img: "https://iili.io/fCRiERn.jpg",img2:"https://iili.io/KLQzN8x.png",imgtext:'Certificate Courses', text: "ClimeSchool provides a range of customised courses for working professionals that impart specific training and skills which enhance your resume for sustainability jobs. From Carbon Credit economics to Biochar creation processes, we’ve got you covered & certified" },

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
    value: 300000, 
    label: "Tons Of Co2", 
     title:"Carbon Emission Measurement",
    desc: "The ClimeScore platform has accurately measured, accounted and verified over 3,00,000 tons of CO2e across different industry types and events. Leverage this expertise for accounting your Scope 1, 2 and 3 emissions.",
    image: "https://iili.io/KgfMUy7.png"
  },
   { 
    value: 20, 
    label: "Trusted by leaders", 
     title:"Carbon Emission Measurement",
    desc: "ClimeScore works with industry leaders who are serious about their sustainability outcomes and emissions measurement. Our platform gives them a robust software - through which they can track and visualise their emissions in real time.",
    image: "https://iili.io/f51LheS.jpg"
  },
  { 
    value: 300000, 
    title:"Carbon dioxide Removal",
    label: "Liters Of Biochar Produced", 
    desc: "ClimeGrove by NettZero has Artisanal Biochar locations in four Indian states and processes hundreds of tons of agricultural waste into biochar. Our production capacity has grown from producing 200kgs per day to over 10,000 kgs of biochar per day in one year. Next year, our target is to process 4,00,00,000 (4 crore kgs) of biomass per harvest season.",
    image: "https://iili.io/f50DQeV.jpg"
  },
    { 
    value: 15000, 
    title:"Carbon dioxide Removal",
    label: "Farmers Positively Impacted", 
    desc: "ClimeGrove has given over 15,000 farmers additional income by helping them monetize their rice straw residue. An agricultural waste that was being burnt and causing polllution - is now being converted to biochar and creating additional resources.",
    image: "https://iili.io/f5EKKG4.jpg"
  },
    { 
    value: 2000000, 
    title:"Carbon dioxide Removal",
    label: "Tons of Agricultural Waste", 
    desc: "ClimeGrove is currently processing over 2 million kilograms of agricultural waste and converting it into soil enhancing fertiliser that will be spread over 500 acres of Indian agricultural land.",
    image: "https://iili.io/f51ybef.jpg"
  },
  { 
    value: 120, 
    title:"Carbon dioxide Removal",
    label: "Hectares", 
    desc: "ClimeGrove is actively developing its Enhanced Rock Weathering capabilities and will be deploying basalt based Carbon Sequestration at 3 sites in India that cover over 120 hectares.",
    image: "https://iili.io/fn5z1CQ.jpg"
  },
  { 
    value: 40000, 
    label: "Tress C-Sink", 
    title:"Carbon dioxide Removal",
    desc: "ClimeGrove manages a Tree C-Sink with over 40,000 tress planted for agroforestry in 2025. The C-Sink is on the slopes of the pristine Himalayas and provides an additional framework for Carbon Dioxide Removal",
    image: "https://iili.io/KgfR1nI.png"
  }
];






/*
https://iili.io/fTzAcU7.jpg
https://iili.io/fTzAYf2.jpg
https://iili.io/fTzAalS.jpg-
https://iili.io/fTzA5il.jpg-
https://iili.io/fTzA0J9.jpg-
https://iili.io/fTzAEOu.jpg-
https://iili.io/fTzA1Re.jpg-
https://iili.io/fTzAGDb.jpg-
https://iili.io/fTzAXiQ.jpg-
https://iili.io/fTzAWWx.jpg
https://iili.io/fTzAjfV.jpg

*/
const Partners = [
  // CUSTOMERS
  {
    title: "Customers",
    label: "Varun Hooja - Founder & Partner, Machan Resorts LLP",
    desc: "“NettZero is a company founded with a shared vision to create a positive impact on the planet, one step at a time. Their commitment to emissions measurement and reporting is both rigorous and purpose-driven, making sustainability actionable for organizations of all sizes. The effort they put into their work is truly commendable, and I would strongly recommend their services to any company serious about reducing its environmental footprint.”",
    image: "https://iili.io/KytYqhX.jpg",
    mob:'https://iili.io/fTzAYf2.jpg'
  },
  {
    title: "Customers",
    label: "Shobha Rudra - Founder, RARE India",
    desc: "“ClimeScore has been a great partner in measuring emissions of Bridges by RARE.”",
    image: "https://iili.io/KQOD7l2.jpg",
    mob:"https://iili.io/fTzAcU7.jpg"
  },
  {
    title: "Customers",
    label: "Hashim Tyebji - Director, Kafila and renowned Tiger Conservationist",
    desc: "“It takes a huge amount of single-minded commitment and optimism to do the pioneering work you are doing.”",
    image: "https://iili.io/KytYfIt.jpg",
    mob:'https://iili.io/fTzAalS.jpg'
  },

  // PARTNERS
  {
    title: "Partners",
    label: "Carbon Standards International",
    desc: "ClimeGrove by NettZero is a member of Carbon Standards International since 2023, making it one of the earliest organizations from India to be aligned with the vision of enabling Carbon Dioxide Removal through widespread adoption. CSI is one of the most respected and leading registries for CDR in the world, with a focus on fundamental methodologies that create robust, transparent and impactful Carbon Sinks. ",
    image: "https://iili.io/KrXtLjs.jpg",
    mob:'https://iili.io/fTzA1Re.jpg'
  },
  {
    title: "Partners",
    label: "Circonomy",
    desc: "ClimeGrove by NettZero partners with Circonomy for their reliable, globally renowned SOP’s and dMRV tools, since 2023. Through this partnership, we will have created over 500,000 litres of biochar in 2025.",
    image: "https://iili.io/KQeFxnI.jpg",
    mob:'https://iili.io/fTzAjfV.jpg'
  },
  {
    title: "Partners",
    label: "RARE India",
    desc: "RARE India is a community of owner-run boutique hotels, heritage palaces, wildlife lodges, homestays and retreats across the Indian subcontinentRARE India is a community of owner-run boutique hotels, heritage palaces, wildlife lodges, homestays and retreats across the Indian subcontinent ClimeScore by NettZero has been partnering with Rare since 2023 to enable their member hotels to become Carbon Neutral and also ensuring that RARE’s annual event, BRIDGES, is Carbon Neutral across Scope 1, 2 and 3.",
    image: "https://iili.io/KrXuvIe.jpg",
    mob:'https://iili.io/fTzwHJe.jpg'
  },
  {
    title: "Partners",
    label: "ISN (Indian Sustainability Network)",
    desc: "ClimeScore by NettZero drives the engine behind Indian School of Nature’s sustainability portal. As technology developers of the platform and the Carbon managers for its network, we power the members of ISN who want to migrate onto the path of sustainability. ISN is unique and progressive organization founded by doyens in sustainability and conservation, including Mr. Hashim Tyebji and Mr. Ram Pratap Singh. ",
    image: "https://iili.io/KrXu8hu.jpg",
    mob:'https://iili.io/fTzA5il.jpg'
  },

  // STANDARDS
  {
    title: "Standards",
    label: "GHG Protocol",
    desc: "ClimeScore makes your emissions measurement and reporting world-class by applying coefficients and processes from the GHG Protocol. The GHG Protocol — developed by the World Resources Institute (WRI) and the World Business Council for Sustainable Development (WBCSD) — is the leading global standard for measuring and managing greenhouse gas emissions, used by companies and governments to understand, quantify, and reduce their climate impact.",
    image: "https://iili.io/KrXhabs.jpg",
    mob:'https://iili.io/fTzAXiQ.jpg'
  },
  {
    title: "Standards",
    label: "PAS 2060",
    desc: "PAS 2060 is a global standard from BSI that defines how organizations can demonstrate carbon neutrality through measuring emissions, reducing them, offsetting what remains, and publicly verifying the results. ClimeScore helps customers follow these steps thoroughly, ensuring their carbon-neutral claims meet top international standards.",
    image: "https://iili.io/KrXurEx.jpg",
    mob:'https://iili.io/fTzAEOu.jpg'
  },
  {
    title: "Standards",
    label: "GRI – Global Reporting Initiative",
    desc: "GRI is THE gold standard on which disclosures and reporting is done for sustainability. ClimeScore creates your reports for you to meet the frameworks prescribed within these standards, so that no matter who reads it - they know your processes and data declarations are robust. ",
    image: "https://iili.io/KrXt4aI.jpg",
    mob:'https://iili.io/fTzAWWx.jpg'
  },
  {
    title: "Standards",
    label: "CSI – C-Sink Methodologies",
    desc: "Carbon Standards International is a reputed and respected standard for Carbon Dioxide Removal methodologies. ClimeGrove’s CD-R pathways for artisanal biochar are registered with CSI to ensure the highest levels of compliance, credibility and integrity for the biochar based Carbon Credits that we generate. ",
    image: "https://iili.io/KrXtr3N.jpg",
    mob:'https://iili.io/fTzA0J9.jpg'
  },
  {
    title: "Standards",
    label: "ISO 14068",
    desc: "ClimeScore uses the stringent guidelines and frameworks stipulated within the ISO14068 standard, to ensure that your journey towards Carbon Neutrality is bonafide and accepted by your stakeholders",
    image: "https://iili.io/KrXtU4p.jpg",
    mob:'https://iili.io/fTzAGDb.jpg'
  },
];




const mapPoints = [
  {
    Locality: "Nubra Valley",
    District: "Laddakh (UH)",
    State: "Stone Hedge",
    desc: "ClimeScore creates Ladakh’s first Carbon Neutral resort to support sustainability in a fragile ecosystem.",
     img: "https://iili.io/fE22MFf.jpg",
  },
  {
    Locality: "Phagu",
    District: "Sinnaur",
    State: "Agroforestry & Biochar",
    desc: "ClimeGrove by NettZero has a Agro-forestry waste based biochar facility here, which makes high quality biochar that is rich in Carbon Content. This project ensures that the pristine slopes of the Himalayas are not further polluted, through the practice of burning agro-forestry waste. The project aims to create 2,000 high-integrity Carbon Credits this year.",
     img: "https://iili.io/fEgJSz7.jpg",
  },

   {
    Locality: "Puranpur",
    District: "Pilibhit",
    State: "Uttar Pradesh",
    desc: "ClimeGrove by NettZero is working with over 2,000 farmers to prevent the burning of rice straw that releases enormous amounts of methane and CO2 in the atmosphere. The project provides straw cropping facilities to under equipped farmers.",
     img: "https://iili.io/fEgzTYP.jpg",
  },
  {
    Locality: "Mandawa",
    District: "Shekhawati",
    State: "ClimeScore Creates Rajasthan’s first Carbon Neutral Resort",
    desc: "ClimeScore by NettZero has worked with the Legacy Mandawa for four years to ensure it is a sustainable property in the midst of a parched desert. We provide them with accurate measurements across all scopes - along with reduction processes and purchase of genuine offsets to create a carbon neutral property. ",
    img: "https://iili.io/fErRVoX.jpg",
  },
  {
    Locality: "Bandhavgarh",
    District: "Umaria",
    State: "Madhya Pradesh",
    desc: "ClimeGrove by NettZero has been working in the ecologically sensitive area of the Bandhavgarh since 2023 to aid with biodiversity preservation and biochar creation through rice straw and invasive species. We have helped create over 300,000 litres of biochar and clear over 200 acres of invasive species, while providing income to women and local farmers. ",
     img: "https://iili.io/fErM34S.jpg",
  },
 
  {
    Locality: "Lonavala",
    District: "Pune",
    State: "Asia’s first Climate Neutral Resort Text- 4 years and counting!",
    desc: "ClimeScore by NettZero has proudly created Asia’s first Verified Carbon Neutral resort at The Machan. Known for its immaculately designed tree houses that merge into nature, ClimeScore has meeticulously documented the emissions of this highly admired resort since 2022.",
     img: "https://iili.io/fErkQ7R.jpg",
  },

  {
    Locality: "Coorg",
    District: "Kodagu",
    State: "The Tamara Emissions Management Program",
    desc: "ClimeScore by NettZero provides its platform to this exquisite piece of paradise nestled amidst plantations in Coorg.  We have developed a customised solution that helps The Tamara track emissions not just across Scope 1 & Scope 2 - but, also of its guest travel.",
    img: "https://iili.io/fEri6wG.jpg",
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
  
  const [open, setOpen] = useState(false);
 const [showHamburger, setShowHamburger] = useState(false);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setShowHamburger(true);
      } else {
        setShowHamburger(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



const [showPopup, setShowPopup] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    company: "",
    message: "",
  });

  const handleGetInTouch = (serviceName) => {
    setSelectedService(serviceName);
    setShowPopup(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendMail = () => {
    const subject = `Inquiry About ${selectedService}`;
    const body = `
Name: ${form.name}
Phone: ${form.phone}
Company: ${form.company}
Message: ${form.message}

Service Requested: ${selectedService}
`.replace(/ /g, "%20").replace(/\n/g, "%0A");

    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=contact@nettzero.world&su=${subject}&body=${body}`
    );

    setShowPopup(false);
  };




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
 /* ---------------- Smooth, working Section 2 (replace your existing useEffect) ---------------- */
useEffect(() => {
  const section = containerRef.current;
  const sectionSteps = gsap.utils.toArray(".step", containerRef.current)
  if (!section || !sectionSteps.length) return;

  // smoother ticker behaviour
  gsap.ticker.lagSmoothing(0);

  // initial state
  gsap.set(sectionSteps, { autoAlpha: 0 });
  gsap.set(sectionSteps[0], { autoAlpha: 1 });

  // measure & set height for sticky container
  const measureAndSet = () => {
    let maxH = 0;
    sectionSteps.forEach((el) => {
      // force layout read
      const h = el.offsetHeight || el.getBoundingClientRect().height || 0;
      if (h > maxH) maxH = h;
    });
    if (stickyRef.current) stickyRef.current.style.height = `${maxH}px`;
  };

  // run measurement once and after a short delay (images/fonts)
  measureAndSet();
  const measureTimeout = setTimeout(() => {
    measureAndSet();
    // ensure ScrollTrigger knows sizes after images/layout
    ScrollTrigger.refresh();
  }, 120);

  window.addEventListener("resize", measureAndSet);

  // Create a single timeline controlled by scrollTrigger (scrubbed)
  const tl = gsap.timeline({
    defaults: { duration: 0.6, ease: "power1.out" },
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: () => `+=${sectionSteps.length * window.innerHeight}`,
      pin: true,
      scrub: 0.6,           // smooth link to scroll
      anticipatePin: 1,
      // update active title index using progress
      onUpdate: (self) => {
        const idx = Math.round(self.progress * (sectionSteps.length - 1));
        const slideIndex = slides.findIndex((sl) => sl.title === steps[idx].title);
        setActiveTitleIndex(slideIndex >= 0 ? slideIndex : 0);
      },
    },
  });

  // Build timeline: fade all out then fade the target step in (per-step)
  sectionSteps.forEach((step, i) => {
    // use position index so each "step" block maps to one viewport block of timeline
    tl.to(sectionSteps, { autoAlpha: 0, duration: 0.4 }, i)
      .to(step, { autoAlpha: 1, duration: 0.6 }, i + 0.01);
  });

  // pause the timeline (ScrollTrigger controls playhead)
  tl.pause();

  // Ensure ScrollTrigger recalculates after images load (safety)
  const imgs = Array.from(section.querySelectorAll("img"));
  let loadedCount = 0;
  const onImgLoad = () => {
    loadedCount += 1;
    if (loadedCount === imgs.length) {
      measureAndSet();
      ScrollTrigger.refresh();
    }
  };
  if (imgs.length) {
    imgs.forEach((img) => {
      if (img.complete) onImgLoad();
      else img.addEventListener("load", onImgLoad, { once: true });
    });
  }

  // CLEANUP
  return () => {
    clearTimeout(measureTimeout);
    window.removeEventListener("resize", measureAndSet);

    // kill timeline and its ScrollTrigger
    try {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
    } catch (e) {}
    try {
      tl.kill();
    } catch (e) {}

    // do NOT indiscriminately kill ALL ScrollTriggers (avoids interfering with other components)
    // but if you really want to be aggressive you can uncomment:
    // ScrollTrigger.getAll().forEach(t => t.kill());
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


/* ---------------- Smooth Scroll — Counters (Section 3) ---------------- */
useEffect(() => {
  const counterSteps = gsap.utils.toArray(".counter-step");
  if (!counterSteps.length) return;

  const STEP_SCROLL = window.innerHeight * 1.8; // 👈 slows scroll per item

  gsap.set(counterSteps, { autoAlpha: 0 });
  gsap.set(counterSteps[0], { autoAlpha: 1 });

  // Ensure container height fits tallest content
  const measureAndSet = () => {
    let maxH = 0;
    counterSteps.forEach((el) => {
      maxH = Math.max(maxH, el.offsetHeight);
    });

    if (countersStickyRef.current) {
      countersStickyRef.current.style.height = `${maxH}px`;
    }
  };

  setTimeout(measureAndSet, 100);
  window.addEventListener("resize", measureAndSet);

  const stepTriggers = counterSteps.map((step, i) =>
    ScrollTrigger.create({
      trigger: countersContainerRef.current,
      start: () => `top+=${i * STEP_SCROLL} top`,
      end: () => `+=${STEP_SCROLL}`,
      onEnter: () => {
        gsap.to(counterSteps, { autoAlpha: 0, duration: 0.4 });
        gsap.to(step, { autoAlpha: 1, duration: 0.4 });
        setActiveCounterIndex(i);
      },
      onEnterBack: () => {
        gsap.to(counterSteps, { autoAlpha: 0, duration: 0.4 });
        gsap.to(step, { autoAlpha: 1, duration: 0.4 });
        setActiveCounterIndex(i);
      },
    })
  );

  const pinTrigger = ScrollTrigger.create({
    id: "section3Pin",
    trigger: countersContainerRef.current,
    pin: true,
    start: "top top",
    end: `+=${counterSteps.length * STEP_SCROLL}`, // 👈 slower pin duration
    scrub: false,
  });

  return () => {
    window.removeEventListener("resize", measureAndSet);
    stepTriggers.forEach((t) => t.kill());
    pinTrigger.kill();
  };
}, []);



 /* ---------------- Smooth Scroll — Section 4 (Partners) ---------------- */
useEffect(() => {
  const container = partnersContainerRef.current;
  const partnerSteps = gsap.utils.toArray(
  ".partner-step",
  partnersContainerRef.current
);
  if (!container || !partnerSteps.length) return;

  gsap.ticker.lagSmoothing(0);

  // initial visibility
  gsap.set(partnerSteps, { autoAlpha: 0 });
  gsap.set(partnerSteps[0], { autoAlpha: 1 });

  // measure tallest step
  const measureAndSet = () => {
    let maxH = 0;
    partnerSteps.forEach((el) => {
      const h = el.offsetHeight || el.getBoundingClientRect().height || 0;
      if (h > maxH) maxH = h;
    });

    if (partnersStickyRef.current) {
      partnersStickyRef.current.style.height = `${maxH}px`;
    }
  };

  measureAndSet();
  const t = setTimeout(() => {
    measureAndSet();
    ScrollTrigger.refresh();
  }, 120);

  window.addEventListener("resize", measureAndSet);

  /* ---------------- Compute category ranges ---------------- */
  const categories = ["Customers", "Partners", "Standards"];

  const categoryRanges = categories.map((cat) => {
    const start = Partners.findIndex((p) => p.title === cat);
    const end =
      Partners.findLastIndex?.((p) => p.title === cat) ??
      [...Partners].reverse().findIndex((p) => p.title === cat);

    return { title: cat, start, end: end + 1 };
  });

  /* ---------------- Smooth timeline controlled by scrollTrigger ---------------- */
  const tl = gsap.timeline({
    defaults: { duration: 0.6, ease: "power1.out" },
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: () => `+=${partnerSteps.length * window.innerHeight}`,
      pin: true,
      scrub: 0.6,          // 👈 Smooth scroll animation
      anticipatePin: 1,
      onUpdate: (self) => {
        const idx = Math.round(self.progress * (partnerSteps.length - 1));

        // determine active category
        const activeCatIndex = categoryRanges.findIndex(
          (range) => idx >= range.start && idx < range.end
        );

        setActivePartnersIndex(activeCatIndex);
      },
    },
  });

  // build fade steps in timeline
  partnerSteps.forEach((step, i) => {
    tl.to(partnerSteps, { autoAlpha: 0, duration: 0.4 }, i)
      .to(step, { autoAlpha: 1, duration: 0.6 }, i + 0.01);
  });

  tl.pause(); // controlled by ScrollTrigger

  /* ---------------- Refresh after images load ---------------- */
  const imgs = Array.from(container.querySelectorAll("img"));
  let loadedCount = 0;

  const onImgLoad = () => {
    loadedCount += 1;
    if (loadedCount === imgs.length) {
      measureAndSet();
      ScrollTrigger.refresh();
    }
  };

  if (imgs.length) {
    imgs.forEach((img) => {
      if (img.complete) onImgLoad();
      else img.addEventListener("load", onImgLoad, { once: true });
    });
  }

  /* ---------------- Cleanup ---------------- */
  return () => {
    clearTimeout(t);
    window.removeEventListener("resize", measureAndSet);

    try {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
    } catch {}

    try {
      tl.kill();
    } catch {}
  };
}, []);


// ???? Section 5??
/* ---------- Smooth, robust Section 5 (Map Steps) ---------- */
useEffect(() => {
  const container = mapsContainerRef.current;
  const steps = gsap.utils.toArray(
  ".map-step",
  mapsContainerRef.current
);
  if (!container || !steps.length) return;

  // improve ticker behaviour
  gsap.ticker.lagSmoothing(0);

  // initial visibility
  gsap.set(steps, { autoAlpha: 0 });
  gsap.set(steps[0], { autoAlpha: 1 });

  // measure & set sticky height to tallest step to avoid layout jumps
  const measureAndSet = () => {
    let maxH = 0;
    steps.forEach((el) => {
      const h = el.offsetHeight || el.getBoundingClientRect().height || 0;
      if (h > maxH) maxH = h;
    });
    if (mapsStickyRef.current) mapsStickyRef.current.style.height = `${maxH}px`;
  };

  // run measurement immediately and again after a short delay
  measureAndSet();
  const measureTimeout = setTimeout(() => {
    measureAndSet();
    ScrollTrigger.refresh();
  }, 120);

  window.addEventListener("resize", measureAndSet);

  // build a single timeline controlled by one ScrollTrigger (scrub for smoothness)
  const tl = gsap.timeline({
    defaults: { duration: 0.5, ease: "power1.out" },
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: () => `+=${steps.length * window.innerHeight}`,
      pin: true,
      scrub: 0.6,
      anticipatePin: 1,
      // update callback optional — uncomment if you want an index state
      // onUpdate: (self) => { const idx = Math.round(self.progress * (steps.length - 1)); setSomeIndex(idx); }
    },
  });

  // For each map-step: fade all out, then fade this one in — positioned per-step
  steps.forEach((step, i) => {
    tl.to(steps, { autoAlpha: 0, duration: 0.35 }, i)
      .to(step, { autoAlpha: 1, duration: 0.45 }, i + 0.01);
  });

  // Pause timeline; ScrollTrigger controls it
  tl.pause();

  // Refresh after images load inside this container (prevent mis-sized pin)
  const imgs = Array.from(container.querySelectorAll("img"));
  let loadedCount = 0;
  const onImgLoad = () => {
    loadedCount += 1;
    if (loadedCount === imgs.length) {
      measureAndSet();
      ScrollTrigger.refresh();
    }
  };
  if (imgs.length) {
    imgs.forEach((img) => {
      if (img.complete) onImgLoad();
      else img.addEventListener("load", onImgLoad, { once: true });
    });
  }

  // CLEANUP: remove listeners and only kill this timeline/trigger
  return () => {
    clearTimeout(measureTimeout);
    window.removeEventListener("resize", measureAndSet);

    try {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
    } catch (e) {}
    try {
      tl.kill();
    } catch (e) {}
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

 const scrollTarget =
  document.scrollingElement ||
  document.documentElement ||
  document.body;


  gsap.to(scrollTarget, {
    scrollTo: { y: targetY, autoKill: false },
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
    // Calculate the real scroll position of the element
    const step = counterSteps[clampedIndex];
    const rect = step.getBoundingClientRect();
    const targetY = rect.top + window.pageYOffset - 100; // adjust offset if needed

    gsap.to(window, {
      scrollTo: { y: targetY, autoKill: false },
      duration: 1.5,
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
   const scrollTarget =
  document.scrollingElement ||
  document.documentElement ||
  document.body;


  gsap.to(scrollTarget, {
      scrollTo: { y: targetY, autoKill: false },
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

 const scrollTarget =
  document.scrollingElement ||
  document.documentElement ||
  document.body;


gsap.to(scrollTarget, {
  scrollTo: { y, autoKill: false, offsetY: 0 },
  duration: 1.5,
  ease: "power2.inOut",
});

};




  return (
    <div className="wrapper">

      <button
        className="floating-hamburger"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Slide Menu */}
      <div className={`floating-menu ${open ? "open" : ""}`}>
        <ul>
         
          <li><Link to="/client/login">Measure Carbon Emissions</Link></li>
          <li><Link to="/marketplacehome">Carbon Credits</Link></li>
          <li><Link to="/marketplace">Green Marketplace</Link></li>
          <li><Link to="/blog">Resources</Link></li>
          <li><Link to="/jobs">Jobs</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </div>



     <nav className="navbar">
      <div className="logo">
        <Link to="/">
          {/* <img src="/ClimeScore.png" alt="Climescore Logo" /> */}
          <img src="https://iili.io/fqSTKkG.jpg" alt="Climescore Logo" />

        </Link>
        {/* <span style={{ fontSize: "12px", marginTop: "16px" }}>By NettZero</span> */}
      </div>

      {/* Hamburger Button */}
      <div
  className={`hamburger ${menuOpen ? "active" : ""}`}
  onClick={() => setMenuOpen(!menuOpen)}
>
  <span></span>
  <span></span>
  <span></span>
</div>

<ul className={`nav-links ${!menuOpen ? "active" : ""}`}>

        <li><Link to="/client/login">Measure Carbon Emissions</Link></li>
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
          <h1 className="sticky-title">The NettZero Suite</h1>

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
    <img className="desktop-img" src={s.img} alt={s.text} />
    <img className="mobile-img" src={s.mob} alt={s.text} />
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
            <h1 className="sticky-title2">NettZero in Numbers</h1>
<div className="title-buttons2">

  {/* FIRST BUTTON - Carbon Emission Measurement */}
  <button
    className={`title-btn ${activeCounterIndex >= 0 && activeCounterIndex <= 1 ? "active" : ""}`}
    onClick={() => handleTitleClick2(0)} // first group starts at index 0
  >
    {countersData[0].title}
  </button>

  {/* SECOND BUTTON - Carbon dioxide Removal */}
  <button
    className={`title-btn ${activeCounterIndex >= 2 ? "active" : ""}`}
    onClick={() => handleTitleClick2(2)} // second group starts at index 2
  >
    {countersData[2].title}
  </button>

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
      <h1 className="sticky-title3">NettZero Partners</h1>

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
              <img className="desktop-img"  src={item.image} alt={item.label} />
              <img className="mobile-img" src={item.mob} alt={item.label} />
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
            <h1 className="sticky-title5">The NettZero Footprint</h1>
            {mapPoints.map((point, i) => (
              <div key={i} className="map-step">
                <div className="map-left">
                  <img src={point.img} alt={point.Locality} />
                </div>
                <div className="map-right">
                  <h2>{point.Locality}</h2>
                  <p><b>District:</b> {point.District}</p>
                  <p> {point.State}</p>
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
    

    <h1 className="sticky-titlediv">NettZero For You</h1>
      <div className="divfour">
        {/* sample boxes — keep as you had them */}
        <div>
          <img src="https://iili.io/f9UVj3u.jpg" alt="" />
          <h3>ClimeScore</h3>
          <p>NettZero offers the best of breed global standards & practices to make your organisation certified as Carbon Neutral​</p>
          <button onClick={() => handleGetInTouch("ClimeScore")}>
            Get In Touch
          </button>

        </div>
        <div>
          <img src="https://iili.io/f9S5XzG.jpg" alt="" />
          <h3>ClimeFolio</h3>
          <p>NettZero works with the industry leaders to provide bonafide & legitimate Carbon Credits, for your obsets.</p>
          <button onClick={() => handleGetInTouch("ClimeFolio")}>
            Get In Touch
          </button>

        </div>
        <div>
          <img src="https://iili.io/f9S5js4.jpg" alt="" />
          <h3>ClimeGrove</h3>
          <p>If you have projects that need development and promotion to earn Carbon Credits, we get you listed on top registries​</p>
          <button onClick={() => handleGetInTouch("ClimeGrove")}>
            Get In Touch
          </button>

        </div>
        <div>
          <img src="https://iili.io/f9S5Vbs.jpg" alt="" />
          <h3>ClimeSchool</h3>
          <p>Train your team on the impact of sustainability. ClimeSchool delivers webinars, online training sessions.​</p>
          <button onClick={() => handleGetInTouch("ClimeSchool")}>
            Get In Touch
          </button>

        </div>
        <div>
          <img src="https://iili.io/f9S5O12.jpg" alt="" />
          <h3>ClimeStore​</h3>
          <p>Connect with 100’s of verified carbon efficient suppliers - to reduce your Scope 3 emissions and decarbonise efficiently.​</p>
        <button onClick={() => handleGetInTouch("ClimeStore")}>
            Get In Touch
          </button>

        </div>
      </div>

         {/* POPUP */}
      {/* POPUP */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">

            <h3>Contact — {selectedService}</h3>

            <input
              name="name"
              placeholder="Your Name"
              onChange={handleChange}
            />
            <input
              name="phone"
              placeholder="Mobile Number"
              onChange={handleChange}
            />
            <input
              name="company"
              placeholder="Company Name"
              onChange={handleChange}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              onChange={handleChange}
            />

            <button onClick={sendMail}>Send Message</button>
            <button onClick={() => setShowPopup(false)}>Cancel</button>

          </div>
        </div>
      )}

      <Footer />
      {/* Scroll to Top Button */}


    </div>
  );
};
