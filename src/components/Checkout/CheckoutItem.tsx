

import ButtonRemoveItem from "@components/Buttons/ButtonRemoveItem";
import ButtonDecreaseItem from "@components/Buttons/ButtonDecreaseItem";
import ButtonIncreaseItem from "@components/Buttons/ButtonIncreaseItem";

import styles from "@styles/components/checkout/CheckoutItem.module.css";
import { ProductOrder } from "@models/ProductOrder";
import SmartImage from "@components/SmartImage";
import { useEffect } from "react";

interface CheckoutItem {
  product: ProductOrder;
  actionIncrease: any;
  actionDecrease: any;
  actionRemove: any;
}

export default function CheckoutItem(props: CheckoutItem) {
  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = 'https://api-smart-939610cb57d8.herokuapp.com/images/default/produto-sem-imagem.jpg';
    event.currentTarget.className = "error";
  };


  useEffect(() => {
    //console.log('props da cehckout item', props)
  }, [props])

  return (
    <div className={styles.checkoutItem}>
      <ButtonRemoveItem
        product_code={props.product.product_code}
        fn={props.actionRemove}
      />

      <div className={styles.thumbnail}>
        {/* <Image
        onError={imageOnErrorHandler}
          src={
            props.product.product_thumbnail
              ? props.product.product_thumbnail
              : "https://api-smart-939610cb57d8.herokuapp.com/images/default/produto-sem-imagem.jpg"
          }
          layout="fill"
          objectFit="contain"
        /> */}

        {
          props.product.product_thumbnail &&
            props.product.product_thumbnail != 'undefined' ?
            <SmartImage
              onError={imageOnErrorHandler}
              src={
                props.product.product_thumbnail
                  ? props.product.product_thumbnail
                  : "https://api-smart-939610cb57d8.herokuapp.com/images/default/produto-sem-imagem.jpg"
              }
              layout="fill"
              objectFit="contain"
            />
            :
            <SmartImage
              onError={imageOnErrorHandler}
              src={"https://api-smart-939610cb57d8.herokuapp.com/images/default/produto-sem-imagem.jpg"}
              layout="fill"
              objectFit="contain"
            />



        }


      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{props.product.product_descricao}</h3>

        <div className={styles.boxTotal}>
          <div className={styles.total}>
            <span className="hide-mobile">Total: </span>
            <span className={styles.value}>
              R${" "}
              {
                props.product.valor < props.product.product_valor && props.product.quantidade >= (props.product.minimo_para_desconto ? props.product.minimo_para_desconto : 0) ?
                  (props.product.valor * props.product.quantidade)
                    .toFixed(2)
                    .replace(".", ".")

                  :

                  (props.product.product_valor * props.product.quantidade)
                    .toFixed(2)
                    .replace(".", ".")
              }
            </span>
          </div>

          <div
            className={`${styles.amount} ${styles.amountDesktop} hide-mobile`}
          >
            <div className={styles.boxAmount}>
              <ButtonDecreaseItem
                product={0}
                product_code={props.product.product_code}
                fn={props.actionDecrease}
              />

              <div className={styles.inputValue}>
                <span className={styles.amountValue}>
                  {props.product.quantidade}
                </span>
                {/* <span className="sufix">g</span> */}
              </div>

              <ButtonIncreaseItem
                product={0}
                product_code={props.product.product_code}
                fn={props.actionIncrease}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.amount} ${styles.amountMobile} d-lg-none`}>
        <div className={styles.boxAmount}>
          <ButtonDecreaseItem
            product={0}
            product_code={props.product.product_code}
            fn={props.actionDecrease}
          />

          <div className={styles.inputValue}>
            <span className={styles.amountValue}>
              {props.product.quantidade}
            </span>
            {/* <span className="sufix">g</span> */}
          </div>

          <ButtonIncreaseItem
            product={0}
            product_code={props.product.product_code}
            fn={props.actionIncrease}
          />
        </div>
      </div>
    </div>
  );
}
