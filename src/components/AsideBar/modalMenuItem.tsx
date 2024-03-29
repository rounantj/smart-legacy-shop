
import Link from "next/link";
import Image from "next/image";

import ArrowRight from "@assets/icons/ArrowRight";

import BoxSubcategoryLink from "@components/AsideBar/boxSubcategoryLink";

import styles from "@styles/components/asideBar/modalMenuItem.module.css";
import React, { useState, useEffect } from "react";
import { BANNER } from "@models/SubCategories";
import { CategorieDetails } from "@models/CategorieDetails";
import { SubCatStatus } from "@models/SubCatStatus";

interface staticPropsResult {
  categoryName: string;
  categoryList: [] | any;
  categoryBanners?: string | any;
  modalActive: any;
}

export default function ModalMenuItem(props: staticPropsResult) {
  const {
    categoryName,
    categoryList
  } = props;


  const [categories, setCategories] = useState<any>([])

  var [index1, setIndex1] = useState<SubCatStatus[]>([])
  var [index2, setIndex2] = useState<SubCatStatus[]>([])
  var [index3, setIndex3] = useState<SubCatStatus[]>([])
  const [categoryBanners, setCategoryBanners] = useState<BANNER>()
  var [listSubCategoriesinfo] = useState<SubCatStatus[]>([{
    subCategoria: "string| any",
    status: 0,
  }])

  const [modalActive] = useState<boolean>(props.modalActive)

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


  React.useEffect(() => {
    console.log("as PROPSS", props)
    try {


      let l1: any = [], l2: any = [], l3: any = [], contador = 0

      let subcategories = categoryList

      console.log("SUBCATEGORIESS ", { subcategories })

      subcategories.forEach((element: any, index: number) => {

        if (element) {
          if (contador < 10) {

            l1.push({
              title: element.title,
              active: element.active == "true"
            })
          }
          if (contador > 9 && contador < 13) {
            l2.push({
              title: element.title,
              active: element.active == "true"
            })
          }
          if (contador > 12 && contador < 20) {
            l3.push({
              title: element.title,
              active: element.active == "true"
            })
          }
        }
        contador++
      });


      setIndex1(l1)
      setIndex2(l2)
      setIndex3(l3)
    } catch (error) {
      console.log("O ERRU AINDA yy", error)

    }

  }, [categoryList]);



  /*
  
    React.useEffect(() => {
      //console.log("as listas aa", props.categoryList)
      if (props.categoryList) {
        //console.log("atribuindo lista")
        setCategories(props.categoryList)
      }
  
      if (props.categoryBanners) {
  
        try {
  
          let bnn: any = props.categoryBanners
  
          if (bnn.length > 0) {
            for (const k in bnn) {
              if (bnn[k].active && bnn[k].active != "false") {
                setCategoryBanners({
                  img: bnn[k].url,
                  link: bnn[k].link,
                  active: bnn[k].active,
                })
              }
            }
          }
        } catch (ee) {
          //console.log("O ERRU AINDA", ee)
  
        }
      }
  
    }, [listSubCategoriesinfo])
    */

  React.useEffect(() => {
    console.log({ index1, index2, index3 })
  }, [index1, index2, index3])






  return (
    // <div onClick={() => setActive(false)} className={`${modalActive ? styles.modalActive : ''}`}>
    <div className={`${modalActive ? styles.modalActive : ''}`} onClick={(e) => e.preventDefault()}>

      <div className={`${styles.modal}`}>

        <div className={styles.containerInner}>
          <div className={styles.header}>
            <div className={styles.sugestoes}>
              <h3 className={` ${styles.title} oculta`}>{caseA('sugestões')}</h3>

              <div className={styles.sugestoesList}>
                <BoxSubcategoryLink
                  href="/"
                  title="Ácidas"
                  image="/images/receita-categorias/acidos.png"
                />

                <BoxSubcategoryLink
                  href="/"
                  title="semiácidas"
                  image="/images/receita-categorias/semiacidas.png"
                />

                <BoxSubcategoryLink
                  href="/"
                  title="Doces"
                  image="/images/receita-categorias/doces.png"
                />

                <BoxSubcategoryLink
                  href="/"
                  title="Hiper-hídricas"
                  image="/images/receita-categorias/hiper-hidricas.png"
                />

                <BoxSubcategoryLink
                  href="/"
                  title="Oleaginosas"
                  image="/images/receita-categorias/oleaginosas.png"
                />
              </div>
            </div>
          </div>

          <div className={styles.body}>
            <div className="row row-cols-3">
              <div className={`col ${styles.colunaDireita}`}>
                <div className={styles.menu}>
                  <h3 className={styles.menuTitle}>{categoryName}</h3>


                  <nav>
                    <ul>
                      {index1.map(function (cat: any) {
                        return (
                          cat.active === "true" || cat.active === true ?
                            <div key={Math.random()}>
                              <Link key={Math.random()} href={`../../../c/${categoryName?.replace(/\//, '_')}/sc/${cat?.title?.replace(/\//, '_')}`} passHref={false}>
                                <span className={`listaSubCat`}
                                  style={{ color: 'unset' }}
                                  key={`${categoryName}-${cat.title}`}
                                >

                                  {caseA(cat.title)}

                                </span>
                              </Link>
                            </div>



                            : <div key={Math.random()}></div>
                        )
                      })
                      }
                    </ul>
                  </nav>
                </div>

                <div className={styles.menu}>
                  <h3 className={`${styles.menuTitle} oculta`}>Secundárias</h3>

                  <nav>
                    <ul>

                      {index2.map(function (cat: any) {
                        return (
                          cat.active === "true" || cat.active === true ?
                            <div key={Math.random()}>
                              <Link key={Math.random()} href={`../../../c/${categoryName?.replace(/\//, '_')}/sc/${cat.title?.replace(/\//, '_')}`} passHref={false}>
                                <span className={`listaSubCat`}
                                  style={{ color: 'unset' }}
                                  key={`${categoryName}-${cat.title}`}
                                >

                                  {caseA(cat.title)}

                                </span>
                              </Link>
                            </div>



                            : <div key={Math.random()}></div>
                        )
                      })
                      }
                    </ul>
                  </nav>
                </div>
              </div>

              <div className="col">
                <div className={styles.menu}>
                  <h3 className={` ${styles.menuTitle} oculta`}>Outras</h3>
                  <nav>
                    <ul>
                      {index3.map(function (cat: any) {
                        return (
                          cat.active === "true" || cat.active === true ?
                            <div key={Math.random()}>
                              <Link key={Math.random()} href={`../../../c/${categoryName?.replace(/\//, '_')}/sc/${cat.title?.replace(/\//, '_')}`} passHref={false}>
                                <span className={`listaSubCat`}
                                  style={{ color: 'unset' }}
                                  key={`${categoryName}-${cat.title}`}
                                >

                                  {caseA(cat.title)}

                                </span>
                              </Link>
                            </div>



                            : <div key={Math.random()}></div>
                        )
                      })
                      }
                    </ul>
                  </nav>
                </div>
              </div>

              <div className="col">
                {
                  categoryBanners ?
                    categoryBanners.active ?

                      <Link href={categoryBanners.link ?? ""} passHref>
                        <div className={`${styles.banner}`}>

                          <Image
                            src={categoryBanners.img}
                            width={221}
                            height={429}
                            layout="responsive" alt={""} />
                        </div>
                      </Link>
                      :
                      <div className="oculta"></div>
                    :
                    <div className="oculta"></div>


                }

              </div>
            </div>
          </div>

          <div>
            Veja toda a categoria de{" "}
            <Link href={`../../../c/${categoryName?.replace(/\//, '_')}`} passHref>
              <span className={styles.linkWithArrow}>
                <span className={styles.linkText}>{caseA(categoryName)}</span>
                <ArrowRight />
              </span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
