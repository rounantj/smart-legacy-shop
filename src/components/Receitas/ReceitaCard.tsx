import Image from "next/image";
import Link from "next/link";

import styles from "@styles/components/receitas/ReceitaCard.module.css";
import SmartImage from "@components/SmartImage";

interface StaticPropsResult {
	name: string;
	tempoPreparo: string;
	qtdIngredientes: Number;
	porcoes: Number;
	image: string;
	link: string;
}

export default function ReceitaCard(props: StaticPropsResult) {
	return (
		<Link passHref={false} href={props.link}>
			<span className={styles.receitaCard}>
				<div className={styles.thumbnail}>
					<SmartImage src={props.image} layout="fill" objectFit="cover" />
				</div>

				<div className={styles.contentBox}>
					<h2 className={styles.name}>{props.name}</h2>

					<div className={styles.list}>
						<div className={styles.item}>{props.tempoPreparo}</div>
						<div className={styles.item}>
							{props.qtdIngredientes} ingrediente
							{props.qtdIngredientes > 1 ? "s" : ""}
						</div>
						<div className={styles.item}>
							{props.porcoes} {props.porcoes > 1 ? "porções" : "porção"}
						</div>
					</div>
				</div>
			</span>
		</Link>
	);
}
