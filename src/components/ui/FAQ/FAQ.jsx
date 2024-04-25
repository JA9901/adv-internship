import React, { useState } from "react";
import "./FAQ.css";
import { MdKeyboardArrowUp } from "react-icons/md";

function FAQ({ q, a }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="faq__card">
      <div className="faq__header" onClick={toggleAccordion}>
        <div className="faq__title">{q}</div>
        <MdKeyboardArrowUp className={`faq__arrow ${isOpen ? "rotate" : ""}`} />
      </div>

      <div className={`collapse ${isOpen ? "show" : ""}`}>
        <div className="faq__text">{a}</div>
      </div>
    </div>
  );
}

export default FAQ;