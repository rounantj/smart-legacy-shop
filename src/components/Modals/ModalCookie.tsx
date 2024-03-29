import WishlistIconV2 from "@assets/icons/WishlistIconV2";
import PlusRoundedIcon from "@assets/icons/PlusRounded";
import ModalStyle from "@styles/components/modals/Modal.module.css";
import styles from "@styles/components/modals/ModalListas.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";



export default function ModalCookie() {
  const [cookie, setCookie] = useState<boolean>(false)
  useEffect(()=>{

  },[cookie])
  function setaCookie(){
    setCookie(true)
    localStorage.setItem("cookieAccept","true")
  }
  return (
    <div className={` ${ styles.modalListasCookie} ${ cookie == false? styles.modalActive : ''}`}>
   
 
  
        
          <div className={`${styles.modalCreateLista} cookieAccept`}>
 
          <div className={styles.mensagem}>
          <p>
          Nós usamos cookies e outras técnologias semelhantes para melhorar a sua experiência em nossos serviços, personalizar publicidade e recomendar conteúdo do seu interesse. Ao utilizar nossos serviços você concorda com tal monitoramento. <br/>Informamos ainda que atualizamos nossa              <Link  passHref href="../politica-privacidade"
              >
                Politica de Privacidade
              </Link>.
              <button  onClick={ () => setaCookie()} className={styles.btnProsseguir}>
              Prosseguir
            </button>
            
            
            </p>
             
          </div>
             
     

            
            
          </div>

        
    </div>
   
  );
}
