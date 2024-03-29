import { useContext } from "react";

import LayoutDefault from "@components/Layouts/LayoutDefault";

import Link from "next/link";


import styles from "@styles/pages/institucional/institucional.module.css";
import MobileModalCloseButton from "@assets/icons/MobileModalCloseButtonLeft";
import { AppContext } from "../_app";
import SmartImage from "@components/SmartImage";

export default function NossosCuidados() {
  const {
    carts,
    decrease,
    increase,
    remove,
    update,
    updateDetail,
    noCarrinho,
  } = useContext(AppContext);

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
      <div className={styles.breadcrumbs}>
        <Link href="/" passHref>
          <span>Home</span>
        </Link>
        <div className={styles.separator}></div>
        <Link href="#" passHref>
          <span>Institucional</span>
        </Link>
        <div className={styles.separator}></div>
        Nossos Cuidados
      </div>

      <div className="model-page-interna">
        <div className={`d-lg-none ${styles.container}`}>
          <button className={styles.pageTitle}>
            <i className="d-lg-none">
              <MobileModalCloseButton />
            </i>
            Institucional
          </button>
        </div>

        <div className={styles.banner}></div>

        <div className="content">
          <div className={styles.containerInner}>
            <h1>
              <strong>Nossos cuidados</strong>
            </h1>

            <p>
              Criamos a SmartComerci pensando no UX Design perfeito para
              experiência de compra dos seus clientes. Clientes conseguem montar
              carrinhos de compras acima de 60 itens e ticket médios acima de
              R$700 reais de forma simples e fazendo a gestão desse processo de
              compra.
            </p>
            <p>
              Cliente podem fazer recompra, podem escolher entre formas de
              entrega, com agendamento ou escolher uma das unidades para
              retirar. Finaliza a compra de forma fácil, paga na entrega ou
              diretamente pela plataforma. Se houver ruptura os separadores
              podem alterar os pedidos e faturar depois informando os clientes
              da alteração em seus pedidos.
            </p>

            <div className={styles.video}>
              <SmartImage
                src="/images/nossos-cuidados/video-example.png"
                width={681}
                height={281}
                layout="responsive" objectFit={""} />
            </div>

            <p>
              Criamos a SmartComerci pensando no UX Design perfeito para
              experiência de compra dos seus clientes. Clientes conseguem montar
              carrinhos de compras acima de 60 itens e ticket médios acima de
              R$700 reais de forma simples e fazendo a gestão desse processo de
              compra.
            </p>

            <p>
              Cliente podem fazer recompra, podem escolher entre formas de
              entrega, com agendamento ou escolher uma das unidades para
              retirar. Finaliza a compra de forma fácil, paga na entrega ou
              diretamente pela plataforma. Se houver ruptura os separadores
              podem alterar os pedidos e faturar depois informando os clientes
              da alteração em seus pedidos.
            </p>
          </div>

          <div className={styles.containerBanner2}>
            <div className={styles.banner2}></div>
          </div>
        </div>
      </div>
    </LayoutDefault>
  );
}
