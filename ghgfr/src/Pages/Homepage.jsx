import React, { useEffect, useState } from 'react';
import '../styles/homepage.css';
import axios from 'axios';


export const Homepage = () => {

    const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:8080/news');
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
                <h1>1.</h1>
                <img src="https://media.istockphoto.com/id/2093530578/photo/happy-receptionists-cooperating-while-working-on-a-computer-at-hotel-front-desk.webp?b=1&s=170667a&w=0&k=20&c=MQRgCO0e8UOQqmN2JZCnsSDuFhZpegCjs-5Id1hPLEM=" alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque sed odit optio impedit quae. Ea aut facilis quasi sunt quas deserunt porro saepe quam quo? Iure, voluptatibus rem nam atque iste ducimus aliquam in eveniet facere quisquam minima dolorem sint maiores similique expedita tempora pariatur magnam. Vel et quaerat incidunt, necessitatibus nam quidem quibusdam a impedit eaque rerum sit amet culpa laboriosam est totam numquam, iste quae officia possimus repudiandae minus doloremque voluptates ex dolor? Dolorum, excepturi omnis temporibus voluptatum, aliquid praesentium quas quia repellendus optio autem exercitationem. Neque amet eos eaque ipsa in quibusdam sit et veniam quae non excepturi quis, provident ea deleniti dolore incidunt porro sed vero, consectetur suscipit modi molestiae. Earum eligendi voluptate, fuga laborum, dolorum molestiae, praesentium repellat porro dolore esse eius voluptas culpa ut perspiciatis. Nulla ut maxime consectetur similique eligendi quaerat commodi in alias omnis. Vel quibusdam provident officiis veritatis deleniti, minima officia ipsam rerum, architecto omnis, dolor mollitia enim iure aperiam placeat qui voluptatibus magni doloribus. Provident unde perspiciatis quia cum dolor quod veritatis voluptas placeat! Voluptatibus est provident mollitia quas ea. Quaerat veniam distinctio perspiciatis possimus totam reprehenderit earum ipsum reiciendis!</p>
            </div>
            <div>
            <h1>2.</h1>
                <img src="https://media.istockphoto.com/id/2093530578/photo/happy-receptionists-cooperating-while-working-on-a-computer-at-hotel-front-desk.webp?b=1&s=170667a&w=0&k=20&c=MQRgCO0e8UOQqmN2JZCnsSDuFhZpegCjs-5Id1hPLEM=" alt="" />
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi iste dolores eum ipsam ipsum in perferendis iure vero porro maiores ipsa dicta, voluptas cum. Dolorem nemo quibusdam atque dignissimos deleniti labore, ea vero aspernatur voluptatum illo officiis quos sunt officia amet iusto commodi eveniet totam nisi mollitia magni delectus? Provident, at saepe. Veritatis veniam, accusamus non atque aspernatur quis optio laudantium repellat architecto dolores pariatur minima voluptatem inventore culpa, odit molestiae tempora quo, fugit quos eligendi vitae sapiente eaque saepe. Odit omnis tempora magnam quibusdam non minus, libero natus ea, provident culpa quo reiciendis aspernatur veniam fugiat iste? Numquam iure cumque suscipit dolorum, cupiditate a beatae id voluptatibus illo totam corrupti qui vitae repellat aut ipsam quam molestiae ex quod? Cum nesciunt possimus harum tempore dolorum aspernatur iusto pariatur recusandae distinctio odit fuga alias, optio neque dolore minima! At suscipit temporibus reprehenderit, consequuntur quae, error perspiciatis, fugiat nulla mollitia beatae placeat praesentium sed deserunt aut nesciunt. Autem veniam aspernatur rerum sunt eos optio. Possimus cum sapiente, quam consectetur quod architecto quos est voluptates quis doloribus. Sit repellat quas quos reiciendis esse laboriosam temporibus tempora assumenda quaerat doloribus quis voluptate, maiores vero neque quam laborum blanditiis at voluptas porro fugiat. Ad.</p>
            </div>
            <div>
            <h1>3.</h1>
                <img src="https://media.istockphoto.com/id/2093530578/photo/happy-receptionists-cooperating-while-working-on-a-computer-at-hotel-front-desk.webp?b=1&s=170667a&w=0&k=20&c=MQRgCO0e8UOQqmN2JZCnsSDuFhZpegCjs-5Id1hPLEM=" alt="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae delectus vel aliquid, voluptatibus beatae inventore, dolorum ratione consectetur suscipit modi, ab sed quae officia? Dolor, laudantium aliquid deserunt amet unde enim assumenda saepe veniam vitae atque necessitatibus quod nam maxime distinctio numquam quisquam reprehenderit dolores. Soluta neque corrupti perferendis odit quae eum adipisci, doloribus commodi, voluptatum placeat sunt vero sint tempore quis architecto dolore? Nihil nisi, ipsa laboriosam exercitationem natus animi odio repudiandae sed nostrum nam vitae sunt aut ut fugiat, atque eaque eius neque voluptatem. Commodi tenetur accusamus voluptas tempore minima quia quidem incidunt veritatis explicabo perspiciatis? Ab, odit deserunt. Porro expedita ipsam distinctio voluptates ullam iure at aliquam, sed, facilis fugit aperiam harum provident reprehenderit ab fugiat quas doloribus repellendus saepe laboriosam non. Architecto beatae quidem veniam, perspiciatis, excepturi sed nihil, et delectus nesciunt quas tempora aut. Error, alias quidem provident sed incidunt temporibus eius, voluptatem corporis necessitatibus, facilis sequi accusantium doloremque quam vero obcaecati velit harum! Ad, nobis. Suscipit magni amet incidunt quia sapiente at beatae, possimus explicabo? Dolore, laborum modi magni illum sint ipsum eius assumenda, aspernatur mollitia nam nulla maxime quis qui accusantium a molestias fugit libero debitis? Quam delectus est consequatur, ab reprehenderit unde.</p>
            </div>
            <div>
            <h1>4.</h1>
                <img src="https://media.istockphoto.com/id/2093530578/photo/happy-receptionists-cooperating-while-working-on-a-computer-at-hotel-front-desk.webp?b=1&s=170667a&w=0&k=20&c=MQRgCO0e8UOQqmN2JZCnsSDuFhZpegCjs-5Id1hPLEM=" alt="" />
                <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt asperiores error corporis laborum, numquam est quisquam non quia esse doloribus facilis laboriosam architecto magnam natus eaque labore dolorum voluptates? Odit architecto facilis aliquam corporis quae quam soluta magni laborum a? Necessitatibus modi quam dicta tempore iste veritatis sapiente omnis neque, nisi deleniti. Corporis quod ut autem, voluptatum eum nihil illum. Quod mollitia eligendi laboriosam, repellat cumque ab culpa nesciunt voluptates tenetur modi, nihil repellendus reiciendis porro corporis exercitationem quis commodi consectetur dicta. Animi eligendi dicta nobis non cupiditate alias, quae aliquam asperiores maxime dolores dolor ut culpa vitae ex reprehenderit dolorem hic. Voluptatem, velit minima dolore tenetur ipsum adipisci similique non, ducimus rem aut exercitationem sapiente aliquam mollitia impedit hic.</p>
            </div>
            <div>
                <button>Click ME</button>
            </div>
            {/* <div></div> */}
        </div>
    </div>

    <div className='hospityalitydiv2'>
        <h1>Our Acadmic Offering</h1>
        <div className='hdiv21'>
            <div>
                <h1>1.</h1>
                <img src="https://media.istockphoto.com/id/2093530578/photo/happy-receptionists-cooperating-while-working-on-a-computer-at-hotel-front-desk.webp?b=1&s=170667a&w=0&k=20&c=MQRgCO0e8UOQqmN2JZCnsSDuFhZpegCjs-5Id1hPLEM=" alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque sed odit optio impedit quae. Ea aut facilis quasi sunt quas deserunt porro saepe quam quo? Iure, voluptatibus rem nam atque iste ducimus aliquam in eveniet facere quisquam minima dolorem sint maiores similique expedita tempora pariatur magnam. Vel et quaerat incidunt, necessitatibus nam quidem quibusdam a impedit eaque rerum sit amet culpa laboriosam est totam numquam, iste quae officia possimus repudiandae minus doloremque voluptates ex dolor? Dolorum, excepturi omnis temporibus voluptatum, aliquid praesentium quas quia repellendus optio autem exercitationem. Neque amet eos eaque ipsa in quibusdam sit et veniam quae non excepturi quis, provident ea deleniti dolore incidunt porro sed vero, consectetur suscipit modi molestiae. Earum eligendi voluptate, fuga laborum, dolorum molestiae, praesentium repellat porro dolore esse eius voluptas culpa ut perspiciatis. Nulla ut maxime consectetur similique eligendi quaerat commodi in alias omnis. Vel quibusdam provident officiis veritatis deleniti, minima officia ipsam rerum, architecto omnis, dolor mollitia enim iure aperiam placeat qui voluptatibus magni doloribus. Provident unde perspiciatis quia cum dolor quod veritatis voluptas placeat! Voluptatibus est provident mollitia quas ea. Quaerat veniam distinctio perspiciatis possimus totam reprehenderit earum ipsum reiciendis!</p>
            </div>
            <div>
            <h1>2.</h1>
                <img src="https://media.istockphoto.com/id/2093530578/photo/happy-receptionists-cooperating-while-working-on-a-computer-at-hotel-front-desk.webp?b=1&s=170667a&w=0&k=20&c=MQRgCO0e8UOQqmN2JZCnsSDuFhZpegCjs-5Id1hPLEM=" alt="" />
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi iste dolores eum ipsam ipsum in perferendis iure vero porro maiores ipsa dicta, voluptas cum. Dolorem nemo quibusdam atque dignissimos deleniti labore, ea vero aspernatur voluptatum illo officiis quos sunt officia amet iusto commodi eveniet totam nisi mollitia magni delectus? Provident, at saepe. Veritatis veniam, accusamus non atque aspernatur quis optio laudantium repellat architecto dolores pariatur minima voluptatem inventore culpa, odit molestiae tempora quo, fugit quos eligendi vitae sapiente eaque saepe. Odit omnis tempora magnam quibusdam non minus, libero natus ea, provident culpa quo reiciendis aspernatur veniam fugiat iste? Numquam iure cumque suscipit dolorum, cupiditate a beatae id voluptatibus illo totam corrupti qui vitae repellat aut ipsam quam molestiae ex quod? Cum nesciunt possimus harum tempore dolorum aspernatur iusto pariatur recusandae distinctio odit fuga alias, optio neque dolore minima! At suscipit temporibus reprehenderit, consequuntur quae, error perspiciatis, fugiat nulla mollitia beatae placeat praesentium sed deserunt aut nesciunt. Autem veniam aspernatur rerum sunt eos optio. Possimus cum sapiente, quam consectetur quod architecto quos est voluptates quis doloribus. Sit repellat quas quos reiciendis esse laboriosam temporibus tempora assumenda quaerat doloribus quis voluptate, maiores vero neque quam laborum blanditiis at voluptas porro fugiat. Ad.</p>
            </div>
            <div>
            <h1>3.</h1>
                <img src="https://media.istockphoto.com/id/2093530578/photo/happy-receptionists-cooperating-while-working-on-a-computer-at-hotel-front-desk.webp?b=1&s=170667a&w=0&k=20&c=MQRgCO0e8UOQqmN2JZCnsSDuFhZpegCjs-5Id1hPLEM=" alt="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae delectus vel aliquid, voluptatibus beatae inventore, dolorum ratione consectetur suscipit modi, ab sed quae officia? Dolor, laudantium aliquid deserunt amet unde enim assumenda saepe veniam vitae atque necessitatibus quod nam maxime distinctio numquam quisquam reprehenderit dolores. Soluta neque corrupti perferendis odit quae eum adipisci, doloribus commodi, voluptatum placeat sunt vero sint tempore quis architecto dolore? Nihil nisi, ipsa laboriosam exercitationem natus animi odio repudiandae sed nostrum nam vitae sunt aut ut fugiat, atque eaque eius neque voluptatem. Commodi tenetur accusamus voluptas tempore minima quia quidem incidunt veritatis explicabo perspiciatis? Ab, odit deserunt. Porro expedita ipsam distinctio voluptates ullam iure at aliquam, sed, facilis fugit aperiam harum provident reprehenderit ab fugiat quas doloribus repellendus saepe laboriosam non. Architecto beatae quidem veniam, perspiciatis, excepturi sed nihil, et delectus nesciunt quas tempora aut. Error, alias quidem provident sed incidunt temporibus eius, voluptatem corporis necessitatibus, facilis sequi accusantium doloremque quam vero obcaecati velit harum! Ad, nobis. Suscipit magni amet incidunt quia sapiente at beatae, possimus explicabo? Dolore, laborum modi magni illum sint ipsum eius assumenda, aspernatur mollitia nam nulla maxime quis qui accusantium a molestias fugit libero debitis? Quam delectus est consequatur, ab reprehenderit unde.</p>
            </div>
            <div>
            <h1>4.</h1>
                <img src="https://media.istockphoto.com/id/2093530578/photo/happy-receptionists-cooperating-while-working-on-a-computer-at-hotel-front-desk.webp?b=1&s=170667a&w=0&k=20&c=MQRgCO0e8UOQqmN2JZCnsSDuFhZpegCjs-5Id1hPLEM=" alt="" />
                <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt asperiores error corporis laborum, numquam est quisquam non quia esse doloribus facilis laboriosam architecto magnam natus eaque labore dolorum voluptates? Odit architecto facilis aliquam corporis quae quam soluta magni laborum a? Necessitatibus modi quam dicta tempore iste veritatis sapiente omnis neque, nisi deleniti. Corporis quod ut autem, voluptatum eum nihil illum. Quod mollitia eligendi laboriosam, repellat cumque ab culpa nesciunt voluptates tenetur modi, nihil repellendus reiciendis porro corporis exercitationem quis commodi consectetur dicta. Animi eligendi dicta nobis non cupiditate alias, quae aliquam asperiores maxime dolores dolor ut culpa vitae ex reprehenderit dolorem hic. Voluptatem, velit minima dolore tenetur ipsum adipisci similique non, ducimus rem aut exercitationem sapiente aliquam mollitia impedit hic.</p>
            </div>
            <div>
                <button>Click ME</button>
            </div>
            {/* <div></div> */}
        </div>

        
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
        {newsData.map((news) => (
          <div className='newsnews' key={news._id}>
            <div className='cproduct'>
              <img src={`http://localhost:8080${news.image}`} alt="" />
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
