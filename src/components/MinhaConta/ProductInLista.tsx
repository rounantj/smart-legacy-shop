import { useState } from "react";

import styles from "@styles/components/minha-conta/ProductInLista.module.css";
import { LISTA_COMPRA, Product2 } from "@models/Product2";
import { FULL_PRICES } from "@models/masks";
import SmartImage from "@components/SmartImage";
import ButtonDecreaseItemLista from "@components/Buttons/ButtonDecreaseItemLista";
import ButtonIncreaseItemLista from "@components/Buttons/ButtonIncreaseItemLista";
import ButtonRemoveItemLista from "@components/Buttons/ButtonRemoveItemLista";

interface ProductInListaProps {
  product: Product2;
  lista: LISTA_COMPRA;
  total: number;
  actionRemove: any;
  actionIncrease: any;
  actionDecrease: any;
}

export default function ProductInLista(props: ProductInListaProps) {
  const [checked, setChecked] = useState(false);

  function checkboxClick() {
    setChecked(!checked)
  }



  return (
    <div className={styles.product}>
      <button className={`${styles.checkbox} ${checked ? styles.checked : ''}`} onClick={checkboxClick}></button>

      <div style={{ maxWidth: '50px' }}>
        <ButtonRemoveItemLista lista={props.lista} product={props.product} fn={props.actionRemove} />
      </div>


      <div className={styles.thumbnail}>
        <SmartImage

          className="img_thumbnail"
          layout="fill"
          objectFit="contain"
          src={props.product.product_thumbnail}
        />

      </div>

      <div className={styles.name}>{props.product.product_site_name}</div>

      <div className={styles.colRight}>
        <div className={styles.boxPrice}>
          {
            FULL_PRICES(props.product).venda.existe_desconto ?
              <>
                <div className={styles.price}>R$ {FULL_PRICES(props.product).venda.preco_venda}</div>

                <div className={styles.originalPrice}>R$ {FULL_PRICES(props.product).venda.valor_bruto}</div>
              </>

              :
              <div className={styles.price}>R$ {props.product.product_valor}</div>
          }

        </div>

        <div className={styles.amount}>
          <ButtonDecreaseItemLista lista={props.lista} product={props.product} fn={props.actionDecrease} />

          <div className={styles.value}>{props.total}</div>

          <ButtonIncreaseItemLista lista={props.lista} product={props.product} fn={props.actionIncrease} />
        </div>
      </div>
    </div>
  );
}
