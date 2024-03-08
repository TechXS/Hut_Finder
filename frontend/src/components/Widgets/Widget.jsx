import React from "react";
import {widgetData} from "../../utils/dataUtil.js";
import {Box} from "@mui/material";

const Widget = ({data}) => {
  
  return (
     <Box sx={{
         display:"flex",
         flexDirection:"row",
         justifyContent:"space-around",
         alignItems:"center",
         flexWrap:"wrap"
     }}>
         { widgetData.map((widget, index) => {
             const [key, val] = Object.entries(data)[index];
             // const {amount, percentage} = val;
             return (
                 <div key={key} className="widget">
                     <div className="left">
                         <span className="title">{widget.title}</span>
                         <span className="counter">
                 {val?.toLocaleString() ?? 0}
                </span>
                         <span className="link">{widget.link}</span>
                     </div>
                     <div className="right">
                         <span className="percentage">{val?.toLocaleString() ?? 0}%</span>
                         <widget.icon/>
                     </div>
                 </div>
             );
         })
         }
     </Box>
      // <div className="widget">
      //     <div className="left">
      //         <span className="title">{data.title}</span>
      //         <span className="counter">
      //             {data.isMoney && "$"} {data.amount}
      //         </span>
      //         <span className="link">{data.link}</span>
      //     </div>
      //     <div className="right">
      //         <span className="percentage">
      //             {data.percentage}%
      //         </span>
      //         <data.icon/>
      //     </div>
      // </div>
  )
}

export default Widget; 