import * as React from "react";

import { Product } from "@models/Product";

import styles from "@styles/components/minha-conta/ProductInLista.module.css"

import ProductInLista from "@components/MinhaConta/ProductInLista";
import { ProductOrder } from "@models/ProductOrder";
import { LISTA_COMPRA, Product2 } from "@models/Product2";
import { Api } from "@components/providers";
import { ajustStrigfy } from "@models/masks";

interface ProductListInListaProps {
  products: Product2[];
  lista: LISTA_COMPRA
  setLista: any
  increase: any
  decrease: any
  remove: any
}

export default function ProductListInLista(props: ProductListInListaProps) {
  function getMyTotal(product_code: number) {
    let total = 0
    type item = {
      product_code: number,
      quantidade: number
    }
    let itens: item[] = []
    try {
      itens = JSON.parse(ajustStrigfy(props.lista.lista_conteudo))
    } catch (ee) {
      // console.log('erro em get', ee)
    }
    for (const k in itens) {
      if (product_code === itens[k].product_code) {
        total = itens[k].quantidade
      }
    }
    return total
  }

  React.useEffect(() => {

  }, [])


  return (
    <div className={styles.productList}>
      {props.products.map((product) => (
        <ProductInLista lista={props.lista} total={getMyTotal(product.product_code)} key={product.id} product={product} actionDecrease={props.decrease} actionIncrease={props.increase} actionRemove={props.remove} />
      ))}
    </div>
  );
}
