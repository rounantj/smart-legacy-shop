import * as React from "react";

import ModalStyle from "@styles/components/modals/Modal.module.css";
import styles from "@styles/components/modals/ModalOrderBy.module.css";

import MobileModalCloseButton from "@assets/icons/MobileModalCloseButtonLeft";

interface ModalProps {
  title?: string;
  bgColor?: String;
  modalActive?: Boolean;
  onCloseClick: any;
}

export default function ModalOrderBy(props: ModalProps) {
  return (
    <div className={`${styles.modal} ${props.modalActive ? styles.active : ""} `}>
      <div className={`${styles.modalContent}`}>
        {props.title && (
          <button
            className={`${ModalStyle.btnClose} d-lg-none`}
            onClick={props.onCloseClick}
          >
            <MobileModalCloseButton /> <span>{props.title}</span>
          </button>
        )}

        <div className={styles.list}>
   
          <button className={styles.item}>Menor Preço</button>
          <button className={styles.item}>Maior Preço</button>
          <button className={styles.item}>Nome A-Z</button>
          <button className={styles.item}>Nome Z-A</button>
        </div>
      </div>
    </div>
  );
}
