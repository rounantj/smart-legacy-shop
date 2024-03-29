import Link from "next/link";

import productCardStyle from "@styles/components/ProductCard.module.css";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

 

import footerStyle from "@styles/components/Footer.module.css";
import CartIconB from "@assets/icons/CartIconB";

import { Product2 } from "@models/Product2";
import BtnBrancoDecrease from "@components/Buttons/btnBrancoDecrease";
import BtnBrancoIncrease from "@components/Buttons/btnBrancoIncrease";
 

interface StaticPropsResult {
  product: Product2; 
  handleAdd: any;
  addCart: any;
  removeCart: any;  
  option: number
  quantidade: any
  setView: any
}

function ProductSearchFooter(props:StaticPropsResult) {
  const [ quantidade, setQuantidade] = useState<number>(props.quantidade)

  useEffect(()=>{
 
  },[quantidade])
  useEffect(()=>{
    setQuantidade(props.quantidade)
  },[props.quantidade])

  return (
    <div>
      { quantidade < 1?
        <div  onClick={() => props.setView(props.product.product_code, props.product)} className={productCardStyle.footer4}>
          <CartIconB />
          <span>Adicionar</span>
        </div>
      :
        <div  className={productCardStyle.footer3}>
          <div className={productCardStyle.botao}>
            <BtnBrancoDecrease product={props.product} product_code={props.product.product_code} fn={props.removeCart} />
          </div>
         
          <span className={productCardStyle.quantidadeAdd}>{props.quantidade}</span>
          <div  className={productCardStyle.botao}>
            <BtnBrancoIncrease  product={props.product} product_code={props.product.product_code} fn={props.addCart} />
          </div>
        </div>
      }
      
    </div>
    
  );
}
export default ProductSearchFooter;
