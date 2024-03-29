import Category from "@components/Modals/CategoriesContent/Category";
import { Categorie } from "@models/Categorie";
import { SubCategories } from "@models/SubCategories";
import UsersIcon from "@assets/icons/Users";
import HomeIcon from "@assets/icons/Home";
import CategoryIcon from "@assets/icons/Category";
import SearchIcon from "@assets/icons/Search";
import ListIcon from "@assets/icons/List";
import FrutasIcon from "@assets/icons/Categorias/Frutas";
import styles from "@styles/components/modals/CategoryContent/CategoryList.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Api } from "src/providers";
import Modal from "../Modal";
import headerStyle from "@styles/components/Header.module.css";

interface TT {
  title: string,
  setTitle: any,
  type: string,
  setType: any,
  categorias: Categorie[] | SubCategories[],
  isCategorie: boolean,
  showSubCategories: any
}

export default function CategoryList(props: TT) {





  useEffect(() => {

  }, [])


  function cons() {

  }


  return (
    <div className={styles.categoryList}>
      {props.isCategorie ?
        props.categorias.map((cat) => (

          cat.affiliate_sub_categorie_status == 1 ?

            <Category
              type={props.type}

              key={cat.id}
              triggerModal={props.showSubCategories}
              categoria={cat}
            />



            :
            <div key={Math.random()} className="none"></div>




        ))
        :
        props.categorias.map((cat) => (

          cat.affiliate_categorie_status == 1 ?

            <Category
              type={props.type}
              key={cat.id}
              triggerModal={cons}
              categoria={cat}
            />



            :
            <div key={Math.random()} className="none"></div>




        ))

      }



    </div>

  );
}
