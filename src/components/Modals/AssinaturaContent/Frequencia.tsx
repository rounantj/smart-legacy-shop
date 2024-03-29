
import styles from "@styles/components/modals/Frequencia.module.css";

interface frequenciaProps {
  id: number;
  title: string;
  description: string;
  selected?: boolean;
  disable?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function frequencia(props: frequenciaProps) {
  return (
    <button
      onClick={props.onClick}
      className={`${styles.frequencia}
			${props.selected ? styles.active : ""}
			${props.disable ? styles.disable : ""}`}
    >
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h4 className={styles.title}>
            {props.title}
          </h4>
        </div>

        <div className={styles.body}>
          {props.description}
        </div>
      </div>
    </button>
  );
}
