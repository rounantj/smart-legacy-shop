import React from "react";
 
interface PROPS{
  style: object
}
export default function LoadingSpinnerG({style}: PROPS) {
  return (
    <div style={style} className="spinner-container">
      <div className="loading-spinnerG">
      </div>
    </div>
  );
}