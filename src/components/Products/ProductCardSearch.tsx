
import { useState } from "react";
import { Product2, PRODUTO_FINAL } from "@models/Product2";
import productCardStyle from "@styles/components/ProductCardSearch.module.css";
import FavoriteIcon from "@assets/icons/FavoriteIcon";
import WishlistIcon from "@assets/icons/WishlistIcon";
import React from "react";
import ProductCardFooter from "@components/Footer/ProductCardFooter";
import { Api } from "@components/providers";
import { ajustStrigfy, FULL_PRICES } from "@models/masks";
import SmartImage from "@components/SmartImage";
import { AppContext } from "src/pages/_app";

interface StaticPropsResult {
  product: Product2;
  onClick: any;
  addCart: any;
  removeCart: any;
  noCarrinho: any;
  style?: any
}

export default function ProductCardSearch(props: StaticPropsResult) {

  const [total, setTotal] = useState<number>(0)
  const [element, setElement] = useState<number>(1);
  const [quantidade, setQuantidade] = useState<number>(props.noCarrinho(props.product.product_code))
  const [produtoFinal, setProdutoFinal] = useState<PRODUTO_FINAL>(FULL_PRICES(props.product))

  const [otherRelateds2, setOther] = useState<number[]>()
  async function MY_RELATEDS_DEFAULT2(product_code: number, category: string) {
    let myRelateds: number[] = []
    await Api.post('/getRealatedsDefault', { affiliate_id: process.env.AFFILIATE_ID, category: category, product_code: product_code }).then(response => {
      for (const k in response.data) {
        myRelateds.push(response.data[k].product_code)
      }
      setOther(myRelateds)

    })

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
  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {

    event.currentTarget.src = 'https://smart-images.nyc3.digitaloceanspaces.com/produto-sem-imagem.jpg';
    event.currentTarget.srcset = 'https://smart-images.nyc3.digitaloceanspaces.com/produto-sem-imagem.jpg';
    event.preventDefault();
    event.stopPropagation();
  };

  const imageOnLoad = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {

  };
  const {
    setProdutoLista,
    setShowLists
  } = React.useContext(AppContext);

  async function mudaLists(produto: Product2) {
    await setShowLists(true)
    await setProdutoLista(produto)
  }


  return (
    <div style={props.style} className={productCardStyle.productCardSearch}>

      <div className={productCardStyle.main}>
        <div className={productCardStyle.header}>

          {props.product.product_site_tags ? (
            <div className={productCardStyle.categoryBox}>
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

        <div className={productCardStyle.body} onClick={() => props.onClick(props.product.product_code, (props.product.product_site_related_code) ? JSON.parse(ajustStrigfy(props.product.product_site_related_code)) : otherRelateds2)}  >
          <div className={productCardStyle.productImgContainer}>
            <SmartImage
              src={props.product.product_thumbnail}
              onError={imageOnErrorHandler}
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
              01 {props.product.product_medida}

            </p>

            <div className={productCardStyle.rating}>★★★★★</div>
            <div className={productCardStyle.price}>
              {
                produtoFinal.venda.preco_venda < props.product.product_valor && quantidade >= produtoFinal.venda.minimo_para_desconto ?
                  <span>
                    R$ {produtoFinal.venda.preco_venda?.toFixed(2).replace(".", ",")}{" "}
                    <span className={productCardStyle.originalPrice}>
                      R$ {props.product.product_valor?.toFixed(2).replace(".", ",")}
                    </span>
                  </span>

                  :
                  <span> R$  {props.product.product_valor?.toFixed(2).replace(".", ",")}</span>
              }
            </div>
          </div>
        </div>


        <div className={productCardStyle.addProduct} onClick={() => setElement(0)}>

          <ProductCardFooter setView={startEdit} quantidade={props.noCarrinho(props.product.product_code)} option={element} product={props.product} handleAdd={props.onClick}
            addCart={props.addCart} removeCart={props.removeCart} />

        </div>

      </div>
    </div>


  );
}
