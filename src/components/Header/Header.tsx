import { useEffect, useState, useMemo, useContext } from "react";
import Link from "next/link";
import PropTypes from "prop-types";

import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import LogoBranco from "@components/Logos/LogoBranco";
import Button from "@components/Buttons/Button";
import SearchBar from "@components/Inputs/SearchBar";
import Modal from "@components/Modals/Modal";
import ModalCarrinho from "@components/Modals/ModalCarrinho";
import ModalProduct from "@components/Modals/ModalProduct";
import BoxUserAccount from "@components/Modals/UserAccount/BoxUserAccount";

import UsersIcon from "@assets/icons/Users";
import HomeIcon from "@assets/icons/Home";
import CategoryIcon from "@assets/icons/Category";
import SearchIcon from "@assets/icons/Search";
import ListIcon from "@assets/icons/List";
import FrutasIcon from "@assets/icons/Categorias/Frutas";

import headerStyle from "@styles/components/Header.module.css";
import React from "react";

import { Api } from "@components/providers";

import { Cart } from "@models/Cart";
import CartIcon from "@assets/icons/CartIcon";
import { ProductOrder } from "@models/ProductOrder";
import CarrinhoIcon from "@assets/icons/CarrinhoIcon";
import ModalListas from "@components/Modals/ModaListas";
import ModalAssinatura from "@components/Modals/ModalAssinatura";
import ModalCEP_VIEW from "@components/Modals/ModalCEP";
import SelectBox from "@components/Inputs/Select";
import ModalSearchProductContent from "@components/Modals/ModalSearchProduct";
import CategoryList from "@components/Modals/CategoriesContent/CategoryList";
import { Categorie } from "@models/Categorie";
import { useTodo } from "src/hooks/useTodo";
import Image from "next/image";
import ModalSubCategories from "@components/Modals/ModalSubcategories";
import ModalCookie from "@components/Modals/ModalCookie";
import ModalMenuMobile from "@components/Modals/ModalMenuMobile";
import SmartImage from "@components/SmartImage";
import { ajustStrigfy } from "@models/masks";
import { AppContext } from "src/pages/_app";

interface CARTS {
  cart: Cart;
  produtos: any;
  increase: any;
  decrease: any;
  remove: any;
  valorTotal: number;
  total: number;
  detail: any;
  update: any;
  noCarrinho: any;
}

function Header(props: CARTS) {
  const {
    produtos,
    valorTotal
  } = props;

  const {
    showLists,
    setShowLists
  } = useContext(AppContext);


  const [modalMenuMobile, setModalMenuMobile] = useState(false);
  const [modalLogin, setmodalLogin] = useState(false);
  const [carrinhoModal, setCarrinhoModal] = useState(false);
  const [modalProduct, setModalProduct] = useState(false);
  const [modalCEP, setModalCEP] = useState(false);
  const [modalSearch, setModalSearch] = useState(false);
  const [modalCategories, setModalCategories] = useState(false);
  const [listShow, setListShow] = useState(true);
  const [affiliateId, setAffiliateId] = useState<number>(0)
  const [masterId, setMasterId] = useState<number>(0)
  const [aumentando, setAumentando] = useState<boolean>(false)
  const { tasks, getAll } = useTodo(affiliateId, masterId);


  let TOP: number = 0


  function handleScroll() {
    // console.log(document.documentElement.scrollTop)
    if (TOP > document.documentElement.scrollTop) {
      //console.log('reduzindo...')
      setAumentando(false)
    } else {
      //  console.log('aumentando...')
      setAumentando(true)
    }
    TOP = document.documentElement.scrollTop

  }

  function componentDidMount() {
    window.onscroll = () => handleScroll()
  }



  useEffect(() => {
    componentDidMount()
    var AFFILIATE_ID: number = Number(localStorage.getItem('AFFILIATE_ID'))
    var MASTER_ID: number = Number(localStorage.getItem('MASTER_ID'))
    setAffiliateId(AFFILIATE_ID)
    setMasterId(MASTER_ID)
    getAll(AFFILIATE_ID, MASTER_ID);
    localStorage.setItem("ALL_CATEGORIES", JSON.stringify(tasks))


    var listShowView = localStorage.getItem("listShow")
    if (listShowView == null || listShowView == "0") {
      setListShow(false)
    } else {
      setListShow(true)
    }
  }, [getAll])

  useEffect(() => {

    localStorage.setItem("ALL_CATEGORIES", JSON.stringify(tasks))

  }, [tasks])

  const [modalListas, setModalListas] = useState(false);
  const [modalAssinatura, setModalAssinatura] = useState(false);

  function triggerModal() {
    document.body.style.overflow = "auto"

    setmodalLogin(!modalLogin);
  }

  function triggerCarrinhoModal() {
    setCarrinhoModal(!carrinhoModal);
  }

  function triggerModalProduct() {

    setModalProduct(!modalProduct);

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


  function triggerModalCEP() {
    setModalCEP(!modalCEP);
  }

  function triggerModalListas() {
    setShowLists(!showLists)
    //setModalListas(!modalListas);
  }

  function triggerModalAssinatura() {

    setModalAssinatura(!modalAssinatura);
  }
  function triggerModalSearch() {
    setModalSearch(!modalSearch);
  }

  function triggerModalCategories() {

    setModalCategories(!modalCategories);
  }

  function triggerModalMenuMobile() {
    setModalMenuMobile(!modalMenuMobile);
  }
  function desktop(val: boolean) {

  }

  const [cookie, setCookie] = useState<boolean>(false)
  useEffect(() => {
    var cok = localStorage.getItem("cookieAccept")
    if (cok != null) {
      setCookie(true)
    }

  }, [cookie])

  const [isLogged, setIsLogged] = useState<boolean>(false)
  useEffect(() => {
    let affID = process.env.AFFILIATE_ID, msId = process.env.MASTER_ID
    let user = localStorage.getItem("USER")

    if (!user || user === null) {
      user = '[]'
    }
    let USER: any = JSON.parse(ajustStrigfy(user))
    let clientId = 0
    if (USER) {
      clientId = USER.id
      setIsLogged(true)
    }

    if (showLists) {
      setModalListas(showLists)
    }




  }, [])

  useEffect(() => {
    // console.log("mudaou lists", showLists)
    if (showLists) {
      setModalListas(showLists)
    }
  }, [showLists])

  return (
    <header className={headerStyle.header}>
      {/* Versão Desktop */}
      <div className="d-none d-lg-block">
        <div className="container-fluid">
          <div className={`${headerStyle.headerContent} headerContent`}>
            <Link href="/" passHref>
              <span className={headerStyle.logo}>
                <LogoBranco />
              </span>
            </Link>

            <SelectBox
            />


            <div className={headerStyle.headerSearch23}>
              <SearchBar
                increase={props.increase}
                decrease={props.decrease}
                noCarrinho={props.noCarrinho}
                mobileSearch={desktop}
              />
            </div>


            {
              isLogged ?

                <Button onClick={triggerModalListas} id={headerStyle.btn}>
                  <ListIcon />
                  Lista
                </Button>
                :
                <div className="oculta"></div>
            }


            <Link href="/minha-conta" passHref>
              <Button id={headerStyle.btn}>
                <UsersIcon fill="#fff" />
                Conta
              </Button>
            </Link>
            {/*}
            <div className={headerStyle.barraEntrega}>
              <p className={headerStyle.textoEntrega}>
                Entrega gratis a partir de R$ 200,00
              </p>
              <div className={headerStyle.areaEntrega}>
                <div
                  style={gratis(valorTotal)}
                  className={headerStyle.conteudoEntrega}
                ></div>
              </div>
            </div>
            */}
            <div
              onClick={triggerCarrinhoModal}
              className={`${headerStyle.areaCarrinho} abreModalCarrinho`}
            >
              <CarrinhoIcon />{" "}
              <span className={headerStyle.bolaItems}>
                {("00" + produtos.length).slice(-2)}
              </span>{" "}
              &nbsp; &nbsp;R${" "}
              <span>{valorTotal.toFixed(2).replace(".", ",")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Versão Mobile */}
      <div className="d-lg-none">
        <div
          className={`${headerStyle.headerContent} ${headerStyle.mobileContent}`}
        >
          <button className={headerStyle.menuHamburguer} onClick={triggerModalMenuMobile}>
            <div className={headerStyle.icon}>
              <div className={headerStyle.line}></div>
              <div className={headerStyle.line}></div>
              <div className={headerStyle.line}></div>
            </div>
          </button>

          <div className={headerStyle.boxLogo}>
            <Link href="/" passHref>
              <span className={headerStyle.logo}>
                <LogoBranco />
              </span>
            </Link>
          </div>

          <div className={headerStyle.whiteSpace}></div>
        </div>

        <div className="container-fluid">


          <div className={headerStyle.searchBar}>
            <SearchBar
              increase={props.increase}
              decrease={props.decrease}
              noCarrinho={props.noCarrinho}
              mobileSearch={triggerModalSearch}
            />
          </div>

          {listShow ?
            <div className={headerStyle.categories} dir="ltr">
              {tasks.map((cat) => (
                cat.affiliate_sub_categorie_status == 1 ?
                  <Link key={Math.random()} passHref={false} href={`../../../c/${cat.affiliate_categorie_name}`}>
                    <span className={headerStyle.category}>
                      <i className={`${headerStyle.categoryIcon} ${headerStyle.asideIcon}`}>

                        <SmartImage
                          src={

                            (process.env.URL_IMAGES + "/" + cat.categorie_icon)
                          }
                          layout="fill"
                          objectFit="contain"
                        />


                      </i>
                      {caseA(cat.affiliate_categorie_name)}
                    </span>
                  </Link>
                  :
                  <div key={Math.random()}></div>
              ))}



            </div>

            :
            <div className="oculta"></div>
          }


        </div>

        <div className={`${headerStyle.headerBottom} ${aumentando ? 'oculta' : ''}`}>
          <div className={headerStyle.boxCarrinho}>
            <div className={`container ${headerStyle.boxCarrinhoContainer}`}>
              <div
                className={headerStyle.cartInfo}
                onClick={triggerCarrinhoModal}
              >
                <CarrinhoIcon />
                <span className={headerStyle.bolaItems}>
                  {("00" + produtos.length).slice(-2)}
                </span>{" "}
                &nbsp; &nbsp;R${" "}
                <span>{valorTotal.toFixed(2).replace(".", ",")}</span>
              </div>

              <Button
                onClick={triggerCarrinhoModal}
                className={headerStyle.boxCarrinhoButton}
              >
                Ver carrinho
              </Button>
            </div>
          </div>

          <div className={headerStyle.boxMenu}>
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
                  onClick={triggerModalCategories}
                >
                  <i className={headerStyle.menuIcon}>
                    <CategoryIcon />
                  </i>
                  Categorias
                </div>

                <div
                  className={headerStyle.menuItem}
                  onClick={triggerModalSearch}
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
                      <UsersIcon fill="#687c97" />
                    </i>
                    Perfil
                  </span>
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <ModalMenuMobile modalActive={modalMenuMobile} cat={triggerModalCategories} onCloseClick={triggerModalMenuMobile} />

      <Modal modalActive={modalLogin} onCloseClick={triggerModal}>
        <BoxUserAccount oncloseClick={triggerModal} />
      </Modal>

      <ModalCarrinho
        update={props.update}
        increase={props.increase}
        decrease={props.decrease}
        remove={props.remove}
        modalActive={carrinhoModal}
        cart={props.cart}
        produtos={produtos}
        details={props.detail}
        total={valorTotal}
        fecha={triggerCarrinhoModal}
        onCloseClick={triggerCarrinhoModal}
      />

      <Modal
        modalActive={modalProduct}
        onCloseClick={triggerModalProduct}
        bgColor="white"
      > </Modal>

      <ModalAssinatura
        modalActive={modalAssinatura}
        onCloseClick={triggerModalAssinatura}
      />

      <ModalListas
        modalActive={showLists}
        onCloseClick={triggerModalListas}
      />
      {cookie == false ? <ModalCookie /> : <div></div>}


      <ModalCEP_VIEW disableClickOut={true} modalActive={modalCEP} onCloseClick={triggerModalCEP} />


      <Modal
        title="Buscar produto"
        modalActive={modalSearch}
        onCloseClick={triggerModalSearch}
      >
        <ModalSearchProductContent
          modalActive={modalSearch}
          noCarrinho={props.noCarrinho}
          increase={props.increase}
          decrease={props.decrease}
        />
      </Modal>

      <ModalSubCategories
        title="Categorias"
        modalActive={modalCategories}
        modalCategorie={triggerModalCategories}
        modalSearch={triggerModalSearch}
        onCloseClick={triggerModalCategories}
      />
      {/*

   <Modal
        title="Categorias"
        modalActive={modalCategories}
        onCloseClick={triggerModalCategories}
      >
        <div className="container">
          <CategoryList title="Categorias" setTitle={undefined} type="cat"/>
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
                  onClick={triggerModalCategories}
                >
                  <i className={headerStyle.menuIcon}>
                    <CategoryIcon />
                  </i>
                  Categorias
                </div>

                <div
                  className={headerStyle.menuItem}
                  onClick={triggerModalSearch}
                >
                  <i
                    className={`${headerStyle.menuIcon} ${headerStyle.menuIconSearch}`}
                  >
                    <SearchIcon />
                  </i>
                  Busca
                </div>

                <Link href={"/"} passHref>
                  <span className={headerStyle.menuItem}>
                    <i className={headerStyle.menuIcon}>
                      <UsersIcon fill="#fff"/>
                    </i>
                    Perfil
                  </span>
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </Modal>

*/}



    </header>
  );
}

//Header.defaultProps = {};

export default Header;
