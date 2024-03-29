import Button from "@components/Buttons/Button";

import TruckIcon from "@assets/icons/Truck";

import styles from "@styles/components/Newsletter.module.css"
import { useState } from "react";
import { saveMarketingMail, validarEmailText } from "@models/masks";


export default function Newsletter() {
  const [isValid, setIsValid] = useState<boolean>(true)
  const [showFeedback, setShow] = useState<boolean>(false)
  const [mail, setMail] = useState<string>('')
  function handleIsValid(e: React.FormEvent<HTMLInputElement>) {
    if (e.currentTarget.value.includes("@")) {
      if (validarEmailText(e.currentTarget.value)) {
        setIsValid(true);
        setMail(e.currentTarget.value)
      }
    }
  }
  function validarEmail2(valor: string) {
    let validarRegExNoEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (valor.match(validarRegExNoEmail)) {
      return true;
    } else {
      return false;
    }
  }

  async function enviaEmailDB() {
    if (isValid) {
      await saveMarketingMail(mail);
      setShow(true)
    }
  }
  return (
    <div className={styles.newsletter}>
      <div className={styles.newsletterContent}>
        <hgroup className={styles.newsletterHeader}>
          <h2 className={styles.newsletterTitle}>Receba semanalmente</h2>
          <h2 className={styles.newsletterSubtitle}>Nossas melhores ofertas</h2>
        </hgroup>

        <div className={styles.newsletterForm}>
          <div className={styles.newsletterInputBox}>
            <div className={styles.newsletterInputBoxIcon}>
              <TruckIcon />
            </div>

            <input onKeyUp={handleIsValid} className={`${isValid ? '' : 'borderRed'}`} type="email" placeholder="Digite seu e-mail" />
            {isValid ? <div></div> :
              <p className="colorRed">Informe um e-mail válido!</p>
            }


            {!showFeedback ? <div></div> :
              <p style={{ color: 'white !Important', textAlign: 'left', fontSize: '1rem' }}>Email salvo com sucesso!<br /> Em breve receberá nossas ofertas or e-mail.</p>
            }
          </div>
          <Button onClick={enviaEmailDB} className={styles.btnOfertas} id="btn-small">Quero Ofertas!</Button>
        </div>
      </div>
    </div>
  );
}
