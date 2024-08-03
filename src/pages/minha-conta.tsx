import { useCallback, useEffect, useState, useContext, useMemo } from "react";

import LayoutDefault from "@components/Layouts/LayoutDefault";
import TabPedidos from "@components/MinhaConta/TabPedidos";
import TabMinhasListas from "@components/MinhaConta/TabMinhasListas";
import Newsletter from "@components/Newsletter";

import styles from "@styles/pages/MinhaConta.module.css";

import { Cliente } from "@models/Cliente";
import React from "react";
import { useLocalStorage } from "@components/providers/useLocalStorage";
import ProductInPedidoList from "@components/MinhaConta/ProductInPedidoList";
import { Order } from "@models/Order";
import Modal from "@components/Modals/Modal";
import BoxUserAccount from "@components/Modals/UserAccount/BoxUserAccount";

import { Api } from "@components/providers";
import PedidosIcon from "@assets/icons/Pedidos";
import ListIcon from "@assets/icons/List";

import UsersIcon from "@assets/icons/Users";
import { Cart } from "@models/Cart";
import { Product2 } from "@models/Product2";
import { ProductOrder } from "@models/ProductOrder";
import TabEditarDados from "@components/MinhaConta/TabEditarDados";
import { AppContext } from "./_app";

export default function MinhaConta() {
  const {
    carts: cart,
    decrease,
    increase,
    remove,
    update,
    updateDetail,
    noCarrinho,
  } = useContext(AppContext);

  const [myName, setMyName] = useState<string | null>("Visitante");
  const [modalLogin, setmodalLogin] = useState(false);
  const [isLogged, setLogged] = useState<string>("false");

  const [clientID, setClientID] = useState<number>(0);
  const [affiliate_id, setAffilaiteID] = useState<number>(0);

  const [orders, setOrders] = useState<Order[] | any>([]);

  const [tabSelected, setTabSelected] = useState("TabEditarDados");


  useEffect(() => {
    //console.log('adicionando floow')
    document.body.style.overflow = "auto"
    localStorage.setItem("listShow", "0")
    let logged = localStorage.getItem("USER");
    async function reload(affiliateId: number, clientId: number) {
      var tk = localStorage.getItem("token")
        ? localStorage.getItem("token")
        : "";
      if (tk == null) {
        tk = "";
      }
      const token: string = tk;

      const response: Order[] | any = Api.post<Order[]>(
        "/getMyOrders",
        { affiliate_id: affiliateId, client_id: clientId },
        { headers: { "x-access-token": token } }
      )
        .then((response) => {
          setOrders(response.data);
        })
        .catch((error) => {
          localStorage.setItem("token", "null");
          if (localStorage.getItem("token") != "null") {
            location.reload();
          }
        });
    }

    if (logged != null) {
      setLogged("true");

      var USER = JSON.parse(logged);

      var MY_ID: number = Number(localStorage.getItem("MY_ID"));
      var MY_AFFILIATE_ID: number = Number(
        localStorage.getItem("MY_AFFILIATE_ID")
      );

      setMyName(USER.users_client_name);
      setAffilaiteID(Number(USER.users_client_affiliate_id));
      setClientID(Number(USER.id));
      ////(Number(USER.users_client_affiliate_id,  Number(USER.id) );

      reload(MY_AFFILIATE_ID, MY_ID);
    } else {
      triggerModal();
    }
  }, [setOrders]);

  function tabClick(tab: string) {
    setTabSelected(tab);
  }
  function triggerModal() {
    setmodalLogin(!modalLogin);
  }

  const handleCloseMinhaConta = () => window.history.back();
  function logout() {
    localStorage.removeItem("USER")
    location.reload()
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const keyword = params.get('filter')
    if (keyword) {
      setTabSelected(keyword)
    }


  }, [])
  return (
    <LayoutDefault
      noCarrinho={noCarrinho}
      detail={updateDetail}
      update={update}
      cart={cart}
      increase={increase}
      decrease={decrease}
      remove={remove}
    >
      <div className={`${styles.pageHeader} padding-mobile areaLogout`}>
        <button
          className={`${styles.tabButton} btnLogout `}
          onClick={logout}
        >
          <div className={`${styles.tabIcon} `}>
            {" "}
            <UsersIcon fill="var(--primary)" />
          </div>
          Logout / Sair
        </button>

        <h1 className={styles.pageTitle}>Minha Conta</h1>

        <p className={styles.pageSubtitle}>
          Olá, <span className={styles.userName}>{myName}</span>
        </p>
      </div>
      {orders.length > 0 ? (
        <div className={styles.pageBody}>
          <div className={styles.tabList}>
            <button
              className={`${styles.tabButton} ${tabSelected === "TabPedidos" ? styles.active : ""
                }`}
              onClick={() => tabClick("TabPedidos")}
            >
              <div className={styles.tabIcon}>
                {" "}
                <PedidosIcon fill={""} />
              </div>
              Pedidos
            </button>

            <button
              className={`${styles.tabButton} ${tabSelected === "TabEditarDados" ? styles.active : ""
                }`}
              onClick={() => tabClick("TabEditarDados")}
            >
              <div className={styles.tabIcon}>
                {" "}
                <UsersIcon fill="var(--primary)" />
              </div>
              Editar Dados
            </button>

            <button
              className={` ${styles.tabButton} ${tabSelected === "TabMinhasListas" ? styles.active : ""
                }`}
              onClick={() => tabClick("TabMinhasListas")}
            >
              <div className={styles.tabIcon}>
                {" "}
                <ListIcon />
              </div>
              Minhas Listas
            </button>
          </div>

          <TabPedidos
            handlerAdd={triggerModal}
            orders={orders}
            active={tabSelected === "TabPedidos" ? true : false}
          />


          <TabMinhasListas
            handleAdd={triggerModal}

            active={tabSelected === "TabMinhasListas" ? true : false}
          />
          <TabEditarDados
            handlerAdd={triggerModal}
            cliente={undefined}
            active={tabSelected === "TabEditarDados" ? true : false}
          />



          <Modal disableClickOut modalActive={modalLogin} onCloseClick={handleCloseMinhaConta}>
            <BoxUserAccount oncloseClick={handleCloseMinhaConta} />
          </Modal>
        </div>
      ) : isLogged === "false" ||
        localStorage.getItem("token") == "null" ||
        localStorage.getItem("token") == null ? (
        <div>
          <Modal disableClickOut modalActive={true} onCloseClick={handleCloseMinhaConta}>
            <BoxUserAccount oncloseClick={handleCloseMinhaConta} />
          </Modal>
        </div>
      ) : (


        <div className={styles.pageBody}>
          <div>
            <p> Você não fez nenhum pedido ainda!</p>
          </div>

          <div className={styles.tabList}>


            <button
              className={`${styles.tabButton} ${tabSelected === "TabEditarDados" ? styles.active : ""
                }`}
              onClick={() => tabClick("TabEditarDados")}
            >
              <div className={styles.tabIcon}>
                {" "}
                <UsersIcon fill="var(--primary)" />
              </div>
              Editar Dados
            </button>

            <button
              className={` ${styles.tabButton} ${tabSelected === "TabMinhasListas" ? styles.active : ""
                }`}
              onClick={() => tabClick("TabMinhasListas")}
            >
              <div className={styles.tabIcon}>
                {" "}
                <ListIcon />
              </div>
              Minhas Listas
            </button>
          </div>

          <TabPedidos
            handlerAdd={triggerModal}
            orders={orders}
            active={tabSelected === "TabPedidos" ? true : false}
          />


          <TabMinhasListas
            handleAdd={triggerModal}

            active={tabSelected === "TabMinhasListas" ? true : false}
          />
          <TabEditarDados
            handlerAdd={triggerModal}
            cliente={undefined}
            active={tabSelected === "TabEditarDados" ? true : false}
          />



          <Modal disableClickOut modalActive={modalLogin} onCloseClick={handleCloseMinhaConta}>
            <BoxUserAccount oncloseClick={handleCloseMinhaConta} />
          </Modal>
        </div>
      )}
      <Modal modalActive={modalLogin} onCloseClick={triggerModal}>
        <BoxUserAccount oncloseClick={triggerModal} />
      </Modal>
      <Newsletter />
    </LayoutDefault>
  );
}
