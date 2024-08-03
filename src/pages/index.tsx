import Image from "next/image";
import Link from "next/link";

import styles from "../styles/pages/Home.module.css";

import { useEffect, useState, useContext, useMemo } from "react";
import Modal from "@components/Modals/Modal";
import ModalProduct from "@components/Modals/ModalProduct";
import LayoutDefault from "@components/Layouts/LayoutDefault";
import Newsletter from "@components/Newsletter";
import React from "react";
import { useProducts } from "src/hooks/useProducts";
import { useProductsRelateds } from "src/hooks/useProductsRelateds";
import { useProductInformation } from "src/hooks/useProductInformation";
import { Api } from "@components/providers";
import TruckIcon from "@assets/icons/Truck";
import styles2 from "@styles/components/Newsletter.module.css";
import ModalCEP_VIEW from "@components/Modals/ModalCEP";
import TagManager from 'react-gtm-module';
import { IBody, HomePage } from "@models/HomePage";
import ProductCardListHome from "@components/Products/ProductCardListHome";
import { FULL_PRICES, ajustStrigfy } from "@models/masks";
import { AppContext } from "./_app";
import SmartImage from "@components/SmartImage";
import { Cart } from "@models/Cart";
import { ProductOrder } from "@models/ProductOrder";
import { Product2 } from "@models/Product2";

export default function Home() {


  type Links_Banners = {
    url: string,
    referencia: string,
    id_origin: string,
    column_origin: string,
    table_origin: string,
    updatedAt: Date,
    createdAt: Date
  }

  let masterId = process.env.MASTER_ID;
  let affiliateId = process.env.AFFILIATE_ID;

  const MASTER_ID = Number(masterId)
  const AFFILIATE_ID = Number(affiliateId)
  const [myLinks, setMyLinks] = useState<Links_Banners[]>([]);
  const [carts, setCarts] = useState<Cart | any>();
  const [modalProduct, setModalProduct] = useState(false);
  const [affiliateID, setAffiliateID] = useState<number>(0);
  const [productCode, setProductCode] = useState(0);
  const [firstId, setFirstId] = useState(0);
  const [firstId1, setFirstId1] = useState(10);
  const [firstId2, setFirstId2] = useState(20);
  const [firstId3, setFirstId3] = useState(30);
  const [bannerPrincipal, setBannerPrincipal] = useState<string>("")
  const [mini1, setMini1] = useState<string>("")
  const [mini2, setMini2] = useState<string>("")
  const [mini3, setMini3] = useState<string>("")
  const [min4, setMini4] = useState<string>("")
  const [mini1_l, setMini1_l] = useState<string>("")
  const [mini2_l, setMini2_l] = useState<string>("")
  const [mini3_l, setMini3_l] = useState<string>("")
  const [min4_l, setMini4_l] = useState<string>("")
  const [bannerComoFunciona, setBannerComoFunciona] = useState<string>("")
  const [isLoadingCerto, setIsLoadingCerto] = useState(false);
  const [body, setBody] = useState<any[]>([])
  const [thisPlace, setThisPlace] = useState<any>();
  const [homeInfo, setHomeInfo] = useState<any>()
  const [storeInformation, setStoreInformation] = useState<any>();
  const [FULL_DELIVERY_DEFAULT, set_FULL_DELIVERY_DEFAULT] = useState<any>();


  function decrease(product_code: number) {
    console.log("DECREASE")
    const products: any[] = carts ? JSON.parse(ajustStrigfy(carts.cart_conteudo)) : [];
    const sourceProduct: Product2 = products.find((product) => product.product_code === product_code);
    const index = products.findIndex(product => product.product_code === product_code);
    let produtoFinal = FULL_PRICES(sourceProduct)

    if (index >= 0) {
      const newQuantity = products[index].quantidade - 1;

      if (newQuantity > 0) {
        products[index].quantidade = newQuantity;
        if (products[index].quantidade >= produtoFinal.venda.minimo_para_desconto) {
          products[index].valor = produtoFinal.venda.preco_venda
        } else {
          products[index].valor = produtoFinal.venda.valor_bruto
        }
      } else {
        products.splice(index, 1);
      }

      consolida(products);
    }
  }

  function increase(product_code: number, product: Product2) {
    console.log("INCREASE")
    const products: any[] = carts ? JSON.parse(ajustStrigfy(carts.cart_conteudo)) : [];
    const sourceProduct: Product2 = product || products.find((product) => product.product_code === product_code);
    const index = products.findIndex(product => product.product_code === product_code);
    let produtoFinal = FULL_PRICES(sourceProduct)

    if (index >= 0) {
      products[index].quantidade += 1
      if (products[index].quantidade >= produtoFinal.venda.minimo_para_desconto) {
        products[index].valor = produtoFinal.venda.preco_venda
      } else {
        products[index].valor = produtoFinal.venda.valor_bruto
      }
    } else {
      let PRECO_VENDA = produtoFinal.venda.preco_venda
      if (produtoFinal.venda.existe_desconto === true && produtoFinal.venda.minimo_para_desconto <= 1) {
        PRECO_VENDA = produtoFinal.venda.preco_venda
      } else {
        PRECO_VENDA = produtoFinal.venda.valor_bruto
      }

      products.push({
        ...sourceProduct,
        valor: PRECO_VENDA,
        comentario: "",
        caracteristica: "",
        quantidade: 1,
        produtoFinal,
        desconto: Number((product.product_valor - PRECO_VENDA).toFixed(2)),
        minimo_para_desconto: produtoFinal.venda.minimo_para_desconto,
      });
    }

    consolida(products);
  }

  function remove(product_code: number) {
    console.log("REMOVE")
    const products: any[] = carts ? JSON.parse(ajustStrigfy(carts.cart_conteudo)) : [];

    const index = products.findIndex(product => product.product_code === product_code);

    if (index >= 0) {
      products.splice(index, 1);

      consolida(products);
    }
  }

  function noCarrinho(product_code: number): number {
    const products = carts ? JSON.parse(ajustStrigfy(carts.cart_conteudo)) : [];
    let myQt: number = 0;

    for (const product of products) {
      if (product.product_code == product_code) {
        myQt += product.quantidade;
      }
    }

    return myQt;
  }

  function updateDetail(product_code: number, detail: string, content: string) {
    //console.log(product_code, detail, content)
    const products: any[] = carts ? JSON.parse(ajustStrigfy(carts.cart_conteudo)) : [];
    const productIndex = products.findIndex((product) => product.product_code === product_code);

    if (productIndex >= 0) {
      if (detail === 'comentario') {
        products[productIndex].comentario = content;
      } else {
        products[productIndex].caracteristica = content;
      }
    }

    consolida(products);
  }

  function update(carts1: any) {
    setCarts(carts1);
  }

  function consolida(productList: ProductOrder[]) {
    console.log("CONSOLIDA")
    let valorTotal: number = 0;
    let newCart: Cart;

    for (const product of productList) {
      valorTotal += product.valor * product.quantidade;
    }

    if (!carts) {
      newCart = {
        id: 1,
        cart_affiliate_id: 1,
        cart_client_id: 11,
        cart_conteudo: JSON.stringify(productList),
        cart_status: "1",
        cart_valor_total: valorTotal,
      };
    } else {
      newCart = {
        ...carts,
        cart_conteudo: JSON.stringify(productList),
        cart_valor_total: valorTotal,
      };
    }

    if (newCart != undefined) {
      setCarts(newCart);

      const MY_ID = Number(localStorage.getItem("MY_ID"));
      const MY_AFFILIATE_ID = Number(process.env.AFFILIATE_ID);

      if (MY_ID && MY_AFFILIATE_ID) {
        //post to api case logged in
        updateCart(MY_AFFILIATE_ID, MY_ID, productList);
      }
    }
  }

  function primeiroLoad(nova: ProductOrder[]) {
    let totalValue: number = 0;
    let newCart: Cart;

    for (const product of nova) {
      totalValue += product.valor * product.quantidade;
    }

    if (!carts) {
      newCart = {
        id: 1,
        cart_affiliate_id: 1,
        cart_client_id: 11,
        cart_conteudo: JSON.stringify(nova),
        cart_status: "1",
        cart_valor_total: totalValue,
      };
    } else {
      newCart = {
        ...carts,
        cart_conteudo: JSON.stringify(nova),
        cart_valor_total: totalValue,
      };
    }

    if (newCart) {
      setCarts(newCart);
    }
  }

  function updateCart(
    affiliateId: number,
    clientId: number,
    productList: ProductOrder[]
  ) {
    const token = localStorage.getItem("token") || "";


    Api.post(
      "/updateCart",
      {
        affiliate_id: affiliateId,
        cart_conteudo: JSON.stringify(productList),
        client_id: clientId,
      },
      { headers: { "x-access-token": token } }
    ).then(Response => {
      // console.log('Response', Response)
    }).catch(err => {
      // console.log('error', err)
    })
  }



  const getStoreInformation = async () => {
    await Api.post(`/getStoreInformation`, { "master_id": MASTER_ID }).then(async response => {
      setStoreInformation(response.data[0])
      set_FULL_DELIVERY_DEFAULT(ajustStrigfy(JSON.stringify(response.data)))
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




  const { tasks2, getAllInformation } = useProductInformation(
    affiliateID,
    productCode
  );

  const [productsRelateds, setProductsRelateds] = useState([
    0,
    0,
    0,
    0,
    0, // default relateds
  ]);

  const { tasks3, getAllRelacteds } = useProductsRelateds(
    affiliateID,
    productsRelateds
  );

  const [modalCEP, setModalCEP] = useState(false);

  function triggerModalCEP() {
    setModalCEP(!modalCEP);
  }

  const setCEP = (e: any) => {

    if (e.keyCode == 13) {
      setModalCEP(!modalCEP)
    }
  }



  const load = async () => {
    const token = localStorage.getItem("token") || "";
    const MY_ID = Number(localStorage.getItem("MY_ID"));
    const MY_AFFILIATE_ID = AFFILIATE_ID;

    //use local cart logged out
    if (MY_ID == undefined || MY_AFFILIATE_ID == undefined) {
      const oldCart: any = localStorage.getItem("MY_CART");

      if (oldCart != null) {
        const myCart2: Cart = JSON.parse(ajustStrigfy(oldCart))
        const otherPRD: ProductOrder[] = JSON.parse(ajustStrigfy(myCart2.cart_conteudo));

        setCarts(otherPRD);
      }
    } else {
      try {
        Api.post<Cart[]>(
          "/getMyCart",
          { affiliate_id: AFFILIATE_ID, client_id: MY_ID },
          { headers: { "x-access-token": token } }
        )
          .then((response) => {

            if (response.data.length > 0) {
              //use db cart logged in 
              const otherPRD: ProductOrder[] = JSON.parse(ajustStrigfy(response.data[0].cart_conteudo));
              primeiroLoad(otherPRD);
            } else {
              //use local cart logged out
              const store: any = localStorage.getItem("MY_CART");

              if (store != null) {
                const myCart2: Cart = JSON.parse(ajustStrigfy(store));
                const otherPRD: ProductOrder[] = JSON.parse(ajustStrigfy(myCart2.cart_conteudo));

                primeiroLoad(otherPRD);
              }
            }
          })
          .catch((error) => {
            //use local cart logged out
            // console.log(error)
            const store: any = localStorage.getItem("MY_CART");

            if (store != null) {
              const myCart2: Cart = JSON.parse(ajustStrigfy(store));
              const otherPRD: ProductOrder[] = JSON.parse(ajustStrigfy(myCart2.cart_conteudo));

              primeiroLoad(otherPRD);
            }
          });
      } catch (err) {
        // console.log(err)
      }
    }

  }


  async function changeProductCode(number: number, relactedsProducts: []) {
    await setIsLoadingCerto(true)
    await setProductCode(number);
    await setProductsRelateds(relactedsProducts);

    window.document.getElementById('scrollTop')?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    if (localStorage.getItem("CEP_CLIENTE_SMART") == null
      || localStorage.getItem("CEP_CLIENTE_SMART") == undefined
      || localStorage.getItem("CEP_CLIENTE_SMART") == ''

    ) {
      triggerModalCEP()
    } else {
      setModal();
    }

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      setModal();
    }

  }

  async function changeProductCodeInterna(number: number, relactedsProducts: []) {
    await setIsLoadingCerto(true)
    await setProductCode(number);
    await setProductsRelateds(relactedsProducts);
    window.document.getElementById('scrollTop')?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }

  async function setModal() {
    await setModalProduct(!modalProduct);
  }

  function mdCep() {
    if (localStorage.getItem("CEP_CLIENTE_SMART") == null
      || localStorage.getItem("CEP_CLIENTE_SMART") == undefined
      || localStorage.getItem("CEP_CLIENTE_SMART") == ''

    ) {
      triggerModalCEP()
    }
  }

  function getMyUrl(myContent: string | null) {
    if (myContent) {
      const result = myLinks?.find((ml) => ml.column_origin === myContent)
      if (result) {
        return result.url
      } else {
        return "#"
      }
    } else {
      return "#"
    }
  }
  const prepareBanners = async (homeData: any) => {
    console.log({ homeData })

    if (homeData) {
      const { body: homeB, header } = homeData
      console.log({ homeB, header })
      if (homeB && header) {
        setBody(homeB)
        setIsLoaded(true)
        const { mainBanner, footerBanners, asideBanner } = header
        if (footerBanners) {
          setBannerPrincipal(mainBanner?.url)
          const { first, second, third, fourty } = footerBanners
          if (first) {
            setMini1(first?.url)
            setMini1_l(first?.link)
          }
          if (second) {
            setMini2(second?.url)
            setMini2_l(second?.link)
          }
          if (third) {
            setMini3(third?.url)
            setMini3_l(third?.link)
          }
          if (fourty) {
            setMini4(fourty?.url)
            setMini4_l(fourty?.link)
          }

          document.documentElement.style.setProperty('--light-green', homeData?.mainColors?.third);
          document.documentElement.style.setProperty('--secondary', homeData?.mainColors?.second);
          document.documentElement.style.setProperty('--primary', homeData?.mainColors?.first);
          document.documentElement.style.setProperty('--newsletter-background', "url(" + homeData?.newsletter?.url + ")");
          document.documentElement.style.setProperty('--banner-footer', "url(" + homeData?.whatsapp?.url + ")");

        }
        if (asideBanner) {
          setBannerComoFunciona(asideBanner?.url)
        }

        let affid: any = process.env.AFFILIATE_ID ?? '0'
        const AFFILIATE_ID: number = +affid
        load();

        //  localStorage.setItem("MY_DELIVERY_AREA", thisPlace?.faixa_cep_values)
        localStorage.setItem("listShow", '1')
      }

    }

  }

  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  useEffect(() => {
    console.log("STOREE", { storeInformation })
    if (storeInformation) {

      initTagManager(storeInformation)

      try {
        let homeInf = storeInformation['home_main_info']
        if (homeInf) {
          let homeData = JSON.parse(homeInf)
          console.log("hdata", { homeData })
          prepareBanners(homeData)
        }
      } catch (error) {
        console.log({ error })
      }
    }
  }, [storeInformation]);


  const initTagManager = async (storeInformation: any) => {
    TagManager.initialize({ gtmId: storeInformation.master_tag_manager });
  }

  useEffect(() => {
    getStoreInformation()
  }, []);



  return (
    <LayoutDefault
      update={update}
      cart={carts}
      increase={increase}
      decrease={decrease}
      remove={remove}
      detail={updateDetail}
      noCarrinho={noCarrinho}
    >
      <div className={styles.mainHeader}>
        <div className={styles.boxBanners}>
          <Link passHref href={getMyUrl(bannerPrincipal) ? getMyUrl(bannerPrincipal) : "#"}>
            <span style={{ borderRadius: '15px' }} className={styles.banner}>
              {bannerPrincipal != '' ?
                <SmartImage
                  className="border15"
                  src={process.env.URL_IMAGES + bannerPrincipal}
                  layout="responsive"
                  width={872}
                  height={269} objectFit={"contain"} />
                :
                <SmartImage
                  className="border15"
                  src="/images/banner-principal.png"
                  layout="responsive"
                  width={872}
                  height={269} objectFit={"contain"} />


              }

            </span>
          </Link>

          <div className={styles.list}>
            <Link passHref href={mini1_l}>
              <span style={{ borderRadius: '15px' }} className={styles.miniBanner}>
                {mini1 != '' ?
                  <SmartImage
                    className="border15"
                    src={process.env.URL_IMAGES + mini1}
                    layout="responsive"
                    isMiniBanner={true}
                    objectFit="contain"
                  />
                  :
                  <SmartImage
                    className="border15"
                    src="/images/chocolate.png"
                    layout="responsive"
                    isMiniBanner={true}
                    objectFit="contain"
                  />


                }
              </span>
            </Link>

            <Link passHref href={mini2_l}>
              <span style={{ borderRadius: '15px' }} className={styles.miniBanner}>
                {mini2 != '' ?
                  <SmartImage
                    className="border15"
                    src={process.env.URL_IMAGES + mini2}
                    layout="responsive"
                    isMiniBanner={true}
                    objectFit="contain"
                  />
                  :
                  <SmartImage
                    className="border15"
                    src="/images/descartaveis.png"
                    layout="responsive"
                    isMiniBanner={true}
                    objectFit="contain"
                  />


                }
              </span>
            </Link>

            <Link passHref href={mini3_l}>
              <span style={{ borderRadius: '15px' }} className={styles.miniBanner}>
                {mini3 != '' ?
                  <SmartImage
                    className="border15"
                    src={process.env.URL_IMAGES + mini3}
                    layout="responsive"
                    objectFit="contain"
                    isMiniBanner={true}
                  />
                  :

                  <SmartImage
                    className="border15"
                    src="/images/transporte.png"
                    layout="responsive"
                    objectFit="contain"
                    isMiniBanner={true}
                  />

                }

              </span>
            </Link>

            <Link passHref href={min4_l}>
              <span style={{ borderRadius: '15px' }} className={styles.miniBanner}>
                {min4 != '' ?
                  <SmartImage
                    className="border15"
                    src={process.env.URL_IMAGES + min4}
                    layout="responsive"
                    isMiniBanner={true}
                    objectFit="contain"
                  />
                  :
                  <SmartImage
                    className="border15"
                    src="/images/delivery.png"
                    layout="responsive"
                    isMiniBanner={true}
                    objectFit="contain"
                  />


                }

              </span>
            </Link>

          </div>
        </div>

        <aside className={`${styles.comoFunciona} comoFuncionaAside`}>
          <h3 className={styles.comoFuncionaTitle}>Como Funciona?</h3>
          Confira se atendemos em sua região: <br />
          <div className={styles2.grupoIconInput}>
            <div className={styles2.grupoIcone}>
              <TruckIcon />

            </div>
            <input onClick={triggerModalCEP} className={styles2.grupoInput} type="number" placeholder="Cep" />
          </div>
          Escolha os produtos <br /><br />
          Agende a entrega <br /><br />
          Receba ou retire <br /><br />
          <div className={styles.boxImg}>
            {bannerComoFunciona != '' ?
              <SmartImage
                className="border15"
                src={process.env.URL_IMAGES + bannerComoFunciona}
                layout="responsive"
                objectFit="contain"
              />
              :

              <SmartImage
                className="border15"
                src="/images/como-funciona.png"
                layout="responsive"
                objectFit="contain"
              />


            }

          </div>
        </aside>
      </div>

      <div className={styles.mainBody}>

        {
          // AQUI ACONTECE O RECARREGAMENTO INDESEJADO, APENAS AQUI
          isLoaded ?
            body && body.map((hme: IBody, index: any) => (

              hme.type && hme.type == "vitrine" && hme.products && hme.products.length > 0 ?
                <div key={Math.random()} className={styles.boxOfertas}>
                  <div className={styles.boxOfertasHeader}>
                    {
                      hme.title !== null && hme.title ?
                        <h2 className={styles.boxOfertasTitle}>
                          {
                            hme.title.text !== null ?
                              hme.title.text.toString() : 'Veja as ofertas'}

                        </h2>
                        :
                        <h2 className={styles.boxOfertasTitle}
                        > Veja as ofertas
                        </h2>
                    }
                    <Link href="#" passHref>
                      <span className={styles.boxOfertasLink}>ver todas</span>
                    </Link>
                  </div>

                  <ProductCardListHome
                    mdCep={mdCep}
                    onClick={changeProductCodeInterna}
                    handleAdd2={changeProductCode}
                    AFFILIATE_ID={AFFILIATE_ID}
                    productList={hme.products} increase={increase} decrease={decrease} remove={remove} noCarrinho={noCarrinho} />

                </div>

                :

                <div key={Math.random()} className={`${styles.list} ${styles.listMid}`}>
                  <Link passHref href={`${hme.first ? hme.first.link : '#'} `}>
                    <span  >
                      <div className={styles.boxImgMedio}>
                        {
                          hme.first && hme.first.url != null ?
                            <SmartImage
                              className="border15"
                              src={process.env.URL_IMAGES + hme.first.url}
                              layout="fill"
                              objectFit="contain"
                            />
                            :
                            <div></div>
                        }

                      </div>
                    </span>
                  </Link>

                  <Link passHref href={`${hme.second ? hme.second.link : '#'} `}>
                    <span >
                      <div className={styles.boxImgMedio}>

                        {
                          hme.second && hme.second.url != null ?
                            <SmartImage
                              className="border15"
                              src={process.env.URL_IMAGES + hme.second.url}
                              layout="fill"
                              objectFit="contain"
                            />
                            :
                            <div></div>
                        }

                      </div>
                    </span>

                  </Link>
                </div>

            ))
            : <div ></div>
        }
        <Newsletter />
      </div>

      <Modal modalActive={modalProduct} onCloseClick={setModal} bgColor="white">
        <ModalProduct
          changeProductCode={changeProductCode}
          isLoading={isLoadingCerto}
          detail={updateDetail}
          totalCarrinho={noCarrinho}
          increase={increase}
          decrease={decrease}
          productDetails={tasks2}
          productRelacteds={tasks3}
          handleAdd2={changeProductCodeInterna}
          onCloseClick={setModal}
        />
      </Modal>

      <ModalCEP_VIEW disableClickOut={true} modalActive={modalCEP} onCloseClick={triggerModalCEP} />

    </LayoutDefault>
  );
}
