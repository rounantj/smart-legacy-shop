import { Product2 } from "../../domain/models/Product2";
import ProductCard from "@components/Products/ProductCard";
import { useProductsRelateds } from "src/hooks/useProductsRelateds";
import ProductCardListStyle from '@styles/components/ProductCardList.module.css'
import   { useEffect, useState } from "react";
import Modal from "@components/Modals/Modal";
import ModalProduct from "@components/Modals/ModalProduct";
 
import React from "react";
import Button from "@components/Buttons/Button";
import ProductCardInner from "./ProductCardInner";
import LoadingSpinnerG from "@components/SpinnerG";

interface ProductCardListProps {
 
 products2: Product2[];
 handleAdd2:any
 addCart: any;
 removeCart: any;
 noCarrinho:any
 handleAdd3: any
 relacteds: Product2[]
}

export default function ProductCardList(props: ProductCardListProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() =>{
   // console.log('relacteds props',props)
    try{
      let list : Product2[] = props.products2
     // console.log(list)
      list.map(l =>{
     //   console.log(l)
      })
      setIsLoading(false)
    }catch(er){
      props.products2 = []
    }
  }, [props])
 
 
  return (
    isLoading ? <LoadingSpinnerG style={
      { margin: 'auto' }
    }/> :
    <div className={` ${ProductCardListStyle.list} ${ProductCardListStyle.listSlider} `}>
      
     
      
      {props?.products2?.map((product) => (
          <ProductCardInner prdRelacteds={props.relacteds} handleAdd3={props.handleAdd3}  noCarrinho={props.noCarrinho} addCart={props.addCart} removeCart={props.removeCart} handleAdd={props.handleAdd2}  key={product.id} product={product}     /> 
       ))} 
  
         
      
          
     
      
    </div>
  );
}
