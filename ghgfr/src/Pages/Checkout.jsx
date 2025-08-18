import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/checkout.css";

export const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem("carbonProjects")) || [];
    const selectedProject = storedProjects.find((p) => String(p.id) === id);
    setProject(selectedProject);
  }, [id]);

  const handleCheckout = () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }
    alert(`🎉 Purchase Successful!\n${quantity} credits bought for ₹${quantity * project.price}`);
    navigate("/marketplacehome");
  };

  if (!project) return <p>Loading project details...</p>;

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-card">
        <h3>{project.projectName}</h3>
        <p><strong>Location:</strong> {project.location}</p>
        <p><strong>Price per Tonne:</strong> ₹{project.price}</p>

        <div className="checkout-field">
          <label>Carbon Credit Quantity:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <div className="checkout-field">
          <label>Payment Options:</label>
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="">-- Select Payment Method --</option>
            <option value="upi">UPI</option>
            <option value="credit">Credit Card</option>
            <option value="wallet">Wallet</option>
            <option value="bank">Bank Transfer</option>
          </select>
        </div>

        <div className="checkout-field">
          <label>
            <input type="checkbox" /> Generate Certificate
          </label>
        </div>

        <div className="checkout-field">
          <label>
            <input type="checkbox" /> Assign credit to emission report
          </label>
        </div>

        <button className="checkout-btn" onClick={handleCheckout}>
          Complete Purchase
        </button>
      </div>
    </div>
  );
};

export default Checkout;
