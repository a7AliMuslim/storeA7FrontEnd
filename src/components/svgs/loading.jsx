import React from 'react';

function Loading({className}){
    return <svg className={className + ' loading-spinner '} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">

  <rect width="100%" height="100%" fill="rgba(118, 185, 0, 0)"/>
  
  
  <circle cx="100" cy="100" r="40" stroke="#F0F0F0" stroke-width="2" fill="none"
          stroke-dasharray="251.2" stroke-dashoffset="180" stroke-linecap="round">
    <animateTransform attributeName="transform"
                      attributeType="XML"
                      type="rotate"
                      from="0 100 100"
                      to="360 100 100"
                      dur="2s"
                      repeatCount="indefinite"/>
  </circle>
  
  
  <text x="50%" y="160" text-anchor="middle" fill="#F0F0F0" font-size="10" opacity="1">
  Loading...
  <animate attributeName="opacity"
             values="1; 0.1; 0.7; 1" 
             dur="2s"
             repeatCount="2"/> 
    <animate attributeName="opacity"
             from="1" to="0"
             begin="6s"
             dur="0.5s"
             fill="freeze"/>
  </text>
  
  
  <g>
    <circle cx="100" cy="100" r="40" stroke="#dd2d2d" stroke-width="2" fill="none"/>
    <line x1="80" y1="80" x2="120" y2="120" stroke="#dd2d2d" stroke-width="2" stroke-linecap="round"/>
    <line x1="120" y1="80" x2="80" y2="120" stroke="#dd2d2d" stroke-width="2" stroke-linecap="round"/>
  </g>
  
 
  
    
</svg>

}

export default React.memo(Loading);
