import { useState, useEffect, useContext } from "react";
import Image from "next/image";

import LayoutDefault from "@components/Layouts/LayoutDefault";
import Loja from "@components/Loja";

import Link from "next/link";

import { Api } from "src/providers";
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
        Nossas Lojas
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
              <strong>Conheça nossas lojas</strong>
            </h1>

            <p>
              Criamos a SmartComerci pensando no UX Design perfeito para
              experiência de compra dos seus clientes. Clientes conseguem montar
              carrinhos de compras acima de 60 itens e ticket médios acima de
              R$700 reais de forma simples e fazendo a gestão desse processo de
              compra.
            </p>
          </div>
          <div className={styles.lojaList}>
            <Loja
              image="/images/loja.jpg"
              title="Loja Matriz"
              endereco="Estrada dos Romeiros – 2051 – Cruz Preta – Barueri – SP – CEP: 06417-000"
              telefone=""
              atendimento="<p>Segunda a Sexta das 08h às 18h | Sábados das 08h às 17h.</p><p>Horário de atendimento pode mudar nos feriados!</p>"
              link="#"
            />
            <Loja
              image="/images/loja.jpg"
              title="Loja Jd Paulista"
              endereco="Estrada Velha de Itapevi – 4032 –  Jardim Paulista – Barueri – SP - CEP: 06444-000"
              telefone=""
              atendimento="<p>Segunda a Sexta das 08h às 18h | Sábados das 08h às 17h.</p><p>Horário de atendimento pode mudar nos feriados!</p>"
              link="#"
            />

            <Loja
              image="/images/loja.jpg"
              title="Loja Osasco"
              endereco="Avenida dos Autonomistas – 7001 –  Quitaúna – Osasco – SP – CEP: 06194-050"
              telefone=""
              atendimento="<p>Segunda a Sexta das 08h às 18h | Sábados das 08h às 17h.</p><p>Horário de atendimento pode mudar nos feriados!</p>"
              link="#"
            />
            <Loja
              image="/images/loja.jpg"
              title="Loja Jd Belval"
              endereco="Avenida Vinte e Seis de Março – 1373 – Jardim Belval – Barueri – SP – CEP: 06401-050"
              telefone=""
              atendimento="<p>Segunda a Sexta das 08h às 18h | Sábados das 08h às 17h.</p><p>Horário de atendimento pode mudar nos feriados!</p>"
              link="#"
            />
          </div>
        </div>
      </div>
    </LayoutDefault>
  );
}
