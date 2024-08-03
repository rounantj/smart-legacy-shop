import * as React from "react";

import { Product } from "@models/Product";

import styles from "@styles/components/checkout/CheckoutList.module.css"

import CheckoutItem from "./CheckoutItem";
import { ProductOrder } from "@models/ProductOrder";
import { Cart } from "@models/Cart";
import { Product2 } from "@models/Product2";
import { Api } from "@components/providers";

interface CheckoutList {
  products: ProductOrder[];
  increase: any
  decrease: any
  remove: any

}

export default function CheckoutList(props: CheckoutList) {
  return (
    <div className={styles.checkoutList}>
      {props.products.map((product) => (
        <CheckoutItem actionDecrease={props.decrease} actionRemove={props.remove} actionIncrease={props.increase} key={product.id} product={product} />
      ))}
    </div>
  );
}
