import MarcaList from "@components/MarcaList";
import { Marca } from "@models/Marca";

import styles from "@styles/components/Boxes.module.css";
import ProductInPedidoList from "./MinhaConta/ProductInPedidoList";

interface MRC{
  src: Array<Marca>
  setView: any
}
export default function MarcasBox(props:MRC) {
  return (
    <div className={`${styles.content} ${styles.contentMarcas}`}>
      <MarcaList
         setView={props.setView}
        marcas={ props.src}
      />
    </div>
  );
}
