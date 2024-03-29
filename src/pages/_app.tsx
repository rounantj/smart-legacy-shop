/* eslint-disable react-hooks/rules-of-hooks */
import "bootstrap/dist/css/bootstrap.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'react-loading-skeleton/dist/skeleton.css'
import "@styles/globals.css";
import "@styles/components/modals/ModalProduct.css";
import type { AppProps } from "next/app";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useMemo } from "react";
import React, { useState, useEffect, useRef, createContext } from "react";
config.autoAddCss = false;
import LoadingBar from 'react-top-loading-bar'
import { ProductOrder } from "@models/ProductOrder";
import { Cart } from "@models/Cart";
import { Api } from "src/providers";
import { Product2 } from "@models/Product2";
import { ajustStrigfy, FULL_PRICES } from "@models/masks";


export type GlobalContent = {
  carts?: any,
  setCarts?: any,
  produtoLista?: Product2,
  setProdutoLista?: any,
  homeInfo?: any,
  decrease?: (product_code: number) => void,
  increase?: (product_code: number, product: any) => void,
  remove?: (product_code: number) => void,
  updateCart?: (affiliateId: number, clientId: number, productList: any) => void,
  update?: (carts1: any) => void,
  updateDetail?: (product_code: number, detail: string, content: string) => void,
  noCarrinho?: any,
  consolida?: (productList: ProductOrder[]) => void,
  showLists?: boolean,
  setShowLists?: any,
  storeInformation?: any,
  FULL_DELIVERY_DEFAULT?: any,
  AFFILIATE_ID?: any,
  MASTER_ID?: any,
  setIsOk?: any,
  primeiroLoad?: any
  itsOk?: any
  makeLoading?: any
}

export const AppContext = createContext<GlobalContent>({});


export default function MyApp({ Component, pageProps }: AppProps) {
  const ref = useRef(null)
  let masterId = process.env.MASTER_ID;
  let affiliateId = process.env.AFFILIATE_ID;

  const MASTER_ID = Number(masterId)
  const AFFILIATE_ID = Number(affiliateId)

  const [produtoLista, setProdutoLista] = useState<Product2 | any>();
  const [itsOk, setIsOk] = useState<boolean>(false)

  const [showLists, setShowLists] = useState<boolean>(false)
  const [progress, setProgress] = useState(0);


  const getStoreInformation = async () => {
    await Api.post('https://erp.api-smartcomerci.com.br/getStoreInformation', { "master_id": MASTER_ID }).then(async response => {

      setIsOk(true)

      localStorage.setItem("FULL_DELIVERY_DEFAULT", ajustStrigfy(JSON.stringify(response.data)));
      localStorage.setItem('METODOS_ENTREGA', ajustStrigfy(response.data[0].delivery_methods));
      localStorage.FULL_DELIVERY_DEFAULT = JSON.stringify(response.data);
      localStorage.AFFILIATE_ID = AFFILIATE_ID
      localStorage.MASTER_ID = MASTER_ID
      localStorage.MY_AFFILIATE_ID = AFFILIATE_ID
      localStorage.AFFILIATE_NAME = AFFILIATE_ID
    }).catch(erro => {
      console.log("getStoreInformation", { erro })
    })
  }








  const makeLoading = async () => {
    const progressSteps = [
      { progress: 10, delay: 50 },
      { progress: 30, delay: 100 },
      { progress: 40, delay: 200 },
      { progress: 50, delay: 500 },
      { progress: 60, delay: 1000 },
      { progress: 70, delay: 2200 },
      { progress: 80, delay: 2500 },
      { progress: 90, delay: 2600 },
      { progress: 99, delay: 2900 }
    ];

    progressSteps.forEach(({ progress, delay }) => {
      setTimeout(() => {
        setProgress(progress);
      }, delay);
    });

  }

  useEffect(() => {
    getStoreInformation()
  }, []);

  return (
    <>

      {itsOk ? (
        <Component {...pageProps} />
      ) : (
        <div>
          <LoadingBar
            height={10}
            color="var(--primary)"
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
          />
        </div>
      )}

    </>
  );
}