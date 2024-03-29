import Link from "next/link";

import productCardStyle from "@styles/components/ProductCard.module.css";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";



import footerStyle from "@styles/components/Footer.module.css";
import CartIcon from "@assets/icons/CartIcon";

import { Product2 } from "@models/Product2";
import BtnBrancoDecrease from "@components/Buttons/btnBrancoDecrease";
import BtnBrancoIncrease from "@components/Buttons/btnBrancoIncrease";


interface StaticPropsResult {
  product: Product2;
  handleAdd: any;
  addCart: any;
  removeCart: any;
  option: number
  onClick?: any
  quantidade: any;
  setView: any;
}

function ProductCardFooter(props: StaticPropsResult) {
  function caseA(text: string) {
    var list = text.split(" "), newText = ""
    for (const k in list) {
      var word = list[k].split(""), counter = 0, newWord = ""
      for (const u in word) {
        if (counter === 0) {
          if (word[u] != "") {
            newWord += word[u].toUpperCase()
          }
        }
        else {
          newWord += word[u].toLowerCase()
        }
        counter++
      }
      newText += newWord + " "
    }
    return newText
  }



  return (
    <div onClick={props?.onClick}>
      {props.quantidade < 1 ?
        <div onClick={() => props.setView(props.product.product_code, props.product)} className={productCardStyle.footer}>
          <CartIcon />
          <span>Adicionar</span>
        </div>
        :
        <div className={productCardStyle.footer2}>
          <div className={productCardStyle.botao}>
            <BtnBrancoDecrease product={props.product} product_code={props.product.product_code} fn={props.removeCart} />
          </div>

          <span className={productCardStyle.quantidadeAdd}>{props.quantidade}</span>
          <div className={productCardStyle.botao}>
            <BtnBrancoIncrease onClick={props?.onClick} product={props.product} product_code={props.product.product_code} fn={props.addCart} />
          </div>
        </div>
      }

    </div>

  );
}
export default ProductCardFooter;
