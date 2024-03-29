import { useState } from "react";

import FavoriteIcon from "@assets/icons/FavoriteIcon";

import { Caracteristica } from "@models/Caracteristica";

import styles from "@styles/components/CaracteristicaItem.module.css";

interface staticProps extends Caracteristica {
  selected?: Boolean;
  setView: any
}

export default function CaracteristicaItem ( props: staticProps ) {

  const [selected, setSelected] = useState(props.selected);
  function setVisual(val :Boolean, name : string){
    setSelected(val)
 
    props.setView(name,'variacao')

  }

  return (
    <button
      className={`${styles.caracteristicaItem} ${
        selected ? styles.active : ""
      }`}
      onClick={() => setVisual(!selected, props.name )}
    >
      <div className={styles.title}>
        {props.icon && <FavoriteIcon />}
        {props.name}
      </div>
      <div className={styles.count}>{props.count}</div>
    </button>
  );
}
