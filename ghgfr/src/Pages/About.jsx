import React, { useEffect } from 'react';
import '../styles/about.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import { Footer } from './Footer';

export const About = () => {

    useEffect(() => {
        AOS.init({
            duration: 1200,
        });
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
      <div className='aboutdiv1'>
        <h1 data-aos="slide-up">Walking The Green Talk.</h1>
        <h2 data-aos="slide-up">For Over Two Decades.</h2>
      </div>
      <div className='whodivmain'>
        <h1>Who is NettZero?</h1>
        <div style={{backgroundColor:'#EEEEEE'}} className='whodiv'>
          <div>
            <h1>Our Vision</h1>
            <img data-aos="flip-right" src="https://nettzero.world/wp-content/uploads/2024/02/Frame-6-3-2.png" alt="Our Vision" />
          </div>
          <h3 data-aos="zoom-in">
            Climate Change Mitigation cannot be achieved without the participation of every one of us. NettZero aims to install a sense of urgency and create a comprehensive ecosystem that involves organisations, institutes, governments, and individuals to meet one goal: The reduction of 500 million tonnes of CO2e by the end of 2026.
          </h3>
        </div>

        <div className='whodiv'>
          <div>
            <h1>Our Ethos</h1>
            <img data-aos="flip-left" src="https://nettzero.world/wp-content/uploads/2024/02/Frame-7-1.png" alt="Our Vision" />
          </div>
          <h3 data-aos="zoom-in">NettZero is an organisation that is over two decades in the making with a deep-rooted connect with the environment & sustainability. One of our founders has created a 25 acre forest out of barren land in Maharashtra and the other lives in a remote Himalayan village, working on grassroot level impact. 
          We practice what we preach and internally offset all our emissions. For example, we plant one tree for every 5,000 emails that are exchanged. Our entire management team and office is committed to becoming Net Zero by December 2024 making us probably one of the only companies in the world that has achieved this albeit at our small employee count level. We are here for the environment & will work with you pro-bono, if need be.</h3>
        </div>

        <div style={{backgroundColor:'#EEEEEE'}} className='whodiv'>
          <div>
            <h1>Our Team</h1>
            <img data-aos="flip-right" src="https://nettzero.world/wp-content/uploads/2024/02/Frame-8-1.png" alt="Our Vision" />
          </div>
          <h3 data-aos="zoom-in">At NettZero, we believe in doing the finest work that sets global benchmarks. While being an Environment First company, our team is completely on top of the latest global trends & practices be it Artificial Intelligence or scaled implementation processes. Our team comprises environmentalists at heart with the razor sharpness of the best consultants who understand real world applications & impact. </h3>
        </div>

        <div className='whodiv'>
          <div>
            <h1>Our Standards</h1>
            <img data-aos="flip-left" src="https://nettzero.world/wp-content/uploads/2024/02/Frame-9-1.png" alt="Our Standards" />
          </div>
          <h3 data-aos="zoom-in">
            Climate Change & Sustainability is likely to become a buzzword with a herd mentality participation leading to potential greenwashing. At NettZero, we are committed to work with those that seek to make a real difference and approach it with a high level of integrity. With this in mind, we deploy the most stringent of internal standards that distil the exacting specifications & mandates of global implementation processes of GHG Protocol, ISO 14068, BSI PAS 2060 amongst others.
          </h3>
        </div>
      </div>
      <div className='eightdiv'>
        <div  data-aos="slide-left">
            <h2>Commitment to Sustainability</h2>
            <h5>NettZero's internal values that define how we pledge to support sustainability. This declaration is endorsed by our Founders, Directors and management.</h5>
        </div>
        <div  data-aos="slide-right">
            <hr />
            <h2>Planet First</h2>
            <h5>NettZero will always be a planet first organisation and never put profits over the needs of the ecosystem that nurtures us</h5>
        </div>
        <div  data-aos="slide-left">
        <hr />

            <h2>Emissions</h2>
            <h5>NettZero will foster a culture of being transparent in its emissions disclosure - of the company and its people</h5>
        </div>
        <div  data-aos="slide-right">
        <hr />

            <h2>People</h2>
            <h5>NettZero will actively train its people in the aspects of being sustainable & planet friendly</h5>
        </div>
        <div>
            
        </div>
        <div  data-aos="slide-left">
        <hr />

            <h2>Standards</h2>
            <h5>NettZero will do all its business on the basis of the most relevant and current global standards - to foster relevance</h5>
        </div>
        <div  data-aos="slide-right">
        <hr />

            <h2>Net Zero</h2>
            <h5>NettZero will strive to become Net Zero at its earliest and become Carbon Neutral by end of 2024</h5>
        </div>
        <div  data-aos="slide-left">
        <hr />

            <h2>Green Washing</h2>
            <h5>NettZero will not work with entities seeking to misuse the Climate Crisis by greenwashing</h5>
        </div>

    </div>

    <div className='ourproject'>
        <h1>Some NettZero Projects </h1>
        <p>NettZero has in-depth expertise in Carbon Emissions Measurement, Carbon Offset Credits Purchase & Carbon Neutrality Processes.  Our Voluntary Standards – called the NettZero Carbon Management Protocol – is structured after distilling the most demanding requirements from the leading standards across the world.  While our Carbon Neutrality Certification is Voluntary and Standalone in Nature – it is assured of imparting processes that can stand the scrutiny of the highest standards of validation & verification. </p>
    <div className='ourp1'>
        <div data-aos="slide-left">
        <img src="https://nettzero.world/wp-content/uploads/2024/02/Group-205.png" alt="" />
        <p style={{fontWeight:'bold'}}>Indian Premier League</p>
        <p>The Largest Emissions Calculation Ever Undertaken in India</p>
        </div>

        <div  data-aos="slide-right">
        <img src="https://nettzero.world/wp-content/uploads/2024/02/Rectangle-132-1-1.png" alt="" />
        <p style={{fontWeight:'bold'}}>Machan Resorts LLP</p>
        <p>Asia’s First Carbon Neutral Resort Chain</p>
        </div>

        <div  data-aos="slide-left">
        <img src="https://nettzero.world/wp-content/uploads/2024/02/Rectangle-133.png" alt="" />
        <p style={{fontWeight:'bold'}}>Symbiosis College of Arts & Commerce</p>
        <p>Amongst the first 3 Carbon Neutral Colleges in the World</p>
        </div>

        <div  data-aos="slide-right">
        <img src="https://nettzero.world/wp-content/uploads/2024/02/shiknis_plastic_bottles_wrappers_bags_polluting_and_choking_ear_bceed512-6415-4aa1-bb72-dff5bda248b7-1.png" alt="" />
        <p style={{fontWeight:'bold'}}>Plastic to Structures</p>
        <p>Collecting plastic bottles and wrappers to develop social structures like schools and community centres that cater to EPR requirements.</p>
        </div>
    </div>
    </div>
    <Footer />
    </div>
  );
}