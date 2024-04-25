import React, { useEffect } from "react";
import Footer from "../components/Footer";
import Plans from "../components/Plans/Plans";
import { useNavigate } from "react-router-dom";

function ChoosePlan({ isPremium }) {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    isPremium && navigate("/for-you");
  }, [isPremium, navigate]);

  return (
    <div>
      <Plans />
      <Footer />
    </div>
  );
}

export default ChoosePlan;