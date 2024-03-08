import React from "react";

const Widget = ({data}) => {
  
  return (
      <div className="widget">  
          
          <div className="left">
              <span className="title">{data.title}</span>
              <span className="counter">
                  {data.isMoney && "$"} {data.amount}
              </span>
              <span className="link">{data.link}</span>
          </div>
          <div className="right">
              <span className="percentage">
                  {data.percentage}%
              </span>
              <data.icon/>
          </div>
      </div>  
  )
}

export default Widget; 