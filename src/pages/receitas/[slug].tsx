import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { GetServerSideProps } from "next";
import CarrinhoIcon from "@assets/icons/CarrinhoIcon";

import Button from "@components/Buttons/Button";
import LayoutDefault from "@components/Layouts/LayoutDefault";
import Ingrediente from "@components/Receitas/Ingrediente";

import { ProductOrder } from "@models/ProductOrder";
import { Cart } from "@models/Cart";
import { Product2 } from "@models/Product2";
import { Api } from "src/providers";
import ReactPlayer from 'react-player'
import styles from "@styles/pages/SingleReceita.module.css";
import ProductCardList from "@components/Products/ProductCardList";
import Modal from "@components/Modals/Modal";
import ModalProduct from "@components/Modals/ModalProduct";
import { useProductsRelateds } from "src/hooks/useProductsRelateds";
import ModalCEP_VIEW from "@components/Modals/ModalCEP";
import ProductCardListHome from "@components/Products/ProductCardListHome";
import ProductCardSearch from "@components/Products/ProductCardSearch";
import { useProductInformation } from "src/hooks/useProductInformation";
import React from "react";
import { AppContext } from "../_app";
import SmartImage from "@components/SmartImage";

interface INGREDIENTES {
  product_code: string,
  medida: string,
  quantidade: number,
  texto: string,
  image: string
}
interface PREPARO {
  id: number,
  instrucao: string
}

export default function SingleReceita({
  title = "",
  banner_topo = "",
  id = 0,
  status = 0,
  slug = "",
  modo_preparo = "",
  midia = "",
  tempo_minutos = 0,
  porcoes = 0,
  ingredientes = ""
}) {
  const {
    carts,
    decrease,
    increase,
    remove,

    update,
    updateDetail,
    noCarrinho,
    consolida
  } = useContext(AppContext);

  const [ingredientesItens, setIngredientesItens] = useState<INGREDIENTES[]>([])
  const [preparo, setPreparo] = useState<PREPARO[]>([])
  const [listaIds, setListaIds] = useState<number[]>([])
  const [productsRevenue, setProdutsRevenues] = useState<Product2[]>([])


  //-----------------------------------------------------------------------------------------------------

  const [productModal, setProductModal] = useState<Product2[]>()
  const [isModalProductOpen, setIsModalProductOpen] = useState(false);
  const [productCode, setProductCode] = useState<number>(0);
  const [productsRelateds, setProductsRelateds] = useState([
    998492,
    998491,
    998490,
    998489,
    998487
  ]);
  const { tasks3, getAllRelacteds } = useProductsRelateds(
    Number(process.env.AFFILIATE_ID),
    [
      998492,
      998491,
      998490,
      998489,
      998487
    ]
  );


  const { tasks2, getAllInformation } = useProductInformation(
    Number(process.env.AFFILIATE_ID),
    productCode
  );


  function changeProductCodeInterna(number: number, relactedsProducts: []) {
    window.document.getElementById('scrollTop')?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    setProductCode(number);
    setProductsRelateds(relactedsProducts);
  }

  function toggleModalProduct() {
    setIsModalProductOpen(!isModalProductOpen);
  }

  const [modalProduct, setModalProduct] = useState(false);
  const [affiliateID, setAffiliateID] = useState<number>(0);

  // const [firstId, setFirstId] = useState(0);
  // const [firstId1, setFirstId1] = useState(10);
  // const [firstId2, setFirstId2] = useState(20);
  // const [firstId3, setFirstId3] = useState(30);
  // const [bannerPrincipal, setBannerPrincipal] = useState<string>("")
  // const [mini1, setMini1] = useState<string>("")
  // const [mini2, setMini2] = useState<string>("")
  // const [mini3, setMini3] = useState<string>("")
  // const [min4, setMini4] = useState<string>("")
  // const [bannerComoFunciona, setBannerComoFunciona] = useState<string>("") 

  const [modalCEP, setModalCEP] = useState(false);

  function triggerModalCEP() {
    setModalCEP(!modalCEP);
  }

  const setCEP = (e: any) => {

    if (e.keyCode == 13) {
      setModalCEP(!modalCEP)
    }
  }

  // function changeProductCode(number: number, relactedsProducts: []) {
  //   setProductCode(number);
  //   setProductsRelateds(relactedsProducts);
  //   setModal();
  // }
  const [isLoading, setIsLoading] = useState<boolean>(true)
  async function changeProductCode(number: number, relactedsProducts: []) {
    setIsLoading(true)
    window.document.getElementById('scrollTop')?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    //console.log("muda produto")
    await setProductCode(number);
    await setProductsRelateds(relactedsProducts);


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

  function setModal() {
    setModalProduct(!modalProduct);
  }



  React.useEffect(() => {
    var AFFILIATE_ID: number = Number(process.env.AFFILIATE_ID);

    const fetch = async () => {
      await getAllInformation(AFFILIATE_ID, productCode);
      await getAllRelacteds(AFFILIATE_ID, productsRelateds);
    }
    fetch().then(result => {
      setIsLoading(false)
    }).catch(err => {
      // console.log(err)
    })
  }, [getAllInformation, getAllRelacteds, productCode, productsRelateds]);


  //--------------------------------------------------------------------------------------

  useEffect(() => {
    let ING: INGREDIENTES[] = []
    let PRE: PREPARO[] = []


    try {
      let ing = JSON.parse(ingredientes)
      let pre = JSON.parse(modo_preparo)
      let listaIDS: number[] = []
      for (const k in ing) {
        listaIDS.push(Number(ing[k].product_code))
      }
      for (const a in pre) {
        PRE.push(
          {
            id: pre[a].id,
            instrucao: pre[a].instucao,
          }
        )
      }

      //console.log('PRE',PRE)
      setPreparo(PRE)



      Api.post<Product2[]>('/listaIds', { product_list_ids: listaIDS, affiliate_id: process.env.AFFILIATE_ID }).then(
        response => {
          setProdutsRevenues(response.data)
          for (const k in ing) {
            listaIDS.push(Number(ing[k].product_code))
            let img: string = ""
            for (const p in response.data) {
              if (response.data[p].product_code == Number(ing[k].product_code)) {
                img = response.data[p].product_thumbnail
              }

            }
            ING.push({
              product_code: ing[k].product_code,
              medida: ing[k].medida,
              quantidade: ing[k].quantidade,
              texto: ing[k].texto,
              image: img
            })

          }
          setIngredientesItens(ING)
          //console.log('ING',ING)
          // setProductCode(listaIDS[0])
          setListaIds(listaIDS)





        }
      ).catch(err => {
        ////console.log(err)
      })

    } catch (e) { }
  }, [])

  function mdCep() {
    if (localStorage.getItem("CEP_CLIENTE_SMART") == null
      || localStorage.getItem("CEP_CLIENTE_SMART") == undefined
      || localStorage.getItem("CEP_CLIENTE_SMART") == ''

    ) {
      //triggerModalCEP()
    }
  }

  function consolidaTodos() {
    try {
      const products: any[] = [];
      for (const k in productsRevenue) {
        if (incrementaUm(productsRevenue[k])) {
          products.push(incrementaUm(productsRevenue[k]))
        }

      }
      //console.log("produtos",products)
      if (consolida) {
        consolida(products)
      }
      location.replace('../checkout')
    } catch (e) {
      //console.log("erro",e)
    }



  }

  function incrementaUm(sourceProduct: Product2) {
    let product: ProductOrder;
    product = {
      ...sourceProduct,
      valor: sourceProduct.product_valor,
      comentario: "",
      caracteristica: "",
      quantidade: 1,
      desconto: 0,
    }
    return product

  }

  // useEffect(() => {
  //   //console.log('ingredientes',ingredientes)
  // }, [ingredientesItens])
  // useEffect(() => {
  //   //console.log('preparo',preparo)
  // }, [preparo])

  return (
    <LayoutDefault
      noCarrinho={noCarrinho}
      detail={updateDetail}
      update={update}
      cart={carts}
      increase={increase}
      decrease={decrease}
      remove={remove}
    >
      <div className={`${styles.receita} padding-mobile`}>
        <div className="breadCrumbs">
          <Link href="/" passHref>
            <span>Home</span>
          </Link>
          <div className="breadCrumbs-separator"></div>
          <Link href="/receitas" passHref>
            <span>Receitas</span>
          </Link>
          <div className="breadCrumbs-separator"></div>
          {slug?.replace(/-/g, " ")}
        </div>

        <div className={`model-page-interna ${styles.modelPageInterna}`}>
          <div className={styles.mainBanner}>
            <SmartImage
              src={banner_topo}
              layout="fill"
              objectFit="cover"
            />
          </div>

          <div className={styles.content}>
            <div className={styles.header}>
              <div className={styles.headerMeta}>
                <h1 className={styles.pageTitle}>
                  {slug?.replace(/-/g, " ")}
                </h1>

                <div className={styles.metaList}>
                  <div className={styles.metaItem}>± {tempo_minutos} mins</div>
                  <div className={styles.metaItem}>{ingredientesItens?.length} ingredientes</div>
                  <div className={styles.metaItem}>{porcoes} {porcoes === 1 ? 'porção' : 'porções'}</div>
                </div>
              </div>

              <div className={styles.headerButton}>
                <Button onClick={consolidaTodos}>
                  <CarrinhoIcon />{" "}
                  Compre todos os ingredientes
                </Button>
              </div>
            </div>

            <div className={styles.body}>
              <div className={styles.module}>
                <h2 className={styles.pageSubTitle}>Ingredientes</h2>

                <div className={styles.ingredienteList}>
                  {
                    ingredientesItens.map((ing) =>
                      ing ?
                        <Ingrediente
                          key={Math.random()}
                          image={ing.image}
                          name={ing.texto}
                        />
                        :
                        <div key={Math.random()} className="oculta"></div>

                    )
                  }




                </div>
              </div>

              <div className={styles.module}>
                <h2 className={styles.pageSubTitle}>Modo de preparo</h2>

                <div className={styles.video}>

                  <ReactPlayer style={{ maxWidth: '90%', margin: 'auto' }} url={midia} />

                </div>
                <br />
                <hr />

                <ol className={styles.modoPreparoList}>
                  {
                    preparo.map((pre) =>
                      pre ?
                        <li key={Math.random()} className={styles.modoPreparo}>
                          <span className={styles.number}>{pre.id}</span>
                          {pre.instrucao}
                        </li>
                        :
                        <div key={Math.random()} className="oculta"></div>

                    )
                  }


                </ol>
              </div>

              <div className={styles.module}>
                <div className={styles.boxOfertas}>
                  <div className={styles.boxOfertasHeader}>
                    <h2 className={styles.boxOfertasTitle}>
                      Compre os ingredientes separados
                    </h2>
                  </div>


                  <ProductCardList
                    noCarrinho={noCarrinho}
                    addCart={increase}
                    removeCart={decrease}
                    handleAdd2={changeProductCode}
                    products2={productsRevenue}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal modalActive={modalProduct} onCloseClick={setModal} bgColor="white">
        <ModalProduct
          changeProductCode={changeProductCode}
          detail={updateDetail}
          isLoading={isLoading}
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug = "" }: any = context.query;
  const master_id = process.env.MASTER_ID;
  let title = "";
  let id = ""
  let banner_topo = ""
  let tempo_minutos = ""
  let porcoes = ""
  let modo_preparo = ""
  let ingredientes = ""
  let midia = ""
  let status = 1
  ////console.log("slug", slug)

  const response = await Api.post(
    '/getByTableName', { "masterId": process.env.MASTER_ID, "idName": "master_id", "tableName": "revenues" }
  );

  ////console.log("os dados", response.data)


  if (response && response.data) {
    for (const k in response.data) {
      if (response.data[k].title?.replace(/ /g, "-") == slug) {
        title = response.data[k].title
        banner_topo = response.data[k].banner_topo
        id = response.data[k].id
        status = response.data[k].status
        midia = response.data[k].midia
        modo_preparo = response.data[k].modo_preparo
        tempo_minutos = response.data[k].tempo_minutos
        porcoes = response.data[k].porcoes
        ingredientes = response.data[k].ingredientes
      }
    }

  }





  return { props: { title, banner_topo, id, status, tempo_minutos, porcoes, ingredientes, slug, modo_preparo, midia } };
};

