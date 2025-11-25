// Login.jsx
import React, { useEffect, useRef, useState } from "react";
import "../styles/addclients.css";
import { useNavigate, Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import "../styles/3t.css";
import { Footer } from "../Pages/Footer";

// register plugins once
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export const Login = () => {
  const pageRef = useRef(null); // root ref for gsap.context
  const gsapContextRef = useRef(null); // store context for manual revert (navigate)
  const navigate = useNavigate();

  // ------------------ data (unchanged) ------------------
  const slides = [
    {
      title: "Hospitality",
      contents: [
        {
          title2: "Measure",
          img: "https://iili.io/KgfGzOX.png",
          imgtext: "Carbon Emission",
          text: "ClimeScore’s AI powered emissions measurement helps you track your Carbon Footprint in real time across Scope 1 , Scope 2 and Scope 3. It is robust, globally validated and incredibly simple.",
        },
        {
          title2: "Report",
          img: "https://iili.io/KgfMru9.png",
          imgtext: "Carbon Emission",
          text: "ClimeScore provides you with a simplified, yet reliable framework for your sustainability reporting as per GRI standards. Generate globally valid reports with a few simple clicks and analyse your carbon footprint in real time - across departments, locations, business verticals, vendors and more.",
        },
        {
          title2: "Offset",
          img: "https://iili.io/KgfGAWG.png",
          imgtext: "Carbon Emission",
          text: "ClimeScore helps you become Carbon Neutral through a process of reduction and offsetting. Take the second step, after accurate carbon measurement, to offset emissions and become Verified Carbon Neutral.",
        },
      ],
    },
    {
      title: "Academia",
      contents: [
        {
          title2: "Generate",
          img: "https://iili.io/KgfukOl.png",
          imgtext: "Carbon Credits",
          text: "ClimeScore is an experienced developer of high integrity and high value credits using Carbon Dixide Removal pathways such as Biomass Carbon Removal & Storage (e.g. Biochar), Field Weathering (I.e. Enhanced Rock Weathering) and Direct Air Capture. Work with us to generate your own Carbon Credits and head to your Net Zero goals.",
        },
        {
          title2: "Invest",
          img: "https://iili.io/KgfuSxS.png",
          imgtext: "Carbon Credits",
          text: "ClimeScore actively identifies in-development projects that desire to make an impact by building a more sustainable planet. Support projects from across the world that are engaged in Carbon Dioxide Removal by investing in Offtake agreements.",
        },
        {
          title2: "Purchase",
          img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop",
          imgtext: "Carbon Credits",
          text: "ClimeScore sifts through hundreds of Carbon Credit projects across various registries to rate and curate the most genuine and impactfuln ones. Simplify your offsetting journey by selecting credits that have been meticulously handpicked by our team of impact assessors.",
        },
      ],
    },
    {
      title: "SMEs",
      title2: "Offset",
      contents: [
        {
          title2: "Decarbonise Supply Chain",
          img: "https://iili.io/KgfuZbV.png",
          imgtext: "Sustainable Marketplace",
          text: "Scope 3 emissions from your supply chain are actually the largest contributor to overall emissions. Cut undesirable emissions by shifting to certified sustainable vendors and decarbonise your iupstream and downstream emissions.",
        },
        {
          title2: "Reduce Costs",
          img: "https://iili.io/KgfRcjp.png",
          imgtext: "Sustainable Marketplace",
          text: "Moving to sustainable vendors need not be expensive. In facts, it’s quite the contrary. ClimeScore aggregates suppliers for products and services that measure, declare, reduce and offset their carbon emissions - so that your eventual carbon footprint is also minimised.",
        },
        {
          title2: "Support Green Businesses",
          img: "https://iili.io/KgfuUW7.png",
          imgtext: "Sustainable Marketplace",
          text: "Businesses promoting and adopting sustainability need validation. Encourage entrepreneurs and risk takers who take the path less polluting to be more climate positive - you and your customers, in turn will be supporting a healthier way of doing business.",
        },
      ],
    },
    {
      title: "Events",
      title2: "Offset",
      contents: [
        {
          title2: "Decarbonise Supply Chain",
          img: "https://iili.io/KgfuZbV.png",
          imgtext: "Sustainable Marketplace",
          text: "Scope 3 emissions from your supply chain are actually the largest contributor to overall emissions. Cut undesirable emissions by shifting to certified sustainable vendors and decarbonise your iupstream and downstream emissions.",
        },
        {
          title2: "Reduce Costs",
          img: "https://iili.io/KgfRcjp.png",
          imgtext: "Sustainable Marketplace",
          text: "Moving to sustainable vendors need not be expensive. In facts, it’s quite the contrary. ClimeScore aggregates suppliers for products and services that measure, declare, reduce and offset their carbon emissions - so that your eventual carbon footprint is also minimised.",
        },
        {
          title2: "Support Green Businesses",
          img: "https://iili.io/KgfuUW7.png",
          imgtext: "Sustainable Marketplace",
          text: "Businesses promoting and adopting sustainability need validation. Encourage entrepreneurs and risk takers who take the path less polluting to be more climate positive - you and your customers, in turn will be supporting a healthier way of doing business.",
        },
      ],
    },
  ];

  const steps = slides.flatMap((slide) =>
    slide.contents.map((c) => ({ title: slide.title, ...c }))
  );

  const Partners = [
    {
      title: "Reliable",
      label: "Varun Hooja - Founder & Partner, Machan Resorts LLP",
      desc: "“NettZero is a company founded with a shared vision to create a positive impact on the planet, one step at a time. Their commitment to emissions measurement and reporting is both rigorous and purpose-driven, making sustainability actionable for organizations of all sizes. The effort they put into their work is truly commendable, and I would strongly recommend their services to any company serious about reducing its environmental footprint.”",
      image: "https://iili.io/KQOD5Kl.jpg",
    },
    {
      title: "Reliable",
      label: "Shobha Rudra - Founder, RARE India",
      desc: "“ClimeScore has been a great partner in measuring emissions of Bridges by RARE.”",
      image: "https://iili.io/KQOD7l2.jpg",
    },
    {
      title: "Reliable",
      label: "Hashim Tyebji - Director, Kafila and renowned Tiger Conservationist",
      desc: "“It takes a huge amount of single-minded commitment and optimism to do the pioneering work you are doing.”",
      image: "https://iili.io/KrXt6vt.jpg",
    },
    {
      title: "Valid",
      label: "Carbon Standards International",
      desc: "ClimeScore by NettZero is a member of Carbon Standards International since 2023, making it one of the earliest organizations from India to be aligned with the vision of enabling Carbon Dioxide Removal through widespread adoption. CSI is one of the most respected and leading registries for CDR in the world, with a focus on fundamental methodologies that create robust, transparent and impactful Carbon Sinks. ",
      image: "https://iili.io/KrXtLjs.jpg",
    },
    {
      title: "Valid",
      label: "Circonomy",
      desc: "ClimeScore by NettZero partners with Circonomy for their reliable, globally renowned SOP’s and dMRV tools, since 2023. Through this partnership, we will have created over 500,000 litres of biochar in 2025.",
      image: "https://iili.io/KQeFxnI.jpg",
    },
    {
      title: "Valid",
      label: "RARE India",
      desc: "RARE India is a community of owner-run boutique hotels, heritage palaces, wildlife lodges, homestays and retreats across the Indian subcontinentRARE India is a community of owner-run boutique hotels, heritage palaces, wildlife lodges, homestays and retreats across the Indian subcontinent ClimeScore by NettZero has been partnering with Rare since 2023 to enable their member hotels to become Carbon Neutral and also ensuring that RARE’s annual event, BRIDGES, is Carbon Neutral across Scope 1, 2 and 3.",
      image: "https://iili.io/KrXuvIe.jpg",
    },
    {
      title: "Valid",
      label: "ISN (Indian Sustainability Network)",
      desc: "ClimeScore by NettZero drives the engine behind Indian School of Nature’s sustainability portal. As technology developers of the platform and the Carbon managers for its network, we power the members of ISN who want to migrate onto the path of sustainability. ISN is unique and progressive organization founded by doyens in sustainability and conservation, including Mr. Hashim Tyebji and Mr. Ram Pratap Singh. ",
      image: "https://iili.io/KrXu8hu.jpg",
    },
    {
      title: "Findable",
      label: "GHG Protocol",
      desc: "Provides globally accepted tools to measure and manage GHG emissions.",
      image: "https://iili.io/KrXhabs.jpg",
    },
    {
      title: "Findable",
      label: "PAS 2060",
      desc: "International standard for demonstrating carbon neutrality.",
      image: "https://iili.io/KrXurEx.jpg",
    },
    {
      title: "Findable",
      label: "GRI – Global Reporting Initiative",
      desc: "Used for sustainability reporting ensuring transparency and accountability.",
      image: "https://iili.io/KrXt4aI.jpg",
    },
    {
      title: "Trusted",
      label: "GRI – Global Reporting Initiative",
      desc: "Used for sustainability reporting ensuring transparency and accountability.",
      image: "https://iili.io/KrXt4aI.jpg",
    },
    {
      title: "Trusted",
      label: "GRI – Global Reporting Initiative",
      desc: "Used for sustainability reporting ensuring transparency and accountability.",
      image: "https://iili.io/KrXt4aI.jpg",
    },
  ];

  const slides2 = [
    {
      imge: "https://iili.io/KgfGzOX.png",
      text: "Welcome to our client portal – connect, manage, and grow.",
    },
    {
      imge: "https://iili.io/KgfMru9.png",
      text: "Manage your business efficiently and securely.",
    },
    {
      imge: "https://iili.io/KgfGAWG.png",
      text: "Secure access. Smarter workflow. Better results.",
    },
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
    {
      Locality: "Coorg",
      District: "Kodagu",
      State: "Karnataka",
      desc: "ClimeScore deployment at Tamara coorg for Scope-1, Scope-2 and Scope-3 for emission management.",
      img: "https://www.easeindiatrip.com/blog/wp-content/uploads/2025/01/Coorg-by-Train-1024x576.jpg",
    },
  ];

  // ------------------ UI state ------------------
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides2.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides2.length]);

  const [showScroll, setShowScroll] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);

  // section refs & states (kept same names for compatibility)
  const containerRef = useRef(null); // section2 trigger
  const stickyRef = useRef(null); // section2 sticky box
  const [activeTitleIndex, setActiveTitleIndex] = useState(0);

  const countersContainerRef = useRef(null);
  const countersStickyRef = useRef(null);
  const [activeCounterIndex, setActiveCounterIndex] = useState(0);

  const partnersContainerRef = useRef(null);
  const partnersStickyRef = useRef(null);
  const [activePartnersIndex, setActivePartnersIndex] = useState(0);

  const mapsContainerRef = useRef(null);
  const mapsStickyRef = useRef(null);

  // --------------- login state (unchanged) ----------------
  const storedLoginStatus = localStorage.getItem("isLoggedIn") === "true";
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginStatus, setLoginStatus] = useState(storedLoginStatus);
  const [loggedInUserName, setLoggedInUserName] = useState("");

  const handleLogout = () => {
    setLoggedInUserName("");
    setLoginStatus(false);
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("userId");
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("https://backend.climescore.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, password }),
      });
      if (response.ok) {
        setLoggedInUserName(userId);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userId", userId);
        alert("Login successful!");
        navigate("/client/combinedemission");
      } else {
        setLoginStatus(false);
        localStorage.setItem("isLoggedIn", "false");
        localStorage.removeItem("userId");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setLoginStatus(false);
      localStorage.setItem("isLoggedIn", "false");
      localStorage.removeItem("userId");
    }
  };

  // handleNavigate will safely revert the local gsap context BEFORE route change
  const handleNavigate = (path) => {
    // revert local gsap context (if exists)
    if (gsapContextRef.current) {
      try {
        gsapContextRef.current.revert();
        gsapContextRef.current = null;
      } catch (e) {
        console.warn("Error while reverting gsap context:", e);
      }
    }
    // also kill tweens on window to be safe
    gsap.killTweensOf(window);
    navigate(path);
  };

  // ---------------- Single useEffect that sets up all ScrollTriggers inside a gsap.context ----------------
  useEffect(() => {
    // create a context scoped to the page root
    const ctx = gsap.context(() => {
      // ---------- Section 2 setup (".step") ----------
      const sectionSteps = gsap.utils.toArray(".step");
      if (sectionSteps.length && containerRef.current && stickyRef.current) {
        gsap.set(sectionSteps, { autoAlpha: 0 });
        gsap.set(sectionSteps[0], { autoAlpha: 1 });

        const measureAndSet = () => {
          let maxH = 0;
          sectionSteps.forEach((el) => (maxH = Math.max(maxH, el.offsetHeight)));
          stickyRef.current.style.height = `${maxH}px`;
        };
        setTimeout(measureAndSet, 80);
        window.addEventListener("resize", measureAndSet);

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

        // pin the whole section
        const pinTrigger = ScrollTrigger.create({
          trigger: containerRef.current,
          pin: true,
          start: "top top",
          end: `+=${sectionSteps.length * window.innerHeight}`,
          scrub: false,
        });

        // store triggers in context (they will be reverted automatically by ctx.revert())
      }

      // ---------- Section 3 (counter steps) ----------
      const counterSteps = gsap.utils.toArray(".counter-step");
      if (counterSteps.length && countersContainerRef.current && countersStickyRef.current) {
        gsap.set(counterSteps, { autoAlpha: 0 });
        gsap.set(counterSteps[0], { autoAlpha: 1 });

        const measureAndSetCounters = () => {
          let maxH = 0;
          counterSteps.forEach((el) => (maxH = Math.max(maxH, el.offsetHeight)));
          countersStickyRef.current.style.height = `${maxH}px`;
        };
        setTimeout(measureAndSetCounters, 80);
        window.addEventListener("resize", measureAndSetCounters);

        const stepTriggers2 = counterSteps.map((step, i) =>
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

        // pin
        ScrollTrigger.create({
          id: "section3Pin",
          trigger: countersContainerRef.current,
          pin: true,
          start: "top top",
          end: `+=${counterSteps.length * window.innerHeight}`,
          scrub: false,
        });
      }

      // ---------- Section 4 (partners) ----------
      const partnerSteps = gsap.utils.toArray(".partner-step");
      if (partnerSteps.length && partnersContainerRef.current && partnersStickyRef.current) {
        gsap.set(partnerSteps, { autoAlpha: 0 });
        gsap.set(partnerSteps[0], { autoAlpha: 1 });

        const measureAndSetPartners = () => {
          let maxH = 0;
          partnerSteps.forEach((el) => (maxH = Math.max(maxH, el.offsetHeight)));
          partnersStickyRef.current.style.height = `${maxH}px`;
        };
        setTimeout(measureAndSetPartners, 80);
        window.addEventListener("resize", measureAndSetPartners);

        const categories = ["Customers", "Partners", "Standards"];
        const categoryRanges = categories.map((cat) => {
          const start = Partners.findIndex((p) => p.title === cat);
          const end =
            Partners.findLastIndex?.((p) => p.title === cat) ??
            [...Partners].reverse().findIndex((p) => p.title === cat);
          return { title: cat, start, end: end + 1 };
        });

        partnerSteps.map((step, i) =>
          ScrollTrigger.create({
            trigger: partnersContainerRef.current,
            start: () => `top+=${i * window.innerHeight} top`,
            end: () => `+=${window.innerHeight}`,
            onEnter: () => {
              gsap.to(partnerSteps, { autoAlpha: 0, duration: 0.45 });
              gsap.to(step, { autoAlpha: 1, duration: 0.45 });
              const activeCatIndex = categoryRanges.findIndex((r) => i >= r.start && i < r.end);
              setActivePartnersIndex(activeCatIndex);
            },
            onEnterBack: () => {
              gsap.to(partnerSteps, { autoAlpha: 0, duration: 0.45 });
              gsap.to(step, { autoAlpha: 1, duration: 0.45 });
              const activeCatIndex = categoryRanges.findIndex((r) => i >= r.start && i < r.end);
              setActivePartnersIndex(activeCatIndex);
            },
          })
        );

        ScrollTrigger.create({
          id: "section4Pin",
          trigger: partnersContainerRef.current,
          pin: true,
          start: "top top",
          end: `+=${partnerSteps.length * window.innerHeight}`,
          scrub: false,
        });
      }

      // ---------- Section 5 (maps) ----------
      const mapSteps = gsap.utils.toArray(".map-step");
      if (mapSteps.length && mapsContainerRef.current && mapsStickyRef.current) {
        gsap.set(mapSteps, { autoAlpha: 0 });
        gsap.set(mapSteps[0], { autoAlpha: 1 });

        mapSteps.map((step, i) =>
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

        ScrollTrigger.create({
          id: "section5Pin",
          trigger: mapsContainerRef.current,
          pin: true,
          start: "top top",
          end: `+=${mapSteps.length * window.innerHeight}`,
          scrub: false,
        });
      }

      // end of context callback
    }, pageRef);

    // store the context so navigate can revert it early if needed
    gsapContextRef.current = ctx;

    // final cleanup: revert the context (this kills triggers created inside ctx)
    return () => {
      try {
        if (gsapContextRef.current) {
          gsapContextRef.current.revert();
          gsapContextRef.current = null;
        }
      } catch (e) {
        console.warn("Error reverting gsap context on unmount:", e);
      }
      // safety: kill any window tweens as well
      gsap.killTweensOf(window);
    };
    // only run once on mount/unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------- helper scroll functions (unchanged logic) ----------
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
      const targetY = trigger.start + clampedIndex * window.innerHeight + 100;

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

    const targetIndex = Partners.findIndex((p) => p.title === category);
    if (targetIndex === -1) return;

    const trigger = ScrollTrigger.getById("section4Pin");
    if (trigger) {
      const targetY = trigger.start + targetIndex * window.innerHeight + 100;
      gsap.to(window, {
        scrollTo: { y: targetY, autoKill: true },
        duration: 1.5,
        ease: "power2.inOut",
      });
    }
  };

  // --------------------- render ---------------------
  return (
    <>
      <div ref={pageRef}>
        <nav className="navbar">
          <div className="logo">
            <Link to="/">
              <img src="/ClimeScore.png" alt="Climescore Logo" />
            </Link>
            <span style={{ fontSize: "12px", marginTop: "16px" }}>By NettZero</span>
          </div>

          <div
            className={`hamburger ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          <ul className={`nav-links ${!menuOpen ? "active" : ""}`}>
            <li>
              <Link to="/client/login">Measure Carbon Emissions</Link>
            </li>
            <li>
              <Link to="/marketplacehome">Carbon Credits</Link>
            </li>

            <li className="dropdown">
              <span>Our Scope ▾</span>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/scope/clime">Clime Score</Link>
                </li>
                <li>
                  <Link to="/scope/credits">Carbon Credits</Link>
                </li>
                <li>
                  <Link to="/scope/plastic">Plastic Credits</Link>
                </li>
                <li>
                  <Link to="/scope/climate">Climate Literacy</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/marketplace">Green Marketplace</Link>
            </li>
            <li>
              <Link to="/blog">Resources</Link>
            </li>
            <li>
              <Link to="/jobs">Jobs</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

        <div className="login-page-container">
          {slides2[currentSlide] && (
            <div className="slider-section">
              <img src={slides2[currentSlide].imge} alt="Slide" className="slider-image" />
              <p className="slider-text">{slides2[currentSlide].text}</p>
            </div>
          )}

          <div className="add-client-container">
            <h2>Login</h2>
            <label>
              User ID:
              <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
            </label>
            <br />
            <label>
              Password:
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="password-toggle-button"
                  onClick={() => setShowPassword((p) => !p)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </label>
            <br />
            <button onClick={handleLogin}>Login</button>
            {loginStatus === false && (
              <p style={{ color: "red" }}>Incorrect username or password. Please try again.</p>
            )}
          </div>
        </div>

        <section className="section section2" ref={containerRef}>
          <div className="sticky-box" ref={stickyRef}>
            <h1 className="sticky-title">ClimeScore For Your Emission</h1>

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
              <button onClick={() => handleScroll(".section4")}>Next Section</button>
              <button onClick={() => handleScroll("top")}>Back To Top</button>
            </div>
          </div>
        </section>

        {/* Partners section */}
        <section className="section section4">
          <div className="partners-container" ref={partnersContainerRef}>
            <div className="sticky-box partners-sticky" ref={partnersStickyRef}>
              <h1 className="sticky-title3">Why Use ClimeScore</h1>

              <div className="title-buttonlogin">
                {["Reliable", "Valid", "Findable", "Trusted"].map((category, idx) => (
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
              <h1 className="sticky-title5">Getting Started</h1>
              <div className="getbuttons">
                <button>Register</button>
                <button>Select Module</button>
                <button>Pay and Use</button>
              </div>
              {mapPoints.map((point, i) => (
                <div key={i} className="map-step">
                  <div className="map-left">
                    <img src={point.img} alt={point.Locality} />
                  </div>
                  <div className="map-right">
                    <h2>{point.Locality}</h2>
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

        <br />
        <br />
        <br />
        <Footer />
      </div>
    </>
  );
};

export default Login;
