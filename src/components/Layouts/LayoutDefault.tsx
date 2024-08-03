import Head from "next/head";

import Header from "@components/Header/Header";
import Footer from "@components/Footer/Footer";
import AsideBar from "@components/AsideBar/asideBar";
import styles from "@styles/components/layouts/Layout.module.css";
import { useEffect, useMemo, useState } from "react";
import { Api } from "@components/providers";
import { Cart } from "@models/Cart";
import { ProductOrder } from "@models/ProductOrder";
import { ajustStrigfy } from "@models/masks";




interface LayoutProps {
  children: React.ReactNode;
  cart: Cart;
  decrease: any;
  increase: any;
  remove: any;
  update: any
  detail: any
  noCarrinho: any
}



export default function LayoutDefault({
  children,
  noCarrinho,
  cart,
  increase,
  decrease,
  update,
  detail,
  remove
}: LayoutProps) {

  const produtos = useMemo(() => cart && cart.cart_conteudo ? JSON.parse(ajustStrigfy(cart.cart_conteudo)) : [], [cart]);
  const valorTotal = useMemo(() => produtos.reduce((acc = 0, product: any = {}) => acc + (
    product.valor < product.product_valor && product.quantidade >= product.minimo_para_desconto ?
      (product.valor * product.quantidade) :
      (product.product_sell_by_weight ? product.valor * product.quantidade : product.product_valor * product.quantidade)
  ), 0), [produtos]);

  useEffect(() => {
    function getMyStoreInfo() {
      Api.post('/getStoreInformation', { master_id: process.env.MASTER_ID })
        .then(response => {
          //localStorage.setItem('FULL_DELIVERY_DEFAULT', JSON.stringify(ajustStrigfy(response.data)))
          localStorage.setItem('FULL_DELIVERY_DEFAULT', JSON.stringify(response.data))
          localStorage.setItem('METODOS_ENTREGA', response.data[0].delivery_methods);
        })
    }
    getMyStoreInfo()

  }, [])

  return (
    <>

      <div className={styles.layout}>
        <Head>
          <title>O Mundo Das Embalagens</title>
          <meta name="description" content="Smartcommerci" />

          <meta name="viewport" content="width=device-width, initial-scale=1" />


          <meta name="apple-mobile-web-app-capable" content="yes" />


          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className={`${styles.container} container-fluid`}>
          <Header
            noCarrinho={noCarrinho}
            detail={detail}
            update={update}
            total={valorTotal}
            valorTotal={valorTotal}
            produtos={produtos}
            increase={increase}
            decrease={decrease}
            remove={remove}
            cart={cart}
          />

          <div className={`${styles.layoutBody} layoutBody`}>
            <AsideBar />

            <main className={styles.main}>{children}</main>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
