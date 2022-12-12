import React from 'react'
import './BannerH.css'

const BannerH = ({children,title,subtitle}) => {
  return (
    <div className="bannerH">
      <h1>{title}</h1>
      <div></div>
      <p>{subtitle}</p>
      {children}
    </div>
  );
}

export default BannerH