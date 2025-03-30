import React, { useEffect, useRef, memo, useCallback } from "react";
import anime from "animejs";

const DustParticles = ({dustCount=40}) => {
  const containerRef = useRef(null);

  const setAnimation=useCallback(()=>{
    const particleCount = dustCount;
    const particles = [];
    const container = containerRef.current;
    container.innerHTML='';

    console.log('hit');
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    const getRandomX = () => Math.floor(Math.random() * containerWidth);
    const getRandomY = () => Math.floor(Math.random() * containerHeight);

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.classList.add("particle");
      particle.style.top=getRandomY()+'px';
      particle.style.left=getRandomX()+'px';
      particle.style.opacity=0;
      container.appendChild(particle);
      particles.push(particle);
    }

    const animateParticles = () => {
        anime({
          targets: ".particle",
          translateX: [
            { value: () => anime.random(-containerWidth / 2, containerWidth / 2), duration: anime.random(5500, 6000) },
            { value: () => anime.random(-containerWidth / 2, containerWidth / 2), duration: anime.random(5500, 6000), easing: "easeInOutSine" },
            { value: () => anime.random(-containerWidth / 2, containerWidth / 2), duration: anime.random(5500, 6000) },
            { value: () => anime.random(-containerWidth / 2, containerWidth / 2), duration: anime.random(5500, 6000), easing: "easeInOutSine" },
            { value: () => anime.random(-containerWidth / 2, containerWidth / 2), duration: anime.random(5500, 6000) },
            { value: () => anime.random(-containerWidth / 2, containerWidth / 2), duration: anime.random(5500, 6000), easing: "easeInOutSine" },
            { value: () => anime.random(-containerWidth / 2, containerWidth / 2), duration: anime.random(5500, 6000) },
            { value: () => anime.random(-containerWidth / 2, containerWidth / 2), duration: anime.random(5500, 6000), easing: "easeInOutSine" },
            { value: () => anime.random(-containerWidth / 2, containerWidth / 2), duration: anime.random(5500, 6000) },
            { value: () => anime.random(-containerWidth / 2, containerWidth / 2), duration: anime.random(5500, 6000), easing: "easeInOutSine" },
          ],
          translateY: [
            { value: () => anime.random(-containerHeight / 2, containerHeight / 2), duration: anime.random(5500, 6000) },
            { value: () => anime.random(-containerHeight / 2, containerHeight / 2), duration: anime.random(5500, 6000), easing: "easeInOutSine" },
            { value: () => anime.random(-containerHeight / 2, containerHeight / 2), duration: anime.random(5500, 6000) },
            { value: () => anime.random(-containerHeight / 2, containerHeight / 2), duration: anime.random(5500, 6000), easing: "easeInOutSine" },
            { value: () => anime.random(-containerHeight / 2, containerHeight / 2), duration: anime.random(5500, 6000) },
            { value: () => anime.random(-containerHeight / 2, containerHeight / 2), duration: anime.random(5500, 6000), easing: "easeInOutSine" },
            { value: () => anime.random(-containerHeight / 2, containerHeight / 2), duration: anime.random(5500, 6000) },
            { value: () => anime.random(-containerHeight / 2, containerHeight / 2), duration: anime.random(5500, 6000), easing: "easeInOutSine" },
            { value: () => anime.random(-containerHeight / 2, containerHeight / 2), duration: anime.random(5500, 6000) },
            { value: () => anime.random(-containerHeight / 2, containerHeight / 2), duration: anime.random(5500, 6000), easing: "easeInOutSine" },
          ],
          translateZ: [
            { value: () => anime.random(-50, 50), duration: anime.random(5500, 6000) },
            { value: () => anime.random(-50, 50), duration: anime.random(5500, 6000) },
            { value: () => anime.random(-50, 50), duration: anime.random(5500, 6000) },
            { value: () => anime.random(-50, 50), duration: anime.random(5500, 6000) },
            { value: () => anime.random(-50, 50), duration: anime.random(5500, 6000) },
            { value: () => anime.random(-50, 50), duration: anime.random(5500, 6000) },
            { value: () => anime.random(-50, 50), duration: anime.random(5500, 6000) },
            { value: () => anime.random(-50, 50), duration: anime.random(5500, 6000) },
            { value: () => anime.random(-50, 50), duration: anime.random(5500, 6000) },
            { value: () => anime.random(-50, 50), duration: anime.random(5500, 6000) },
          ],
          scale: () => anime.random(0.5, 1.5),
          opacity: () => anime.random(0.3, 1),
          easing: "easeInOutSine",
          duration: anime.random(45000, 60000),
          loop: 1,
          delay: anime.stagger(500, 15000),
          //direction: "alternate",
          complete: animateParticles
        });
      };
      setTimeout(() => {
        anime({
          targets: ".particle",
          opacity: [0, 1],
          duration: 1000,
          easing: "easeInOutQuad",
          complete:animateParticles
        })
    },4000)
  
    
    
  },[dustCount])
  useEffect(() => {
      setAnimation();
      const handleResize=()=>{
        setAnimation();
      }
      window.addEventListener('resize',handleResize);
      return ()=>{
        window.addEventListener('resize',handleResize);
      }
  }, [setAnimation]);

  return (
    <div className="absolute w-full h-full flex items-center justify-center z-0">
      <div ref={containerRef} className="absolute w-full h-full overflow-hidden"></div>
      <style>{`
        .particle {
          position: absolute;
          width: 5px;
          height: 5px;
          background-color: #76B900;
          border-radius: 50%;
          filter: blur(2px);
        }
      `}</style>
    </div>
  );
};

export default memo(DustParticles);
