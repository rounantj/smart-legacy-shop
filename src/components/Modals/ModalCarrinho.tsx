import * as React from "react";

import { Product } from "@models/Product";

import Filter from '@components/Carrinho/Filter';
import SearchBar from "@components/Inputs/SearchBar";
import CartList from "@components/Carrinho/CartList";
import ModalCloseButtonIcon from "@assets/icons/MobileModalCloseButton";

import ModalCarrinhoStyle from "@styles/components/modals/ModalCarrinho.module.css";
import { OrderContent } from "@models/OrderContent";
import { OrderSent } from "@models/OrderSent";
import { ProductOrder } from "@models/ProductOrder";
import { Api } from "src/providers";
import { useState } from "react";
import { Order } from "@models/Order";
import { useOrderItems } from "src/hooks/useOrdersItems";
import { Cart } from "@models/Cart";
import SearchBarCart from "@components/Inputs/SearchBarCart";
import { Selecao } from "@models/Selecao";
import { Product2 } from "@models/Product2";

interface ModalCarrinhoProps {
  modalActive?: Boolean;
  cart: Cart;
  produtos: any;
  increase: any
  decrease: any
  remove: any
  update: any
  details: any
  total: number
  fecha: any
  onCloseClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function ModalCarrinho(props: ModalCarrinhoProps) {
  const {
    produtos,
    total
  } = props;

  const [nameCategory, setNameCategory] = useState<string>("tudo");
  const [textSearch, setTextSearch] = useState<string>("");

  const categorias = React.useMemo(() => (
    produtos.reduce((list: any = [], item: any = {}) => {
      const categoryIndex: any = list.findIndex((category: any) => category.name.split(",")[0] === item.product_categoria.split(",")[0]);

      if (categoryIndex >= 0) {
        list[categoryIndex].items.push(item);
      } else {
        list.push({ name: item.product_categoria.split(",")[0], items: [item] });
      }

      return list
    }, [])
  ), [produtos])

  const categorizedProducts = React.useMemo(() => {
    const categorySelected = categorias.find(({ name = '' }) => name === nameCategory);

    return categorySelected
      ? categorySelected.items
      : produtos
  }, [produtos, nameCategory]);

  const filteredProducts = React.useMemo(() => (
    !textSearch
      ? categorizedProducts
      : categorizedProducts.filter(({
        product_descricao = '',
        product_ean = '',
        product_fabricacao = '',
        product_categoria = '',
        product_etiquetas = '',
        product_code = '',
        comentario = ''
      }) => (
        product_descricao.toLowerCase().indexOf(textSearch) > -1 ||
        product_ean.toLowerCase().indexOf(textSearch) > -1 ||
        product_fabricacao.toLowerCase().indexOf(textSearch) > -1 ||
        product_categoria.toLowerCase().indexOf(textSearch) > -1 ||
        product_etiquetas.toLowerCase().indexOf(textSearch) > -1 ||
        product_code.toString().toLowerCase().indexOf(textSearch) > -1 ||
        comentario.indexOf(textSearch) > -1 ||

        product_descricao.toUpperCase().indexOf(textSearch) > -1 ||
        product_ean.toUpperCase().indexOf(textSearch) > -1 ||
        product_fabricacao.toUpperCase().indexOf(textSearch) > -1 ||
        product_categoria.toUpperCase().indexOf(textSearch) > -1 ||
        product_etiquetas.toUpperCase().indexOf(textSearch) > -1 ||
        product_code.toString().toUpperCase().indexOf(textSearch) > -1 ||
        comentario.indexOf(textSearch) > -1
      ))
  ), [categorizedProducts, textSearch]);

  function setItemShow(param: string) {
    setNameCategory(param);
  }

  function searchItems(param: string) {
    setTextSearch(param);
  }

  const contentRef = React.useRef<any>(null);

  React.useEffect(() => {
    const clickOutside = (e: any) => {
      if (props.modalActive && contentRef.current && !contentRef.current.contains(e.target)) {
        props.onCloseClick(e);
      }
    }

    document.addEventListener("mousedown", clickOutside)

    return () => {
      document.removeEventListener("mousedown", clickOutside)
    }
  }, [props.modalActive])
  function setProps() {
    props.modalActive = !props.modalActive
  }

  return (
    <div onClick={e => props.onCloseClick} className={`${ModalCarrinhoStyle.modal} ${props.modalActive ? ModalCarrinhoStyle.modalActive : ''}`}>

      <div ref={contentRef} onClick={e => e.stopPropagation()} className={ModalCarrinhoStyle.modalContainer}>

        <div className={`${ModalCarrinhoStyle.header} fechaModalCarrinho`}>
          <button onClick={props.onCloseClick} className={`${ModalCarrinhoStyle.btnClose} fechaModalCarrinho d-none d-lg-flex`}>
            <span className={ModalCarrinhoStyle.btnCloseLine}></span>
            <span className={ModalCarrinhoStyle.btnCloseLine}></span>
          </button>
          <button
            onClick={props.onCloseClick}
            className={`${ModalCarrinhoStyle.mobileBtnClose} d-lg-none`}
          >
            <ModalCloseButtonIcon />

            <h2 className={ModalCarrinhoStyle.mobileBtnTitle}>Meu Carrinho</h2>
          </button>

          <div className={ModalCarrinhoStyle.headerContent}>
            <SearchBarCart searchFunction={searchItems} placeholder="Busque produtos em seu carrinho" />
          </div>
        </div>

        <div className={ModalCarrinhoStyle.body}>

          <aside className={ModalCarrinhoStyle.aside}>
            <Filter
              valorTudo={produtos.length}
              name={nameCategory}
              setShow={setItemShow}
              categorias={categorias}
              products={filteredProducts}
            />
          </aside>

          <div className={ModalCarrinhoStyle.content}>
            {
              filteredProducts &&
              <CartList
                setModalCarrinho={setProps}
                totalFixo={total}
                details={props.details}
                update={props.update}
                increase={props.increase}
                decrease={props.decrease}
                remove={props.remove}
                products={filteredProducts}
              />
            }
          </div>
        </div>
      </div>
    </div>
  );
}
