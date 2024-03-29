import NotFoundFace from "@assets/icons/NotFoundFace"
import CheckRounded from "@assets/icons/CheckRounded";
import TruckIcon from "@assets/icons/Truck";

import styles from "@styles/components/SearchFail.module.css"

export default function SearchFail () {
	return (
    <div className="model-page-interna">
      <div className={styles.header}>
        <div className={` ${styles.messageBox} messageBoxResult `}>
          <NotFoundFace />
          <b>Não conseguimos encontrar o que você está procurando</b>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.checklistBox}>
          <h3 className={styles.checklistTitle}>O que posso fazer?</h3>

          <div className={styles.checklist}>
            <div className={styles.item}>
              <CheckRounded /> Verifique os termos digitados.
            </div>

            <div className={styles.item}>
              <CheckRounded /> Tente utilizar uma única palavra.
            </div>

            <div className={styles.item}>
              <CheckRounded /> Utilize termos genéricos na busca.
            </div>

            <div className={styles.item}>
              <CheckRounded /> Procure utilizar sinônimos ao termo desejado.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}