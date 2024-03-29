import { useEffect, useState } from "react";

import productCardStyle from "@styles/components/ProductCard.module.css";
import { FULL_PRICES } from "@models/masks";
import styles from "@styles/components/minha-conta/ProductInLista.module.css";
import { Product2, PRODUTO_FINAL } from "@models/Product2";
import ProductSearchFooter from "@components/Footer/ProductSearchFooter";
import SmartImage from "@components/SmartImage";

interface ProductInListaProps {
  product: Product2;

  noCarrinho: any;
  increase: any;
  decrease: any;

}

export default function ProductInSearch(props: ProductInListaProps) {
  const [checked, setChecked] = useState(false);
  const [total, setTotal] = useState<number>(0)
  const [element, setElement] = useState<number>(1);
  const [quantidade, setQuantidade] = useState<number>(props.noCarrinho(props.product.product_code))
  const [produtoFinal, setProdutoFinal] = useState<PRODUTO_FINAL>(FULL_PRICES(props.product))
  function startEdit(product_code: number, product: Product2) {

    setElement(0);
    props.increase(product_code, product)


  }

  useEffect(() => {


  }, [setTotal, setElement, props])
  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = 'https://admin.api-smartcomerci.com.br/images/default/produto-sem-imagem.jpg';
    event.currentTarget.className = "error";
  };


  return (
    <div className={styles.product}>




      <div className={styles.thumbnail}>
        <SmartImage
          onError={imageOnErrorHandler}
          src={props.product.product_thumbnail ? (props.product.product_thumbnail) :
            (
              "https://loja.api-smartcomerci.com.br/images/default/produto-sem-imagem.jpg"
            )} width={74} height={64} objectFit={"contain"} layout={"responsive"} />
      </div>
      <div>
        <div className={styles.name}>{props.product.product_site_name}</div>
        <p className={productCardStyle.unitsBox}>
          {props.product.product_estoque} unidade
          {Number(props.product.product_estoque) > 1 && <span>s</span>}
        </p>
      </div>
      <div className={styles.boxPrice}>

        <div className={styles.price}>

          {produtoFinal.venda.preco_venda < props.product.product_valor && quantidade >= produtoFinal.venda.minimo_para_desconto ?
            <div>
              <div>R$ {produtoFinal.venda.preco_venda.toFixed(2).replace('.', ',')}</div>
              <div className={styles.originalPrice}>R$ {props.product.product_valor.toFixed(2).replace('.', ',')}</div>
            </div>


            :

            <  div>R$ {props.product.product_valor.toFixed(2).replace('.', ',')}</div>
          }
        </div>


      </div>




      <div className={styles.colRight}>


        <div className={styles.amount2}>
          <div className={productCardStyle.addProduct} onClick={() => setElement(0)}>

            <ProductSearchFooter setView={startEdit} quantidade={props.noCarrinho(props.product.product_code)} option={element} product={props.product} handleAdd={undefined}
              addCart={props.increase} removeCart={props.decrease} />

          </div>
        </div>

      </div>



    </div>
  );
}
