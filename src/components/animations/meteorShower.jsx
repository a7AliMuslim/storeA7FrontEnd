import React, { useEffect, useState, useRef, memo } from "react";
import anime from "animejs";
import "./meteorShowerCss.css";

let starryNightAnimation=null;
let shootingStarsAnimation=null;
const StarrySky = ({
  numOfStars=30,
  numOfMeteors=30,
  starDelay=100,
  meteorDelay=2000,
  appContainerId='app',
  containerWidth=window.innerWidth,
  containerHeight=window.innerHeight,
  className='',

}) => {
  const [viewport, setViewport] = useState({
    vw: parseFloat(containerWidth),
    vh: parseFloat(containerHeight),
  });
  const meteorContainerRef=useRef(null);
  const skyRef=useRef(null);
  const shootingStarRef=useRef(null);

  useEffect(() => {
    const updateViewport = () => {
        const compAppStyle=window.getComputedStyle(document.getElementById(appContainerId));
        const width=parseFloat(compAppStyle.width);
        const height=parseFloat(compAppStyle.height);
        if(meteorContainerRef  && skyRef && shootingStarRef){
            meteorContainerRef.current.style.width=compAppStyle.width;
            skyRef.current.style.width=compAppStyle.width;
            if(height>window.innerHeight){
              meteorContainerRef.current.style.height=window.innerHeight+'px';
              skyRef.current.style.height=window.innerHeight+'px';
            }else{
              meteorContainerRef.current.style.height=compAppStyle.height;
              skyRef.current.style.height=compAppStyle.height;
            }
        }
        setViewport({ vw: width, vh: height });
    };
    window.addEventListener("resize", updateViewport);
    if(meteorContainerRef && skyRef && shootingStarRef){
        const compAppStyle=window.getComputedStyle(document.getElementById(appContainerId));
        meteorContainerRef.current.style.width=compAppStyle.width;
        skyRef.current.style.width=compAppStyle.width;
        
        if(parseFloat(compAppStyle.height)>window.innerHeight){
          meteorContainerRef.current.style.height=window.innerHeight+'px';
          skyRef.current.style.height=window.innerHeight+'px';
        }else{
          meteorContainerRef.current.style.height=compAppStyle.height;
          skyRef.current.style.height=compAppStyle.height;
        }
        
    }
    starryNight();
    shootingStars();
    
    return () => {
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  useEffect(()=>{
      const handleVisibilityChangetwo=()=>{
        if(starryNightAnimation){
          if (document.hidden) {
            starryNightAnimation.pause(); // Pause animation when tab is hidden
          } else {
            starryNightAnimation.play(); // Resume when tab is active
          }
        }
        if(shootingStarsAnimation){
          if (document.hidden) {
            shootingStarsAnimation.pause(); // Pause animation when tab is hidden
          } else {
            shootingStarsAnimation.play(); // Resume when tab is active
          }
        }
      }
      document.addEventListener('visibilitychange',handleVisibilityChangetwo);
      return ()=>{
        document.removeEventListener('visibilitychange',handleVisibilityChangetwo);
      }
  },[]);

  const starryNight = () => {
    starryNightAnimation=anime({
      targets: ".star",
      opacity: [
        { duration: 700, value: "0" },
        { duration: 700, value: "1" },
      ],
      easing: "linear",
      loop: true,
      delay: (el, i) => starDelay * i,
    });
  };

  const shootingStars = () => {
    shootingStarsAnimation=anime({
      targets: ".starfal",
      easing: "linear",
      loop: true,
      delay: (el, i) => meteorDelay * i,
      opacity: [{ duration: 700, value: "1" }],
      width: [{ value: "150px" }, { value: "0px" }],
      translateX: 350,
    });
  };

  const randomRadius = () => Math.random() * 0.7 + 0.6;
  const getRandomX = () => Math.floor(Math.random() * viewport.vw);
  const getRandomY = () => Math.floor(Math.random() * viewport.vh);
  

  return (
    <div ref={meteorContainerRef} className={"absolute w-screen h-screen overflow-hidden "+className}>
      <svg ref={skyRef} id="sky" className="absolute">
        {[...Array(numOfStars)].map((_, i) => (
          <circle
            key={i}
            cx={getRandomX()}
            cy={getRandomY()}
            r={randomRadius()}
            fill="#76B900"
            className="star"
          />
        ))}
      </svg>
      <div ref={shootingStarRef} id="shootingstars" className="absolute">
        {[...Array(numOfMeteors)].map((_, i) => (
          <div
            key={i}
            className="starfal absolute bg-nvidia-green h-[2px] opacity-0"
            style={{ left: `${getRandomY()}px`, top: `${getRandomX()}px` }}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(StarrySky);
