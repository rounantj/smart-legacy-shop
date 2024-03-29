import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SearchProductCard from "@components/Modals/SearchProducts/SearchProductCard";
import Button from "@components/Buttons/Button";

import styles from "@styles/components/modals/ModalSearchProductContent.module.css";
import { useSearch } from "src/hooks/useSearch";
import { useEffect, useState, useRef } from "react";
import NotFoundFace from "@assets/icons/NotFoundFace";
import CheckRounded from "@assets/icons/CheckRounded";
import ReactDOM from "react-dom";

interface SearchBarProps {
	noCarrinho: any;
	increase: any;
	decrease: any;
	modalActive: any;
}

export default function ModalSearchProductContent(props: SearchBarProps) {

	const search = (e: any) => {
		
		
		setTimeout(() => {
			
			var AFFILIATE_ID: number = Number( process.env.AFFILIATE_ID)
			
			setValueSearch(e.target.value)
			getSearch(AFFILIATE_ID, 0, 10, e.target.value)
		}, 50);
		setHouveBusca(true)

	}

	const [showed, setShowed] = useState<boolean>(false)
	const [modalActive, setModalActive] = useState<boolean>(false)
	const [valueSearch, setValueSearch] = useState<string>('')
	const [affiliateId, setAffiliateId] = useState<number>(0)
	const { busca, getSearch } = useSearch(affiliateId, 0, 4, valueSearch)
	const [houveBusca, setHouveBusca] = useState<boolean>(false)
	const searchInput = useRef(null);

	
	
	
	// if(props.modalActive){
	// 	searchInput.current.focus();
	// }
	
	const onkeydown = (event: any) => {
		
		
		if (event.nativeEvent.target.value != '') {
			setShowed(true)
			setValueSearch(event.nativeEvent.target.value)
		} else {
			setShowed(false)
			setValueSearch(event.nativeEvent.target.value)
		}

		if (event.key == 'Enter') {
			location.replace('/busca?' + event.nativeEvent.target.value)
		}

	}
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

	useEffect(() => {

		
		
	}, [setShowed, showed, valueSearch, getSearch, modalActive])

	const handleClickSeeAll = () => location.replace(`/busca?${valueSearch}`);

	return (
		<div className={`${styles.modalContent} container`}>
			<div className={styles.boxInput}>
				<div className={styles.icon}>
					<FontAwesomeIcon icon={faSearch} />
				</div>
				<input   onKeyPress={search} type="search" placeholder="Procure por produto ou marca" />
			</div>

			<div className={styles.productList}>
				{busca.length > 0 ?
					busca.map((prd) => (
						<SearchProductCard key={prd.id}
							increase={props.increase}
							decrease={props.decrease}
							noCarrinho={props.noCarrinho}
							product={prd}
						/>
					))

					:
					houveBusca ?
						<div>
							<div className={styles.header}>
								<div className={` ${styles.messageBox} messageBoxResult `}>
									<NotFoundFace />
									<b>Não conseguimos encontrar o que você está procurando</b>
								</div>
							</div>

							<div className={`${styles.body} actionsNotSearch `}>
								<div className={styles.checklistBox}>
									<h3 className={styles.checklistTitle}>O que posso fazer?</h3>

									<div className={styles.checklist}>
										<div className={`${styles.item} superList`}>
											<CheckRounded /> Verifique os termos digitados.
										</div>

										<div className={`${styles.item} superList`}>
											<CheckRounded /> Tente utilizar uma única palavra.
										</div>

										<div className={`${styles.item} superList`}>
											<CheckRounded /> Utilize termos genéricos na busca.
										</div>

										<div className={`${styles.item} superList`}>
											<CheckRounded /> Procure utilizar sinônimos ao termo desejado.
										</div>
									</div>
								</div>
							</div>
						</div>
						:
						<div></div>
				}




			</div>
			<div className={styles.buttonArea}>
				<Button onClick={handleClickSeeAll} className={styles.button}>Ver todos resultados</Button>
			</div>
		</div>
	);
}
