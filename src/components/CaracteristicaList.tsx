import FavoriteIcon from "@assets/icons/FavoriteIcon";

import CaracteristicaItem from "@components/CaracteristicaItem";

import { Caracteristica } from "@models/Caracteristica";

import styles from "@styles/components/CaracteristicaList.module.css";

interface CaracteristicaProps extends Caracteristica {
  selected?: Boolean;
}

interface staticProps {
  caracteristicas: Array<CaracteristicaProps>;
  setView: any
}

export default function CaracteristicaList(props: staticProps) {
  return (
    <div className={styles.caracteristicaList}>
      {props.caracteristicas.map(({ selected, name, count, icon }, index) => (
        <CaracteristicaItem key={`item-${index}`}
          setView={props.setView}
          selected={selected}
          name={name}
          count={count}
          icon={icon}
        />
      ))}
    </div>
  );
}
