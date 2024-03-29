import * as React from "react";

import ModalStyle from "@styles/components/modals/Modal.module.css";

import MobileModalCloseButton from "@assets/icons/MobileModalCloseButtonLeft"
import ArrowDown from "@assets/icons/ArrowDown";

interface ModalProps {
  title?: string;
  bgColor?: String;
  modalActive?: Boolean;
  children: React.ReactNode | React.ReactNode[] | React.ReactElement | React.ReactElement[];
  onCloseClick: any;
}


export default function Modal(props: ModalProps) {
  const [title, setTitle] = React.useState<string>(props.title ? props.title : "")
  function setTitleDesc(name: string) {
    setTitle(name)
  }
  React.useEffect(() => {
    
  }, [title])

  const contentRef = React.useRef<any>(null);

  React.useEffect(() => {
    const clickOutside = (e: any) => {
      if (props.modalActive && contentRef.current && !contentRef.current.contains(e.target)) {
        props.onCloseClick();
      }
    }

    document.addEventListener("mousedown", clickOutside)

    return () => {
      document.removeEventListener("mousedown", clickOutside)
    }
   
  }, [props.modalActive])
 

  return (
    <div className={`${props.modalActive ? ModalStyle.mdActive : ''} `}>
      <div ref={contentRef} className={`${ModalStyle.modal} ${props.modalActive ? ModalStyle.modalActive : ''} ${props.bgColor === 'white' ? ModalStyle.bgWhite : ''}`}>
        <div className={`${ModalStyle.modalContent}`}>
          <button className={`${ModalStyle.btnClose} hide-mobile`} onClick={props.onCloseClick}>
            <span className={ModalStyle.btnCloseLine}></span>
            <span className={ModalStyle.btnCloseLine}></span>
          </button>

          {title && (
            <button className={`${ModalStyle.btnClose} d-lg-none`} onClick={props.onCloseClick}>
              <MobileModalCloseButton /> <span>{title}</span>
            </button>
          )}

          {props.children}
        </div>
      </div>
    </div>
  );
}
