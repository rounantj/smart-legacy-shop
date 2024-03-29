import { Marca } from "@models/Marca";

import MarcaItem from "@components/MarcaItem";

import styles from "@styles/components/MarcaList.module.css";

interface staticProps {
  marcas: Marca[]
  setView: any
}

export default function MarcaList(props: staticProps) {
  return (
    <div className={styles.checkboxList}>
      {
        props.marcas.map((marca, index) => (
          <MarcaItem
            key={`${marca.name}-${index}`}
            func={props.setView}
            marca={marca}
          />
        ))
      }
    </div>
  );
}
