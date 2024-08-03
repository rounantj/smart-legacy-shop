import { useState, useEffect, useContext } from "react";
import Image from "next/image";

import LayoutDefault from "@components/Layouts/LayoutDefault";
import Loja from "@components/Loja";

import Link from "next/link";

import { Api } from "@components/providers";
import { ProductOrder } from "@models/ProductOrder";
import { Cart } from "@models/Cart";
import { Product2 } from "@models/Product2";

import styles from "@styles/pages/institucional/institucional.module.css";
import MobileModalCloseButton from "@assets/icons/MobileModalCloseButtonLeft";
import { AppContext } from "../_app";

export default function NossasLojas() {
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
        Quem Somos?
      </div>

      <div className={`d-lg-none ${styles.container}`}>
        <button className={styles.pageTitle}>
          <i className="d-lg-none">
            <MobileModalCloseButton />
          </i>
          Institucional
        </button>
      </div>

      <div className="model-page-interna">
        <div className="content">
          <div className={styles.containerInner}>
            <h1 className={styles.title}>
              <strong>QUEM SOMOS?</strong>
            </h1>

            <p>
              O Mundo das Embalagens teve inicio em 1987 com a fabricação de
              sacos e sacolas plásticas, onde mais tarde em 1996, foi inaugurada
              a primeira loja em Osasco, para oferecer aos nossos clientes uma
              linha completa de descartáveis em geral para residências,
              comércios e indústrias.
            </p>

            <p>
              Temos como principal objetivo satisfazer as necessidades de nossos
              clientes com produtos de qualidade e preços competitivos.
            </p>
            <p>
              Hoje oferecemos uma grande de linha de descartáveis em geral,
              artigos de festa, produtos de limpeza, doces e confeitaria.
            </p>
            <br />
            <h3 className={styles.title}>
              <strong>MISSÃO</strong>
            </h3>
            <p>
              Oferecer aos nossos clientes as melhores soluções em embalagens
              para todos os segmentos de atuação.
            </p>

            <br />
            <h3 className={styles.title}>
              <strong>VISÃO</strong>
            </h3>
            <p>
              Ser a opção preferencial de nossos clientes, diferenciando-se pela
              diversidade e qualidade dos nossos produtos, aliada a uma
              excelente experiência de compra.
            </p>
            <ul>
              <li>Valores</li>
              <li>Ética</li>
              <li>Transparência</li>
              <li>Qualidade</li>
              <li>Melhoria Contínua</li>
              <li>Solidez</li>
              <li>Responsabilidade Socioambiental</li>
            </ul>

            <br />
            <p>Consulte-nos, teremos o maior prazer em atendê-lo!</p>
          </div>
        </div>
      </div>
    </LayoutDefault>
  );
}
