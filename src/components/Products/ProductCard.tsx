import Image from "next/image";
import { useEffect, useState, useContext, useMemo } from "react";


import { Product2, PRODUTO_FINAL } from "@models/Product2";

import productCardStyle from "@styles/components/ProductCard.module.css";

import FavoriteIcon from "@assets/icons/FavoriteIcon";
import WishlistIcon from "@assets/icons/WishlistIcon";
import React from "react";
import ProductCardFooter from "@components/Footer/ProductCardFooter";
import { FULL_PRICES } from "@models/masks";
import SmartImage from "@components/SmartImage";
import { AppContext } from "src/pages/_app";
import { sellByWeightDefault } from "src/helpers/helpers";


interface StaticPropsResult {
  product: Product2;
  onClick?: any
  addCart: any;
  handleAdd: any;

  removeCart: any;
  noCarrinho: any

}

export default function ProductCard(props: StaticPropsResult) {

  const [element, setElement] = useState<number>(1);
  const [quantidade, setQuantidade] = useState<number>(0)
  const [produtoFinal, setProdutoFinal] = useState<PRODUTO_FINAL>(FULL_PRICES(props.product))
  const [productsRelateds, setRelateds] = useState<number[]>()
  const [otherRelateds2, setOtherRelateds] = useState<number[]>()

  function startEdit(product_code: number, product: Product2) {
    setElement(0);
    props.addCart(product_code, product)
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
  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = 'https://smart-images.nyc3.digitaloceanspaces.com/produto-sem-imagem.jpg';
    event.currentTarget.className = "error";
  };


  const {
    setProdutoLista,
    setShowLists
  } = React.useContext(AppContext);

  async function mudaLists(produto: Product2) {
    await setShowLists(true)
    await setProdutoLista(produto)
  }
  useEffect(() => {
    if (props.noCarrinho) {
      const qtd = props.noCarrinho(props.product.product_code)
      setQuantidade(qtd)
    }
  }, [])

  return (
    <div className={productCardStyle.productCard}>

      <div className={productCardStyle.main}>
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

        <div className={productCardStyle.body} onClick={() => props.handleAdd(props.product.product_code, productsRelateds)}  >
          <div className={productCardStyle.productImgContainer}>

            <SmartImage
              onError={imageOnErrorHandler}

              src={
                props.product.product_thumbnail
                  ? props.product.product_thumbnail
                  : "https://smart-images.nyc3.digitaloceanspaces.com/produto-sem-imagem.jpg"
              }


              layout="fill"
              objectFit="contain"
            />
          </div>
          {
            produtoFinal.venda.tipo_desconto === 'atacado' ?
              <div className="atacadao" >
                <p style={{ fontSize: "10pt" }}>A partir de {produtoFinal.venda.minimo_para_desconto} un</p>
                <h3 style={{ fontWeight: 'bold', color: 'var(--primary)', fontSize: '1.6rem' }}>R$ {produtoFinal.venda.preco_venda.toFixed(2).replace(".", ",")}</h3>
              </div>
              :
              <div className="oculta"></div>
          }


          <div className={productCardStyle.containerInner}>
            <p className={productCardStyle.productionType}>
              {
                props.product.product_fabricacao != 'TERCEIRO' ? props.product.product_fabricacao : ''
              }
            </p>

            <h3 className={productCardStyle.productName}>
              {caseA(props.product.product_site_name)}
            </h3>

            <p className={productCardStyle.unitsBox}>
              01 {produtoFinal.produto.product_sell_by_weight ? 'UN' : props.product.product_medida}

            </p>

            <div className={productCardStyle.rating}>★★★★★</div>

            {
              produtoFinal.venda.existe_desconto && produtoFinal.venda.tipo_desconto === "levePague" ?
                <div>{caseA(produtoFinal.venda.percentual_valor_descontado.toString())}</div>
                :
                <div className="oculta"></div>
            }

            <div className={productCardStyle.price}>
              {
                produtoFinal.venda.preco_venda < produtoFinal.produto.product_valor && quantidade >= produtoFinal.venda.minimo_para_desconto ?

                  produtoFinal.venda.existe_desconto && quantidade >= produtoFinal.venda.minimo_para_desconto ?
                    <span>
                      R$  {
                        quantidade >= produtoFinal.venda.minimo_para_desconto ?
                          produtoFinal.venda.preco_venda?.toFixed(2).replace(".", ",")
                          :
                          produtoFinal.venda.valor_bruto?.toFixed(2).replace(".", ",")
                      }{" "}
                      <span className={productCardStyle.originalPrice}>
                        R$ {produtoFinal.venda.valor_bruto?.toFixed(2).replace(".", ",")}
                      </span>
                    </span>


                    :
                    <span>
                      R$  {produtoFinal.produto.product_sell_by_weight && JSON.parse(produtoFinal.produto.product_sell_by_weight ?? sellByWeightDefault).compraPorPeso ? produtoFinal.venda.preco_venda?.toFixed(2).replace(".", ",") : produtoFinal.venda.preco_venda?.toFixed(2).replace(".", ",")}{" "}
                      <span className={productCardStyle.originalPrice}>
                        R$ {produtoFinal.produto.product_sell_by_weight && JSON.parse(produtoFinal.produto.product_sell_by_weight ?? sellByWeightDefault).compraPorPeso ? produtoFinal.produto.product_site_value?.toFixed(2).replace(".", ",") : produtoFinal.produto.product_valor?.toFixed(2).replace(".", ",")}
                      </span>
                    </span>
                  :

                  <span> R$  {produtoFinal.produto.product_sell_by_weight && JSON.parse(produtoFinal.produto.product_sell_by_weight ?? sellByWeightDefault).compraPorPeso ?
                    quantidade >= produtoFinal.venda.minimo_para_desconto ?
                      produtoFinal.venda.preco_venda?.toFixed(2).replace(".", ",") : produtoFinal.venda.valor_bruto?.toFixed(2).replace(".", ",") : produtoFinal.venda.valor_bruto?.toFixed(2).replace(".", ",")}</span>
              }
            </div>
          </div>
        </div>


        <div className={productCardStyle.addProduct}>

          <ProductCardFooter onClick={props.onClick} setView={startEdit} quantidade={quantidade} option={element} product={props.product} handleAdd={props.handleAdd}
            addCart={props.addCart} removeCart={props.removeCart} />

        </div>



      </div>
    </div>


  );
}
