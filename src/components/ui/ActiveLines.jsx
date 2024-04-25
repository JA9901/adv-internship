import React, { useEffect, useState } from "react";

function ActiveLines({ lines }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % lines.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [lines]);

  return (
    <>
      {lines.map((line, index) => (
        <div
          key={index}
          className={`statistics__heading ${
            index === activeIndex ? "statistics__heading--active" : ""
          }`}
        >
          {line}
        </div>
      ))}
    </>
  );
}

export default ActiveLines;