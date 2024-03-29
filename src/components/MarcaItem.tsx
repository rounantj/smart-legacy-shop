import { Marca } from "@models/Marca";

import styles from "@styles/components/MarcaItem.module.css"
interface ML {
  marca: Marca
  func: any
}
export default function MarcaItem(props: ML) {
  const changeView = () => {
    props.func(props.marca.name, 'marca')
  }

  return (
    <div className={styles.inputBox}>
      <input onChange={changeView} id={props.marca.id} type="checkbox" />
      <label htmlFor={props.marca.id}>
        {props.marca.name}
        <span className={styles.counter}>{props.marca.count}</span>
      </label>
    </div>
  );
}