import * as React from "react";

import { Product } from "@models/Product";

import CartListStyle from "@styles/components/carrinho/CartList.module.css"
import styles from "@styles/components/minha-conta/Pedido.module.css";
import CartItem from "@components/Carrinho/CartItem"
import { ProductOrder } from "@models/ProductOrder";
import { useState } from "react";

import Button from "@components/Buttons/Button";
import { Api } from "src/providers";
import Link from "next/link";
import { Selecao } from "@models/Selecao";
import CartIcon from "@assets/icons/CartIcon";
import CarrinhoIcon from "@assets/icons/CarrinhoIcon";
import Modal from "@components/Modals/Modal";
import BoxUserAccount from "@components/Modals/UserAccount/BoxUserAccount";
import { FULL_PRICES } from "@models/masks";

interface CartList {
  products: ProductOrder[];
  setModalCarrinho?: any
  increase: any;
  decrease: any;
  remove: any;
  update: any
  details: any
  totalFixo: number;
}

export default function CartList(props: CartList) {
  const [valorTotal, setTotal] = useState(total)
  const [produtos, setProdutos] = useState<ProductOrder[]>([])
  const [isLogged, setIsLogged] = useState<boolean>(false)
  const [modalLogin, setmodalLogin] = useState(false);

  function total() {
    var totalPedido: number = 0

    for (const k in props.products) {
      let MINIMO: number | undefined = 0
      if (props.products[k].minimo_para_desconto != null) {
        MINIMO = props.products[k].minimo_para_desconto ? props.products[k].minimo_para_desconto : 0
      }
      if (MINIMO == undefined) { MINIMO = 0 }
      if (props.products[k].valor < props.products[k].product_valor && props.products[k].quantidade >= MINIMO) {
        totalPedido += (props.products[k].valor * props.products[k].quantidade)
      } else {
        totalPedido += (props.products[k].product_valor * props.products[k].quantidade)
      }


    }
    return totalPedido
  }

  React.useEffect(() => {
    // console.log('produtos carrinho',produtos)

    setTotal(total)
  }, [produtos])

  React.useEffect(() => {

    setTotal(total)
  }, [props.totalFixo])

  React.useEffect(() => {

    var MY_ID: number = Number(localStorage.getItem("MY_ID"))
    var MY_AFFILIATE_ID: number = Number(localStorage.getItem("MY_AFFILIATE_ID"))

    if (localStorage.getItem("USER") == null) {
      setIsLogged(false)
    } else {
      setIsLogged(true)
    }

    setProdutos(props.products)

    setTotal(total)


  }, [setProdutos, props.products, valorTotal, setTotal])

  function logarFechaCarrinho() {
    setmodalLogin(!modalLogin)
    props.setModalCarrinho()
  }

  const handleCloseMinhaConta = () => window.history.back();
  function reloadPage() {
    location.replace("/")
  }

  React.useEffect(() => {

    if (isLogged == false) {
      localStorage.setItem("cart_without_account", "1")
    }
  }, [isLogged])

  return (
    <div className={CartListStyle.cartList}>
      {produtos.map((product) => (
        product.quantidade > 0 ?
          <CartItem details={props.details} update={props.update} actionDecrease={props.increase} actionIncrease={props.decrease} actionRemove={props.remove} key={product.id} product={product} />
          :
          <div key={Math.random()}></div>
      ))}

      <div className={CartListStyle.footerCart}>
        <div className={CartListStyle.innerText}>
          <p className="mb-0">
            {" "}
            <span className="d-lg-none">
              <CarrinhoIcon />
            </span>{" "}
            <span className={CartListStyle.subtotalText}>Subtotal</span>{" "}
            <span className={CartListStyle.innerSpan}>
              R$ {props.totalFixo.toFixed(2).replace(".", ",")}
            </span>
          </p>
        </div>
        <div className={CartListStyle.innerBtn}>
          {isLogged == true ? (
            <Link passHref href={(produtos.length > 0) ? '/checkout' : '#'}>
              <Button className={CartListStyle.buttonRefazerPedido}>
                Escolha forma de pagamento
              </Button>
            </Link>
          ) : (
            <Link passHref href={(produtos.length > 0) ? '/minha-conta' : '#'}>
              <Button className={CartListStyle.buttonRefazerPedido}>
                Escolha forma de pagamento
              </Button>
            </Link>

          )}
        </div>
      </div>
      <div>
        <Modal disableClickOut modalActive={modalLogin} onCloseClick={reloadPage}>
          <BoxUserAccount oncloseClick={reloadPage} />
        </Modal>
      </div>
    </div>





  );
}
