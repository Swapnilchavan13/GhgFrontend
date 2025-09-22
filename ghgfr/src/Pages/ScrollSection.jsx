import React, { useEffect, useState } from "react";

const ScrollSection = () => {
  // Slides data
  const slides = [
    {
      title: "Measure Carbon Emission",
      contents: [
        { img: "https://images.unsplash.com/photo-1497436072909-f5e4be2e61e6?w=600&h=400&fit=crop", text: "Track and measure your carbon emissions with advanced analytics and real-time monitoring systems." },
        { img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop", text: "Generate accurate reports with scientific methods and internationally recognized standards." },
        { img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop", text: "Identify key hotspots of your organization's carbon footprint with detailed analysis." },
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

  // Scroll handler
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
    <>
      {/* Scroll Section */}
<div style={{ position: 'absolute', height:'450vh'}}>
       <h1 style={{"color":"#03AFF8"}}>The ClimeScore Footprint</h1>
        <img src="http://nettzero.world/wp-content/uploads/2025/03/Locality-Name-Nubra-Valley-State-Laddakh-UT.gif" alt="" />
        </div>
    <hr />
      <div id="scroll-section" style={{ position: 'sticky', height:'650vh', marginTop:'80vh', paddingTop:'400px'}}>
        <div style={{
          position: 'fixed',
          top: 0,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
         width: '100%',

        }}>
          <div style={{
            maxWidth: '1280px',
            margin: 'auto',
            padding: '0 16px',
            width: '100%',

          }}>
            <h1 style={{
              fontSize: '36px',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '32px',
              color: '#374151'
            }}>
              Clime Score Suite
            </h1>
            
            {/* Navigation Buttons */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '48px',
              marginTop:'-100px',

            }}>
              <div style={{
                display: 'flex',
                gap: '4px',
                backgroundColor: '#f3f4f6',
                padding: '4px',
                borderRadius: '8px',
                gap:"20px",
                marginTop:'100px'
                
              }}>
                {slides.map((slide, index) => (
                  <button
                    key={index}
                    style={{
                      padding: '12px 24px',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '500',
                      transition: 'all 0.3s',
                      border: 'none',
                      cursor: 'pointer',
                      width:'250px',
                      backgroundColor: currentSlide === index ? '#2563eb' : '#c6d4f0ff',
                      color: currentSlide === index ? 'white' : '#4b5563',
                    //   boxShadow: currentSlide === index ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
                    }}
                    
                  
                  >
                    {slide.title}
                  </button>
                ))}
              </div>
            </div>

            
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '32px',
              alignItems: 'center',
              width:'100%',
              marginLeft:'200px',
              marginTop:'-100px'

            }}>

                 {/* Right Black Box with Image */}
              <div style={{ gridColumn: 'span 3' }}>
                <div style={{
                  borderRadius: '16px',
                  padding: '32px',
                }}>
                  <div style={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '12px'
                  }}>
                    <img 
                      src={slides[currentSlide]?.contents[currentText]?.img} 
                      alt="Content visual" 
                      style={{
                        width: '150%',
                        height: '580px',
                        objectFit: 'cover',
                        transition: 'all 0.7s',
                          borderRadius: '10px',

                        transform: 'scale(1)'
                      }}
                    
                     
                    />
                    
                    {/* Image Overlay with Info */}
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                    //   background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent)',
                    //   padding: '24px'
                    }}>
                      <div style={{ color: 'white' }}>
                        <div style={{
                          fontSize: '14px',
                          opacity: 0.8,
                          marginBottom: '4px'
                        }}>
                          {currentText + 1} of {slides[currentSlide]?.contents.length}
                        </div>
                        <div style={{ fontWeight: '500' }}>
                          {slides[currentSlide]?.title}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Navigation Dots inside black box */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '8px',
                    marginTop: '24px'
                  }}>
                    {slides[currentSlide]?.contents.map((_, index) => (
                      <div
                        key={index}
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          transition: 'all 0.3s',
                          backgroundColor: currentText === index ? 'white' : '#4b5563'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              {/* Left Content Side */}
              <div style={{ gridColumn: 'span 2', 
                border:'1px solid black',
                width:'60%',
                marginLeft:"-200px", 
                marginTop:"-80px", 
                padding:"10px",
                zIndex:'1',
                backgroundColor:'black',
                color:'white',
                borderRadius:'20px'
               }}>
                <h2 style={{
                  fontSize: '30px',
                  fontWeight: '600',
                  color: '#2563eb'
                }}>
                  {slides[currentSlide]?.title}
                </h2>
                
                <hr />
                {/* Show only current active content */}
                <div style={{ minHeight: '158px',
                borderRadius:'20px'
                 }}>
                  <p style={{
                    fontSize: '18px',
                    color: 'white'
                  }}>
                    {slides[currentSlide]?.contents[currentText]?.text}
                  </p>
                </div>
                
                {/* Content Indicators */}
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  marginTop: '32px'
                }}>
                  {slides[currentSlide]?.contents.map((_, index) => (
                    <div
                      key={index}
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        transition: 'all 0.3s',
                        backgroundColor: currentText === index ? '#2563eb' : '#d1d5db'
                      }}
                    />
                  ))}
                </div>
              </div>
              
             
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{
        position: 'fixed',
        right: '32px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 40
      }}>
        <div style={{
          width: '4px',
          height: '128px',
          backgroundColor: '#e5e7eb',
          borderRadius: '9999px',
          overflow: 'hidden'
        }}>
          <div 
            style={{
              width: '100%',
              backgroundColor: '#3b82f6',
              borderRadius: '9999px',
              transition: 'all 0.3s ease-out',
              height: `${scrollProgress * 100}%`
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default ScrollSection;