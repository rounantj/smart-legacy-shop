import SmartImage from "@components/SmartImage";;

import ButtonDecreaseItem from "@components/Buttons/ButtonDecreaseItem";
import ButtonIncreaseItem from "@components/Buttons/ButtonIncreaseItem";

import styles from "@styles/components/modals/SearchProducts/SearchProductCard.module.css";
import { Product2 } from "@models/Product2";
import { useEffect, useState } from "react";
import ButtonIncreaseItemMobile from "@components/Buttons/ButtonIncreaseMobile";
interface ProductInListaProps {
  product: Product2;

  noCarrinho: any;
  increase: any;
  decrease: any;

}
export default function SearchProductCard(props: ProductInListaProps) {

  const [quantidade, setQuantidade] = useState<number>(props.noCarrinho(props.product.product_code))
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
  useEffect(() => {
    setQuantidade(props.noCarrinho(props.product.product_code))

  }, [props])
  useEffect(() => {

  }, [quantidade])
  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = 'https://smart-images.nyc3.digitaloceanspaces.com/produto-sem-imagem.jpg';
    event.currentTarget.className = "error";
  };


  return (
    <div className={styles.cartItem}>
      <div className={styles.thumbnailArea}>
        <div className={styles.thumbnail}>
          {/* <Image
            onError={imageOnErrorHandler}
            src={
              props.product.product_thumbnail ? props.product.product_thumbnail :
                "https://smart-images.nyc3.digitaloceanspaces.com/produto-sem-imagem.jpg"
            }
            layout="fill"
            objectFit="contain"
          /> */}
          <SmartImage
            onError={imageOnErrorHandler}
            src={
              props.product.product_thumbnail ? props.product.product_thumbnail :
                "https://smart-images.nyc3.digitaloceanspaces.com/produto-sem-imagem.jpg"
            }
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>

      <div className={styles.product}>
        <div className={styles.product_details}>
          <h3 className={styles.name}>
            {caseA(props.product.product_site_name)}
          </h3>
          {props.product.product_sell_by_weight ?
            props.product.product_average_weight_value ?
              <p className={styles.unitsBox}>aproximadamente {props.product.product_average_weight_value}{props.product.product_average_weight_type}</p>
              :
              <div></div>
            :
            <div></div>
          }


          <div className={`${styles.price} d-lg-none`}>
            <span>
              {props.product.product_valor ?
                props.product.product_valor < props.product.product_valor ?
                  <div><div>R$ {props.product.product_valor}</div> <span className={styles.originalPrice}>{props.product.product_valor}</span></div>
                  :
                  <div>R$ {props.product.product_valor}</div>
                :
                <div>R$ {props.product.product_valor}</div>
              }


            </span>
          </div>
        </div>
      </div>

      <div>
        {quantidade > 0 ?

          <div className={styles.amount}>
            <ButtonDecreaseItem product={props.product} product_code={props.product.product_code} fn={props.decrease} />

            <div className={styles.inputValue}>
              <span className={styles.amountValue}>{quantidade}</span>
            </div>

            <ButtonIncreaseItem product={props.product} product_code={props.product.product_code} fn={props.increase} />
          </div>


          :
          <div className={styles.btnAddMobile}>
            <ButtonIncreaseItemMobile

              product={props.product}
              product_code={props.product.product_code}
              fn={props.increase}
            />
          </div>
        }

      </div>
    </div>
  );
}
