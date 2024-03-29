import styles from "@styles/components/modals/StepProgress.module.css";

interface stepProps {
  quantidade: number;
  stepAtual: number;
}

export default function StepProgress ( props: stepProps ) {
	var arrayBar = []

	for (var i = 0; i < props.quantidade; i++) {
    arrayBar.push(<li>{i}</li>);
  }

  return (
    <div className={styles.stepProgress}>
      {arrayBar.map((bar, index) => (
         <div  key={Math.random()}
          className={`${styles.bar} ${
            props.stepAtual > index ? styles.barCompleted : ""
          }`}
        >
        </div>
      ))}
    </div>
  );
}
