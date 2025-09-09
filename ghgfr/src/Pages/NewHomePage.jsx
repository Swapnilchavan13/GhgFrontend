import React, { useEffect, useState } from 'react'
import '../styles/newhomepage.css';


const images = [
  {
    src: "https://picsum.photos/id/1018/1000/600",
    text: "First Image Text",
    button: "Learn More"
  },
  {
    src: "https://picsum.photos/id/1015/1000/600",
    text: "Second Image Text",
    button: "Learn More"
  },
  {
    src: "https://picsum.photos/id/1019/1000/600",
    text: "Third Image Text",
    button: "Learn More"
  },
  {
    src: "https://picsum.photos/id/1019/1000/600",
    text: "Third Image Text",
    button: "Learn More"
  }
];

const slides = [
  {
    img: "https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/What-Are-Plants.jpg",
    title: "FIELD WEATHERING",
    text: "Field weathering using rock tailings is an emerging pathway for CDR at low cost and high scale. NettZero works with leading registries to develop quality ERW sites."
  },
  {
    img: "https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/What-Are-Plants.jpg",
    title: "DIRECT AIR CAPTURE",
    text: "NettZero has successfully prototyped a consumer level DAC unit that makes cheap and scalable removal of CO2 from the atmosphere possible – especially at high CO2 density zones."
  },
  {
    img: "https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/What-Are-Plants.jpg",
    title: "TREE C-SINKS",
    text: "NettZero works with afforestation and tree plantation to facilitate long term CDR by creating Tree C-Sinks, which also focus on biodiversity and native species enhancement."
  },
  {
    img: "https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/What-Are-Plants.jpg",
    title: "CONSTRUCTION C-SINKS",
    text: "NettZero has partnered with leading developers to help them integrate biochar into their construction sites which permanently store CO2 for centuries."
  },
  {
    img: "https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/What-Are-Plants.jpg",
    title: "CONSTRUCTION C-SINKS",
    text: "NettZero has partnered with leading developers to help them integrate biochar into their construction sites which permanently store CO2 for centuries."
  },
  {
    img: "https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/What-Are-Plants.jpg",
    title: "CONSTRUCTION C-SINKS",
    text: "NettZero has partnered with leading developers to help them integrate biochar into their construction sites which permanently store CO2 for centuries."
  }
  
];


export const NewHomePage = () => {
  const [current, setCurrent] = useState(0);

    const [current2, setCurrent2] = useState(0);
     const visibleCount = 4; // show 4 at a time

    useEffect(() => {
    const interval = setInterval(() => {
      setCurrent2((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getVisibleSlides = () => {
    let visible = [];
    for (let i = 0; i < visibleCount; i++) {
      visible.push(slides[(current2 + i) % slides.length]);
    }
    return visible;
  };


   const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

    const handleButtonClick = () => {
    alert(`You clicked on "${images[current].button}"`);
  };
    
  return (
    <div>

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


    <div className='seconddiv'>
        <div><img className='seconddivimg' src="http://nettzero.world/wp-content/uploads/2025/01/NZ_Laboratory-1024x816.png" alt="" /></div>
        <div>
            <h2>The Future of Climate Action</h2>
            <h1>CARBON DIOXIDE REMOVAL</h1>
            <h2>reduction will not suffice,<br /> WE NEED CARBON DIOXIDE REMOVAL.</h2>

            <p>The world is emitting close to 40 billion tons of CO2 per year. That is 25 billion tons more than what we should be. Annually. If we continue down this catastrophic path, the possibility of staying within the 1.5 degree target will be impossible.
                <br />
Which is where CDR comes in – to complement CO2 reduction. <br />
CDR is a nascent and emerging field where tools and technologies are being deployed to actively absorb CO2 from the atmosphere. The overall impact of CDR currently is less than 1 billion tons per year. <br />
It needs to scale to 10 billion tons per year by 2028.,<br />
A goal that NettZero takes very seriously. </p>
        </div>

    </div>

<hr />

    <div>
        <h1>The ClimeScore CDR Pathways</h1>


<div className="carousel">
      <div className="carousel-track">
        {getVisibleSlides().map((slide, index) => (
          <div className="slide" key={index}>
            <img src={slide.img} alt={slide.title} />
            <div className="slide-text">
              <h2>{slide.title}</h2>
              <p>{slide.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
        
      
    </div>

    </div>
  )
}
