import Link from "next/link";

import styles from "@styles/components/modals/ModalMenuMobile.module.css";
import { AccordionIcon } from "@assets/icons/AccordionIcon";
import { useEffect, useState } from "react";
import { Cliente } from "@models/Cliente";
import { ajustStrigfy } from "@models/masks";

interface MenuMobileProps {
  modalActive?: boolean;
  onCloseClick: any;
  cat: any;
}

export default function ModalMenuMobile(props: MenuMobileProps) {
  const [nameLoja, setNameLoja] = useState<string>("Smartcomerci")
  const [local, setLocal] = useState<string>("Centro")
  useEffect(() => {
    let txt = localStorage.getItem("FULL_DELIVERY_DEFAULT")
    let masterIDTxt = process.env.AFFILIATE_ID
    if (txt == null) {
      txt = '[]'
    }
    if (masterIDTxt == null) {
      masterIDTxt = '0'
    }
    let FULL_DATA: any = JSON.parse(ajustStrigfy(txt))
    let masterID: number = Number(masterIDTxt)

    for (const k in FULL_DATA) {
      if (FULL_DATA[k].affiliate_id == masterID) {

        setNameLoja(FULL_DATA[k].affiliates_business_name)
        setLocal(FULL_DATA[k].affiliates_business_endereco)
      }
    }
  }, [])

  useEffect(() => {


  }, [nameLoja])


  function closeThis() {
    //teste
    props.cat()
    props.onCloseClick()
  }
  return (
    <div
      className={`d-lg-none ${styles.modalMenuMobile} ${props.modalActive ? styles.active : ""
        } `}
    >
      <div className={styles.container}>
        <button className={styles.closeButton} onClick={props.onCloseClick}>
          <span className={styles.closeButtonIcon}></span> Menu
        </button>

        <button className={styles.btnRetirar}>
          <div className={styles.btnRetirarContent}>
            <span className={styles.btnRetirarTitle}>Comprando em</span>
            <span className={styles.btnRetirarText}>
              {nameLoja} - {local}
            </span>
          </div>

          <div className={styles.btnRetirarIcon}></div>
        </button>

        <div className={styles.menuList}>
          <button onClick={() => closeThis()} className={styles.menuItem}>
            <div>Categorias</div>

            <i className={styles.menuItemIcon}>
              <AccordionIcon />
            </i>
          </button>

          <Link passHref href={"/promocoes"}>
            <span className={`${styles.menuItem}  oculta`}>
              <div>
                Promoções <span className={styles.menuItemCounter}>429</span>
              </div>

              <i className={styles.menuItemIcon}>
                <AccordionIcon />
              </i>
            </span>
          </Link>

          <Link passHref href={"/receitas"}>
            <span className={`${styles.menuItem}  oculta`}>
              <div>Receitas</div>

              <i className={styles.menuItemIcon}>
                <AccordionIcon />
              </i>
            </span>
          </Link>

          <Link passHref href={"/assinatura"}>
            <span className={`${styles.menuItem}  oculta`}>
              <div>Assinatura</div>

              <i className={styles.menuItemIcon}>
                <AccordionIcon />
              </i>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
