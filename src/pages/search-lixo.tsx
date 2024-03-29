import Link from "next/link";

import React, { Component } from "react";
import { Carousel } from "react-responsive-carousel";

import ProductCardList from "@components/Products/ProductCardList";
import LayoutDefault from "@components/Layouts/LayoutDefault";
import CaracteristicasBox from "@components/CaracteristicasBox";
import PriceBox from "@components/PriceBox";
import MarcasBox from "@components/MarcasBox";
import SearchFail from "@components/SearchFail";

import { useProducts } from "src/hooks/useProducts";
import { useProductsRelateds } from "src/hooks/useProductsRelateds";

import { ProductOrder } from "@models/ProductOrder";
import { Cart } from "@models/Cart";
import { Product2 } from "@models/Product2";
import { useState, useEffect } from "react";
import { Api } from "src/providers";

import styles from "@styles/pages/Search.module.css";
import CategoryBox from "@components/CategoryBox";

export default function Search() {
  const [productsIn, setProductsIn] = useState<ProductOrder[]>([]);
  const [valorTotal, setTotal] = useState(total);

  const [subcategoryMenuSelected, setSubcategoryMenuSelected] =
    useState("Categorias");

  const [productCode, setProductCode] = useState(11);
  const [productsRelateds, setProductsRelateds] = useState([
    8,
    10,
    38,
    45,
    141, // default relateds
  ]);
  const [modalProduct, setModalProduct] = useState(false);
  const [affiliateID, setAffiliateID] = useState<number>(0);

  const { products, getAllProducts } = useProducts(affiliateID, 0);

  const [carts, setCarts] = useState<Cart | any>();
  //("CART HEADER :(");
  //(carts);

  function caseA(text: string){ 
    var list = text.split(" "), newText = "" 
    for(const k in list){
      var word = list[k].split(""), counter = 0, newWord = "" 
      for(const u  in word){
        if(counter === 0){
          if(word[u] != ""){
            newWord+= word[u].toUpperCase()
          }
        }
        else{
            newWord+= word[u].toLowerCase()
          }
        counter ++
      } 
      newText+= newWord+" " 
    }
    return newText
  }

  useEffect(() => {
    if (carts != undefined) {
      localStorage.setItem("MY_CART", JSON.stringify(carts));
    }
  }, [carts]);

  useEffect(() => {
    let logged = localStorage.getItem("USER");
    async function reload(clientId: number) {
      var tk = localStorage.getItem("token")
        ? localStorage.getItem("token")
        : "";
      if (tk == null) {
        tk = "";
      }
      const token: string = tk;
      Api.post<Cart[]>(
        "/getMyCart",
        { affiliate_id: 1, client_id: clientId },
        { headers: { "x-access-token": token } }
      )
        .then((response) => {
          //(response.data);
          setCarts(response.data[0]);
          //("CART HEADER :(");
          //(carts);
        })
        .catch((error) => {
          //(error);
        });
    }
    reload(11);
  }, [setCarts]);

  function changeProductCode(number: number, relactedsProducts: []) {
    window.document.getElementById('scrollTop')?.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    setProductCode(number);
    setProductsRelateds(relactedsProducts);
    setModal();
  }
  function setModal() {
    setModalProduct(!modalProduct);
  }

  function decrease(product_code: number) {
    //("diminuindo.." + product_code);
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
          comentario: outra[k].product_ean,
          caracteristica: outra[k].product_ean,

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
          desconto: outra[k].desconto,
        });
      } else {
        nova.push(outra[k]);
      }
    }
    setProductsIn(nova);
    setTotal(total);
    //(nova);
  }

  function total() {
    var totalPedido: number = 0;
    for (const k in productsIn) {
      totalPedido += productsIn[k].product_valor * productsIn[k].quantidade;
    }
    return totalPedido;
  }

  function increase(product_code: number, product: Product2) {
    //("aumentando.." + product_code);
    var outra = productsIn;
    var nova: ProductOrder[] = [];
    if (productsIn.length == 0) {
      nova.push({
        id: product.id,
        product_affiliate_id: product.product_affiliate_id,
        product_code: product.product_code,
        product_ean: product.product_ean,
        comentario: product.product_ean,
        caracteristica: product.product_ean,

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
    } else {
      for (const k in outra) {
        if (outra[k].product_code == product_code) {
          nova.push({
            id: outra[k].id,
            product_affiliate_id: outra[k].product_affiliate_id,
            product_code: outra[k].product_code,
            product_ean: outra[k].product_ean,
            caracteristica: outra[k].product_ean,
            comentario: outra[k].product_ean,

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
    }

    setProductsIn(nova);
    setTotal(total);
    //(nova);
  }

  function remove(product_code: number) {
    //("removendo.." + product_code);
    var outra = productsIn;
    var nova: ProductOrder[] = [];
    for (const k in outra) {
      if (outra[k].product_code != product_code) {
        nova.push(outra[k]);
      }
    }
    setProductsIn(nova);
    setTotal(total);
    //(nova);
  }

  function noCarrinho(product_code: number) {
    var myQt: number = 0;
    for (const k in productsIn) {
      if (productsIn[k].product_code == product_code) {
        myQt += productsIn[k].quantidade;
      }
    }
    return myQt;
  }

  function subcategoryMenuClick(item_selected: string) {
    setSubcategoryMenuSelected(item_selected);
  }

	return (
    <LayoutDefault
      noCarrinho={undefined}
      detail={null}
      update={undefined}
      cart={carts}
      increase={increase}
      decrease={decrease}
      remove={remove}
    >
      <div className={`${styles.pageSearch} padding-mobile`}>

        <div className={styles.result}>
          Resultado para <span className={styles.resultText}>Maçã</span>
        </div>

        <SearchFail />

        <div className="model-page-interna">
          <div className={styles.content}>
            <nav className={styles.subcategoryMenu}>
              <button
                className={`${styles.subcategoryMenuItem} ${
                  subcategoryMenuSelected === "Categorias" ? styles.active : ""
                }`}
                onClick={() => subcategoryMenuClick("Categorias")}
              >
                Categorias
              </button>

              <button
                className={`${styles.subcategoryMenuItem} ${
                  subcategoryMenuSelected === "Marcas" ? styles.active : ""
                }`}
                onClick={() => subcategoryMenuClick("Marcas")}
              >
                Marcas
              </button>

              <button
                className={`${styles.subcategoryMenuItem} ${
                  subcategoryMenuSelected === "Preço" ? styles.active : ""
                }`}
                onClick={() => subcategoryMenuClick("Preço")}
              >
                Preço
              </button>

              <button
                className={`${styles.subcategoryMenuItem} ${
                  subcategoryMenuSelected === "Características"
                    ? styles.active
                    : ""
                }`}
                onClick={() => subcategoryMenuClick("Características")}
              >
                Características
              </button>
            </nav>
          </div>

          {subcategoryMenuSelected === "Categorias" ? (
            <CategoryBox    />
          ) : subcategoryMenuSelected === "Marcas" ? (
            <MarcasBox setView={undefined} src={[]}/>
          ) : subcategoryMenuSelected === "Preço" ? (
            <PriceBox   setShow={undefined} />
          ) : (
            <CaracteristicasBox  setView={undefined}  src={[]}/>
          )}
        </div>

        <div className="model-page-interna">
          <div className={styles.boxOfertas}>
            <div className={styles.boxOfertasHeader}>
              <div className={styles.exibindo}>
                Mostrando <strong className={styles.exibindoQtd}>1452</strong>{" "}
                produtos em{" "}
                <span className={styles.exibindoCategories}>subcategoria</span>
              </div>

              <div className={styles.boxOfertasLink}>
                Ordenar por
                <div className={styles.selectBox}>
                  <select name="order" id="order">
                    <option value="popularidade">Menor Preço</option>
                    <option value="popularidade">Maior Preço</option>
                    <option value="popularidade">Nome A-Z</option>
                    <option value="popularidade">Nome Z-A</option>
             
                  </select>
                </div>
              </div>
            </div>

            <ProductCardList
              noCarrinho={noCarrinho}
              addCart={increase}
              removeCart={decrease}
              handleAdd2={changeProductCode}
              products2={products}
            />
          </div>
        </div>

      </div>
    </LayoutDefault>
  );
}
