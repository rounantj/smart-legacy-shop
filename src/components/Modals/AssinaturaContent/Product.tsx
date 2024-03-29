import { useState } from "react";
import SmartImage from "@components/SmartImage";;

import styles from "@styles/components/modals/Product.module.css";

interface productProps {
  id: number;
  title: string;
  image: string;
  selected?: boolean;
}

export default function Product(props: productProps) {
  const [selected, setSelected] = useState(props.selected)

  function handleClick() {
    setSelected(!selected)
  }

  return (
    <div className={`${styles.product} ${selected ? styles.active : ""}`} onClick={handleClick}>
      <div className={styles.thumbnail}>
        <SmartImage src={props.image} layout="fill" objectFit="contain"></SmartImage>
      </div>

      <h4 className={styles.title}>
        {props.title}
        <span
          className={`${styles.message} ${selected ? styles.active : ""}`}
        >
          Não receber
        </span>
      </h4>
    </div>
  );
}
