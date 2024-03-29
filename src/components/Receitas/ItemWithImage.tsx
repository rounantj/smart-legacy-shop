import Image from "next/image"

import styles from "@styles/components/receitas/Ingrediente.module.css"
import SmartImage from "@components/SmartImage";

interface staticProps {
  image: string;
  name: string;
}

export default function ItemWithImage(props: staticProps) {
  return (
    <div className={styles.ingrediente}>
      <div className={styles.imageBox}>
        <SmartImage src={props.image} layout="fill" objectFit="contain" />
      </div>

      {props.name}
    </div>
  );
}