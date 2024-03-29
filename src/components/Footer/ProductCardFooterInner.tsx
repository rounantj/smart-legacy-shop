import Link from "next/link";

import productCardStyle from "@styles/components/ProductCard.module.css";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

 

import footerStyle from "@styles/components/Footer.module.css";
import CartIcon from "@assets/icons/CartIcon";
import ButtonDecreaseItem from "@components/Buttons/ButtonDecreaseItem";
import ButtonIncreaseItem from "@components/Buttons/ButtonIncreaseItem";
import { Product2 } from "@models/Product2";
import BtnBrancoIncrease from "@components/Buttons/btnBrancoIncrease";
import BtnBrancoDecrease from "@components/Buttons/btnBrancoDecrease";

interface StaticPropsResult {
  product: Product2; 
  handleAdd: any;
  addCart: any;
  removeCart: any;  
  option: number

  quantidade: any
  setView: any;
}

function ProductCardFooter(props:StaticPropsResult) {
  useEffect(()=>{

  },[props])

  const [ quantidade, setQuantidade] = useState<number>(props.quantidade)

  useEffect(()=>{
 
  },[quantidade])
  useEffect(()=>{
    setQuantidade(props.quantidade)
  },[props.quantidade])

  return (
    <div >
      { quantidade < 1 ?
        <div onClick={() => props.setView(props.product.product_code, props.product)} className={productCardStyle.footer}>
          <CartIcon />
          <span>Adicionar</span>
        </div>
      :
        <div  className={productCardStyle.footer2}>
          <div className={productCardStyle.botao}>
            <BtnBrancoDecrease product={props.product} product_code={props.product.product_code} fn={props.removeCart} />
          </div>
         
          <span className={productCardStyle.quantidadeAdd}>{ props.quantidade}</span>
          <div  className={productCardStyle.botao}>
            <BtnBrancoIncrease  product={props.product} product_code={props.product.product_code} fn={props.addCart} />
          </div>
        </div>
      }
      
    </div>
    
  );
}
export default ProductCardFooter;
