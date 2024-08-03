import ProductInPedidoList from "@components/MinhaConta/ProductInPedidoList";
import Button from "@components/Buttons/Button";
import moment from 'moment'
import { Product } from "@models/Product";

import WishlistIcon from "@assets/icons/WishlistIcon";

import styles from "@styles/components/minha-conta/Pedido.module.css";

import { Product2 } from "@models/Product2";
import { Order } from "@models/Order";
import AndamentoIcon from "@assets/icons/Andamento";
import SeparacaoIcon from "@assets/icons/Separacao";
import EntregaIcon from "@assets/icons/Entrega";
import EntregueIcon from "@assets/icons/Entregue";
import { OrderContent } from "@models/OrderContent";
import React, { useContext, useEffect, useState } from "react";
import { OrderSent } from "@models/OrderSent";

import { Api } from "@components/providers";
import { ProductOrder } from "@models/ProductOrder";
import { AppContext } from "src/pages/_app";
import { ajustStrigfy } from "@models/masks";

interface Pedido {
  order: Order;

  statusText: string

}

export default function Pedido(props: Pedido) {
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

  const [statusPagamento, setStatusPagamento] = useState<string>("Pending")
  const [items, setItems] = useState<ProductOrder[] | any>()


  const active = {
    color: 'var(--primary)',
  };
  React.useEffect(() => {

    try {
      const CONTEUDO: OrderContent[] = JSON.parse(ajustStrigfy(props.order.order_conteudo.replace(/(\r\n|\n|\r)/gm, "").replace(/"{/gm, '{').replace(/}"/gm, '}')))
      // eslint-disable-next-line react-hooks/exhaustive-deps
      var listaProducts: OrderSent[] = []

      CONTEUDO.map(cont => (
        listaProducts.push({
          "product_code": Number(cont.product_code),
          "product_descricao": cont.product_descricao,
          "quantidade": Number(cont.quantidade),
          "comentario": cont.comentario,
          "caracteristica": cont.caracteristica,
          "valor": Number(cont.subTotalPedido),
          "desconto": Number(cont.valorDesconto)
        })
      ))
      reload();
    } catch (error) {

    }

    async function reload() {
      var tk = localStorage.getItem("token") ? localStorage.getItem("token") : ""
      if (tk == null) {
        tk = ''
      }
      const token: string = tk
      let AFFILIATE_ID = process.env.AFFILIATE_ID
      const response: ProductOrder[] | any = Api.post<ProductOrder[]>('/getAllOrderItems', { product_list_ids: listaProducts, affiliate_id: AFFILIATE_ID })
        .then(response => {

          setItems(response.data)
        })
        .catch(error => {

        });


    }


  }, [])

  useEffect(() => {
    try {
      let paymentData: any = JSON.parse(props.order.order_payment_data || "{}")
      //console.log({ paymentData })
      setStatusPagamento(paymentData.status)
    } catch (err) {
      // console.log(err)
    }

    // console.log("UTEMS ", items)
  }, [items])



  function consolidaTodos(produtos: Product2[]) {
    try {
      const products: any[] = [];
      for (const k in produtos) {
        if (incrementaUm(produtos[k])) {
          products.push(incrementaUm(produtos[k]))
        }

      }
      // console.log("produtos",products)
      if (consolida) {
        consolida(products)
      }
      location.replace('../checkout')
    } catch (e) {
      // console.log("erro",e)
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


  return (
    <div className={`${styles.pedido} ${styles[props.statusText]} `}>
      <div className={styles.header}>
        <span className={styles.pedidoTitle}>
          {props.order.order_status === "1" ? (
            <>Pedido em andamento</>
          ) : props.order.order_status === "4" ? (
            <>Pedido entregue</>
          ) : props.order.order_status === "2" ? (
            <>Em separação</>
          ) : props.order.order_status === "3" ? (
            <>Saiu para entrega</>
          ) : (
            <>Pedido cancelado</>
          )}
        </span>

        <span className={styles.pedidoNumber}>pedido nº {props.order.id}</span>
      </div>

      <div className={styles.body}>
        <div className={` ${styles.timeline} newTimeLine `}>




          {Number(props.order.order_status) >= 1 ? (
            <div className={`${styles.timelineItem} newPedidoTimeLineItem ${styles.active}`}>
              <div className={`${styles.icon} newSvg`}><AndamentoIcon fill={true} /></div>
              <div className={`${styles.title} newPedidoTitle `} style={active} >Pedido Recebido
                {Number(props.order.order_status) == 1 ? <div className={styles.date}>{moment(props.order.updatedAt).format("DD/MM/YYYY HH:ss")}</div> : <div></div>}
              </div>

            </div>
          ) : (
            <div className={`${styles.timelineItem} newPedidoTimeLineItem `}>

              <div className={`${styles.icon} newSvg`}><AndamentoIcon fill={false} /></div>
              <div className={`${styles.title} newPedidoTitle `}>Pedido Recebido</div>

            </div>

          )}






          {Number(props.order.order_status) >= 2 ? (
            <div className={`${styles.timelineItem} newPedidoTimeLineItem ${styles.active}`}>
              <div className={`${styles.icon} newSvg`}><SeparacaoIcon fill={true} /></div>
              <div className={`${styles.title} newPedidoTitle `} style={active}>Em separação
                {Number(props.order.order_status) == 2 ? <div className={styles.date}>{moment(props.order.updatedAt).format("DD/MM/YYYY HH:ss")}</div> : <div></div>}
              </div>
            </div>
          ) : (
            <div className={`${styles.timelineItem} newPedidoTimeLineItem `}>
              <div className={`${styles.icon} newSvg`}><SeparacaoIcon fill={false} /></div>
              <div className={`${styles.title} newPedidoTitle `}>Em separação</div>
            </div>
          )}




          {Number(props.order.order_status) >= 3 ? (
            <div className={`${styles.timelineItem} newPedidoTimeLineItem ${styles.active}`}>
              <div className={`${styles.icon} newSvg`}><EntregaIcon fill={true} /></div>
              <div className={`${styles.title} newPedidoTitle `} style={active}>Saiu para entrega
                {Number(props.order.order_status) == 3 ? <div className={styles.date}>{moment(props.order.updatedAt).format("DD/MM/YYYY HH:ss")}</div> : <div></div>}
              </div>
            </div>
          ) : (
            <div className={`${styles.timelineItem} newPedidoTimeLineItem `}>
              <div className={`${styles.icon} newSvg`}><EntregaIcon fill={false} /></div>
              <div className={`${styles.title} newPedidoTitle `}>Saiu para entrega</div>
            </div>
          )}





          {Number(props.order.order_status) >= 4 ? (
            <div className={`${styles.timelineItem} newPedidoTimeLineItem ${styles.active}`}>
              <div className={`${styles.icon} newSvg`}><EntregueIcon fill={true} /></div>
              <div className={`${styles.title} newPedidoTitle `} style={active}>Pedido Entregue
                {Number(props.order.order_status) == 4 ? <div className={styles.date}>{moment(props.order.updatedAt).format("DD/MM/YYYY HH:ss")}</div> : <div></div>}
              </div>

            </div>
          ) : (
            <div className={`${styles.timelineItem} newPedidoTimeLineItem `}>
              <div className={`${styles.icon} newSvg`}><EntregueIcon fill={false} /></div>
              <div className={`${styles.title} newPedidoTitle `}>Pedido Entregue</div>
            </div>
          )}

        </div>
        {items != undefined ? (
          <ProductInPedidoList products={items} />
        ) : (
          <div></div>
        )}


        <div className={styles.subtotal}>
          Subtotal: <span className={styles.subtotalValue}>R$ {props.order.order_valor_total.toFixed(2).replace(".", ",")}</span>
        </div>
        <div style={{ display: 'inline-flex', gap: '20px' }}>
          Status do pagamento: <div className={`${styles.icon} newSvg`}><span style={{ background: "var(--secondary)", color: "var(--primary)", padding: '5px', borderRadius: '10px' }}>{statusPagamento.toUpperCase()}</span></div>
        </div>
        {props.order.order_status !== "1" && (
          <div className={styles.buttonList}>
            <Button onClick={() => consolidaTodos(items)} className={styles.buttonRefazerPedido}>
              Refazer Pedido
            </Button>

            <button className={`${styles.buttonCreateList} oculta`}>
              <span className={styles.icon}>
                <WishlistIcon />
              </span>
              <span>Cria lista com este pedido</span>
            </button>
          </div>
        )}
      </div>
    </div >
  );
}
