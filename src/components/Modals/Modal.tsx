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


export default function Modal(props: ModalProps) {
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
        fecharModal();
      }
    }

    document.addEventListener("mousedown", clickOutside)
    window.document.getElementById('scrollTop')?.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});

    return () => {
      document.removeEventListener("mousedown", clickOutside)
    }

   
    
   
  }, [props.modalActive])

  function fecharModal(){
     //console.log('adicionando floow')
     document.body.style.overflow = "auto" 
     props.onCloseClick()
}


React.useEffect(() =>{
  //console.log('as propsssssssss',props.modalActive)
  if(props.modalActive === true){
    //console.log('remvoendo floow de nvoo')
    document.body.style.overflow = "hidden"
  } 
},[props.modalActive])



  return (
    <div className={`${props.modalActive ? ModalStyle.mdActive : ''} `}>
      <div ref={contentRef} className={`${ModalStyle.modal} ${props.modalActive ? ModalStyle.modalActive : ''} ${props.bgColor === 'white' ? ModalStyle.bgWhite : ''} `}>
        <div className={`${ModalStyle.modalContent}`}>
          <button className={`${ModalStyle.btnClose} hide-mobile`} onClick={fecharModal}>
            <span className={ModalStyle.btnCloseLine}></span>
            <span className={ModalStyle.btnCloseLine}></span>
          </button>

          
          {title && (
             <button className={`${ModalStyle.btnClose} d-lg-none`} onClick={fecharModal}>
             <MobileModalCloseButton /> <span>{title}</span>
            </button>
          ) }

          {props.children}
        </div>
      </div>
    </div>
  );
}
