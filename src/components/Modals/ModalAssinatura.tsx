import { useState } from "react";
import BackStepIcon from "@assets/icons/BackStep";

import Button from "@components/Buttons/Button";
import StepProgress from "@components/Modals/AssinaturaContent/StepProgress";
import Step1 from "@components/Modals/AssinaturaContent/Step1";
import Step2 from "@components/Modals/AssinaturaContent/Step2";
import Step3 from "@components/Modals/AssinaturaContent/Step3";

import styles from "@styles/components/modals/ModalAssinatura.module.css";
import SmartImage from "@components/SmartImage";
interface ModalAssinaturaProps {
  modalActive?: Boolean;
  onCloseClick: any;
}
export default function ModalAssinatura(props: ModalAssinaturaProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);

  return (
    <div className={`${styles.modal} ${props.modalActive ? styles.modalActive : ''}`}>
      <button onClick={props.onCloseClick} className={`btnClose ${styles.btnClose}`}>
        <span className="btnCloseLine"></span>
        <span className="btnCloseLine"></span>
      </button>

      <div className={styles.row}>
        <div className={styles.colImage}>
          <h3 className={styles.modalTitle}>Vamos criar sua cesta</h3>

          <div className={styles.modalImage}>
            <SmartImage
              src="/images/modal-assinatura.png"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>

        <div className={styles.colMainContent}>
          <div className={styles.containerInner}>
            {currentStep === 1 ? (
              <Step1 />
            ) : currentStep === 2 ? (
              <Step2 />
            ) : (
              <Step3 />
            )}

            <div className={styles.buttons}>
              {currentStep > 1 && (
                <Button className={styles.btnVoltar}>
                  <BackStepIcon />
                  Voltar
                </Button>
              )}
              <Button className={styles.btnContinuar}>Continuar</Button>
            </div>

            <StepProgress quantidade={3} stepAtual={currentStep} />
          </div>
        </div>
      </div>
    </div>
  );
}
