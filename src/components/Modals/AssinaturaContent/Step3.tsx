import { useState } from "react";

import Frequencia from "@components/Modals/AssinaturaContent/Frequencia";

import styles from "@styles/components/modals/Steps.module.css";

export default function Step3() {
  const [itemSelected, setItemSelected] = useState<number>();

  function cestaClick(cesta_id: number) {
    setItemSelected(cesta_id);
  }

  return (
    <div className={styles.step}>
      <h3 className={styles.stepTitle}>Frequência</h3>
      <p className={styles.stepSubtitle}>
        Selecione a frequência que você deseja que a cesta chegue em sua casa
      </p>

      <div className={styles.list}>
        <Frequencia
          id={1}
          title="Semanal"
          description="Você receberá sua cesta toda semana"
          disable={itemSelected !== 1 && itemSelected !== undefined}
          selected={itemSelected === 1}
          onClick={() => cestaClick(1)}
        />

        <Frequencia
          id={2}
          title="Quinzenal"
          description="Você receberá sua cesta a cada 15 dias"
          disable={itemSelected !== 2 && itemSelected !== undefined}
          selected={itemSelected === 2}
          onClick={() => cestaClick(2)}
        />

        <Frequencia
          id={3}
          title="Mensal"
          description="Você receberá sua cesta uma vez por mês"
          disable={itemSelected !== 3 && itemSelected !== undefined}
          selected={itemSelected === 3}
          onClick={() => cestaClick(3)}
        />
      </div>
    </div>
  );
}
