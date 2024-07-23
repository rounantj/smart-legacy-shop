import SmartImage from "@components/SmartImage";;

import { Product } from "@models/Product";

import styles from "@styles/components/minha-conta/ProductInPedido.module.css";
import { Product2, PRODUTO_FINAL } from "@models/Product2";
import { ProductOrder } from "@models/ProductOrder";
import React, { useEffect } from "react";
import { FULL_PRICES } from "@models/masks";

interface ProductInPedido {
  product: ProductOrder;
}

export default function ProductInPedido(props: ProductInPedido) {

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

  const [produtoFinal, setProdutoFinal] = React.useState<PRODUTO_FINAL>(FULL_PRICES(thisProduct))

  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = 'https://api-smart-939610cb57d8.herokuapp.com/images/default/produto-sem-imagem.jpg';
    event.currentTarget.className = "error";
  };

  useEffect(() => {
    // console.log(produtoFinal, props.product)
  }, [produtoFinal])


  return (
    <div className={styles.product}>
      <div className={styles.thumbnail}>
        <SmartImage
          onError={imageOnErrorHandler}
          src={props.product.product_thumbnail ? (props.product.product_thumbnail) :
            (
              "https://api-smart-939610cb57d8.herokuapp.com/images/default/produto-sem-imagem.jpg"
            )}
          width={53}
          height={46} objectFit={"contain"} layout={"responsive"} />
      </div>

      <div className={styles.body}>
        <div className={styles.name}>{props.product.product_descricao}</div>
        <div className={styles.units}>{props.product.quantidade} {props.product.product_sell_by_weight && JSON.parse(props.product.product_sell_by_weight).compraPorPeso ? produtoFinal.produto.product_average_weight_type : props.product.product_medida}</div>
        <div className={styles.total}>Total: <span className={styles.value}>R$ {


          (produtoFinal.venda.preco_venda * props.product.quantidade).toFixed(2).replace('.', ',')

        }</span></div>
      </div>
    </div>
  );
}
