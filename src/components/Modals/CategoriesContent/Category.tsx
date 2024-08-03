
import ModalCategoryArrow from "@assets/icons/ModalCategoryArrow"

import styles from "@styles/components/modals/CategoryContent/Category.module.css"
import { Categorie } from "@models/Categorie"
import Link from "next/link"
import { useEffect } from "react"
import SmartImage from "@components/SmartImage"
interface MAP {
	categoria: Categorie,
	triggerModal: any,
	type: string

}
export default function Category(props: MAP) {

	useEffect(() => {

	}, [])

	function caseA(text: string) {
		var list = text.split(" "), newText = ""
		for (const k in list) {
			var word = list[k].split(""), counter = 0, newWord = ""
			for (const u in word) {
				if (counter === 0) {
					if (word[u] != "") {
						newWord += word[u].toUpperCase()
					}
				}
				else {
					newWord += word[u].toLowerCase()
				}
				counter++
			}
			newText += newWord + " "
		}
		return newText
	}
	function redirect(url: string) {

		location.replace(url)
	}

	return (

		props.type == "cat" ?
			<div className={styles.category}>
				<Link
					href={`../../../c/${props.categoria.affiliate_categorie_name}`} passHref={false}
				>
					<div className={styles.mainArea}>
						<div className={styles.thumbnail}>
							<div className={styles.asideIcon}>
								{/* <Image
									src={

										(props.categoria.categorie_icon.indexOf("https") > -1 ? props.categoria.categorie_icon : process.env.SMART_API+"/" + props.categoria.categorie_icon)
									}
									layout="fill"
									objectFit="contain"
								/> */}

								<SmartImage
									src={

										(props.categoria.categorie_icon.indexOf("https") > -1 ? props.categoria.categorie_icon : process.env.SMART_API + "/" + props.categoria.categorie_icon)
									}
									layout="fill"
									objectFit="contain"
								/>
							</div>
						</div>

						<div className={styles.categoryName}>
							{caseA(props.categoria.affiliate_categorie_name)}
						</div>
					</div>
				</Link>





				<div onClick={() => props.triggerModal(props.categoria.affiliate_categorie_name)} className={styles.buttonArea}>
					<button className={styles.button}>
						<ModalCategoryArrow />
					</button>
				</div>
			</div>


			:
			<div className={styles.category}>

				<div className={styles.mainArea} >
					<a className="meuLink" href={"../../../c/" + props.categoria.categorie_title + "/sc/" + props.categoria.affiliate_categorie_name}>

						<>

							<div className={styles.thumbnail}>
								<div className={styles.asideIcon}>
									{/* <Image
										src={

											(props.categoria.categorie_icon.indexOf("https") > -1 ? props.categoria.categorie_icon : process.env.SMART_API+"/" + props.categoria.categorie_icon)
										}
										layout="fill"
										objectFit="contain"
									/> */}

									<SmartImage
										src={

											(props.categoria.categorie_icon.indexOf("https") > -1 ? props.categoria.categorie_icon : process.env.SMART_API + "/" + props.categoria.categorie_icon)
										}
										layout="fill"
										objectFit="contain"
									/>
								</div>
							</div>

							<div className={styles.categoryName}>
								{caseA(props.categoria.affiliate_categorie_name)}
							</div>
						</>
					</a>



				</div>


				{/* <div className={styles.buttonArea}>
						<button className={styles.button}>
							<ModalCategoryArrow />
						</button>
			    </div> */}


			</div>





	)
}