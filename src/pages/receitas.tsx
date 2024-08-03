import Image from "next/image";

import LayoutDefault from "@components/Layouts/LayoutDefault";
import ReceitaCategory from "@components/Receitas/ReceitaCategory";
import ReceitaCard from "@components/Receitas/ReceitaCard";

import styles from "@styles/pages/Receitas.module.css";
import { ProductOrder } from "@models/ProductOrder";
import { Cart } from "@models/Cart";
import { Product2 } from "@models/Product2";
import { useState, useEffect } from "react";
import { Api } from "@components/providers";
import React from "react";
import { useProductInformation } from "src/hooks/useProductInformation";
import { useProducts } from "src/hooks/useProducts";
import { useProducts1 } from "src/hooks/useProducts1";
import { useProducts2 } from "src/hooks/useProducts2";
import { useProducts3 } from "src/hooks/useProducts3";
import { useProductsRelateds } from "src/hooks/useProductsRelateds";
import { REVENUE, REVENUE_CATEGORIE } from "@models/Cliente";
import { ajustStrigfy } from "@models/masks";
import { AppContext } from "./_app";
import SmartImage from "@components/SmartImage";

export default function Receitas() {

  const {
    carts,
    decrease,
    increase,
    remove,
    update,
    updateDetail,
    noCarrinho,
  } = React.useContext(AppContext);

  const [affiliateID, setAffiliateID] = useState<number>(0);
  const [productCode, setProductCode] = useState(0);
  const [firstId, setFirstId] = useState(0);
  const [firstId1, setFirstId1] = useState(10);
  const [firstId2, setFirstId2] = useState(20);
  const [firstId3, setFirstId3] = useState(30);
  const [productsIn, setProductsIn] = useState<ProductOrder[]>([]);
  const [prd, setPrd] = useState<Product2 | any>();

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
    const fetch = async () => {
      await getAllInformation(AFFILIATE_ID, productCode);
      //('tasks2')
      //(tasks2)
      tasks2.map((pr) => {
        setPrd(pr);
      });

      await getAllRelacteds(AFFILIATE_ID, productsRelateds);
    }


    fetch().then(result => {

    }).catch(err => {
      //console.log(err)
    })
  }, [getAllInformation, getAllRelacteds, productCode, productsRelateds]);

  React.useEffect(() => {
    var AFFILIATE_ID: number = Number(process.env.AFFILIATE_ID);
    getAllProducts(AFFILIATE_ID, 0);
    products.map((prd) => {
      setFirstId(prd.id);
    });
    //('products',products)
  }, [getAllProducts]);

  React.useEffect(() => {
    var AFFILIATE_ID: number = Number(process.env.AFFILIATE_ID);
    getAllProducts1(AFFILIATE_ID, firstId1);
    products1.map((prd) => {
      setFirstId1(prd.id);
    });
    //('products1',products1)
  }, [getAllProducts1]);

  React.useEffect(() => {
    var AFFILIATE_ID: number = Number(process.env.AFFILIATE_ID);
    getAllProducts2(AFFILIATE_ID, firstId2);
    if (products2 != undefined && products2.length > 0) {
      products2?.map((prd) => {
        setFirstId2(prd.id);
      });
    }

    //('products2',products2)
  }, [getAllProducts2]);

  React.useEffect(() => {
    var AFFILIATE_ID: number = Number(process.env.AFFILIATE_ID);
    getAllProducts3(AFFILIATE_ID, firstId3);
    products3.map((prd) => {
      setFirstId3(prd.id);
    });
    //('products3',products3)
  }, [getAllProducts3]);

  React.useEffect(() => {
    localStorage.setItem("listShow", "0")
  }, [products, products1, products2, products3])

  const [myRevenues, setMyRevenues] = useState<REVENUE[]>([])

  useEffect(() => {
    Api.post('/getByTableName', { "masterId": process.env.MASTER_ID, "idName": "master_id", "tableName": "revenues" }).then(response => {
      let myReven: REVENUE[] = []
      for (const k in response.data) {
        let ingredientes: any = []
        try {
          ingredientes = JSON.parse(response.data[k].ingredientes)
        } catch (e) { }
        myReven.push({
          id: response.data[k].id,
          banner_topo: response.data[k].banner_topo,
          status: response.data[k].status,
          porcoes: response.data[k].porcoes,
          title: response.data[k].title,
          tempo_minutos: response.data[k].tempo_minutos,
          ingredientes: ingredientes,
        })
      }
      setMyRevenues(myReven)
    }).catch(err => {
      ////console.log(err)
    })

  }, [])


  useEffect(() => {
    //console.log("my revenues",myRevenues)

  }, [myRevenues])


  const [myRevenuesCategories, setMyRevenuesCategories] = useState<REVENUE_CATEGORIE[]>([])

  useEffect(() => {
    Api.post('/getByTableName', { "masterId": process.env.MASTER_ID, "idName": "master_id", "tableName": "revenues_categories" }).then(response => {
      let myReven: REVENUE_CATEGORIE[] = []
      for (const k in response.data) {
        let ingredientes: any = []
        try {
          ingredientes = JSON.parse(response.data[k].ingredientes)
        } catch (e) { }
        myReven.push({
          id: response.data[k].id,
          image: response.data[k].image,
          name: response.data[k].name,
          status: response.data[k].status,
        })
      }
      setMyRevenuesCategories(myReven)
    }).catch(err => {
      ////console.log(err)
    })

  }, [])

  const [imageBann, setImageBann] = useState<string>("/images/banner-receitas.png")


  useEffect(() => {
    //console.log("my myRevenuesCategories",myRevenuesCategories)
    try {
      let txt = localStorage.getItem('FULL_DELIVERY_DEFAULT')
      if (txt == null) { txt = "" }
      let DATA = JSON.parse(txt)
      //let DATA = JSON.parse(ajustStrigfy(txt))
      setImageBann(DATA[0].master_banner_revenues)

    } catch (e) { }

  }, [myRevenuesCategories])



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
      <div className={`${styles.pageReceitas} padding-mobile`}>
        <h1 className={styles.pageTitle}>Receitas</h1>

        <div className={styles.exibindo}>
          Mostrando <span className={styles.exibindoQtd}>{myRevenues.length}</span> receitas em{" "}
          <span className={styles.exibindoCategories}>todas as categorias</span>
        </div>

        <div className="model-page-interna">
          <div className={styles.mainBanner}>
            <SmartImage
              src={imageBann}
              layout="responsive"
              width={1095}
              height={177} objectFit={""} />
          </div>

          <div className="content">
            <nav className={styles.categoryMenu}>


              {
                myRevenuesCategories.map((rev) => (
                  rev.status ?

                    <ReceitaCategory
                      key={Math.random()}
                      name={rev.name ? rev.name : ''}
                      image={rev.image ? rev.image : ''}
                      count={350}
                      link="/"
                    />
                    :
                    <div key={Math.random()} className="oculta"></div>

                ))
              }
            </nav>

            <div className={styles.receitaList}>
              {
                myRevenues.map((rev) => (
                  rev.status ?

                    <ReceitaCard
                      key={Math.random()}
                      name={rev.title ? rev.title : ''}
                      porcoes={rev.porcoes ? rev.porcoes : 0}
                      qtdIngredientes={rev.ingredientes ? rev.ingredientes.length : 0}
                      tempoPreparo={rev.tempo_minutos ? '+- ' + rev.tempo_minutos + ' min' : ''}
                      image={rev.banner_topo ? rev.banner_topo : ''}
                      link={"/receitas/" + rev.title?.replace(/ /g, "-")}
                    />
                    :
                    <div key={Math.random()} className="oculta"></div>

                ))
              }



            </div>
          </div>
        </div>
      </div>
    </LayoutDefault>
  );
}
