import { Product2 } from "../../domain/models/Product2";
import ProductCard from "@components/Products/ProductCard";
import { useProductsRelateds } from "src/hooks/useProductsRelateds";
import ProductCardListStyle from '@styles/components/ProductCardList.module.css'
import   { useEffect, useState } from "react";
import Modal from "@components/Modals/Modal";
import ModalProduct from "@components/Modals/ModalProduct";
 
import React from "react";
import Button from "@components/Buttons/Button";

interface ProductCardListProps {
 products2: Product2[];
 handleAdd2:any
 addCart: any;
 removeCart: any;
 noCarrinho:any
}

export default function ProductCardList(props: ProductCardListProps) {
 //otro
 
  return (
    <div className={ProductCardListStyle.list}>  
      
      {props?.products2?.map((product) => (
          <ProductCard noCarrinho={props.noCarrinho} addCart={props.addCart} removeCart={props.removeCart} handleAdd={props.handleAdd2}  key={product.id} product={product}    /> 
       ))} 
   
          
     
      
    </div>
  );
}
