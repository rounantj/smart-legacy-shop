/* eslint-disable jsx-a11y/alt-text */
import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import FilterStyle from "@styles/components/carrinho/Filter.module.css";
import { ProductOrder } from "@models/ProductOrder";
import { Selecao } from "@models/Selecao";
import SmartImage from "@components/SmartImage";
import { ajustStrigfy } from "@models/masks";
interface CartList {
  products: ProductOrder[];
  categorias: Selecao[] | any;
  setShow: any;
  valorTudo: number
  name: string
}
export default function Filter(props: CartList) {
  const [isActive, setIsActive] = useState(false);
  const [valorTudo, setValorTudo] = useState(props.valorTudo);

  const categoryClass = isActive
    ? `${FilterStyle.category} ${FilterStyle.active}`
    : FilterStyle.category;

  function categoryClick() {
    setIsActive(!isActive);
  }
  function getImage(name: string) {
    var l = localStorage.getItem("ALL_CATEGORIES"), list = []
    if (l && l != null) {
      list = JSON.parse(ajustStrigfy(l))
    }
    for (const k in list) {
      if (list[k].affiliate_categorie_name == name) {
        return list[k].categorie_icon
      }
    }
    return ""
  }
  function caseA(text: string) {
    var list = text.split(" "), newText = ""
    for (const k in list) {
      var word = list[k].split(""), counter = 0, newWord = ""
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
    //console.log('props.categorias', props.categorias)
  }, [props.categorias])

  return (
    <div className={FilterStyle.filter}>
      <h2 className={`${FilterStyle.title} d-none d-lg-block`}>Filtrar</h2>

      <div className={FilterStyle.categoryList}>
        <div onClick={() => props.setShow("tudo")} id={` ${FilterStyle.active} ${props.name == "tudo" ? FilterStyle.isActive : ""} `} className={`${FilterStyle.category} ${props.name == "tudo" ? FilterStyle.isActive : ""}`}>
          <span className={`${FilterStyle.listaLado} position-relative `}>
            Tudo
            <div className={FilterStyle.quantityBox}>
              <span>{props.valorTudo ? props.valorTudo : 0}</span>
            </div>
          </span>
        </div>
        {props.categorias.map((cat: Selecao) => (
          <div onClick={() => props.setShow(cat.name)} id={` ${FilterStyle.active}   `} key={Math.random()} className={`${FilterStyle.category} ${props.name == cat.name ? FilterStyle.isActive : ""}`}>
            <span className={`${FilterStyle.listaLado} position-relative `}>
              <div className={FilterStyle.asideIcon}>
                {/* <Image
                  src={
                    (getImage(cat.name)?.indexOf("https") >-1 ?getImage(cat.name) :  process.env.SMART_API+"/" +getImage(cat.name))
                    }
                
                  layout="fill"
                  objectFit="contain"
              />   */}

                <SmartImage
                  src={
                    (getImage(cat.name)?.indexOf("https") > -1 ? getImage(cat.name) : process.env.SMART_API + "/" + getImage(cat.name))
                  }

                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <span className={FilterStyle.name}>
                {caseA(cat.name)}
                <div className={FilterStyle.quantityBox}>
                  <span>{cat.items.length < 10 ? '0' : ''}{cat.items.length}</span>
                </div>
              </span>
            </span>
          </div>

        ))}



      </div>
    </div>
  );
}
