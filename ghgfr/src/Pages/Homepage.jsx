import React, { useEffect, useState } from 'react';
import { Navbar } from './Navbar';
import '../styles/homepage.css';

export const Homepage = () => {

    const images = [
        'https://economymiddleeast.com/cdn-cgi/imagedelivery/Xfg_b7GtigYi5mxeAzkt9w/economymiddleeast.com/2023/09/Carbon-capture.jpg/w=1200,h=783',
        'https://d3hnfqimznafg0.cloudfront.net/images/Article_Images/ImageForArticle_1572_16554692125835852.jpg',
        'https://energyintel.brightspotcdn.com/dims4/default/c826c1d/2147483647/strip/true/crop/917x611+0+0/resize/917x611!/quality/90/?url=http%3A%2F%2Fenergy-intelligence-brightspot.s3.us-east-2.amazonaws.com%2Fed%2F0f%2F0f4640504e96b2888ecbbe6731c6%2Fss-2090747974-co2-emissions-concept.jpg',
        'https://www.strategyand.pwc.com/de/en/functions/sustainability-strategy/carbon-capture-and-storage/exhibit01-carbon-capture-and-storage.gif'
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    useEffect(() => {
        const interval = setInterval(goToNext, 2000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <div>
            {/* <Navbar /> */}
            <div>
                <div className="slider">
                    <div className="slider-content" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                        {images.map((image, index) => (
                            <div className="slider-image" key={index}>
                                <img src={image} alt={`slide-${index}`} />
                            </div>
                        ))}
                    </div>
                    <button className="left-arrow" onClick={goToPrevious}>
                        ❮
                    </button>
                    <button className="right-arrow" onClick={goToNext}>
                        ❯
                    </button>
                </div>
            </div>


            <div id='climescore'>
                <div>
                    <h1>Climescore Products</h1>
                    <div className='cproduct'>
                        <img src="https://media.exapro.com/product/2023/09/P230919031/2f90c9cbbbdb4cc008908dd5a55be949/462x340/extraktlab-extraktlab-140-p230919031_1.jpg" alt="" />
                        <h4>Nettzero is one of the most prominent companies in the direct air capture field. They develop and operate machines that capture CO2 directly from the air. The captured CO2 can then be stored underground or used in various industrial applications, such as carbonated beverages or synthetic fuels.
                            Technology: Nettzero uses modular CO2 collectors that can be stacked to build larger plants. The technology is based on a cyclic adsorption-desorption process, where air is drawn into the collector, CO2 is captured on a filter, and then released for storage or utilization.
                            </h4>
                    </div>
                </div>
                <div>
                    <h1>Climescore Toppers</h1>
                    <div className='tproduct'>
                        <img src="https://s39939.pcdn.co/wp-content/uploads/2023/02/iStock-1169427542.jpg" alt="" />
                        <h4>We are excited to announce that Google has achieved the highest rank in NettZero’s ClimateScore, our comprehensive CO2 reduction evaluation system. Google’s commitment to sustainability and innovative practices have set a new standard, leading the way in effective carbon reduction and environmental stewardship.
                            Their outstanding performance in our ClimateScore reflects their exceptional efforts in renewable energy, carbon neutrality, and cutting-edge carbon capture technologies. We are proud to have Google as a leading example in our mission to drive global climate action.</h4>
                    </div>
                </div>
            </div>

            <div id='Newsdiv'>
                <h1>Climescore NEWS</h1>


                <div id='climescore'>
                    <div className=''>
                        <div className='cproduct'>
                            <img src="https://decarbonization.visualcapitalist.com/wp-content/uploads/2022/11/carbon-emissions-per-capita-country.webp" alt="" />
                            <h4>"Tracking Global CO2 Emissions: The Latest Data on Country Contributions"
                                As climate change continues to be a pressing global issue, understanding the sources of CO2 emissions is crucial for developing effective strategies to mitigate their impact. Our latest infographic, "Global CO2 Emissions by Country," provides a clear and insightful visual representation of how different nations contribute to global carbon dioxide emissions.</h4>
                        </div>

                        <h5>Top Emitters: The infographic highlights the countries with the highest CO2 emissions, showcasing their contributions to the global carbon footprint. As of the latest data, countries like China, the United States, and India are among the top emitters, significantly influencing global climate patterns.
                            Regional Variations: The visual breakdown also reveals regional variations in emissions, offering insights into how industrial activity, energy consumption, and economic development contribute to the emission levels in various parts of the world.
                            Trends and Changes: By examining historical data, the infographic illustrates trends in CO2 emissions over time, highlighting both increases and reductions. This information is vital for understanding progress toward global climate goals and identifying areas needing further attention.
                            Impact of Policies: The data also reflects the impact of national policies and international agreements aimed at reducing emissions. Countries implementing robust climate policies are often shown to have made significant strides in lowering their carbon footprints. Why It Matters:
                            Understanding CO2 emissions by country is essential for policymakers, businesses, and individuals committed to combating climate change. By analyzing this data, stakeholders can better assess the effectiveness of climate strategies, identify opportunities for improvement, and collaborate on global efforts to reduce greenhouse gas emissions.
                            Explore our infographic to gain a clearer picture of how different countries are contributing to the global challenge of CO2 emissions and how we can work together towards a more sustainable future.</h5>
                    </div>
                    <div>

                        <div className='tproduct'>
                            <img src="https://i.cbc.ca/1.6203717.1633636414!/fileImage/httpImage/image.jpg_gen/derivatives/original_1180/per-capita-carbon-footprint-by-country-1-5-degree-lifestyles-report.jpg" alt="" />
                            <h4>"Global Per Capita Carbon Footprints: Insights by Country"
                                As the world grapples with the urgent need to address climate change, understanding carbon emissions on a per capita basis provides a crucial perspective on the environmental impact of different nations. Our latest analysis sheds light on per capita carbon footprints by country, offering a detailed look at how individual lifestyles and economic activities contribute to global carbon emissions.</h4>
                        </div>
                        <h5>Top Per Capita Emitters: The analysis reveals which countries have the highest per capita carbon footprints. Nations such as Qatar, Kuwait, and the United Arab Emirates lead the rankings, where high levels of industrial activity and energy consumption result in significant individual carbon emissions.
                            Developed vs. Developing Nations: Developed countries often exhibit higher per capita emissions compared to developing nations. This discrepancy highlights the impact of advanced industrialization and high standards of living. Conversely, many developing nations have lower per capita footprints, reflecting their smaller industrial base and lower energy consumption.
                            Regional Differences: The data illustrates significant regional variations in per capita carbon footprints. North America and Europe tend to have higher per capita emissions due to higher energy use and consumption patterns, whereas regions like Sub-Saharan Africa show lower per capita emissions.
                            Trends Over Time: The study also tracks changes in per capita carbon footprints over time, showing how emissions have evolved with economic growth and changes in energy policies. Some countries have successfully reduced their per capita emissions through renewable energy investments and energy efficiency improvements.
                            Impact of Policy and Innovation: Countries that have implemented aggressive climate policies, such as increased renewable energy adoption and stricter emission regulations, often show lower per capita emissions. This underscores the role of policy and technological innovation in mitigating individual carbon footprints.
                            Why It Matters:
                            Per capita carbon footprints offer a more nuanced view of a country’s environmental impact, providing insights into how individual behavior and economic activities contribute to global emissions. By understanding these figures, policymakers, businesses, and individuals can better target strategies for reducing carbon footprints and advancing towards global climate goals.
                            Explore our detailed analysis to gain a clearer understanding of how per capita carbon footprints vary by country and how these insights can inform more effective climate action strategies.</h5>
                    </div>
                </div>
            </div>

        </div>
    )
}
