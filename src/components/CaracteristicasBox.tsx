import CaracteristicaList from "@components/CaracteristicaList";
import { Caracteristica } from "@models/Caracteristica";

import styles from "@styles/components/Boxes.module.css";

interface VAR{
  src: Caracteristica []
  setView: any
}
export default function CaracteristicasBox(props: VAR) {
  return (
    <div className={`${styles.content} ${styles.contentCaracteristicas}`}>
      <CaracteristicaList
      setView={props.setView}
        caracteristicas={props.src}
      />
    </div>
  );
}
