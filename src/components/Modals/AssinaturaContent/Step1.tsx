import { useState } from "react";

import Cesta from "@components/Modals/AssinaturaContent/Cesta";

import styles from "@styles/components/modals/Steps.module.css";

export default function Step1 () {
	const [ cestaSelected, setCestaSelected ] = useState<number>();

	function cestaClick ( cesta_id: number ) {
		setCestaSelected(cesta_id);
	}

  return (
    <div className={styles.step}>
      <h3 className={styles.stepTitle}>Selecione o tamanho</h3>

      <div className={styles.list}>
        <Cesta
          id={1}
          title="Cesta Pequena"
          value="R$ 65,50"
          image="/images/cesta.png"
          disable={cestaSelected !== 1 && cestaSelected !== undefined}
          selected={cestaSelected === 1}
          categories={[
            { quantidade: 5, title: "Frutas" },
            { quantidade: 2, title: "Legumes" },
            { quantidade: 4, title: "Vegetais" },
            { quantidade: 4, title: "Temperos" },
          ]}
          onClick={() => cestaClick(1)}
        />

        <Cesta
          id={2}
          title="Cesta Média"
          value="R$ 95,50"
          image="/images/cesta.png"
          disable={cestaSelected !== 2 && cestaSelected !== undefined}
          selected={cestaSelected === 2}
          categories={[
            { quantidade: 8, title: "Frutas" },
            { quantidade: 4, title: "Legumes" },
            { quantidade: 6, title: "Vegetais" },
            { quantidade: 5, title: "Temperos" },
          ]}
          onClick={() => cestaClick(2)}
        />

        <Cesta
          id={3}
          title="Cesta Grande"
          value="R$ 115,50"
          image="/images/cesta.png"
          disable={cestaSelected !== 3 && cestaSelected !== undefined}
          selected={cestaSelected === 3}
          categories={[
            { quantidade: 10, title: "Frutas" },
            { quantidade: 6, title: "Legumes" },
            { quantidade: 8, title: "Vegetais" },
            { quantidade: 7, title: "Temperos" },
          ]}
          onClick={() => cestaClick(3)}
        />
      </div>
    </div>
  );
}
