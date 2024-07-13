import React, { useEffect, useState } from 'react';
import '../styles/homepage.css';
import axios from 'axios';


export const Homepage = () => {

    const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://backend.climescore.com/news');
        setNewsData(response.data.reverse().slice(0, 2));
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

    return (
        <div>
            <div id='threeimgdiv'>
                <div>
                    <img src="https://nettzero.world/wp-content/uploads/2024/02/Group-218-1-1.png" alt="" />
                    <ul>
                        <h2>What We Do</h2>
                        <p>We have enterprise grade technology, globally validated processes & qualified people to help organisations with:</p>
                        <li>Conducting Climate Literacy Programs that are thorough & bespoke</li>
                        <li>GHG Accounting & Emissions Management across Scope 1, 2 and 3</li>
                        <li>Running impact driven EPR & Plastics Programs</li>
                        <li>Purchasing Carbon Credits that is genuine, validated and hand-picked</li>
                        <li>Developing Carbon Credit Programs – in the area of GHG Removal – from concept to monetisation </li>
                    </ul>
                </div>
                <div>
                <img src="https://nettzero.world/wp-content/uploads/2024/02/Rectangle-139-2-1.png" alt="" />
                    <ul>
                        <h2>Who Are We For</h2>
                        <p>Sustainability & Climate Change is a movement that requires everyone to participate in – right now. NettZero works with:</p>
                        <li>Organisations that wish to become sustainable in a thorough & globally recognised manner – with focus on Carbon Neutrality & Net Zero</li>
                        <li>Local Administrations that need sustainability & development programs implemented in their areas</li>
                        <li>Impact Projects that need to earn Carbon credits, find sponsors & get financial support</li>
                        <li>Individuals who want to make a positive impact</li>
                        <li>Climate Innovators & Ideators who need a channel to launch</li>
                    </ul>
                </div>
                <div>
                <img src="https://nettzero.world/wp-content/uploads/2024/02/Rectangle-138-3.png" alt="" />
                    <ul>
                        <h2>How We May Align</h2>
                        <p>If any of these statements describe you, we can help you with the solutions you need:</p>
                        <li> I want my organisation to move towards Carbon Neutrality and Net Zero in a scientific, scalable & globally recognised manner – while optimising supply chain emissions</li>
                        <li>I want my organisation and team members to become Climate Literate  in a thorough & action oriented manner</li>
                        <li>I am a producer who wants to transition to a circular economy and deliver on my EPR goals</li>
                        <li>I am an individual and want to make a positive difference to the Climate Change movement and individually become Carbon Neutral</li>
                    </ul>
                </div>
            </div>


<div id='hospityality'>
    <h1>Our Customers</h1>
        {/* <h2>Our Customers</h2> */}
    <div className='hospityalitydiv'>
<h2></h2>
        <div className='logos'>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGXLdzohuVaUik2pXDoa9_8_wpUipMdAUcwA&s" alt="" />
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGXLdzohuVaUik2pXDoa9_8_wpUipMdAUcwA&s" alt="" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGXLdzohuVaUik2pXDoa9_8_wpUipMdAUcwA&s" alt="" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGXLdzohuVaUik2pXDoa9_8_wpUipMdAUcwA&s" alt="" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGXLdzohuVaUik2pXDoa9_8_wpUipMdAUcwA&s" alt="" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGXLdzohuVaUik2pXDoa9_8_wpUipMdAUcwA&s" alt="" />
        </div>
    </div>

    <div className='hospityalitydiv2'>
        <h1>Our Hospitality Offering</h1>
        <div className='hdiv21'>
            <div>
              
                <img src="https://i.postimg.cc/KYqYb7KX/hospitalirt2.jpg" alt="" />
           <h3>Emissions Quantification & Carbon Neutrality</h3>
            <p>At NettZero, we empower the hospitality sector to accurately compute and quantify their emissions. Our comprehensive emissions quantification service enables hotels, resorts, and other hospitality businesses to gain a clear understanding of their carbon footprint. By leveraging the advanced ClimeScore dashboard, we provide precise and actionable data to track the emissions across the entire value chain within the sector. This helps businesses identify opportunities for emission reductions, enhancing their sustainability goals and operational efficiency.</p>
            </div>
            <div>
         
                <img src="https://i.postimg.cc/MKDdzXY0/hospitality1.jpg" alt="" />
                <h3>Carbon Credit Creation Programs </h3>
                <p>NettZero offers an innovative Carbon Credit Creation service tailored for the hospitality industry. Through our service, hotels and resorts can transform their sustainability efforts into valuable carbon credits by utilising biochar production. By implementing and documenting verifiable biochar production projects, businesses can generate carbon credits that can be traded or sold in carbon markets. This not only contributes to global climate change mitigation efforts but also creates a potential revenue stream, turning sustainability initiatives into tangible economic benefits.</p>
            </div>
            <div>
            
                <img src="https://i.postimg.cc/6QdDLBXM/hospitality3.jpg" alt="" />
                <h3>Sustainable Sourcing</h3>
                <p>NettZero is dedicated to helping the hospitality sector achieve carbon neutrality. Our comprehensive Carbon Neutrality service supports hotels, resorts, and other hospitality businesses in their journey to fully offset their carbon emissions. Through a combination of reducing emissions and investing in high-quality carbon offset projects, we assist businesses in achieving a net-zero carbon footprint.</p>
            </div>
            
            {/* <div></div> */}
        </div>
    </div>

    <div className='hospityalitydiv2'>
        <h1>Our Acadmic Offering</h1>
        <div className='hdiv21'>
            <div>
                <img src="https://i.postimg.cc/rmyMDDr1/s2.jpg" alt="" />
           <h3>Emissions Quantification for Academic Institutions</h3>
           <p>NettZero offers a specialised Emissions Quantification service designed for academic institutions to accurately measure and understand their carbon footprint. Using advanced ClimeScore dashboard technology, we provide precise data that helps universities and colleges identify sources of emissions and opportunities for reduction. Our comprehensive approach supports institutions in achieving their sustainability goals, enhancing their environmental stewardship and demonstrating leadership in climate action within the academic community.
           </p>
            </div>
            <div>
                <img src="https://i.postimg.cc/k5Xp8KTg/s1.jpg" alt="" />
              <h3>Achieving Carbon Neutrality in Academic Institutions</h3>
                <p>At NettZero, we provide tailored strategies to help universities and colleges measure, reduce, and offset their carbon emissions effectively. Through these efforts, academic institutions not only demonstrate their commitment to environmental responsibility but also inspire and educate future generations on the importance of sustainable practices. We take pride in supporting India's first carbon neutral campus, demonstrating leadership in environmental sustainability within the academic sector. Partnering with us ensures that academic institutions can lead by example in climate action, fostering a sustainable future for generations to come.</p>
            </div>
            <div>
                <img src="https://i.postimg.cc/85yDMTRq/s3.jpg" alt="" />
                <h3>Course Development & Delivery</h3>
                <p>We assist academic institutions in developing a cutting-edge course in sustainability aimed at nurturing the next generation of leaders. Our expertise enables universities and colleges to craft a curriculum that equips students with the knowledge and skills needed to tackle global challenges effectively. From climate change resilience to sustainable development practices and environmental policy, our curriculum development services integrate rigorous academic content with practical applications. Through collaborative workshops and expert guidance, we empower institutions to inspire and educate future leaders who will drive positive change towards a sustainable future.</p>
            </div>
           
           
            {/* <div></div> */}
        </div>

        
    </div>

</div>
            <div id='climescore'>
                <div>
                    <h1>Climescore Products</h1>
                    <div className='cproduct'>
                        <img src="https://i.postimg.cc/cJK0wv1w/pr.jpg" alt="" />
                        <h4>Nettzero is one of the most prominent companies in the direct air capture field. They develop and operate machines that capture CO2 directly from the air. The captured CO2 can then be stored underground or used in various industrial applications, such as carbonated beverages or synthetic fuels.
                            Technology: Nettzero uses modular CO2 collectors that can be stacked to build larger plants. The technology is based on a cyclic adsorption-desorption process, where air is drawn into the collector, CO2 is captured on a filter, and then released for storage or utilization.
                            </h4>
                    </div>
                </div>
                <div>
                    <h1>Climescore Toppers</h1>
                    <div className='tproduct'>
                        <img src="https://i.postimg.cc/HxHvHNNn/li.jpg" alt="" />
                        <h4>We are excited to announce that Google has achieved the highest rank in NettZero’s ClimateScore, our comprehensive CO2 reduction evaluation system. Google’s commitment to sustainability and innovative practices have set a new standard, leading the way in effective carbon reduction and environmental stewardship.
                            Their outstanding performance in our ClimateScore reflects their exceptional efforts in renewable energy, carbon neutrality, and cutting-edge carbon capture technologies. We are proud to have Google as a leading example in our mission to drive global climate action.</h4>
                    </div>
                </div>
            </div>

            <div id='Newsdiv'>
      <h1>Climescore NEWS</h1>
      <div id='climescore'>
        {newsData.map((news) => (
          <div className='newsnews' key={news._id}>
            <div className='cproduct'>
              <img src={`https://backend.climescore.com${news.image}`} alt="" />
              <h4>{news.title}</h4>
            </div>
            <p style={{ whiteSpace: 'pre-wrap' }}>{news.content}</p>
          </div>
        ))}
      </div>
    </div>


        </div>
    )
}
