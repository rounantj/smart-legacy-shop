import { GetServerSideProps } from "next";

import { useState, useEffect, useContext } from "react";
import Image from "next/image";

import LayoutDefault from "@components/Layouts/LayoutDefault";
import Loja from "@components/Loja";
import styles2 from "@styles/pages/404.module.css";
import Link from "next/link";

import { Api } from "@components/providers";
import { ProductOrder } from "@models/ProductOrder";
import { Cart } from "@models/Cart";
import { Product2 } from "@models/Product2";

import styles from "@styles/pages/institucional/institucional.module.css";
import MobileModalCloseButton from "@assets/icons/MobileModalCloseButtonLeft";
import { InstitucionalPage } from "@models/InstitucionalPages";
import CheckRounded from "@assets/icons/CheckRounded";
import NotFoundFace from "@assets/icons/NotFoundFace";
import { AppContext } from "../_app";

export default function NossasLojas({ content = "", slug = "", titulo = "", status = 0 }) {
  const {
    carts,
    decrease,
    increase,
    remove,
    update,
    updateDetail,
    noCarrinho,
  } = useContext(AppContext);

  const [thisPage, setThisPage] = useState<InstitucionalPage>();

  useEffect(() => {
    let txt1 = process.env.AFFILIATE_ID;
    let txt2 = process.env.MASTER_ID;
    let txt3 = localStorage.getItem("token");
    let AFFILIATE_ID: Number = 0;
    if (txt1 != null) {
      AFFILIATE_ID = Number(txt1);
    }
    let MASTER_ID: Number = 0;
    if (txt2 != null) {
      MASTER_ID = Number(txt2);
    }
    let TOKEN: string = "";
    if (txt3 != null) {
      TOKEN = txt3;
    }

    setThisPage({
      content_page: content,
      status: status,
      id: 0,
      name_page: titulo
    })

    // Api.post("/getContentPage", {
    //   master_id: MASTER_ID,
    //   name_page: slug,
    // })
    //   .then((response) => {

    //     if (response.data.length > 0) {
    //       for (const k in response.data) {
    //         setThisPage(response.data[k]);
    //       }
    //     }
    //   })
    //   .catch((error) => {

    //   });
  }, []);

  function caseA(text: string) {
    var list = text.split(" "),
      newText = "";
    for (const k in list) {
      var word = list[k].split(""),
        counter = 0,
        newWord = "";
      for (const u in word) {
        if (counter === 0) {
          if (word[u] != "") {
            newWord += word[u].toUpperCase();
          }
        } else {
          newWord += word[u].toLowerCase();
        }
        counter++;
      }
      newText += newWord + " ";
    }
    return newText;
  }

  useEffect(() => {
    //console.log(thisPage)
  }, [thisPage]);

  return (
    <LayoutDefault
      noCarrinho={noCarrinho}
      detail={update}
      update={updateDetail}
      cart={carts}
      increase={increase}
      decrease={decrease}
      remove={remove}
    >
      {thisPage?.status == 1 ? (
        <div>
          <div className={styles.breadcrumbs}>
            <Link href="/" passHref>
              <span>Home</span>
            </Link>
            <div className={styles.separator}></div>
            <Link href="#" passHref>
              <span>Institucional</span>
            </Link>
            <div className={styles.separator}></div>
            {caseA(slug)}
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
              <h1 className={styles.title}>
                <strong>{slug.toUpperCase().replace(/-/g, " ")}</strong>
              </h1>
            </div>

            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      ) : (
        <div className={styles2.page404}>
          <div className="model-page-interna">
            <div className={styles2.header}>
              <div className={` ${styles2.messageBox} messageBoxResult `}>
                <NotFoundFace />
                <b>Não conseguimos encontrar a página</b>
              </div>
            </div>

            <div className={styles2.body}>
              <div className={styles2.checklistBox}>
                <h3 className={styles2.checklistTitle}>
                  O que pode ter acontecido
                </h3>

                <div className={styles2.checklist}>
                  <div className={styles2.item}>
                    <CheckRounded /> A página pode não existir mais.
                  </div>

                  <div className={styles2.item}>
                    <CheckRounded /> Algum termo pode ter sido digitado errado.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </LayoutDefault>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug = "" }: any = context.query;
  const master_id = process.env.MASTER_ID;
  let content = "";
  let titulo = ""
  let status = 1

  const response = await Api.post(
    '/getContentPage', { "master_id": master_id, "name_page": slug }
  );
  //console.log('o config',response.config)
  //console.log('a data',response.data)

  if (response && response.data.length > 0) {
    const { content_page } = response.data[0]
    content = content_page ? content_page : 'Sem conteúdo...';
    titulo = response.data[0].titulo_page;
    status = response.data[0].status;
  } else {
    status = 0
  }
  //console.log('slug',slug)
  //console.log('content',content)

  return { props: { content, slug, titulo, status } };
};
