import { useEffect, useState, useContext, useMemo } from "react";

import Image from "next/image";
import LayoutDefault from "@components/Layouts/LayoutDefault";

import Button from "@components/Buttons/Button";
import Modal from "@components/Modals/Modal";
import ModalProduct from "@components/Modals/ModalProduct";
import styles2 from "../styles/pages/Home.module.css";
import styles from "@styles/pages/Receitas.module.css";
import { useProductsRelateds } from "src/hooks/useProductsRelateds";
import React from "react";
import { Cart } from "@models/Cart";
import { Product2 } from "@models/Product2";
import { ProductOrder } from "@models/ProductOrder";
import { Api } from "src/providers";
import { useProductInformation } from "src/hooks/useProductInformation";
import { useProducts } from "src/hooks/useProducts";
import { useProducts1 } from "src/hooks/useProducts1";
import { useProducts2 } from "src/hooks/useProducts2";
import { useProducts3 } from "src/hooks/useProducts3";
import { useLocalStorage } from "src/providers/useLocalStorage";
import { useSearch } from "src/hooks/useSearch";
import Newsletter from "@components/Newsletter";
import ProductCardList from "@components/Products/ProductCardList";
import Link from "next/link";
import products from "./api/products";
import ProductCardListStyle from "@styles/components/ProductCardList.module.css";
import ProductCard from "@components/Products/ProductCard";
import ProductCardSearch from "@components/Products/ProductCardSearch";
import CaracteristicasBox from "@components/CaracteristicasBox";
import CategoryBox from "@components/CategoryBox";
import MarcasBox from "@components/MarcasBox";
import PriceBox from "@components/PriceBox";
import BoxSubcategoryLink from "@components/AsideBar/boxSubcategoryLink";
import SearchFail from "@components/SearchFail";
import { AppContext } from "src/pages/_app";
import styles4 from "@styles/pages/Search.module.css";
import ButtonOrderBy from "@components/Buttons/ButtonOrderBy";
import ModalOrderBy from "@components/Modals/ModalOrderBy";

export default function Receitas() {
  const {
    carts,
    decrease,
    increase,
    remove,
    update,
    updateDetail,
    noCarrinho,
  } = useContext(AppContext);

  const [modalProduct, setModalProduct] = useState(false);
  const [state, setState] = useLocalStorage("Ronan");
  const [isLoading, setIsLoading] = useState(true);
  const [productCode, setProductCode] = useState(11);
  const [affiliateID, setAffiliateID] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("$$$$$$$$$$$");
  const [subcategoryMenuSelected, setSubcategoryMenuSelected] = useState("Preço");
  const [filter, setFilter] = useState({ parametro: '', type: '' });
  const [modalOrderBy, setModalOrderBy] = useState(false);
  const [isLoadingCerto, setIsLoadingCerto] = useState(false);
  function triggerModalOrderBy() {
    setModalOrderBy(!modalOrderBy);
  }
  const [productsRelateds, setProductsRelateds] = useState([
    998503,
    998483,
    57154,
    56929,
    29080, // default relateds
  ]);

  const { tasks3, getAllRelacteds } = useProductsRelateds(
    affiliateID,
    productsRelateds
  );
  const { tasks2, getAllInformation } = useProductInformation(
    affiliateID,
    productCode
  );

  const { busca, getSearch } = useSearch(affiliateID, 0, 100, searchValue, { preserveData: true });

  const products = useMemo(() => busca.filter(product => product.product_status === 'active') || [], [busca]);

  const filteredProducts = useMemo(() => {
    let newList: Product2[] = [];
    const { type = '', parametro = '' } = filter;

    if (!type) {
      return products;
    }

    if (type == "valor") {
      let values = JSON.parse(parametro)

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
    } else if (type == "marca") {
      let values = parametro.toString().trim()
      for (const k in products) {
        if (products[k].product_fabricacao?.indexOf(values) > -1) {
          newList.push(
            products[k]
          )
        }
      }
    } else if (type == "variacao") {
      let values = parametro.toString().trim()
      for (const k in products) {
        if (products[k].product_site_variations?.indexOf(values) > -1) {
          newList.push(
            products[k]
          )
        }
      }
    }

    return newList;
  }, [filter, products]);
  const [modalFilterBy, setModalFilterBy] = useState(false);
  function triggerModalFilterBy() {
    setModalFilterBy(!modalFilterBy);
  }




  const tags = useMemo(() => {
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
      "count": getQtd(products, name.replace(/,/g, ''), 'marcas'),
    }));

    listaVariacoes = listaVariacoes.map((name = '') => ({
      "name": name.replace(/,/g, ''),
      "count": getQtd(products, name.replace(/,/g, ''), 'variacoes')
    }))

    return {
      marcas: listaMarcas,
      variacoes: listaVariacoes
    }
  }, [products]);

  // effects
  useEffect(() => {
    localStorage.setItem("listShow", "0")
  }, [carts])

  useEffect(() => {
    var AFFILIATE_ID: number = Number(process.env.AFFILIATE_ID);

    const fetch = async () => {
      await getAllInformation(AFFILIATE_ID, productCode);
      await getAllRelacteds(AFFILIATE_ID, productsRelateds);
    }


    fetch().then(result => {
      setIsLoadingCerto(false)
    }).catch(err => {
      // console.log(err)
    })
  }, [productCode]);

  useEffect(() => {
    setSearchValue(decodeURI(window.location.search.substring(1)));
    var AFFILIATE_ID: number = Number(process.env.AFFILIATE_ID);

    getSearch(
      AFFILIATE_ID,
      0,
      25,
      decodeURI(window.location.search.substring(1))
    ).then(() => setIsLoading(false));
  }, []);

  const handleClickSeeMoreProducts = () => {
    const AFFILIATE_ID: number = Number(process.env.AFFILIATE_ID);
    const lastProduct = busca[busca.length - 1];

    if (lastProduct && busca.length % 100 === 0) {

      getSearch(
        AFFILIATE_ID,
        lastProduct.id,
        25,
        decodeURI(window.location.search.substring(1))
      )
    }
  }

  const mudaView = (parametro: any, type: string) => setFilter({ parametro, type });

  function subcategoryMenuClick(item_selected: string) {
    setSubcategoryMenuSelected(item_selected);
  }

  function changeProductCode(number: number, relactedsProducts: []) {
    window.document.getElementById('scrollTop')?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    setIsLoadingCerto(true)
    setProductCode(number);
    setProductsRelateds(relactedsProducts);
    setModal();
  }

  function changeProductCodeInterna(number: number, relactedsProducts: []) {
    setIsLoadingCerto(true)
    setProductCode(number);
    setProductsRelateds(relactedsProducts);
  }

  function setModal() {
    setModalProduct(!modalProduct);
  }

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
      <main className={styles4.pageReceitas}>
        <h1 className={styles4.resultadoPara}>
          {
            !isLoading ? (
              <>
                {`${products.length} resultados para `}
                <span className={styles4.resultValue}>{'"' + searchValue + '"'}</span>
              </>
            ) : 'Buscando...'
          }
        </h1>

        {
          products.length > 0 ?
            <div>
              <div className="model-page-interna boxDesktop">
                <div className={styles4.content}>
                  <nav className={styles4.subcategoryMenu}>
                    <button
                      className={`oculta ${styles4.subcategoryMenuItem} ${subcategoryMenuSelected === "Categorias" ? styles4.active : ""
                        }`}
                      onClick={() => subcategoryMenuClick("Categorias")}
                    >
                      Categorias
                    </button>

                    <button
                      className={`oculta ${styles4.subcategoryMenuItem} ${subcategoryMenuSelected === "Marcas" ? styles4.active : ""
                        }`}
                      onClick={() => subcategoryMenuClick("Marcas")}
                    >
                      Marcas
                    </button>

                    <button
                      className={`${styles4.subcategoryMenuItem} ${subcategoryMenuSelected === "Preço" ? styles4.active : ""
                        }`}
                      onClick={() => subcategoryMenuClick("Preço")}
                    >
                      Preço
                    </button>

                    <button
                      className={`${styles4.subcategoryMenuItem} ${subcategoryMenuSelected === "Características"
                        ? styles4.active
                        : ""
                        }`}
                      onClick={() => subcategoryMenuClick("Características")}
                    >
                      Características
                    </button>
                  </nav>
                </div>

                {subcategoryMenuSelected === "Categorias" ? (
                  <CategoryBox />
                ) : subcategoryMenuSelected === "Marcas" ? (
                  <MarcasBox setView={mudaView} src={tags.marcas} />
                ) : subcategoryMenuSelected === "Preço" ? (
                  <PriceBox limitPrice={getMajorvalue(products)} setShow={mudaView} />
                ) : (
                  <CaracteristicasBox setView={mudaView} src={tags.variacoes} />
                )}
              </div>

              <div className="model-page-interna">
                <div className={styles4.boxOfertas}>
                  <div className={styles4.boxOfertasHeader}>
                    <div className={styles4.exibindo}>
                      Mostrando <strong className={styles4.exibindoQtd}>{filteredProducts.length}</strong>{" "}
                      produtos em{" "}
                      <span className={styles4.exibindoCategories}>subcategoria</span>
                    </div>

                    <div className={`${styles4.boxOfertasLink} boxDesktop`}>
                      Ordenar por
                      <div className={styles4.selectBox}>
                        <select name="order" id="order">
                          <option value="popularidade">popularidade</option>
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

                  <div className={`${ProductCardListStyle.list} row`}>
                    {
                      filteredProducts.map((product, index) => (
                        product.product_status == 'active' && (
                          <ProductCardSearch
                            key={`${product.id}-${index}`}
                            noCarrinho={noCarrinho}
                            addCart={increase}
                            removeCart={decrease}
                            onClick={changeProductCode}
                            product={product}
                          />
                        )
                      ))
                    }
                  </div>
                  <div className="d-flex justify-content-center mt-5">
                    <Button onClick={handleClickSeeMoreProducts}>
                      Ver Mais
                    </Button>
                  </div>
                </div>
              </div>

            </div>
            : !isLoading
              ? <SearchFail />
              : null
        }


        <Modal modalActive={modalProduct} onCloseClick={setModal} bgColor="white">
          <ModalProduct
            isLoading={isLoadingCerto}
            changeProductCode={changeProductCode}
            detail={updateDetail}
            totalCarrinho={noCarrinho}
            increase={increase}
            decrease={decrease}
            productDetails={tasks2}
            handleAdd2={changeProductCodeInterna}
            productRelacteds={tasks3}
            onCloseClick={setModal}
          />
        </Modal>
      </main>
    </LayoutDefault>
  );
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

function getQtd(products: Product2[], valor: string, tipo: string) {
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

function getMajorvalue(products: Product2[]) {
  var count = 0

  for (const k in products) {
    if (products[k].product_valor > count) {
      count = products[k].product_valor
    }
  }

  return count
}