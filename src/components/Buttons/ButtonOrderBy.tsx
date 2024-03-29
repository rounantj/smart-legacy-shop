import * as React from "react";

import OrderByIcon from "@assets/icons/OrderBy";
import ArrowDownIcon from "@assets/icons/ArrowDown";

import styles from "@styles/components/buttons/ButtonOrderBy.module.css"

interface buttonProps {
  className?: string;
  titleButton?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function ButtonOrderBy(props: buttonProps): React.ReactElement {
  return (
    <button {...props} className={`${styles.btn} ${props.className}`}>
			<div className={styles.colLeft}>
				<div className={styles.icon}>
					<OrderByIcon />
				</div>

				<div className={styles.text}>
					{props.titleButton}
				</div>
			</div>

			<div className={styles.arrowDown}>
				<ArrowDownIcon />
			</div>
    </button>
  );
}
