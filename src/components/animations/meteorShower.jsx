import React, { useEffect, useState, useRef } from "react";
import anime from "animejs";
import "./meteorShowerCss.css";


const StarrySky = () => {
  const [numStars] = useState(60);
  const [viewport, setViewport] = useState({
    vw: window.innerWidth,
    vh: window.innerHeight,
  });
  const meteorContainerRef=useRef(null);
  const skyRef=useRef(null);
  const shootingStarRef=useRef(null);

  useEffect(() => {
    const updateViewport = () => {
        const compAppStyle=window.getComputedStyle(document.getElementById('app'));
        const width=parseFloat(compAppStyle.width);
        const height=parseFloat(compAppStyle.height);
        if(meteorContainerRef){
            meteorContainerRef.current.style.width=compAppStyle.width;
            meteorContainerRef.current.style.height=compAppStyle.height;
            skyRef.current.style.width=compAppStyle.width;
            skyRef.current.style.height=compAppStyle.height;
            //shootingStarRef.current.style.width=compAppStyle.width;
            //shootingStarRef.current.style.height=compAppStyle.height;
        }
        console.log(width);
        console.log(height);
        setViewport({ vw: width, vh: height });
    };
    window.addEventListener("resize", updateViewport);
    if(meteorContainerRef && skyRef && shootingStarRef){
        const compAppStyle=window.getComputedStyle(document.getElementById('app'));
        meteorContainerRef.current.style.width=compAppStyle.width;
        meteorContainerRef.current.style.height=compAppStyle.height;
        skyRef.current.style.width=compAppStyle.width;
        skyRef.current.style.height=compAppStyle.height;
        //shootingStarRef.current.style.width=compAppStyle.width;
        //shootingStarRef.current.style.height=compAppStyle.height;
    }
    starryNight();
    shootingStars();
    
    return () => {
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  const starryNight = () => {
    anime({
      targets: ".star",
      opacity: [
        { duration: 700, value: "0" },
        { duration: 700, value: "1" },
      ],
      easing: "linear",
      loop: true,
      delay: (el, i) => 50 * i,
    });
  };

  const shootingStars = () => {
    anime({
      targets: ".wish",
      easing: "linear",
      loop: true,
      delay: (el, i) => 1000 * i,
      opacity: [{ duration: 700, value: "1" }],
      width: [{ value: "150px" }, { value: "0px" }],
      translateX: 350,
    });
  };

  const randomRadius = () => Math.random() * 0.7 + 0.6;
  const getRandomX = () => Math.floor(Math.random() * viewport.vw);
  const getRandomY = () => Math.floor(Math.random() * viewport.vh);

  return (
    <div ref={meteorContainerRef} className="absolute w-screen h-screen overflow-hidden">
      <svg ref={skyRef} id="sky" className="absolute w-full h-full">
        {[...Array(numStars)].map((_, i) => (
          <circle
            key={i}
            cx={getRandomX()}
            cy={getRandomY()}
            r={randomRadius()}
            fill="white"
            className="star"
          />
        ))}
      </svg>
      <div ref={shootingStarRef} id="shootingstars" className="absolute">
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="wish absolute bg-white h-[2px] opacity-0"
            style={{ left: `${getRandomY()}px`, top: `${getRandomX()}px` }}
          />
        ))}
      </div>
    </div>
  );
};

export default StarrySky;
