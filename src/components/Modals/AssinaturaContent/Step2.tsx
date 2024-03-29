import { useState } from "react";

import Product from "@components/Modals/AssinaturaContent/Product";

import styles from "@styles/components/modals/Steps.module.css";

export default function Step2() {
  const [categorySelected, setCategorySelected] = useState<number>();

  return (
    <div className={styles.step}>
      <h3 className={styles.stepTitle}>Restrições</h3>
      <p className={styles.stepSubtitle}>
        Selecione produtos que você não quer receber
      </p>

      <div className={styles.menu}>
        <button className={`${styles.menuItem} ${styles.active}`}>Frutas</button>
        <button className={styles.menuItem}>Legumes</button>
        <button className={styles.menuItem}>Vegetais</button>
        <button className={styles.menuItem}>Temperos</button>
      </div>

      <div className={styles.categoryBox}>
        <div className={styles.categoryList}>
          <Product
            id={1}
            title="Abacate lorem ipsum sit amen dolor"
            image="/images/produto_teste.png"
            selected
          />

          <Product
            id={2}
            title="Abacate lorem ipsum sit amen dolor"
            image="/images/produto_teste.png"
          />

          <Product
            id={3}
            title="Abacate lorem ipsum sit amen dolor"
            image="/images/produto_teste.png"
          />

          <Product
            id={4}
            title="Abacate lorem ipsum sit amen dolor"
            image="/images/produto_teste.png"
          />

          <Product
            id={5}
            title="Abacate lorem ipsum sit amen dolor"
            image="/images/produto_teste.png"
          />

          <Product
            id={6}
            title="Abacate lorem ipsum sit amen dolor"
            image="/images/produto_teste.png"
          />
        </div>
      </div>
    </div>
  );
}
