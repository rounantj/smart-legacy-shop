import PriceFilter from "@components/PriceFilter";

import styles from "@styles/components/Boxes.module.css";
import { useEffect, useState } from "react";
interface ML{
  setShow: any
  limitPrice?: number 
 
}
export default function PriceBox(props: ML) {
   useEffect(()=>{
   
   },[])
  return (
    <div className={`${styles.content} ${styles.contentPreco}`}>
      <PriceFilter setShow={props.setShow} step={0.1} min={0} max={props.limitPrice ? props.limitPrice : 100} values={[0,props.limitPrice ? props.limitPrice : 100]} />
    </div>
  );
}
