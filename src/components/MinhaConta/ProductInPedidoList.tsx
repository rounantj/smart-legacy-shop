import * as React from "react";

import { Product } from "@models/Product";

import styles from "@styles/components/minha-conta/ProductInPedido.module.css"

import ProductInPedido from "@components/MinhaConta/ProductInPedido";
import { Product2 } from "@models/Product2";
import { ProductOrder } from "@models/ProductOrder";

interface ProductInPedidoList {
  products: Array<ProductOrder>;
}


export default function ProductInPedidoList(props: ProductInPedidoList) {
  React.useEffect(() => {
    // console.log("VENDO OS PRODUTOS PEDIDO", props.products)
  }, [props.products])

  return (
    <div className={styles.productList}>
      {props.products.map((product) => (
        <ProductInPedido key={product.id} product={product} />
      ))}
    </div>
  );
}
