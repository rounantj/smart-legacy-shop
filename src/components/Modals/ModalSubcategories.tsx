import * as React from "react";

import HomeIcon from "@assets/icons/Home";
import CategoryIcon from "@assets/icons/Category";
import SearchIcon from "@assets/icons/Search";
import ListIcon from "@assets/icons/List";
import FrutasIcon from "@assets/icons/Categorias/Frutas";
import ModalStyle from "@styles/components/modals/Modal.module.css";
import headerStyle from "@styles/components/Header.module.css";
import MobileModalCloseButton from "@assets/icons/MobileModalCloseButtonLeft"
import UsersIcon from "@assets/icons/Users";
import Link from "next/link";
import CategoryList from "./CategoriesContent/CategoryList";
import { Categorie } from "@models/Categorie";
import { SubCategories } from "@models/SubCategories";
import { Api } from "@components/providers";
import { ajustStrigfy } from "@models/masks";

interface ModalProps {
  title?: string;
  bgColor?: String;
  modalActive?: Boolean;
  modalSearch: any,
  modalCategorie: any,
  onCloseClick: any;
}


export default function ModalSubCategories(props: ModalProps) {
  const [title, setTitle] = React.useState<string>(props.title ? props.title : "")
  const [type, setType] = React.useState<string>("cat")
  function setTitleDesc(name: string) {
    setTitle(name)
  }

  const [categorias, setCategorias] = React.useState<Categorie[]>([])
  const [subCategorias, setSubCategorias] = React.useState<SubCategories[]>([])
  const [categorieTitle, setCategorieTitle] = React.useState<string>('')

  const [isCategorie, setIsCategorie] = React.useState<boolean>(true)




  React.useEffect(() => {

    // var AFFILIATE_ID = localStorage.getItem("AFFILIATE_ID")
    // var MASTER_ID = localStorage.getItem("MASTER_ID")

    var AFFILIATE_ID = process.env.AFFILIATE_ID
    var MASTER_ID = process.env.MASTER_ID



    Api.post(
      "/getCatList",
      {
        affiliate_id: AFFILIATE_ID,
        master_id: MASTER_ID,
        limit: 999
      }
    )
      .then((response) => {

        setCategorias(response.data)
        localStorage.setItem("CATEGORIES_INFO", JSON.stringify(response.data))
        if (type == "sub") {
          setIsCategorie(false)
          showSubCategories(title)
        } else {
          setIsCategorie(true)
        }

      })
      .catch((error) => {


      });
  }, [])
  React.useEffect(() => {

  }, [subCategorias])

  React.useEffect(() => {

  }, [categorias])

  React.useEffect(() => {


  }, [isCategorie])



  function cons() {

  }


  React.useEffect(() => {

  }, [])

  React.useEffect(() => {



  }, [type, subCategorias])


  function mudaTipo(name: string) {
    setType(name)
  }

  function fechaModal() {
    if (type == 'cat') {

      props.onCloseClick()
    } else {

      setTitle("Categorias")
      setType("cat")
    }
  }
  function showSubCategories(categoria: string) {

    var verCategoria: SubCategories[] = []
    for (const k in categorias) {
      if (categoria == categorias[k].affiliate_categorie_name) {
        let dados = JSON.parse(ajustStrigfy(categorias[k].affiliate_categorie_status))
        for (const a in dados) {
          verCategoria.push(
            {
              affiliate_categorie_name: dados[a].subCategoria,
              affiliate_categorie_status: dados[a].status,
              affiliate_id: 96,
              affiliate_master_id: 2,
              affiliate_sub_categorie_name: dados[a].subCategoria,
              affiliate_sub_categorie_status: dados[a].status,
              categoria: categoria,
              categorie_description: '',
              categorie_icon: categorias[k].categorie_icon,
              categorie_key_words: '',
              categorie_title: categoria,
              createdAt: '',
              subcategorie_banners: dados[a]?.banners,
              id: a,
              subCategorias: '',
              updatedAt: '',
            }
          )
        }


      }
    }
    setTitle(categoria)
    setSubCategorias(verCategoria)
    setType("sub")
    setIsCategorie(false)

  }


  return (
    <div className={`${props.modalActive ? ModalStyle.mdActive : ''} `}>
      <div className={`${ModalStyle.modal} ${props.modalActive ? ModalStyle.modalActive : ''} ${props.bgColor === 'white' ? ModalStyle.bgWhite : ''}`}>
        <div className={`${ModalStyle.modalContent}`}>
          <button className={`${ModalStyle.btnClose} hide-mobile`} onClick={props.onCloseClick}>
            <span className={ModalStyle.btnCloseLine}></span>
            <span className={ModalStyle.btnCloseLine}></span>
          </button>

          <button className={`${ModalStyle.btnClose} d-lg-none`} onClick={fechaModal}>
            <MobileModalCloseButton /> <span>{title}</span>
          </button>

          <div className="container">
            {type == "cat" ?
              <CategoryList showSubCategories={showSubCategories} categorias={categorias} isCategorie={true} type={type} setType={mudaTipo} setTitle={setTitleDesc} title={title} />
              :
              <CategoryList showSubCategories={showSubCategories} categorias={subCategorias} isCategorie={false} type={type} setType={mudaTipo} setTitle={setTitleDesc} title={title} />
            }

          </div>

          <div className={headerStyle.headerBottom}>
            <div className={`${headerStyle.boxMenu} ${headerStyle.shadow}`}>
              <div className="container">
                <nav className={headerStyle.menu}>
                  <Link href={"/"} passHref>
                    <span className={headerStyle.menuItem}>
                      <i
                        className={` ${headerStyle.menuIcon} ${headerStyle.active}`}
                      >
                        <HomeIcon />
                      </i>
                      Home
                    </span>
                  </Link>

                  <div
                    className={headerStyle.menuItem}
                    onClick={props.modalCategorie}
                  >
                    <i className={headerStyle.menuIcon}>
                      <CategoryIcon />
                    </i>
                    Categorias
                  </div>

                  <div
                    className={headerStyle.menuItem}
                    onClick={props.modalSearch}
                  >
                    <i
                      className={`${headerStyle.menuIcon} ${headerStyle.menuIconSearch}`}
                    >
                      <SearchIcon />
                    </i>
                    Busca
                  </div>

                  <Link href={"/minha-conta"} passHref>
                    <span className={headerStyle.menuItem}>
                      <i className={headerStyle.menuIcon}>
                        <UsersIcon fill="#fff" />
                      </i>
                      Perfil
                    </span>
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
