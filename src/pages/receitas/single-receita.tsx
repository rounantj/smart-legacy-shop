import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";

import CarrinhoIcon from "@assets/icons/CarrinhoIcon";

import Button from "@components/Buttons/Button";
import LayoutDefault from "@components/Layouts/LayoutDefault";
import Ingrediente from "@components/Receitas/Ingrediente";

import { ProductOrder } from "@models/ProductOrder";
import { Cart } from "@models/Cart";
import { Product2 } from "@models/Product2";
import { Api } from "src/providers";

import styles from "@styles/pages/SingleReceita.module.css";
import { AppContext } from "../_app";
import SmartImage from "@components/SmartImage";

export default function SingleReceita() {
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
      <div className={`${styles.receita} padding-mobile`}>
        <div className="breadCrumbs">
          <Link href="/" passHref>
            <span>Home</span>
          </Link>
          <div className="breadCrumbs-separator"></div>
          <Link href="/receitas" passHref>
            <span>Receitas</span>
          </Link>
          <div className="breadCrumbs-separator"></div>
          Omelete com molho de queijo
        </div>

        <div className={`model-page-interna ${styles.modelPageInterna}`}>
          <div className={styles.mainBanner}>
            <SmartImage
              src="/images/receitas/single-receita.jpg"
              layout="fill"
              objectFit="cover"
            />
          </div>

          <div className={styles.content}>
            <div className={styles.header}>
              <div className={styles.headerMeta}>
                <h1 className={styles.pageTitle}>
                  Omelete com Molho de Queijo
                </h1>

                <div className={styles.metaList}>
                  <div className={styles.metaItem}>± 50 mins</div>
                  <div className={styles.metaItem}>8 ingredientes</div>
                  <div className={styles.metaItem}>1 porção</div>
                </div>
              </div>

              <div className={styles.headerButton}>
                <Button>
                  <CarrinhoIcon />
                  Compre todos os ingredientes
                </Button>
              </div>
            </div>

            <div className={styles.body}>
              <div className={styles.module}>
                <h2 className={styles.pageSubTitle}>Ingredientes</h2>

                <div className={styles.ingredienteList}>
                  <Ingrediente
                    image="/images/receitas/ingrediente-1.jpg"
                    name="1/2 xícara (chá) de molho de tomate"
                  />

                  <Ingrediente
                    image="/images/receitas/ingrediente-1.jpg"
                    name="1/2 xícara (chá) de molho de tomate"
                  />

                  <Ingrediente
                    image="/images/receitas/ingrediente-1.jpg"
                    name="1/2 xícara (chá) de molho de tomate"
                  />

                  <Ingrediente
                    image="/images/receitas/ingrediente-1.jpg"
                    name="1/2 xícara (chá) de molho de tomate"
                  />

                  <Ingrediente
                    image="/images/receitas/ingrediente-1.jpg"
                    name="1/2 xícara (chá) de molho de tomate"
                  />

                  <Ingrediente
                    image="/images/receitas/ingrediente-1.jpg"
                    name="1/2 xícara (chá) de molho de tomate"
                  />

                  <Ingrediente
                    image="/images/receitas/ingrediente-1.jpg"
                    name="1/2 xícara (chá) de molho de tomate"
                  />

                  <Ingrediente
                    image="/images/receitas/ingrediente-1.jpg"
                    name="1/2 xícara (chá) de molho de tomate"
                  />

                  <Ingrediente
                    image="/images/receitas/ingrediente-1.jpg"
                    name="1/2 xícara (chá) de molho de tomate"
                  />
                </div>
              </div>

              <div className={styles.module}>
                <h2 className={styles.pageSubTitle}>Modo de preparo</h2>

                <div className={styles.video}>
                  <SmartImage
                    src="/images/receitas/video-receita.jpg"
                    width={648}
                    height={248} objectFit={"contain"} layout={"responsive"} />
                </div>

                <ol className={styles.modoPreparoList}>
                  <li className={styles.modoPreparo}>
                    <span className={styles.number}>1</span>
                    Em uma frigideira antiadente, aqueça o óleo e ponha os
                    pimentões e a cebola;
                  </li>

                  <li className={styles.modoPreparo}>
                    <span className={styles.number}>2</span>
                    Em uma frigideira antiadente, aqueça o óleo e ponha os
                    pimentões e a cebola;
                  </li>

                  <li className={styles.modoPreparo}>
                    <span className={styles.number}>3</span>
                    Em uma frigideira antiadente, aqueça o óleo e ponha os
                    pimentões e a cebola;
                  </li>

                  <li className={styles.modoPreparo}>
                    <span className={styles.number}>4</span>
                    Em uma frigideira antiadente, aqueça o óleo e ponha os
                    pimentões e a cebola;
                  </li>
                </ol>
              </div>

              <div className={styles.module}>
                <div className={styles.boxOfertas}>
                  <div className={styles.boxOfertasHeader}>
                    <h2 className={styles.boxOfertasTitle}>
                      Compre os ingredientes separados
                    </h2>
                  </div>

                  {/* <ProductCardList
                    noCarrinho={noCarrinho}
                    addCart={increase}
                    removeCart={decrease}
                    handleAdd2={changeProductCode}
                    products2={products}
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutDefault>
  );
}
