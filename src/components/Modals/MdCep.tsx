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
  disableClickOut?: any;
}


export default function MdCep(props: ModalProps) {
  const [title, setTitle] = React.useState<string>(props.title ? props.title : "")
  const [isUnique, setIsUnique] = React.useState<string>("0")
  function setTitleDesc(name: string) {
    setTitle(name)
  }
  React.useEffect(() => {
    
    let txt = localStorage.getItem("cart_without_account")
    if(txt == null){txt = '0'}
    setIsUnique(txt)
  }, [title])

  React.useEffect(() =>{
   
  }, [isUnique])

  const contentRef = React.useRef<any>(null);

  React.useEffect(() => {
    const clickOutside = (e: any) => {
      if (!props.disableClickOut && props.modalActive && contentRef.current && !contentRef.current.contains(e.target)) {
       // props.onCloseClick();
      }
    }

    document.addEventListener("mousedown", clickOutside)

    return () => {
     // document.removeEventListener("mousedown", clickOutside)
    }

  }, [props.modalActive])


  return (
    <div className={`${props.modalActive ? ModalStyle.mdActive : ''} `}>
      <div  className={`${ModalStyle.modal} ${props.modalActive ? ModalStyle.modalActive : ''} ${props.bgColor === 'white' ? ModalStyle.bgWhite : ''} `}>
        <div className={`${ModalStyle.modalContent}`}>
 
          
         
            <button className={`${ModalStyle.btnClose} d-lg-none`} onClick={props.onCloseClick}>
              <MobileModalCloseButton />  
            </button>
         

          {props.children}
        </div>
      </div>
    </div>
  );
}
