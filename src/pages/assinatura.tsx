import { useState, useContext } from "react";
import Link from "next/link";

import LayoutDefault from "@components/Layouts/LayoutDefault";
import Button from "@components/Buttons/Button";
import ItemWithImage from "@components/Receitas/ItemWithImage";


import styles from "@styles/pages/Assinatura.module.css";
import React from "react";
import { useProductInformation } from "src/hooks/useProductInformation";
import { useProducts } from "src/hooks/useProducts";
import { useProducts1 } from "src/hooks/useProducts1";
import { useProducts2 } from "src/hooks/useProducts2";
import { useProducts3 } from "src/hooks/useProducts3";
import { useProductsRelateds } from "src/hooks/useProductsRelateds";
import { AppContext } from "./_app";
import SmartImage from "@components/SmartImage";


export default function Assinatura() {
  const {
    carts,
    decrease,
    increase,
    remove,
    update,
    updateDetail,
    noCarrinho,
  } = useContext(AppContext);


  const [affiliateID, setAffiliateID] = useState<number>(0);
  const [productCode, setProductCode] = useState(0);
  const [firstId, setFirstId] = useState(0);
  const [firstId1, setFirstId1] = useState(10);
  const [firstId2, setFirstId2] = useState(20);
  const [firstId3, setFirstId3] = useState(30);
  const { tasks2, getAllInformation } = useProductInformation(
    affiliateID,
    productCode
  );

  const [productsRelateds, setProductsRelateds] = useState([
    998503,
    998483,
    57154,
    56929,
    29080, // default relateds
  ]);

  const { tasks3, getAllRelacteds } = useProductsRelateds(
    affiliateID,
    productsRelateds
  );

  const { products, getAllProducts } = useProducts(affiliateID, 0);
  const { products1, getAllProducts1 } = useProducts1(affiliateID, firstId);
  const { products2, getAllProducts2 } = useProducts2(affiliateID, firstId);
  const { products3, getAllProducts3 } = useProducts3(affiliateID, firstId);

  React.useEffect(() => {
    var AFFILIATE_ID: number = Number(process.env.AFFILIATE_ID);
    getAllInformation(AFFILIATE_ID, productCode);

    getAllRelacteds(AFFILIATE_ID, productsRelateds);
  }, [getAllInformation, getAllRelacteds, productCode, productsRelateds]);

  React.useEffect(() => {
    var AFFILIATE_ID: number = Number(process.env.AFFILIATE_ID);
    getAllProducts(AFFILIATE_ID, 0);
    products.map((prd) => {
      setFirstId(prd.id);
    });

  }, [getAllProducts]);

  React.useEffect(() => {
    var AFFILIATE_ID: number = Number(process.env.AFFILIATE_ID);
    getAllProducts1(AFFILIATE_ID, firstId1);
    products1.map((prd) => {
      setFirstId1(prd.id);
    });

  }, [getAllProducts1]);

  React.useEffect(() => {
    var AFFILIATE_ID: number = Number(process.env.AFFILIATE_ID);
    getAllProducts2(AFFILIATE_ID, firstId2);
    if (products2 != undefined && products2.length > 0) {
      products2?.map((prd) => {
        setFirstId2(prd.id);
      });
    }


  }, [getAllProducts2]);

  React.useEffect(() => {
    var AFFILIATE_ID: number = Number(process.env.AFFILIATE_ID);
    getAllProducts3(AFFILIATE_ID, firstId3);
    products3.map((prd) => {
      setFirstId3(prd.id);
    });

  }, [getAllProducts3]);

  React.useEffect(() => {




  }, [products, products1, products2, products3])



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
      <div className={`${styles.assinatura} padding-mobile`}>
        <div className="breadCrumbs">
          <Link href="/" passHref>
            <span>Home</span>
          </Link>
          <div className="breadCrumbs-separator"></div>
          Assinatura
        </div>

        <div className="model-page-interna">
          <div className={styles.mainBanner}>
            <SmartImage
              src="/images/banner-assinatura.jpg"
              layout="responsive"
              width={1095}
              height={177} objectFit={"contain"} />

            <h1 className={styles.pageTitle}>Assinatura de Cesta</h1>
          </div>

          <div className={styles.content}>
            <div className={styles.header}>
              <div className={styles.headerMeta}>
                <h1 className={styles.headerTitle}>A sua assinatura smart</h1>
              </div>

              <div className={styles.headerButtonBox}>
                <Button className={styles.headerButton}>
                  Prepare sua cesta
                </Button>
              </div>
            </div>

            <div className={styles.contentBox}>
              <div className="row row-cols-1 row-cols-lg-2">
                <div className="col">
                  <div className={styles.featureImage}>
                    <SmartImage src="/images/frutas.jpg" width={456} height={304} objectFit={"contain"} layout={"responsive"} />
                  </div>
                </div>

                <div className="col">
                  <div className={styles.featureMeta}>
                    <h3 className={styles.featurePreTitle}>Produção própria</h3>
                    <h2 className={styles.featureTitle}>
                      Receba sempre os produtos mais frescos em sua casa
                    </h2>
                    <p>
                      Encontre a melhor cesta e escola a periodicidade.
                      Selecionaremos sempre os produtos mais fresquinhos{" "}
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.module}>
                <h2 className={styles.moduleTitle}>Como funciona?</h2>

                <div className={styles.comoFuncionaBox}>
                  <div className={styles.cardList}>
                    <div className={styles.card}>
                      <div className={styles.cardHeader}>
                        <div className={styles.cardBoxImg}>
                          <SmartImage
                            src="/images/assinatura-card.png"
                            layout="fill"
                            objectFit="contain"
                          />
                        </div>

                        <h3 className={styles.cardTitle}>
                          Selecione lorem ipsum sit amet
                        </h3>
                      </div>

                      <p>Lorem ipsum sit amet</p>
                    </div>

                    <div className={styles.card}>
                      <div className={styles.cardHeader}>
                        <div className={styles.cardBoxImg}>
                          <SmartImage
                            src="/images/assinatura-card.png"
                            layout="fill"
                            objectFit="contain"
                          />
                        </div>

                        <h3 className={styles.cardTitle}>
                          Selecione lorem ipsum sit amet
                        </h3>
                      </div>

                      <p>Lorem ipsum sit amet</p>
                    </div>

                    <div className={styles.card}>
                      <div className={styles.cardHeader}>
                        <div className={styles.cardBoxImg}>
                          <SmartImage
                            src="/images/assinatura-card.png"
                            layout="fill"
                            objectFit="contain"
                          />
                        </div>

                        <h3 className={styles.cardTitle}>
                          Selecione lorem ipsum sit amet
                        </h3>
                      </div>

                      <p>Lorem ipsum sit amet</p>
                    </div>
                  </div>
                </div>

                <Button className={styles.comoFuncionaButton}>
                  Prepare sua cesta
                </Button>
              </div>

              <div className={styles.module}>
                <h2 className={styles.moduleTitle}>O que pode vir na cesta?</h2>

                <div className={styles.cestaList}>
                  <div className={styles.cestaItem}>
                    <div className={styles.cestaHeader}>
                      <h3 className={styles.cestaTitle}>Frutas</h3>
                    </div>

                    <div className={styles.itemList}>
                      <ItemWithImage
                        image="/images/produto_teste.png"
                        name="Abacate lorem ipsum"
                      />
                      <ItemWithImage
                        image="/images/produto_teste.png"
                        name="Abacate lorem ipsum"
                      />
                      <ItemWithImage
                        image="/images/produto_teste.png"
                        name="Abacate lorem ipsum"
                      />
                      <ItemWithImage
                        image="/images/produto_teste.png"
                        name="Abacate lorem ipsum"
                      />
                      <ItemWithImage
                        image="/images/produto_teste.png"
                        name="Abacate lorem ipsum"
                      />
                      <ItemWithImage
                        image="/images/produto_teste.png"
                        name="Abacate lorem ipsum"
                      />
                    </div>
                  </div>

                  <div className={styles.cestaItem}>
                    <div className={styles.cestaHeader}>
                      <h3 className={styles.cestaTitle}>Legumes</h3>
                    </div>

                    <div className={styles.itemList}>
                      <ItemWithImage
                        image="/images/produto_teste.png"
                        name="Abacate lorem ipsum"
                      />
                      <ItemWithImage
                        image="/images/produto_teste.png"
                        name="Abacate lorem ipsum"
                      />
                      <ItemWithImage
                        image="/images/produto_teste.png"
                        name="Abacate lorem ipsum"
                      />
                      <ItemWithImage
                        image="/images/produto_teste.png"
                        name="Abacate lorem ipsum"
                      />
                      <ItemWithImage
                        image="/images/produto_teste.png"
                        name="Abacate lorem ipsum"
                      />
                      <ItemWithImage
                        image="/images/produto_teste.png"
                        name="Abacate lorem ipsum"
                      />
                    </div>
                  </div>

                  <div className={styles.cestaItem}>
                    <div className={styles.cestaHeader}>
                      <h3 className={styles.cestaTitle}>Vegetais</h3>
                    </div>

                    <div className={styles.itemList}>
                      <ItemWithImage
                        image="/images/produto_teste.png"
                        name="Abacate lorem ipsum"
                      />
                      <ItemWithImage
                        image="/images/produto_teste.png"
                        name="Abacate lorem ipsum"
                      />
                      <ItemWithImage
                        image="/images/produto_teste.png"
                        name="Abacate lorem ipsum"
                      />
                      <ItemWithImage
                        image="/images/produto_teste.png"
                        name="Abacate lorem ipsum"
                      />
                      <ItemWithImage
                        image="/images/produto_teste.png"
                        name="Abacate lorem ipsum"
                      />
                      <ItemWithImage
                        image="/images/produto_teste.png"
                        name="Abacate lorem ipsum"
                      />
                    </div>
                  </div>

                  <div className={styles.cestaItem}>
                    <div className={styles.cestaHeader}>
                      <h3 className={styles.cestaTitle}>Temperos</h3>
                    </div>

                    <div className={styles.itemList}>
                      <ItemWithImage
                        image="/images/produto_teste.png"
                        name="Abacate lorem ipsum"
                      />
                      <ItemWithImage
                        image="/images/produto_teste.png"
                        name="Abacate lorem ipsum"
                      />
                      <ItemWithImage
                        image="/images/produto_teste.png"
                        name="Abacate lorem ipsum"
                      />
                      <ItemWithImage
                        image="/images/produto_teste.png"
                        name="Abacate lorem ipsum"
                      />
                      <ItemWithImage
                        image="/images/produto_teste.png"
                        name="Abacate lorem ipsum"
                      />
                      <ItemWithImage
                        image="/images/produto_teste.png"
                        name="Abacate lorem ipsum"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.module}>
                <div className={styles.containerInner}>
                  <h2 className={styles.moduleTitle}>Perguntas Frquentes?</h2>

                  <div className={styles.perguntaList}>
                    <div className={styles.perguntaItem}>
                      <h3 className={styles.pergunta}>Lorem ipsum sit?</h3>

                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur
                      </p>
                    </div>

                    <div className={styles.perguntaItem}>
                      <h3 className={styles.pergunta}>Lorem ipsum sit?</h3>

                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur
                      </p>
                    </div>

                    <div className={styles.perguntaItem}>
                      <h3 className={styles.pergunta}>Lorem ipsum sit?</h3>

                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur
                      </p>
                    </div>

                    <div className={styles.perguntaItem}>
                      <h3 className={styles.pergunta}>Lorem ipsum sit?</h3>

                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur
                      </p>
                    </div>
                  </div>

                  <Button className={styles.perguntaButton}>
                    Prepare sua cesta
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutDefault>
  );
}
