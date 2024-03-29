import { GetServerSideProps } from "next";
import React, { Component, useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import clonedeep from "lodash/cloneDeep";
import { AppContext } from "src/pages/_app";

import { Product2 } from "@models/Product2";

import { useProductsRelateds } from "src/hooks/useProductsRelateds";
import { useProductInformation } from "src/hooks/useProductInformation";
import { Api } from "src/providers";

import Substyles from "@styles/pages/Search.module.css";
import styles from "@styles/pages/Category.module.css";


import ProductCardSearch from "@components/Products/ProductCardSearch";
import ModalProduct from "@components/Modals/ModalProduct";
import Modal from "@components/Modals/Modal";
import LayoutDefault from "@components/Layouts/LayoutDefault";
import CategoryButton from "@components/CategoryButton";

import MobileModalCloseButton from "@assets/icons/MobileModalCloseButtonLeft";


import { Carousel } from "react-responsive-carousel";
import SmartImage from "@components/SmartImage";

interface PageProps {
  products: Product2[];
  categorySlug: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  let { categorySlug = "" }: any = context.query;
  categorySlug = categorySlug.replace(/_/g, '/')
  const affiliate_id = Number(process.env.AFFILIATE_ID);
  const master_id = Number(process.env.MASTER_ID);
  console.log({
    product_affiliate_id: affiliate_id,
    product_site_name: categorySlug,
    product_code: categorySlug,
    lastID: 0,
    totalItems: 100
  })

  const productsPromise = Api.post("/productSearchSite", {
    product_affiliate_id: affiliate_id,
    product_site_name: categorySlug,
    product_code: categorySlug,
    lastID: 0,
    totalItems: 200
  })

  const categoriesPromise = Api.post("/getCatList", {
    affiliate_id,
    master_id,
    limit: 99999,
  })

  const [products] = await Promise.all([
    productsPromise
  ])


  return { props: { products: products.data, categorySlug } };

};


export default function Category({
  products = [], categorySlug: string
  // subCategories = [],
  // banners1 = [],
}: PageProps) {
  const {
    carts,
    decrease,
    increase,
    remove,
    update,
    updateDetail,
    noCarrinho,
  } = useContext(AppContext);

  const router = useRouter();
  const { categorySlug = "" }: any = router.query;

  const categoriesToShow = 3;

  const [showMoreCategories, setShowMoreCategories] = useState(false);

  const [productCode, setProductCode] = useState(11);
  const [productsRelateds, setProductsRelateds] = useState([
    998503,
    998483,
    57154,
    56929,
    29080, // default relateds
  ]);
  const [isModalProductOpen, setIsModalProductOpen] = useState(false);
  const [affiliateID, setAffiliateID] = useState<number>(0);

  const { tasks3, getAllRelacteds } = useProductsRelateds(
    affiliateID,
    productsRelateds
  );

  const { tasks2, getAllInformation } = useProductInformation(
    affiliateID,
    productCode
  )
  const [categorias, setCategorias] = useState<any>([])
  const [subCategorias, setSubCategorias] = useState<any>([])
  const [categoria, setCategoria] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(true)




  async function getMyCount(pesquisa: string) {
    Api.post('/countByCategoryname', { affiliate_id: process.env.AFFILIATE_ID, categoryName: pesquisa })
      .then(response => {

      }).catch(error => {

      })
  }



  async function getMyNewCategories(token: string = "") {
    let URL = "https://loja.api-smartcomerci.com.br/categorie_find/" + process.env.AFFILIATE_ID
    let header = {
      headers: { "x-access-token": token }
    }
    const resultado = await Api.get(URL, { headers: { "x-access-token": token } })
    console.log("AS NOVAS CATEGORIAS EM PAGINA", resultado?.data.data[0].categories)
    setCategorias(resultado?.data.data[0].categories)

    const todas = resultado?.data.data[0].categories
    console.log({ todas })
    const category = todas?.find((categorie: any) => categorie.title === categorySlug)
    console.log({ category })
    if (category) {
      setBanners(category?.banners)
      setCategoria(category)
      setSubCategorias(category?.subcategories)
    }

  }




  async function changeProductCode(number: number, relactedsProducts: []) {
    setIsLoading(true)
    window.document.getElementById('scrollTop')?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    await setProductCode(number);
    await setProductsRelateds(relactedsProducts);
    toggleModalProduct();
  }

  async function changeProductCodeInterna(number: number, relactedsProducts: []) {
    setIsLoading(true)
    window.document.getElementById('scrollTop')?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    await setProductCode(number);
    await setProductsRelateds(relactedsProducts);
  }

  function toggleModalProduct() {
    setIsModalProductOpen(!isModalProductOpen);
  }

  function getQtd(valor: string) {
    const total = products.filter((prd) => prd?.product_site_categories?.indexOf(valor) > -1 && prd?.product_status == "active")
    console.log({ total })
    return total?.length;
  }

  function showMoreCategoriesClick() {
    setShowMoreCategories(true);
  }

  const [totalProdutosAtivos, setTotalAtivos] = useState<number>(0)
  const [banners, setBanners] = useState<any>([])
  const [showBanners, setShowBanners] = useState<boolean>(false)
  useEffect(() => {
    let total: number = 0
    for (const k in products) {
      if (products[k].product_status == 'active') { total++ }
    }

    var token: string | null = localStorage.getItem("token");
    if (token == null) {
      token = "";
    }
    getMyNewCategories(token)
    setTotalAtivos(total)


    const AFFILIATE_ID: any = Number(process.env.AFFILIATE_ID);

    setAffiliateID(AFFILIATE_ID);




  }, [router.query])

  useEffect(() => {
    console.log('banners', banners)
    const exists = typeof banners === "object" ?? banners?.find((x: any) => x.active === "1" || x.active === "true" || x.active === true || x.active == 1)
    console.log(exists)
    if (exists) {
      setShowBanners(true)
    }

  }, [banners])



  useEffect(() => {
    console.log("OS PRODUTOS", products)

  }, [products]);

  useEffect(() => {

    console.log("ELAS", { categorias, subCategorias, categoria })
    try {
      let lista: any = [];
      for (const k in subCategorias) {
        let items: any = [];
        console.log(products)
        for (const a in products) {
          if (products[a].product_site_categories?.toLocaleLowerCase()?.indexOf(subCategorias[k].title.toLocaleLowerCase()) > -1 && products[a].product_status.toLocaleLowerCase() == 'active') {
            items.push(products[a])
          }
        }
        if (subCategorias[k].active && subCategorias[k].active != "false" || subCategorias[k].active == "true" || subCategorias[k].active == "1") {
          lista.push({ name: subCategorias[k].title, active: subCategorias[k].active, items });
        }

      }
      console.log('a lista', lista)
      setCategorias(lista);

    } catch (ee) {
      console.log(ee)
    }
  }, [subCategorias])


  const [vezes, setVezes] = useState<number>(0)
  useEffect(() => {
    console.log('mudei ' + vezes + ' vezes')
    let vezes2 = vezes + 1
    setVezes(vezes2)

    const AFFILIATE_ID: number = Number(process.env.AFFILIATE_ID);

    const fetch = async () => {
      await getAllInformation(AFFILIATE_ID, productCode);
      await getAllRelacteds(AFFILIATE_ID, productsRelateds);
    }
    fetch().then(result => {
      setIsLoading(false)
    }).catch(err => {
      //console.log(err)
    })

  }, [productCode, productsRelateds]);







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
      {products?.length > 0 ? (
        <div className={`${styles.pageCategory} padding-mobile`}>
          <h1 className={styles.pageTitle}>
            <span className={`d-none d-lg-block`}>{categorySlug}</span>{" "}
            <span className={`${styles.pageTitleIcon} d-lg-none`}>
              <MobileModalCloseButton /> {categorySlug}
            </span>
          </h1>

          <div className={`${styles.exibindo}`}>
            Mostrando{" "}
            <span className={styles.exibindoQtd}>{totalProdutosAtivos}</span>{" "}
            produtos em{" "}
            <span className={styles.exibindoCategories}>
              {categorySlug}
            </span>
          </div>

          <div className={`model-page-interna ${styles.modelPageInterna}`}>

            <div className={styles.mainBanner}>
              {
                showBanners ?
                  <Carousel
                    showArrows={true}
                    showThumbs={false}
                    showStatus={false}
                    infiniteLoop={true}
                  >
                    {
                      banners?.default?.map((bnn: any) => (
                        bnn.active && bnn.active != "false" ?
                          <div key={Math.random()} className={styles.bannerItem}>
                            <SmartImage
                              src={bnn?.url}
                              layout="fill"
                              objectFit="cover"
                            />
                          </div>
                          :
                          <div key={Math.random()} className="oculta"></div>

                      ))

                    }




                  </Carousel>

                  :
                  <div className="oculta"></div>
              }

            </div>


            <div className={`content ${styles.content}`}>
              <nav
                className={`${styles.categoryMenu} ${showMoreCategories
                  ? styles.categoryMenuShowLess
                  : styles.categoryMenuShowMore
                  }`}
              >
                <CategoryButton
                  name="Todas as Subcategorias"
                  image={categoria?.icon.indexOf("https") > -1 ? categoria?.icon : "https://admin.api-smartcomerci.com.br/assets/icons/" + categoria?.icon}
                  count={totalProdutosAtivos}
                  link="/"
                  active
                />

                {subCategorias?.length > categoriesToShow && showMoreCategories
                  ? subCategorias.map((sb: any) => (

                    sb.active == "1" && getQtd(sb.title) > 0 || sb.active == "true" && getQtd(sb.title) > 0 ?

                      <CategoryButton
                        key={sb.title}
                        name={sb.title}
                        image={categoria?.icon.indexOf("https") > -1 ? categoria?.icon : "https://admin.api-smartcomerci.com.br/assets/icons/" + categoria?.icon}
                        count={getQtd(sb.title)}
                        link={`../../../c/${categorySlug.replace(/\//, '_')}/sc/${sb.title.replace(/\//, '_')}`}
                      />
                      :
                      <div key={Math.random()} className="oculta"></div>
                  ))

                  : Array.isArray(subCategorias) && subCategorias.slice(0, categoriesToShow).map((sb: any) => (
                    sb.active == "1" && getQtd(sb.title) > 0 || sb.active == "true" && getQtd(sb.title) > 0 ?
                      <CategoryButton
                        key={sb.title}
                        name={sb.title}
                        image={categoria?.icon.indexOf("https") > -1 ? categoria?.icon : "https://admin.api-smartcomerci.com.br/assets/icons/" + categoria?.icon}
                        count={getQtd(sb.title)}
                        link={`../../../c/${categorySlug.replace(/\//, '_')}/sc/${sb.title.replace(/\//, '_')}`}
                      />
                      :
                      <div key={Math.random()} className="oculta"></div>
                  ))}

                <button
                  onClick={showMoreCategoriesClick}
                  className={`${styles.categoryMenuMostrarMais} ${(showMoreCategories || subCategorias?.length <= categoriesToShow) ? styles.disabled : ""
                    }`}
                >
                  Mostrar mais {subCategorias?.length - categoriesToShow} <span className={styles.MenuArrow}></span>
                </button>
              </nav>
            </div>
          </div>

          <div className={`model-page-interna ${styles.mainContent}`}>
            {
              categorias.map(({ name = '', active = false, items = [] }) => (

                items.length > 0 && active ?

                  <div key={Math.random()} className={Substyles.boxOfertas}>
                    <div
                      className={`${Substyles.boxOfertasHeader} ${styles.boxOfertasHeader}`}
                    >
                      <h2 className={Substyles.boxOfertasTitle}>{name}</h2>
                      <Link href={`../../../c/${categorySlug.replace(/\//, '_')}/sc/${name.replace(/\//, '_')}`} passHref>
                        <span className={` ${Substyles.boxOfertasLink} ${styles.verTodas}`}
                        >
                          ver todas
                        </span>
                      </Link>
                    </div>

                    <div className={`${styles.productList}`}>
                      {items
                        .slice(0, 6)
                        .map(
                          (product: any, index, filtered) => (
                            <ProductCardSearch
                              noCarrinho={noCarrinho}
                              addCart={increase}
                              removeCart={decrease}
                              onClick={changeProductCode}
                              key={product.id}
                              product={product}
                              style={filtered?.length <= 2 ? { maxWidth: '270px' } : {}}
                            />
                          )
                        )}
                    </div>
                  </div>
                  :
                  <div key={Math.random()} className="oculta"></div>
              ))
            }

          </div>

          <Modal
            modalActive={isModalProductOpen}
            onCloseClick={toggleModalProduct}
            bgColor="white"
          >
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
              onCloseClick={toggleModalProduct}
            />
          </Modal>
        </div>
      ) : (
        <div>
          <h3>Buscando informações...</h3>
        </div>
      )}
    </LayoutDefault>
  );
}



