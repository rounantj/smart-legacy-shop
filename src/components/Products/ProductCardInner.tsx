import Image from "next/image";
import { useEffect, useState } from "react";


import { Product2, PRODUTO_FINAL } from "@models/Product2";

import productCardStyle from "@styles/components/ProductCard.module.css";

import FavoriteIcon from "@assets/icons/FavoriteIcon";
import WishlistIcon from "@assets/icons/WishlistIcon";
import CartIcon from "@assets/icons/CartIcon";

import Modal from "@components/Modals/Modal";
import ModalProduct from "@components/Modals/ModalProduct";

import React from "react";
import Button from "@components/Buttons/Button";
import { useProductsRelateds } from "src/hooks/useProductsRelateds";
import ProductCardFooter from "@components/Footer/ProductCardFooter";
import ProductCardFooterInner from "@components/Footer/ProductCardFooterInner";
import UnityIcon from "@assets/icons/UnityIcon";
import WheightIcon from "@assets/icons/WheightIcon";
import { ajustStrigfy, FULL_PRICES, setProductToList } from "@models/masks";
import SmartImage from "@components/SmartImage";
import { AppContext } from "src/pages/_app";

interface StaticPropsResult {

  product: Product2;
  handleAdd: any;
  addCart: any;
  removeCart: any;
  noCarrinho: any
  handleAdd3: any
  prdRelacteds: Product2[]
}

export default function ProductCard(props: StaticPropsResult) {
  const [total, setTotal] = useState<number>(0)
  const [element, setElement] = useState<number>(1);
  const [medida, setMedida] = useState<string>(props.product.product_medida);
  const [mMedida, SetmMedida] = useState<boolean>(false);
  const [quantidade, setQuantidade] = useState<number>(props.noCarrinho(props.product.product_code))
  const [mostraMedidas, setMostraMedidas] = useState<boolean>(false)
  const [produtoFinal, setProdutoFinal] = useState<PRODUTO_FINAL>(FULL_PRICES(props.product))



  function medidasTrigger() {
    setMostraMedidas(!mostraMedidas)
  }

  function mMedidaTrigger() {
    SetmMedida(!mMedida)
  }


  useEffect(() => {
    setMedida(props.product.product_medida)

  }, [setTotal, setMedida, medida, setElement, props])

  function alteraMedida() {
    if (medida == 'un') {
      setMedida('kg')
    } else {
      setMedida('un')
    }
  }
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

  function startEdit(product_code: number, product: Product2) {

    setElement(0);
    props.addCart(product_code, product)


  }
  function changeProductView(code: number) {

    //props.handleAdd3(code, relateds)
    props.handleAdd3(code)
    window.document.getElementById('scrollTop')?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    window.scrollTo(0, 0)

  }
  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = 'https://api-smart-939610cb57d8.herokuapp.com/images/default/produto-sem-imagem.jpg';
    event.currentTarget.className = "error";
  };
  const {
    showLists,
    produtoLista,
    setProdutoLista,
    setShowLists
  } = React.useContext(AppContext);

  async function mudaLists(produto: Product2) {
    //  console.log('alterando show')
    await setShowLists(true)
    await setProdutoLista(produto)
    //  console.log('resultado',showLists)
  }

  return (
    <div onMouseEnter={() => medidasTrigger()} onMouseLeave={() => medidasTrigger()} className={productCardStyle.productCard}>

      <div className={productCardStyle.main2}>
        <div className={productCardStyle.header}>

          {props.product.product_site_tags ? (
            <div onClick={() => location.replace("../busca?" + props.product.product_site_tags.split(",")[0])} className={productCardStyle.categoryBox}>
              <FavoriteIcon />
              <span>{props.product.product_site_tags.split(",")[0]}</span>
            </div>
          ) : (
            <div>
              <span></span>
            </div>

          )}



          <div onClick={() => mudaLists(props.product)} className={productCardStyle.whishlist}>
            <WishlistIcon />
          </div>
        </div>

        <div className={productCardStyle.body} onClick={() => changeProductView(props.product.product_code)} >
          <div className={productCardStyle.productImgContainer}>
            {/* <Image
              onError={imageOnErrorHandler}
              src={props.product.product_thumbnail ? (props.product.product_thumbnail) :
                (
                  "https://api-smart-939610cb57d8.herokuapp.com/images/default/produto-sem-imagem.jpg"
                )}
              layout="fill"
              objectFit="contain"

            /> */}
            <SmartImage
              onError={imageOnErrorHandler}
              src={props.product.product_thumbnail ? (props.product.product_thumbnail) :
                (
                  "https://api-smart-939610cb57d8.herokuapp.com/images/default/produto-sem-imagem.jpg"
                )}
              layout="fill"
              objectFit="contain"

            />
          </div>

          <div className={productCardStyle.containerInner}>
            <p className={productCardStyle.productionType}>
              {
                props.product.product_fabricacao != 'TERCEIRO' ? props.product.product_fabricacao : ''
              }
            </p>

            <h3 className={productCardStyle.productName}>
              {props.product.product_site_name ? (caseA(props.product.product_site_name)) : (props.product.product_descricao)}
            </h3>

            <p className={productCardStyle.unitsBox}>
              01 {props.product.product_medida}

            </p>

            <div className={productCardStyle.rating}>★★★★★</div>

            <div className={productCardStyle.price}>

              {produtoFinal.venda.preco_venda < produtoFinal.produto.product_valor && quantidade >= produtoFinal.venda.minimo_para_desconto ? (
                <span>
                  R$ {produtoFinal.venda.preco_venda?.toFixed(2).replace(".", ",")}{" "}
                  <span className={productCardStyle.originalPrice}>
                    R$ {props.product.product_valor?.toFixed(2).replace(".", ",")}
                  </span>
                </span>
              ) : (
                <span>  R$  {props.product.product_valor?.toFixed(2).replace(".", ",")}</span>
              )}
            </div>
          </div>

        </div>
        {produtoFinal.produto.product_sell_by_weight && JSON.parse(produtoFinal.produto.product_sell_by_weight).compraPorPeso ?

          <div id="areaHiden" className={`${productCardStyle.areaHiden} ${mostraMedidas ? '' : 'oculta'} `}>
            <div onClick={() => mMedidaTrigger()} className={`${productCardStyle.blocoHiden} ${mMedida ? productCardStyle.blocoActive : ''}`}>
              <UnityIcon /> Unidade
            </div>
            <div onClick={() => mMedidaTrigger()} className={`${productCardStyle.blocoHiden} ${!mMedida ? productCardStyle.blocoActive : ''}`}>
              <WheightIcon /> Peso
            </div>
          </div>





          :
          <div></div>
        }
      </div>









      <ProductCardFooterInner setView={startEdit} quantidade={props.noCarrinho(props.product.product_code)} option={element} product={props.product} handleAdd={props.handleAdd}
        addCart={props.addCart} removeCart={props.removeCart} />






    </div>


  );
}

const style = {
  innerHeight: '150px',
}