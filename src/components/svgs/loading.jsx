import React from 'react';

function Loading({className}){
    return <svg className={className} width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">

  <rect width="100%" height="100%" fill="#76B900"/>
  
  
  <circle cx="100" cy="100" r="40" stroke="#F0F0F0" stroke-width="5" fill="none"
          stroke-dasharray="251.2" stroke-dashoffset="0">
    <animateTransform attributeName="transform"
                      attributeType="XML"
                      type="rotate"
                      from="0 100 100"
                      to="360 100 100"
                      dur="2s"
                      repeatCount="indefinite"/>
  </circle>
  
  
  <text x="50%" y="160" text-anchor="middle" fill="#F0F0F0" font-size="16" opacity="1">
  Loading...
  <animate attributeName="opacity"
           from="1" to="0" begin="15s" dur="0.5s" fill="freeze"/>
  </text>
  
  
  <g opacity="0">
    <circle cx="100" cy="100" r="40" stroke="#dd2d2d" stroke-width="5" fill="none"/>
    <line x1="80" y1="80" x2="120" y2="120" stroke="#dd2d2d" stroke-width="5"/>
    <line x1="120" y1="80" x2="80" y2="120" stroke="#dd2d2d" stroke-width="5"/>
    <animate attributeName="opacity"
           from="0" to="1" begin="5s" dur="0.5s" fill="freeze"/>
  </g>
  
 
  
    
</svg>

}

export default React.memo(Loading);
