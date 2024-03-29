
import ProductCard from "@components/Products/ProductCard";
import { useProductsRelateds } from "src/hooks/useProductsRelateds";
import ProductCardListStyle from '@styles/components/ProductCardList.module.css'
import { useContext, useEffect, useMemo, useState } from "react";

import React from "react";
import { AppContext } from "src/pages/_app";

interface ProductCardListProps {
  mdCep?: any
  onClick: any
  handleAdd2: any
  productList: number[] | null;
  increase: any
  decrease: any
  remove: any
  noCarrinho: any
  AFFILIATE_ID: any
}

export default function ProductCardListHome(props: ProductCardListProps) {

  const { tasks3, getAllRelacteds } = useProductsRelateds();



  useEffect(() => {
    console.log({ propList: props.productList, affID: props.AFFILIATE_ID })
    if (props.productList != null) {
      getAllRelacteds(props.AFFILIATE_ID, props.productList)
    }
  }, [])





  return (
    <div className={ProductCardListStyle.list}>
      {tasks3.map((product, index) => (
        product.product_status === 'active' ?
          <ProductCard
            noCarrinho={props.noCarrinho}
            addCart={props.increase}
            removeCart={props.decrease}
            onClick={props.onClick}
            handleAdd={props.handleAdd2}
            key={product.id}
            product={product}
          />
          : <div key={index} className="oculta"></div>
      ))}
    </div>
  );
}
