import * as React from "react";


import ButtonRemoveItem from "@components/Buttons/ButtonRemoveItem";
import ButtonDecreaseItem from "@components/Buttons/ButtonDecreaseItem";
import ButtonIncreaseItem from "@components/Buttons/ButtonIncreaseItem";

import CartItemStyle from "@styles/components/carrinho/CartItem.module.css";
import { ProductOrder } from "@models/ProductOrder";
import FavoriteIcon from "@assets/icons/FavoriteIcon";
import ButtonIncreaseItemMobile from "@components/Buttons/ButtonIncreaseMobile";
import { Product2, PRODUTO_FINAL } from "@models/Product2";
import { FULL_PRICES } from "@models/masks";
import SmartImage from "@components/SmartImage";

interface CartItem {
  product: ProductOrder;
  actionRemove: any;
  actionIncrease: any;
  actionDecrease: any;
  update: any;
  details: any;
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

export default function CartItem(props: CartItem) {
  const [total, setTotal] = React.useState(0)
  var start: ProductOrder = {
    desconto: 0,
    id: +Math.random(),
    product_affiliate_id: 0,
    product_categoria: "",
    product_code: 0,
    product_descricao: "",
    product_ean: "",
    product_estoque: "",
    product_etiquetas: "",
    product_fabricacao: "",
    product_medida: "",
    product_thumbnail: "",
    comentario: '',
    caracteristica: '',
    product_valor: 0,
    quantidade: 0,
    valor: 0,
  }
  let thisProduct: Product2 = {
    id: props.product.id,
    product_affiliate_id: props.product.product_affiliate_id,
    product_code: props.product.product_code,
    product_ean: props.product.product_ean,
    uploadImages: '[]',
    product_descricao: props.product.product_descricao,
    product_valor: props.product.product_valor,
    product_categoria: props.product.product_categoria,
    product_fabricacao: props.product.product_fabricacao,
    product_status: '',
    product_estoque: props.product.product_estoque,
    product_medida: props.product.product_medida,
    product_etiquetas: props.product.product_etiquetas,
    product_thumbnail: props.product.product_thumbnail,
    product_site_tags: '',
    product_site_name: props.product.product_site_name ?? '',
    product_site_description: '',
    product_site_categories: '',
    product_site_variations: '',
    product_site_info: '',
    product_site_nutrition: '',
    product_site_value: props.product.product_site_value ?? 0,
    product_site_discount_value: props.product.product_site_discount_value ?? '',
    product_site_discount_type: props.product.product_site_discount_type ?? '',
    product_sell_by_weight: '',
    product_average_weight_value: '',
    product_average_weight_type: '',
    product_site_related_title: '',
    product_site_related_type: '',
    product_site_related_code: ''
  }

  const [comment, setComment] = React.useState<string>(props.product.comentario)
  const [caracteristica, setCaracteristica] = React.useState<string>(props.product.caracteristica)
  const [produtoFinal, setProdutoFinal] = React.useState<PRODUTO_FINAL>(FULL_PRICES(thisProduct))
  const [items2, setItems2] = React.useState<PRODUTO_FINAL>(produtoFinal)
  const [items, setItems] = React.useState<ProductOrder>(start)



  /*
    const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
 
    };
    */

  const onkeydown = (e: any) => {
    if (e.key === 'Enter') {
      setComment(e.nativeEvent.target.value)
      props.details(props.product.product_code, 'comentario', e.nativeEvent.target.value)
    }
  }

  React.useEffect(() => {


    setItems2(produtoFinal)
    setItems(props.product)
    setComment(props.product.comentario)
    setCaracteristica(props.product.caracteristica)

  }, [props.product, setItems, comment, setComment])

  React.useEffect(() => {
    //console.log('items2', items2)
    //console.log('items', items)
  }, [items2, items])

  return (
    <div className={CartItemStyle.cartItem}>
      <div className={CartItemStyle.main}>
        <div className={CartItemStyle.areaCategory}>
          {caracteristica ? (
            <div className={CartItemStyle.category2}>
              <FavoriteIcon />
              {caracteristica}
            </div>
          ) : (
            <div></div>
          )}

          <div className={CartItemStyle.photoButton}>
            <ButtonRemoveItem
              product_code={items.product_code}
              fn={props.actionRemove}
            />
            <div className={CartItemStyle.thumbnail}>
              {/* <Image
                src={
                  items.product_thumbnail
                    ? items.product_thumbnail
                    : "https://smart-images.nyc3.digitaloceanspaces.com/produto-sem-imagem.jpg"
                }
                layout="fill"
                objectFit="contain"
              /> */}
              <SmartImage
                src={
                  items.product_thumbnail
                    ? items.product_thumbnail
                    : "https://smart-images.nyc3.digitaloceanspaces.com/produto-sem-imagem.jpg"
                }
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        </div>

        <div className={CartItemStyle.product}>
          <div className={CartItemStyle.product_details}>
            <div className={CartItemStyle.productTop}>
              <div>
                <h3 className={CartItemStyle.name}>
                  {caseA(items.product_descricao)}
                  <br />
                </h3>

                <p className={CartItemStyle.unitsBox}>
                  {items.quantidade} {items.product_medida}
                  {items.quantidade > 1 && <span>s</span>}
                </p>

                <div className={`${CartItemStyle.price} d-lg-none`}>

                  <span>

                    {

                      items.valor ?
                        items.valor < items.product_valor ?

                          <div>
                            <span>
                              R$ {items.product_sell_by_weight ? Number(items.product_site_value).toFixed(2).replace(".", ",") : items.valor.toFixed(2).replace(".", ",")}
                            </span>
                            <span className={CartItemStyle.originalPrice}>
                              R$ {items.product_sell_by_weight ? Number(items.product_site_value).toFixed(2).replace(".", ",") : items.product_valor.toFixed(2).replace(".", ",")}
                            </span>
                          </div>
                          :
                          <span>
                            R$ {items.product_sell_by_weight ? Number(items.product_site_value).toFixed(2).replace(".", ",") : items.product_valor.toFixed(2).replace(".", ",")}
                          </span>
                        :
                        <span>
                          R$ {items.product_sell_by_weight ? Number(items.product_site_value).toFixed(2).replace(".", ",") : items.product_valor.toFixed(2).replace(".", ",")}
                        </span>


                    }




                  </span>

                </div>
              </div>

              <div className={CartItemStyle.amount}>
                {items.quantidade > 0 ?
                  <div className={CartItemStyle.boxAmount}>
                    <ButtonDecreaseItem
                      product={0}
                      product_code={items.product_code}
                      fn={props.actionIncrease}
                    />

                    <div className={CartItemStyle.inputValue}>
                      <span className={CartItemStyle.amountValue}>
                        {items.quantidade}
                      </span>
                      {/* <span className="sufix">g</span> */}
                    </div>

                    <ButtonIncreaseItem
                      product={0}
                      product_code={items.product_code}
                      fn={props.actionDecrease}
                    />
                  </div>
                  :

                  <div className={CartItemStyle.btnAddMobile}>
                    <ButtonIncreaseItemMobile

                      product={0}
                      product_code={items.product_code}
                      fn={props.actionDecrease}
                    />
                  </div>

                }




              </div>
            </div>

            <div className={`${CartItemStyle.price} ${CartItemStyle.hideMobile}`}>

              {

                items.valor ?
                  items.valor < items.product_valor ?
                    <div>
                      <span>
                        R$ {items.valor.toFixed(2).replace(".", ",")}
                      </span>
                      <span className={CartItemStyle.originalPrice}>
                        R$ {items.product_sell_by_weight ? Number(items.product_site_value).toFixed(2).replace(".", ",") : items.product_valor.toFixed(2).replace(".", ",")}
                      </span>
                    </div>
                    :
                    <span>
                      R$ {items.product_sell_by_weight ? items.valor.toFixed(2).replace(".", ",") : items.product_valor.toFixed(2).replace(".", ",")}
                    </span>
                  :
                  <span>
                    R$ {items.product_sell_by_weight ? items.valor.toFixed(2).replace(".", ",") : items.product_valor.toFixed(2).replace(".", ",")}
                  </span>


              }



              {/* 
              {items.desconto ? (
                <span>
                  R${" "}
                  {(items.product_valor - items.desconto)
                    .toFixed(2)
                    .replace(".", ",")}{" "}
                  <span className={CartItemStyle.originalPrice}>
                    R$ {items.product_valor.toFixed(2).replace(".", ",")}
                  </span>
                </span>
              ) : (
                <span>R$ {items.product_valor.toFixed(2).replace(".", ",")}</span>
              )} */}


              <div className={CartItemStyle.total}>
                Total:{" "}
                {
                  items.valor ?
                    items.valor < items.product_valor && items.quantidade >= (items.minimo_para_desconto ? items.minimo_para_desconto : 0) ?
                      <div>
                        <span>
                          R${" "} {(
                            items.valor * items.quantidade
                          )
                            .toFixed(2)
                            .replace(".", ",")}{" "}
                        </span>

                      </div>


                      :
                      <span className={CartItemStyle.totalValue}>
                        R${" "}
                        {(
                          items.valor * items.quantidade
                        )
                          .toFixed(2)
                          .replace(".", ",")}{" "}
                      </span>

                    :
                    <span className={CartItemStyle.totalValue}>
                      R${" "}
                      {(
                        items.product_valor * items.quantidade
                      )
                        .toFixed(2)
                        .replace(".", ",")}{" "}
                    </span>



                }

              </div>


            </div>
          </div>
        </div>
      </div>

      <div className={CartItemStyle.comment}>
        {comment != "" ? (
          <input
            className={`${comment ? CartItemStyle.textoInserido : ""}`}
            onKeyDown={onkeydown}
            type="text"
            placeholder="Adicione um comentário para o separador"
            value={comment}
          />
        ) : (
          <input
            onKeyDown={onkeydown}
            type="text"
            placeholder="Adicione um comentário para o separador"
          />
        )}
      </div>
    </div>
  );
}

