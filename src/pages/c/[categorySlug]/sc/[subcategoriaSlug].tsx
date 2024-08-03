/* eslint-disable jsx-a11y/alt-text */
import { GetServerSideProps } from 'next'
import React, { Component, useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import { AppContext } from "src/pages/_app";
import { Carousel } from "react-responsive-carousel";
import { TodoService } from "src/pages/api/TodoServices"
import { Marca } from "@models/Marca";
import { Caracteristica } from "@models/Caracteristica";
import { ProductOrder } from "@models/ProductOrder";
import { Cart } from "@models/Cart";
import { Product2 } from "@models/Product2";
import styles4 from "@styles/pages/Search.module.css";
import { useSearchCat } from "src/hooks/useSearchCat";
import { useProducts } from "src/hooks/useProducts";
import { useProductsRelateds } from "src/hooks/useProductsRelateds";
import { Api } from "@components/providers";
import styles5 from "@styles/pages/404.module.css";
import Substyles from "@styles/pages/Search.module.css";
import { useProductInformation } from "src/hooks/useProductInformation";
import styles from "@styles/pages/Subcategory.module.css";
import Image from "next/image";
import styles2 from "@styles/pages/Category.module.css";
import ProductCardListStyle from "@styles/components/ProductCardList.module.css";
import MobileModalCloseButton from "@assets/icons/MobileModalCloseButton";

import ProductCardList from "@components/Products/ProductCardList";
import LayoutDefault from "@components/Layouts/LayoutDefault";
import CategoryButton from "@components/CategoryButton";
import CaracteristicasBox from "@components/CaracteristicasBox";
import ReceitaCard from "@components/Receitas/ReceitaCard";
import PriceBox from "@components/PriceBox";
import MarcasBox from "@components/MarcasBox";
import ModalOrderBy from "@components/Modals/ModalOrderBy";
import ButtonOrderBy from "@components/Buttons/ButtonOrderBy";
import ProductCardSearch from "@components/Products/ProductCardSearch";
import Modal from "@components/Modals/Modal";
import ModalProduct from "@components/Modals/ModalProduct";
import { BANNER, SubCategories } from '@models/SubCategories';
import { ajustStrigfy } from '@models/masks';
import SmartImage from '@components/SmartImage';

interface PageProps {
  products: Product2[],
  subCategories: any,
}

export default function Subcategoria({ products = [] }: PageProps) {
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
  const { categorySlug = '', subcategoriaSlug = '' }: any = router.query;
  const [subcategoryMenuSelected, setSubcategoryMenuSelected] = useState("Preço");

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
  const [viewProducts, setViewProducts] = useState<Product2[]>([]);
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [variacoes, setVriacoes] = useState<Caracteristica[]>([]);
  const [subCategories, setSubCategories] = useState<any>();

  const [modalOrderBy, setModalOrderBy] = useState(false);
  const [modalFilterBy, setModalFilterBy] = useState(false);

  const { tasks3, getAllRelacteds } = useProductsRelateds(
    affiliateID,
    productsRelateds
  );
  const { tasks2, getAllInformation } = useProductInformation(
    affiliateID,
    productCode
  );

  useEffect(() => {
    const AFFILIATE_ID: any = Number(process.env.AFFILIATE_ID);

    setAffiliateID(AFFILIATE_ID);
  }, []);

  useEffect(() => {
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

  useEffect(() => {
    setViewProducts(products)
    let listaMarcas: any[] = [], listaVariacoes: any[] = [];

    for (const product of products) {
      if (product.product_fabricacao && !listaMarcas.includes(product.product_fabricacao)) {
        listaMarcas.push(product.product_fabricacao);
      }

      if (product.product_site_variations && !listaVariacoes.includes(product.product_site_variations)) {
        listaVariacoes.push(product.product_site_variations);
      }
    }

    listaMarcas = OrdenaArray(listaMarcas, "ASC");
    listaVariacoes = OrdenaArray(listaVariacoes, "ASC");

    listaMarcas = listaMarcas.map((name = '') => ({
      "name": name.replace(/,/g, ''),
      "id": Math.random().toString(),
      "count": getQtd(name.replace(/,/g, ''), 'marcas'),
    }));

    listaVariacoes = listaVariacoes.map((name = '') => ({
      "name": name.replace(/,/g, ''),
      "count": getQtd(name.replace(/,/g, ''), 'variacoes')
    }))

    setMarcas(listaMarcas);
    setVriacoes(listaVariacoes);
  }, [products]);

  function changeProductCode(number: number, relactedsProducts: []) {
    setIsLoading(true)
    window.document.getElementById('scrollTop')?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    setProductCode(number);
    setProductsRelateds(relactedsProducts);
    toggleModalProduct();
  }

  function changeProductCodeInterna(number: number, relactedsProducts: []) {
    setIsLoading(true)
    window.document.getElementById('scrollTop')?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    setProductCode(number);
    setProductsRelateds(relactedsProducts);
  }

  function toggleModalProduct() {
    setIsModalProductOpen(!isModalProductOpen);
  }

  function OrdenaArray(lista: any, ordem: string) {
    return lista.sort(function (a: any, b: any) {
      const x = a;
      const y = b;

      if (ordem === 'ASC') {
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      }
      if (ordem === 'DESC') {
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
      }
    });
  }

  function subcategoryMenuClick(item_selected: string) {
    setSubcategoryMenuSelected(item_selected);
  }

  function getQtd(valor: string, tipo: string) {
    var count = 0
    if (tipo == 'marcas') {
      for (const k in products) {
        if (products[k].product_fabricacao?.indexOf(valor) > -1) {
          count++
        }
      }
    }
    if (tipo == 'variacoes') {
      for (const k in products) {
        if (products[k].product_site_variations?.indexOf(valor) > -1) {
          count++
        }
      }
    }

    return count
  }

  function mudaView(parametro: any, type: string) {
    var newList: Product2[] = []
    if (type == "valor") {
      let values = JSON.parse(ajustStrigfy(parametro))

      for (const k in products) {
        var valorCompara = products[k].product_valor ? products[k].product_valor : products[k].product_valor
        if (valorCompara > products[k].product_valor) {
          valorCompara = products[k].product_valor
        }

        if (valorCompara >= values.start && valorCompara <= values.end) {
          newList.push(
            products[k]
          )
        }
      }
    }

    if (type == "marca") {
      let values = parametro.toString().trim()
      for (const k in products) {
        if (products[k].product_fabricacao?.indexOf(values) > -1) {
          newList.push(
            products[k]
          )
        }
      }

    }
    if (type == "variacao") {
      let values = parametro.toString().trim()
      for (const k in products) {
        if (products[k].product_site_variations?.indexOf(values) > -1) {
          newList.push(
            products[k]
          )
        }
      }

    }

    setViewProducts(newList)
  }

  function triggerModalOrderBy() {
    setModalOrderBy(!modalOrderBy);
  }

  function triggerModalFilterBy() {
    setModalFilterBy(!modalFilterBy);
  }




  const [totalProdutosAtivos, setTotalAtivos] = useState<number>(0)
  const [categoria, setCategoria] = useState<any>()
  async function getMyNewCategories(token: string = "") {
    let URL = process.env.SMART_API + "/categorie_find/" + process.env.AFFILIATE_ID
    let header = {
      headers: { "x-access-token": token }
    }
    const resultado = await Api.get(URL, { headers: { "x-access-token": token } })
    console.log("AS NOVAS CATEGORIAS EM SUBCAT", resultado?.data.data[0].categories)

    const todas = resultado?.data.data[0].categories
    console.log({ todas })
    const category = todas?.find((categorie: any) => categorie.title === categorySlug)
    console.log({ category })
    if (category) {
      setBanners(category?.banners?.default)
      setCategoria(category)
    }

  }

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
  }, [])





  const [banners, setBanners] = useState<any>()
  const [showBanners, setShowBanners] = useState<boolean>(false)

  useEffect(() => {
    console.log({ subCategories, categoria })
  }, [subCategories, categoria])


  useEffect(() => {
    console.log('bann...', banners)

    const exists = typeof banners === "object" ?? banners?.find((x: any) => x.active === "1" || x.active === "true" || x.active === true || x.active == 1)
    console.log(exists)
    if (exists) {
      setShowBanners(true)
    }
  }, [banners])

  const [isLoading, setIsLoading] = useState(true);


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


      <main className={styles.pageSubcategory}>
        <div className={`${styles.breadcrumbs}`}>
          <Link href="/" passHref>
            <span>Home</span>
          </Link>
          <div className={styles.separator}></div>
          <Link href={`../../../c/${categorySlug}`} passHref>
            <span>{categorySlug.replace(/_/g, '/')}</span>
          </Link>
          <div className={styles.separator}></div>
          <Link href={`../../../c/${categorySlug}/sc/${subcategoriaSlug}`} passHref>
            <span>{subcategoriaSlug.replace(/_/g, '/')}</span>
          </Link>


        </div>

        <div className={`${styles.headerMobile} d-lg-none`}>
          <div className="container">
            <h1 className={`${styles.pageTitleIcon}`}>
              <MobileModalCloseButton /> {subcategoriaSlug.replace(/_/g, '/')}
            </h1>

            <div className={styles.exibindo}>
              Mostrando{" "}
              <span className={styles.exibindoQtd}>{totalProdutosAtivos}</span>{" "}
              produtos
            </div>
          </div>
        </div>

        <div className={`model-page-interna  ${styles.pageHeader}`}>



          <div className={styles2.mainBanner}>
            {
              showBanners ?
                <Carousel
                  showArrows={true}
                  showThumbs={false}
                  showStatus={false}
                  infiniteLoop={true}
                >
                  {
                    banners?.map((bnn: any) => (
                      bnn.active && bnn.active !== "false" || bnn.active == "true" || bnn.active == "1" ?
                        <div key={Math.random()} className={styles2.bannerItem}>
                          <SmartImage
                            src={bnn.url}
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
          <br />

          {
            banners && banners?.length > 0 ?
              <h1 style={{
                position: 'absolute',
                top: '200px',
                zIndex: 0,
                marginLeft: '50px',
              }} className={` ${styles.bannerTitle} pad15`}>{subcategoriaSlug.replace(/_/g, '/')}</h1>

              :
              <h1 className={` ${styles.bannerTitle} pad15`}>{subcategoriaSlug.replace(/_/g, '/')}</h1>
          }






          <div className={styles.content}>
            <nav className={styles.subcategoryMenu}>
              <button
                className={` oculta ${styles.subcategoryMenuItem} ${subcategoryMenuSelected === "Marcas" ? styles.active : ""
                  }`}
                onClick={() => subcategoryMenuClick("Marcas")}
              >
                Marcas
              </button>
              <button
                className={`${styles.subcategoryMenuItem} ${subcategoryMenuSelected === "Preço" ? styles.active : ""
                  }`}
                onClick={() => subcategoryMenuClick("Preço")}
              >
                Preço
              </button>
              <button
                className={`${styles.subcategoryMenuItem} ${subcategoryMenuSelected === "Características"
                  ? styles.active
                  : ""
                  }`}
                onClick={() => subcategoryMenuClick("Características")}
              >
                Características
              </button>
            </nav>
          </div>

          {
            subcategoryMenuSelected === "Marcas"
              ? <MarcasBox src={marcas} setView={mudaView} />
              : subcategoryMenuSelected === "Preço"
                ? <PriceBox setShow={mudaView} />
                : <CaracteristicasBox setView={mudaView} src={variacoes} />
          }
        </div>
        {viewProducts.length > 0 ?
          <div className={`model-page-interna`}>
            <div className={`${Substyles.boxOfertas} ${styles.boxOfertas}`}>
              <div className={Substyles.boxOfertasHeader}>
                <div className={`${Substyles.exibindo} ${styles.exibindo}`}>
                  Mostrando{" "}
                  <span className={Substyles.exibindoQtd}>
                    {products.length}
                  </span>{" "}
                  produtos em{" "}
                  <span className={Substyles.exibindoCategories}>{subcategoriaSlug}</span>
                </div>


                <div
                  className={`${Substyles.boxOfertasLink} ${styles.boxOfertasLink} hide-mobile`}
                >
                  Ordenar por
                  <div className={Substyles.selectBox}>
                    <select name="order" id="order">
                      <option value="popularidade">Menor Preço</option>
                      <option value="popularidade">Maior Preço</option>
                      <option value="popularidade">Nome A-Z</option>
                      <option value="popularidade">Nome Z-A</option>
                    </select>
                  </div>
                </div>

                <div className="buttonsFilter">
                  <ButtonOrderBy titleButton="Ordenar por" className="btnOrderBy  d-lg-none" onClick={triggerModalOrderBy} />
                  <ButtonOrderBy titleButton="Filtrar por" className="btnOrderBy  d-lg-none" onClick={triggerModalFilterBy} />

                </div>


                <ModalOrderBy
                  modalActive={modalOrderBy}
                  title="Ordenar por"
                  onCloseClick={triggerModalOrderBy}
                />


                <ModalOrderBy
                  modalActive={modalFilterBy}
                  title="Filtrar por"
                  onCloseClick={triggerModalFilterBy}
                />

              </div>

              <div className={`${styles.productList} row`}>
                {
                  viewProducts.map((product, index) => (
                    product.product_status == 'active' && (
                      <ProductCardSearch
                        noCarrinho={noCarrinho}
                        addCart={increase}
                        removeCart={decrease}
                        onClick={changeProductCode}
                        key={`${product.id}-${index}`}
                        product={product}
                      />
                    )
                  ))
                }
              </div>
            </div>
          </div>
          :

          <div className='oculta'> </div>
        }

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
      </main>


    </LayoutDefault>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let { categorySlug = ' ', subcategoriaSlug = ' ' }: any = context.query;
  categorySlug = categorySlug.replace(/_/g, '/')
  subcategoriaSlug = subcategoriaSlug.replace(/_/g, '/')
  const affiliate_id = Number(process.env.AFFILIATE_ID);
  const master_id = Number(process.env.MASTER_ID);

  const products = await TodoService.getProductsSearchCat2(affiliate_id, 0, 100, subcategoriaSlug);

  // const products = await Api.post("/productSearchSite", {
  //   product_affiliate_id: affiliate_id,
  //   product_site_name: subcategoriaSlug,
  //   product_code: subcategoriaSlug,
  //   lastID: 0,
  //   totalItems: 50 
  // })
  // console.log(products)
  // console.log({
  //   product_affiliate_id: affiliate_id,
  //   product_site_name: subcategoriaSlug,
  //   product_code: subcategoriaSlug,
  //   lastID: 0,
  //   totalItems: 50 
  // })


  const categoriesPromise = Api.post("/getCatList", {
    affiliate_id,
    master_id,
    limit: 99999,
  })

  const [categories] = await Promise.all([
    categoriesPromise,
  ])
  const category = categories?.data.find(getCategoryById(categorySlug));
  const banners1: BANNER[] = []

  try {

    let banners: any = JSON.parse(ajustStrigfy(category.subcategorie_banners))
    // console.log('los banners',banners)
    for (const k in banners?.banners) {
      try {
        banners1.push({
          img: banners?.banners[k]['url'],
          link: banners?.banners[k]['url'],
          active: banners?.banners[k]['active']
        })
        // console.log('los banners1',banners1)
      } catch (err) {
        // console.log('erro',err)
      }

    }
  } catch (ee) {
    // console.log('deu ruim',ee)
  }

  const subCategories = category?.hasOwnProperty("affiliate_categorie_status")
    ? JSON.parse(ajustStrigfy(category.affiliate_categorie_status)).map(
      ({ subCategoria = "", status = "", banners = "[]" }) => ({
        ...category,
        affiliate_categorie_name: subCategoria,
        affiliate_categorie_status: status,
        banners: banners,
        affiliate_id,
        affiliate_master_id: master_id,
        categoria: categorySlug,
      })
    )
    : [];



  return { props: { products: products.data, subCategories: subCategories } }
}

const getCategoryById =
  (categorySlug = "") =>
    (category: SubCategories) =>
      category.affiliate_categorie_name.toLowerCase().trim() ==
      categorySlug.toLocaleLowerCase().trim();
