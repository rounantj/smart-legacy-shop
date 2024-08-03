/* eslint-disable react/jsx-no-target-blank */

import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import MiniBanner from "@components/Banners/miniBanner";
import ModalMenuItem from "@components/AsideBar/modalMenuItem";
import AllCategoriesIcon from "@assets/icons/Categorias/AllCategories";
//CSS
import styles from "@styles/components/AsideBar.module.css";
import { useTodo } from "src/hooks/useTodo";

import { Api } from "@components/providers";
import SmartImage from "@components/SmartImage";
import { ajustStrigfy } from "@models/masks";
import { AppContext } from "src/pages/_app";


export default function AsideBar() {
  const {
    homeInfo,
  } = useContext(AppContext);

  let masterId1 = process.env.MASTER_ID;
  let affiliateId1 = process.env.AFFILIATE_ID;


  const MASTER_ID = Number(masterId1)
  const AFFILIATE_ID = Number(affiliateId1)


  const [affiliateId, setAffiliateId] = useState<number>(AFFILIATE_ID);
  const [masterId, setMasterId] = useState<number>(MASTER_ID);
  //const { tasks, getAll } = useTodo(affiliateId, masterId);
  const [tasks, setTasks] = useState<any[]>([])
  const [miniCat, setMiniCat] = useState<string>("")
  const [linkAside, setLinkAside] = useState<string>("")
  const [isToShowAll, setIsToShowAll] = useState<boolean>(false)

  async function getMyNewCategories(token: string = "") {
    let URL = process.env.SMART_API + "/categorie_find/" + process.env.AFFILIATE_ID
    let header = {
      headers: { "x-access-token": token }
    }
    const resultado = await Api.get(URL, { headers: { "x-access-token": token } })
    console.log("API ==== CAT", { resultado })
    setTasks(resultado?.data.data[0].categories)

  }


  useEffect(() => {
    if (homeInfo) {
      setMiniCat(homeInfo?.asideBanner?.url)
      setLinkAside(homeInfo?.asideBanner?.link)
    }
  }, [homeInfo])

  useEffect(() => {
    console.log("AS TASKSS ===========", { tasks })
  }, [tasks])

  function caseA(text: string) {
    var list = text?.split(" "), newText = ""
    for (const k in list) {
      var word = list[k]?.split(""), counter = 0, newWord = ""
      for (const u in word) {
        if (counter === 0) {
          if (word[u] != "") {
            newWord += word[u].toUpperCase()
          }
        }
        else {
          newWord += word[u].toLowerCase()
        }
        counter++
      }
      newText += newWord + " "
    }
    return newText
  }

  useEffect(() => {
    setAffiliateId(AFFILIATE_ID);
    setMasterId(MASTER_ID);
    getMyNewCategories()
  }, []);



  useEffect(() => {
    console.log({ tasks })
    localStorage.setItem("ALL_CATEGORIES", JSON.stringify(tasks))
    localStorage.setItem("ALL_CATEGORIES", JSON.stringify(tasks))
    let txt = process.env.LINK_ADICIONAL

  }, [tasks]);

  const [linkAdicional, setLinkAdicional] = useState<string[]>([])


  return (
    <aside className={styles.aside}>
      {
        linkAdicional.length > 0 ?
          <div className={` ${styles.asideHeader} oculta `}>
            {
              linkAdicional.map((link) => (
                <div key={Math.random()}>
                  <br />
                  <Link href={link}>Cursos</Link>
                  <br />
                </div>

              ))
            }

            <br />
          </div>
          :
          <div className="oculta"></div>
      }
      <br />

      <br />


      <nav className={styles.asideMenu}>
        <ul className={styles.menuList}>

          {
            isToShowAll ?
              tasks.map((cat) =>
                cat.active == "true" ? (
                  <Link key={Math.random()} href={`../../../c/${cat.title}`} passHref={false}>
                    <span className={styles.menuItem} key={cat.id} style={{ color: 'unset' }}>
                      <div className={styles.asideIcon}>

                        <SmartImage
                          src={
                            (process.env.URL_IMAGES + "/" + cat.icon)
                          }
                          layout="fill"
                          objectFit="contain"
                        />
                      </div>
                      <span className={styles.menuItemName}>
                        {caseA(cat.title)}
                      </span>
                      <div className={`${styles.modalMenuItem}`}>
                        <ModalMenuItem
                          modalActive={true}
                          categoryBanners={cat.subcategorie_banners}
                          categoryName={cat.title}
                          categoryList={cat.subcategories}
                        />
                      </div>
                    </span>
                  </Link>


                ) : (
                  <div key={Math.random()}></div>
                )
              )
              :

              tasks.slice(0, 8).map((cat) =>
                cat.active == "true" ? (
                  <Link key={Math.random()} href={`../../../c/${cat.title}`} passHref={false}>
                    <span className={styles.menuItem} key={cat.id} style={{ color: 'unset' }}>
                      <div className={styles.asideIcon}>
                        <SmartImage
                          src={

                            (process.env.URL_IMAGES + "/" + cat.icon)
                          }
                          layout="fill"
                          objectFit="contain"
                        />
                      </div>
                      <span className={styles.menuItemName}>
                        {caseA(cat.title)}
                      </span>
                      <div className={`${styles.modalMenuItem}`}>
                        <ModalMenuItem
                          modalActive={true}
                          categoryBanners={cat.subcategorie_banners}
                          categoryName={cat.title}
                          categoryList={cat.subcategories}
                        />
                      </div>
                    </span>
                  </Link>


                ) : (
                  <div key={Math.random()}></div>
                )
              )

          }
          {
            isToShowAll ?
              <div className="oculta"></div>
              :
              <li onClick={() => setIsToShowAll(true)} className={`${styles.menuItem}  `}>
                <AllCategoriesIcon /> Todas as categorias
              </li>
          }


        </ul>
      </nav>

      <div className={styles.asideMiniBanner}>
        <Link href={linkAside ? linkAside : "#t"} >
          {
            miniCat != "" ?
              <MiniBanner
                title="Clube"
                subtitle="Fidelidade"
                image={miniCat}
              />

              :
              <MiniBanner
                title="Clube"
                subtitle="Fidelidade"
                image="/images/mini-banner-1.png"
              />

          }

        </Link>


      </div>

    </aside>
  );
}




AsideBar.defaultProps = {};
