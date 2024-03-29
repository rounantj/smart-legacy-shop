
import styles from "@styles/components/checkout/loja.module.css";
import { Affiliate } from "@models/Affiliate";
import { useEffect, useState } from "react";

interface detalhes {
	affiliate: Affiliate
}
export default function Loja(props: detalhes) {

	const [affiliate, setAffiliate] = useState<any>()
	setAffiliate(props.affiliate)
	useEffect(() => {
		setAffiliate(props.affiliate)

	}, [affiliate, setAffiliate])
	return (
		<div className={styles.loja}>
			<div className={styles.thumbnail}></div>

			<div className={styles.contentBox}>
				<div className={styles.content}>
					<h5 className={styles.nome}>
						{affiliate.name}
					</h5>

					<div className={styles.endereco}>
						{affiliate.address}
						Tel: {affiliate.telephone}
					</div>
				</div>

				<button className={styles.button}>Retirar aqui</button>
			</div>
		</div>
	);
}
