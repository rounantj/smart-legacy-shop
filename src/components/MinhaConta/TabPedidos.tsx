import Pedido from "@components/MinhaConta/Pedido";
import { Order } from "@models/Order";

import styles from "@styles/components/minha-conta/Tabs.module.css";
import { useEffect } from "react";

interface TabProps {
  active?: boolean;
  orders: Order[];
  handlerAdd: any;
}

export default function TabPedidos(props: TabProps) {



  return (

    <div className={` ${styles.tab} ${props.active ? styles.active : ""} `}>
      {props.orders == undefined || props.orders.length == 0 ? props.handlerAdd : (
        <div>{props.orders.map(order => (
          <Pedido key={order.id} order={order} statusText={order.order_status === "1" ? ("andamento") : order.order_status === "2" ? ("separacao") : order.order_status === "3" ? ("entrega") : order.order_status === "4" ? ("entregue") : ("cancelado")} />
        ))}
        </div>
      )}



    </div>
  );
}
