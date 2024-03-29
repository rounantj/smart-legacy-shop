import * as React from "react";

import ModalStyle from "@styles/components/modals/ModalEditarDados.module.css";

import MobileModalCloseButton from "@assets/icons/MobileModalCloseButtonLeft"

interface ModalProps {
  title?: string;
  bgColor?: String;
  modalActive?: Boolean;
  children: React.ReactNode | React.ReactNode[] | React.ReactElement | React.ReactElement[];
  onCloseClick: any;
}


export default function ModalPassword(props: ModalProps) {
  const [title, setTitle] = React.useState<string>(props.title? props.title : "")
  function setTitleDesc(name: string){
    setTitle(name)
  }
  React.useEffect(()=>{
   
  }, [title])

  return (
  <div className={ `${props.modalActive ? ModalStyle.mdActive : ''} `}>
    <div className={`${ModalStyle.modal} ${props.modalActive ? ModalStyle.modalActive : ''} ${props.bgColor === 'white' ? ModalStyle.bgWhite : ''}`}>
      <div className={`${ModalStyle.modalContent}`}>
        <button className={`${ModalStyle.btnClose} hide-mobile`} onClick={props.onCloseClick}>
          <span className={ModalStyle.btnCloseLine}></span>
          <span className={ModalStyle.btnCloseLine}></span>
        </button>

        <button className={`${ModalStyle.btnClose} d-lg-none`} onClick={props.onCloseClick}>
          <MobileModalCloseButton/> <span>{title}</span>
        </button>

        <div className={ModalStyle.children}>
          {props.children}
        </div>
      </div>
    </div>
  </div>
  );
}
