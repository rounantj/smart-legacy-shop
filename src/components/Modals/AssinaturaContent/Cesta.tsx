import SmartImage from "@components/SmartImage";;

import styles from "@styles/components/modals/Cesta.module.css";

interface category {
  quantidade: number;
  title: string;
}

interface cestaProps {
  id: number;
  title: string;
  value: string;
  image: string;
  selected?: boolean;
  disable?: boolean;
  categories: Array<category>;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function Cesta(props: cestaProps) {
  return (
    <button
      onClick={props.onClick}
      className={`${styles.cesta}
			${props.selected ? styles.active : ""}
			${props.disable ? styles.disable : ""}`}
    >
      <div className={styles.thumbnail}>
        <SmartImage src={props.image} layout="fill" objectFit="contain" />
      </div>

      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h4 className={styles.title}>
            {props.title}
            <div className={styles.value}>{props.value}</div>
          </h4>
        </div>

        <div className={styles.body}>
          <div className={styles.categories}>
            {props.categories?.map((category) => (
              <div key={Math.random()} className={styles.category}>
                <span className={styles.categoryNumber}>
                  {category.quantidade}
                </span>
                {category.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}
