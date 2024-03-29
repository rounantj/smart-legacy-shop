import footerStyle from "@styles/components/Footer.module.css";

import Link from "next/link";

import LogoMercadoOnline from "@assets/images/MercadoOnline";
import Button from "@components/Buttons/Button";
import WhatsappIcon from "@assets/icons/Whatsapp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import LogoBranco2 from "@components/Logos/LogoBranco2";
import { useEffect, useState } from "react";
import { ajustStrigfy } from "@models/masks";
import { useTodo } from "src/hooks/useTodo";
import SmartImage from "@components/SmartImage";


function Footer() {
  let masterId1 = process.env.MASTER_ID;
  let affiliateId1 = process.env.AFFILIATE_ID;
  type optionM = {
    text?: string,
    link?: string
  }
  type menu = {
    title: optionM,
    items: optionM[]
  }

  const [footerMenu, setFooterMenu] = useState<menu[]>([])

  const MASTER_ID = Number(masterId1)
  const AFFILIATE_ID = Number(affiliateId1)
  const [affiliateId, setAffiliateId] = useState<number>(AFFILIATE_ID);
  const [masterId, setMasterId] = useState<number>(MASTER_ID);
  const { tasks, getAll } = useTodo(affiliateId, masterId);
  const [contactData, setContactData] = useState<string>("")
  const [textoLado, setTextoLado] = useState<string>("")
  const [textoLegal, setTextoLegal] = useState<string>("")
  const [linkWpp, setLinkWpp] = useState<string>("")
  const [isToShowAll, setIsToShowAll] = useState<boolean>(false)


  useEffect(() => {
    let txt = localStorage.getItem("FULL_DELIVERY_DEFAULT")
    if (!txt || txt == null) { txt = '[]' }

    let FULL_DATA: any = JSON.parse(ajustStrigfy(txt))
    let affID = AFFILIATE_ID
    let ESSA_LOJA: any;
    for (const k in FULL_DATA) {
      if (FULL_DATA[k].affiliate_id == AFFILIATE_ID) {
        ESSA_LOJA = FULL_DATA[k]
      }
    }

    //  console.log("ESSA_LOJA", ESSA_LOJA)


    localStorage.setItem("MY_DELIVERY_AREA", ESSA_LOJA.faixa_cep_values)

    if (ESSA_LOJA) {
      try {
        let homePage: any = JSON.parse(ESSA_LOJA.home_main_info)
        // console.log('homePage 3', homePage)
        //console.log('first', homePage.footerLinks.firstColumnTittle)
        //console.log('second', homePage.footerLinks.secondColumnTittle)
        //console.log('third', homePage.footerLinks.thirdColumnTittle)
        const myMenu: menu[] = []
        let mMenu: menu = {} as menu
        mMenu.items = []
        mMenu.title = homePage.footerLinks.firstColumnTittle.text
        for (const k in homePage.footerLinks.firstColumn) {
          mMenu.items.push(homePage.footerLinks.firstColumn[k])
        }
        myMenu.push(mMenu)
        let mMenu1: menu = {} as menu
        mMenu1.items = []
        mMenu1.title = homePage.footerLinks.secondColumnTittle.text
        for (const k in homePage.footerLinks.secondColumn) {
          mMenu1.items.push(homePage.footerLinks.secondColumn[k])
        }
        myMenu.push(mMenu1)
        let mMenu2: menu = {} as menu
        mMenu2.items = []
        mMenu2.title = homePage.footerLinks.thirdColumnTittle.text
        for (const k in homePage.footerLinks.thirdColumn) {
          mMenu2.items.push(homePage.footerLinks.thirdColumn[k])
        }
        myMenu.push(mMenu2)

        setContactData(homePage.footerLinks.contactData.text)
        setTextoLado(homePage.footerText.text)
        setTextoLegal(homePage.legalText.text)
        setLinkWpp(homePage.whatsapp.link)
        setFooterMenu(myMenu)
      } catch (err) {
        //console.log("erro footer menu", err)
      }

    } else {

      try {
        let homePage: any = JSON.parse(FULL_DATA[0].home_main_info)
        //  console.log('homePage 3', homePage)
        //console.log('first', homePage.footerLinks.firstColumnTittle)
        //console.log('second', homePage.footerLinks.secondColumnTittle)
        //console.log('third', homePage.footerLinks.thirdColumnTittle)
        const myMenu: menu[] = []
        let mMenu: menu = {} as menu
        mMenu.items = []
        mMenu.title = homePage.footerLinks.firstColumnTittle.text
        for (const k in homePage.footerLinks.firstColumn) {
          mMenu.items.push(homePage.footerLinks.firstColumn[k])
        }
        myMenu.push(mMenu)
        let mMenu1: menu = {} as menu
        mMenu1.items = []
        mMenu1.title = homePage.footerLinks.secondColumnTittle.text
        for (const k in homePage.footerLinks.secondColumn) {
          mMenu1.items.push(homePage.footerLinks.secondColumn[k])
        }
        myMenu.push(mMenu1)
        let mMenu2: menu = {} as menu
        mMenu2.items = []
        mMenu2.title = homePage.footerLinks.thirdColumnTittle.text
        for (const k in homePage.footerLinks.thirdColumn) {
          mMenu2.items.push(homePage.footerLinks.thirdColumn[k])
        }
        myMenu.push(mMenu2)

        setContactData(homePage.footerLinks.contactData.text)
        setTextoLado(homePage.footerText.text)
        setTextoLegal(homePage.legalText.text)
        setFooterMenu(myMenu)
      } catch (err) {
        //console.log("erro footer menu", err)
      }
    }


  }, [])

  useEffect(() => {
    //console.log('footerMenu', footerMenu)
  }, [footerMenu])

  return (
    <footer className={footerStyle.footer}>
      <section className={footerStyle.banner}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-lg-4">

            </div>
            <div className="col-12 col-lg-4 d-flex justify-content-center">
              <h2 className={footerStyle.bannerTitle}>
                Tem alguma dúvida? <br />
                <span className="dark-green">Fale pelo Whatsapp</span>
              </h2>
            </div>
            <div className="col-12 col-lg-4 d-flex justify-content-center">
              <a target={"_blank"} href={linkWpp} rel="noreferrer">
                <Button id={footerStyle.btn}>
                  <WhatsappIcon /> Fale Conosco
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className={footerStyle.institucional}>
        <div className="container">
          <div className={footerStyle.containerMenus}>
            <div className="row">
              {
                footerMenu.map((ft) => (
                  <div key={Math.random()} className="col-12 col-sm-6 col-lg-3">
                    <nav className={footerStyle.menu}>
                      <h3 className={footerStyle.menuTitle}>{ft.title}</h3>

                      <ul>
                        {
                          ft.items.map((i) => (
                            <li key={Math.random()}>
                              <Link href={i.link ?? "#"} passHref>
                                <span>{i.text}</span>
                              </Link>
                            </li>
                          ))
                        }


                      </ul>
                    </nav>
                  </div>
                ))
              }


              {/* <div className="col-12 col-sm-6 col-lg-3">
                <nav className={footerStyle.menu}>
                  <h3 className={footerStyle.menuTitle}>Ajuda</h3>
                  <ul>
                    <li>
                      <Link href="/institucional/como-funciona" passHref>
                        <a>Como Comprar</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/institucional/como-funciona" passHref>
                        <a>Como funciona a Entrega</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/institucional/como-funciona" passHref>
                        <a>Troca e Devolução</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/institucional/politicas-privacidade" passHref>
                        <a>Política de Privacidade</a>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>

              <div style={{ display: 'none' }} className="col-12 col-sm-6 col-lg-3">
                <nav className={footerStyle.menu}>
                  <h3 className={footerStyle.menuTitle}>Empresa</h3>
                  <ul className="oculta">
                    <li>
                      <Link href="#" passHref>
                        <a>Lorem ipsum sit</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="#" passHref>
                        <a>Social</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="#" passHref>
                        <a>Blog SmartComerci</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="#" passHref>
                        <a>Lorem ipsum sit</a>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div> */}

              <div className="col-12 col-sm-6 col-lg-3">
                <nav className={footerStyle.menu}>
                  <h3 className={footerStyle.menuTitle}>Contato</h3>
                  <div
                    className="content"
                    dangerouslySetInnerHTML={{ __html: contactData }}
                  />



                  {/* <ul>


                    <li>SAC: (11) 4161-8448</li>
                    <li>De segunda a sexta das 08h às 18h</li>
                    <li>Aos sábados das 08h às 17h</li>
                    <li>* Para horários em Feriados, por favor, consulte nossas redes sociais.</li>
                  </ul> */}
                </nav>
              </div>
            </div>
          </div>

          <div className={footerStyle.mainContent}>
            <div className={footerStyle.mercadoOnline}>
              <div className={footerStyle.mercadoOnlineLogo}>
                <LogoBranco2 />
              </div>
              <div className={footerStyle.mercadoOnlineText}>
                <div
                  className="content"
                  dangerouslySetInnerHTML={{ __html: textoLado }}
                />
              </div>
            </div>

            <div className={`${footerStyle.socialContent} oculta`}>
              <div className={footerStyle.socialShare}>

              </div>

              <div className={footerStyle.downloadMobile}>
                Baixe o aplicativo

                <div className={footerStyle.apps}>
                  <div className={footerStyle.boxImg}>
                    <a href="#" target="_blank">
                      <SmartImage
                        src="/images/appstore.png"
                        layout="fill"
                        objectFit="contain"
                      />
                    </a>
                  </div>
                  <div className={footerStyle.boxImg}>
                    <a href="#" target="_blank">
                      <SmartImage
                        src="/images/googleplay.png"
                        layout="fill"
                        objectFit="contain"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={footerStyle.paymentMethods}>
            Formas de pagamento
            <SmartImage
              src="/images/formas-de-pagamento.png"
              width={572}
              height={34} objectFit={"contain"} layout={"responsive"} />
          </div>
        </div>
      </section >

      <section className={footerStyle.comunicado}>
        <div className="container">

          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: textoLegal }}
          />
        </div>
      </section>

      <section className={footerStyle.copyright}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-md-8">
              Copyright © Smartcomerci
            </div>

            <div className={`col-12 col-md-4 ${footerStyle.logo}`}>
              <h3>Uma tecnologia</h3>
              <SmartImage src="/images/logo-light.png" width={206} height={43} objectFit={"contain"} layout={"responsive"} />
            </div>
          </div>
        </div>
      </section>

    </footer >
  );
}

Footer.defaultProps = {};

export default Footer;
