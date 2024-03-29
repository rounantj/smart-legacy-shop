/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";

import LayoutDefault from "@components/Layouts/LayoutDefault";

import NotFoundFace from "@assets/icons/NotFoundFace";
import CheckRounded from "@assets/icons/CheckRounded";

import Link from "next/dist/client/link";

import Modal from "@components/Modals/Modal";
import ModalProduct from "@components/Modals/ModalProduct";
import styles from "@styles/pages/404.module.css";
import { useProductsRelateds } from "src/hooks/useProductsRelateds";
import React from "react";
import { Cart } from "@models/Cart";
import { Product2 } from "@models/Product2";
import { ProductOrder } from "@models/ProductOrder";
import { Api } from "src/providers";
import { useProductInformation } from "src/hooks/useProductInformation";

import { useLocalStorage } from "src/providers/useLocalStorage";
import { useSearch } from "src/hooks/useSearch";

import styles4 from "@styles/pages/Search.module.css";



import Image from "next/image";


import Button from "@components/Buttons/Button";

import styles2 from "../styles/pages/Home.module.css";

import { useProducts } from "src/hooks/useProducts";
import { useProducts1 } from "src/hooks/useProducts1";
import { useProducts2 } from "src/hooks/useProducts2";
import { useProducts3 } from "src/hooks/useProducts3";

import Newsletter from "@components/Newsletter";
import ProductCardList from "@components/Products/ProductCardList";

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
import { ajustStrigfy } from "@models/masks";


export default function page404() {
  const [modalProduct, setModalProduct] = useState(false);
  const [state, setState] = useLocalStorage("Ronan");

  function changeProductCode(number: number, relactedsProducts: []) {
    window.document.getElementById('scrollTop')?.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    setProductCode(number);
    setProductsRelateds(relactedsProducts);
    setModal();
  }
  function changeProductCodeInterna(number: number, relactedsProducts: []) {
    setProductCode(number);
    setProductsRelateds(relactedsProducts);
  }
  function setModal() {
    setModalProduct(!modalProduct);
  }

  const [productCode, setProductCode] = useState(11);
  const [firstId, setFirstId] = useState(0);
  const [firstId1, setFirstId1] = useState(10);
  const [firstId2, setFirstId2] = useState(20);
  const [firstId3, setFirstId3] = useState(30);
  const [affiliateID, setAffiliateID] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("$$$$$$$$$$$");

  // eslint-disable-next-line react-hooks/rules-of-hooks
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
  const { busca, getSearch } = useSearch(affiliateID, 0, 40, searchValue);

  const [productsIn, setProductsIn] = useState<ProductOrder[]>([]);

  const [prd, setPrd] = useState<Product2 | any>();

  const [valorTotal, setTotal] = useState(total);
  var [indexado, setIndex] = useState<number>(0);
  const [carts, setCarts] = useState<Cart | any>();

  function noCarrinho(product_code: number) {
    var myQt: number = 0;
    for (const k in productsIn) {
      if (productsIn[k].product_code == product_code) {
        myQt += productsIn[k].quantidade;
      }
    }
    return myQt;
  }

  function update(carts1: Cart) {
    setCarts(carts1);
  }

  useEffect(() => {
    let logged = localStorage.getItem("USER");
    async function reload() {
      var tk = localStorage.getItem("token")
        ? localStorage.getItem("token")
        : "";
      if (tk == null) {
        tk = "";
      }
      var MY_ID = Number(localStorage.getItem("MY_ID"));
      var MY_AFFILIATE_ID = Number(localStorage.getItem("MY_AFFILIATE_ID"));

      if (MY_ID == undefined || MY_AFFILIATE_ID == undefined) {
        alert("Necessário logar antes..");
      } else {
        const token: string = tk;
        Api.post<Cart[]>(
          "/getMyCart",
          { affiliate_id: MY_AFFILIATE_ID, client_id: MY_ID },
          { headers: { "x-access-token": token } }
        )
          .then((response) => {
            if (response.data.length > 0) {
              var otherCart: Cart = {
                id: response.data[0].id,
                cart_status: response.data[0].cart_status,
                cart_conteudo: response.data[0].cart_conteudo,
                cart_affiliate_id: response.data[0].cart_affiliate_id,
                cart_valor_total: response.data[0].cart_valor_total,
                cart_client_id: response.data[0].cart_client_id,
              };
              
              var otherPRD: ProductOrder[] = JSON.parse(
                ajustStrigfy(response.data[0].cart_conteudo)
              );

              primeiroLoad(otherPRD);
            } else {
            }
          })
          .catch((error) => { });
      }
    }
    reload();
  }, [setProductsIn, setTotal, setCarts]);

  function decrease(product_code: number) {
    var outra = productsIn;
    var nova: ProductOrder[] = [];
    for (const k in outra) {
      if (outra[k].product_code == product_code) {
        var quantidade = outra[k].quantidade - 1;
        if (quantidade < 0) {
          quantidade = 0;
        }
        nova.push({
          id: outra[k].id,
          product_affiliate_id: outra[k].product_affiliate_id,
          product_code: outra[k].product_code,
          product_ean: outra[k].product_ean,

          product_descricao: outra[k].product_descricao,
          product_valor: outra[k].product_valor,
          product_categoria: outra[k].product_categoria,
          product_fabricacao: outra[k].product_fabricacao,
          product_estoque: outra[k].product_estoque,
          product_medida: outra[k].product_medida,
          product_etiquetas: outra[k].product_etiquetas,
          product_thumbnail: outra[k].product_thumbnail,
          quantidade: quantidade,
          valor: outra[k].valor,
          comentario: outra[k].comentario,
          caracteristica: outra[k].caracteristica,
          desconto: outra[k].desconto,
        });
      } else {
        nova.push(outra[k]);
      }
    }

    if (nova[0].quantidade <= 0) {
      remove(nova[0].product_code)
    } else {
      consolida(nova);
    }
  }
  function total() {
    var totalPedido: number = 0;
    for (const k in productsIn) {
      totalPedido += productsIn[k].product_valor * productsIn[k].quantidade;
    }
    return totalPedido;
  }
  function updateDetail(product_code: number, detail: string, content: string) {
    var outra = productsIn;
    var nova: ProductOrder[] = [];

    for (const k in outra) {
      if (outra[k].product_code == product_code) {
        if (detail == "comentario") {
          nova.push({
            id: outra[k].id,
            product_affiliate_id: outra[k].product_affiliate_id,
            product_code: outra[k].product_code,
            product_ean: outra[k].product_ean,

            comentario: content,
            caracteristica: outra[k].caracteristica,

            product_descricao: outra[k].product_descricao,
            product_valor: outra[k].product_valor,
            product_categoria: outra[k].product_categoria,
            product_fabricacao: outra[k].product_fabricacao,
            product_estoque: outra[k].product_estoque,
            product_medida: outra[k].product_medida,
            product_etiquetas: outra[k].product_etiquetas,
            product_thumbnail: outra[k].product_thumbnail,
            quantidade: outra[k].quantidade,
            valor: outra[k].valor,
            desconto: outra[k].desconto,
          });
        } else {
          nova.push({
            id: outra[k].id,
            product_affiliate_id: outra[k].product_affiliate_id,
            product_code: outra[k].product_code,
            product_ean: outra[k].product_ean,

            caracteristica: content,
            comentario: outra[k].comentario,

            product_descricao: outra[k].product_descricao,
            product_valor: outra[k].product_valor,
            product_categoria: outra[k].product_categoria,
            product_fabricacao: outra[k].product_fabricacao,
            product_estoque: outra[k].product_estoque,
            product_medida: outra[k].product_medida,
            product_etiquetas: outra[k].product_etiquetas,
            product_thumbnail: outra[k].product_thumbnail,
            quantidade: outra[k].quantidade,
            valor: outra[k].valor,
            desconto: outra[k].desconto,
          });
        }
      } else {
        nova.push(outra[k]);
      }
    }
    consolida(nova);
  }

  function increase(product_code: number, product: Product2) {
    var outra = productsIn;
    var nova: ProductOrder[] = [];
    var eraUnico = true;
    if (product != undefined) {
      if (productsIn.length == 0) {
        nova.push({
          id: product.id,
          product_affiliate_id: product.product_affiliate_id,
          product_code: product.product_code,
          product_ean: product.product_ean,
          caracteristica: "",
          product_descricao: product.product_descricao,
          product_valor: product.product_valor,
          product_categoria: product.product_categoria,
          product_fabricacao: product.product_fabricacao,
          product_estoque: product.product_estoque,
          product_medida: product.product_medida,
          product_etiquetas: product.product_etiquetas,
          product_thumbnail: product.product_thumbnail,
          comentario: "",
          quantidade: 1,
          valor: product.product_valor,
          desconto: 0,
        });
      } else {
        for (const k in outra) {
          if (outra[k].product_code == product_code) {
            eraUnico = false;
            nova.push({
              id: outra[k].id,
              product_affiliate_id: outra[k].product_affiliate_id,
              product_code: outra[k].product_code,
              product_ean: outra[k].product_ean,
              comentario: outra[k].comentario,
              caracteristica: outra[k].caracteristica,
              product_descricao: outra[k].product_descricao,
              product_valor: outra[k].product_valor,
              product_categoria: outra[k].product_categoria,
              product_fabricacao: outra[k].product_fabricacao,
              product_estoque: outra[k].product_estoque,
              product_medida: outra[k].product_medida,
              product_etiquetas: outra[k].product_etiquetas,
              product_thumbnail: outra[k].product_thumbnail,
              quantidade: outra[k].quantidade + 1,
              valor: outra[k].valor,
              desconto: outra[k].desconto,
            });
          } else {
            nova.push(outra[k]);
          }
        }
        if (eraUnico) {
          nova.push({
            id: product.id,
            product_affiliate_id: product.product_affiliate_id,
            product_code: product.product_code,
            product_ean: product.product_ean,
            comentario: "",
            caracteristica: "",
            product_descricao: product.product_descricao,
            product_valor: product.product_valor,
            product_categoria: product.product_categoria,
            product_fabricacao: product.product_fabricacao,
            product_estoque: product.product_estoque,
            product_medida: product.product_medida,
            product_etiquetas: product.product_etiquetas,
            product_thumbnail: product.product_thumbnail,
            quantidade: 1,
            valor: product.product_valor,
            desconto: 0,
          });
        }
      }
    } else {
      for (const k in outra) {
        if (outra[k].product_code == product_code) {
          nova.push({
            id: outra[k].id,
            product_affiliate_id: outra[k].product_affiliate_id,
            product_code: outra[k].product_code,
            product_ean: outra[k].product_ean,
            product_descricao: outra[k].product_descricao,
            product_valor: outra[k].product_valor,
            product_categoria: outra[k].product_categoria,
            product_fabricacao: outra[k].product_fabricacao,
            product_estoque: outra[k].product_estoque,
            product_medida: outra[k].product_medida,
            product_etiquetas: outra[k].product_etiquetas,
            product_thumbnail: outra[k].product_thumbnail,
            comentario: outra[k].comentario,
            caracteristica: outra[k].caracteristica,
            quantidade: outra[k].quantidade + 1,
            valor: outra[k].valor,
            desconto: outra[k].desconto,
          });

          outra[k].quantidade = outra[k].quantidade + 1;
        } else {
          nova.push(outra[k]);
        }
      }
    }

    consolida(nova);
  }

  function remove(product_code: number) {
    var outra = productsIn;
    var nova: ProductOrder[] = [];
    for (const k in outra) {
      if (outra[k].product_code != product_code) {
        nova.push(outra[k]);
      }
    }

    if (nova.length > 0) {
      var totalValue: number = 0;
      for (const k in nova) {
        totalValue += nova[k].product_valor * nova[k].quantidade;
      }
      var newCart: Cart = {
        id: indexado,
        cart_affiliate_id: 1,
        cart_client_id: 11,
        cart_conteudo: JSON.stringify(nova),
        cart_status: "1",
        cart_valor_total: 0,
      };
      if (newCart != undefined) {
        setCarts(newCart);
        localStorage.setItem("MY_CART", JSON.stringify(newCart));
        setProductsIn(nova);
        consolida(nova)
        setTotal(totalValue);
      } else {
      }
    } else {
      var Prd: ProductOrder[] = [];
      var newCart: Cart = {
        id: carts.id,
        cart_affiliate_id: carts.cart_affiliate_id,
        cart_client_id: carts.cart_client_id,
        cart_conteudo: JSON.stringify(Prd),
        cart_status: "1",
        cart_valor_total: valorTotal,
      };
      if (newCart != undefined) {
        setCarts(newCart);

        setCartOnLocalStorage(Prd);
        setProductsIn(Prd);
        consolida(Prd)
        setTotal(0);
        var MY_ID = Number(localStorage.getItem("MY_ID"));
        var MY_AFFILIATE_ID = Number(localStorage.getItem("MY_AFFILIATE_ID"));
        if (MY_ID == undefined || MY_AFFILIATE_ID == undefined) {
          //ACAO DE SUBSTITUIR CARRINHO
        } else {
          updateProductsCart(MY_AFFILIATE_ID, MY_ID, nova);
        }

        update(newCart);
      } else {
      }
    }

    
  }
  React.useEffect(() => {
    localStorage.setItem("listShow", "0")
  }), [carts]

  function consolida(nova: ProductOrder[]) {
    var totalValue: number = 0;
    for (const k in nova) {
      totalValue += nova[k].product_valor * nova[k].quantidade;
    }
    setIndex(indexado++);

    if (carts == undefined && productsIn.length == 0) {
      var newCart: Cart = {
        id: indexado,
        cart_affiliate_id: 1,
        cart_client_id: 11,
        cart_conteudo: JSON.stringify(nova),
        cart_status: "1",
        cart_valor_total: 0,
      };
      if (newCart != undefined) {
        setCarts(newCart);
        localStorage.setItem("MY_CART", JSON.stringify(newCart));
        setProductsIn(nova);
        setTotal(totalValue);

        var MY_ID = Number(localStorage.getItem("MY_ID"));
        var MY_AFFILIATE_ID = Number(localStorage.getItem("MY_AFFILIATE_ID"));

        if (MY_ID == undefined || MY_AFFILIATE_ID == undefined) {
          alert("Necessário logar antes..");
        } else {
          updateListaNova(MY_AFFILIATE_ID, MY_ID, nova);
        }
      } else {
      }
    } else {
      var prd_in = productsIn;

      var newCart: Cart = {
        id: carts.id,
        cart_affiliate_id: carts.cart_affiliate_id,
        cart_client_id: carts.cart_client_id,
        cart_conteudo: JSON.stringify(nova),
        cart_status: "1",
        cart_valor_total: valorTotal,
      };
      if (newCart != undefined) {
        setCarts(newCart);
        localStorage.setItem("MY_CART", JSON.stringify(newCart));
        setProductsIn(nova);
        setTotal(totalValue);

        var MY_ID = Number(localStorage.getItem("MY_ID"));
        var MY_AFFILIATE_ID = Number(localStorage.getItem("MY_AFFILIATE_ID"));

        if (MY_ID == undefined || MY_AFFILIATE_ID == undefined) {
          alert("Necessário logar antes..");
        } else {
          updateListaNova(MY_AFFILIATE_ID, MY_ID, nova);
        }
      } else {
      }
    }
  }

  function primeiroLoad(nova: ProductOrder[]) {
    var totalValue: number = 0;
    for (const k in nova) {
      totalValue += nova[k].product_valor * nova[k].quantidade;
    }
    setIndex(indexado++);

    if (carts == undefined && productsIn.length == 0) {
      var newCart: Cart = {
        id: indexado,
        cart_affiliate_id: 1,
        cart_client_id: 11,
        cart_conteudo: JSON.stringify(nova),
        cart_status: "1",
        cart_valor_total: 0,
      };
      if (newCart != undefined) {
        setCarts(newCart);
        localStorage.setItem("MY_CART", JSON.stringify(newCart));
        setProductsIn(nova);
        setTotal(totalValue);
      } else {
      }
    } else {
      var prd_in = productsIn;

      var newCart: Cart = {
        id: carts.id,
        cart_affiliate_id: carts.cart_affiliate_id,
        cart_client_id: carts.cart_client_id,
        cart_conteudo: JSON.stringify(nova),
        cart_status: "1",
        cart_valor_total: valorTotal,
      };
      if (newCart != undefined) {
        setCarts(newCart);
        localStorage.setItem("MY_CART", JSON.stringify(newCart));
        setProductsIn(nova);
        setTotal(totalValue);
      } else {
      }
    }
  }
  function setCartOnLocalStorage(products: ProductOrder[]) {
    var AFFILIATE_ID: number = Number( process.env.AFFILIATE_ID);
    var total: number = 0;
    for (const k in products) {
      total += products[k].product_valor * products[k].quantidade;
    }
    var myCart: Cart = {
      cart_affiliate_id: AFFILIATE_ID,
      cart_client_id: 0,
      cart_conteudo: JSON.stringify(products),
      cart_status: "storage",
      cart_valor_total: total,
      id: 1,
    };

    localStorage.setItem("MY_CART", JSON.stringify(myCart));
  }

  function updateProductsCart(affiliateId: number, clientId: number, nova: ProductOrder[]) {
    var tk = localStorage.getItem("token") ? localStorage.getItem("token") : "";
    if (tk == null) {
      tk = "";
    }
    if (productsIn.length == 0) {
    }

    Api.post(
      "/updateCart",
      {
        affiliate_id: affiliateId,
        cart_conteudo: JSON.stringify(nova),
        client_id: clientId,
      },
      { headers: { "x-access-token": tk } }
    )
      .then((response) => { })
      .catch((error) => {
        setCartOnLocalStorage(nova);
      });
  }
  function updateListaNova(
    affiliateId: number,
    clientId: number,
    listaNova: ProductOrder[]
  ) {
    var tk = localStorage.getItem("token") ? localStorage.getItem("token") : "";
    if (tk == null) {
      tk = "";
    }
    if (listaNova.length == 0) {
    }

    Api.post(
      "/updateCart",
      {
        affiliate_id: affiliateId,
        cart_conteudo: JSON.stringify(listaNova),
        client_id: clientId,
      },
      { headers: { "x-access-token": tk } }
    )
      .then((response) => { })
      .catch((error) => {
        setCartOnLocalStorage(productsIn);
      });
  }

  useEffect(() => {
    if (productsIn.length == 0) {
      setTotal(0);
    }
  }, [productsIn]);

  useEffect(() => { }, [setTotal]);

  React.useEffect(() => {
    var AFFILIATE_ID: number = Number( process.env.AFFILIATE_ID);
    getAllInformation(AFFILIATE_ID, productCode);
    tasks2.map((pr: Product2) => {
      setPrd(pr);
    });

    getAllRelacteds(AFFILIATE_ID, productsRelateds);
  }, [getAllInformation, getAllRelacteds, productCode, productsRelateds]);

  React.useEffect(() => {
    setSearchValue(decodeURI(window.location.search.substring(1)));
    var AFFILIATE_ID: number = Number( process.env.AFFILIATE_ID);

    getSearch(
      AFFILIATE_ID,
      0,
      25,
      decodeURI(window.location.search.substring(1))
    );
    busca.map((prd: Product2) => {
      setFirstId(prd.id);
    });
  }, []);

  const [subcategoryMenuSelected, setSubcategoryMenuSelected] =
    useState("Categorias");
  function subcategoryMenuClick(item_selected: string) {
    setSubcategoryMenuSelected(item_selected);
  }



  return (
    <LayoutDefault
      noCarrinho={noCarrinho}
      detail={updateDetail}
      update={changeProductCode}
      cart={carts}
      increase={increase}
      decrease={decrease}
      remove={remove}
    >
      <div className={styles.page404}>

        <div className="model-page-interna">
          <div className={styles.header}>
            <div className={` ${styles.messageBox} messageBoxResult `}>
              <NotFoundFace />
              <b>Não conseguimos encontrar a página</b>
            </div>
          </div>

          <div className={styles.body}>
            <div className={styles.checklistBox}>
              <h3 className={styles.checklistTitle}>O que pode ter acontecido</h3>

              <div className={styles.checklist}>
                <div className={styles.item}>
                  <CheckRounded /> A página pode não existir mais.
                </div>

                <div className={styles.item}>
                  <CheckRounded /> Algum termo pode ter sido digitado errado.
                </div>
              </div>
            </div>

          </div>
        </div>

        <Modal
          modalActive={modalProduct}
          onCloseClick={setModal}
          bgColor="white"
        >
          <ModalProduct
            changeProductCode={changeProductCode}
            detail={updateDetail}
            isLoading={true}
            totalCarrinho={noCarrinho}
            increase={increase}
            decrease={decrease}
            productDetails={tasks2}
            handleAdd2={changeProductCodeInterna}
            productRelacteds={tasks3}
            onCloseClick={setModal}
          />
        </Modal>
      </div>
    </LayoutDefault>
  );
}
