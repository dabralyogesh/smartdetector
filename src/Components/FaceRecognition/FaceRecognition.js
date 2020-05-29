import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({imageUrL, boxdimension}) => {
	 return(
          <div className="center ma" >
            <div className='absolute mt2'>
           		<img id= "inputImage" alt="" src={imageUrL} width ='500px' height="auto"/>
           		<div className="bounding-box" style={{top:boxdimension.top_row,right: boxdimension.right_col,bottom: boxdimension.bottom_row, left:boxdimension.left_col}}>
                </div>
            </div>
         </div>
	 	)
}
export default FaceRecognition;
