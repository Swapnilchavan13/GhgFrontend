import React from 'react';
import '../styles/contact.css';

export const Contact = () => {
  return (
    <div className='maincontact'>
      <h1>Looking to make sustainability your mantra and climate action your calling? NettZero is your partner in purpose! Connect with us today and let's build a path towards a more sustainable tomorrow, hand in hand!</h1>
      <form className='contactform'>
        <label htmlFor="salutation">Salutation:</label>
        <select id="salutation" name="salutation">
          <option value="mr">Mr.</option>
          <option value="ms">Ms.</option>
          <option value="mrs">Mrs.</option>
          <option value="dr">Dr.</option>
        </select>
        
        <label htmlFor="firstname">First Name:</label>
        <input type="text" id="firstname" name="firstname" required />
        
        <label htmlFor="lastname">Last Name:</label>
        <input type="text" id="lastname" name="lastname" required />
        
        <label htmlFor="mobile">Mobile No:</label>
        <input type="tel" id="mobile" name="mobile" required />
        
        <label htmlFor="email">Email ID:</label>
        <input type="email" id="email" name="email" required />
        
        <label htmlFor="services">Services Interested In:</label>
        <select id="services" name="services">
          <option value="Carbon Credit Trading">Carbon Credit Trading</option>
          <option value="Carbon Neutrality Certification">Carbon Neutrality Certification</option>
          <option value="Carbon Mitigation Stategy">Carbon Mitigation Stategy</option>
          <option value="Carbon Credit Creation">Carbon Credit Creation</option>
          <option value="Plasic Credit Creation">Plasic Credit Creation</option>
          <option value="Carbon Emission Audit">carbon Emission Audit</option>
          <option value="ESG Reporting">ESG Reporting</option>
          <option value="Continuous Carbon Reporting (MIS)">Continuous Carbon Reporting (MIS)</option>
        </select>
        
        <button type="submit">Submit</button>
      </form>
      <br />
      <br />
      <br />

    </div>
  );
}
