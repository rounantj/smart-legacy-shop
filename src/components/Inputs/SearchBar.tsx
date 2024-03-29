import PropTypes from "prop-types";
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import SearchBarStyle from '@styles/components/SearchBar.module.css'
import { useEffect, useState } from "react";
import { useSearch } from "src/hooks/useSearch";
import ProductInSearch from "./ProductInSearch";

interface SearchBarProps {
	placeholder: string;
	noCarrinho: any;
	increase: any;
	decrease: any;
	mobileSearch: any

}



function SearchBar(props: SearchBarProps) {
	const [showed, setShowed] = useState<boolean>(false)
	const [valueSearch, setValueSearch] = useState<string>('')
	const [affiliateId, setAffiliateId] = useState<number>(0)
	const { busca, getSearch } = useSearch(affiliateId, 0, 4, valueSearch)
	const onkeydown = (event: any) => {

		if (event.nativeEvent.target.value != '') {
			setShowed(true)
			setValueSearch(event.nativeEvent.target.value)
		} else {
			setShowed(false)
			setValueSearch(event.nativeEvent.target.value)
		}

		if (event.key == 'Enter') {
			//location.replace('/busca?' + event.nativeEvent.target.value)
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
		var AFFILIATE_ID: number = Number(process.env.AFFILIATE_ID)

		getSearch(AFFILIATE_ID, 0, 4, valueSearch)


	}, [setShowed, showed, valueSearch])

	const closeModal = (e: any) => {

		if (e.target.className == "backgroundBlackTransparent") {
			setShowed(!showed)
		}
		//innerHTML: "Adicionar"

	}


	return (
		<div onClick={closeModal} className={showed ? `backgroundBlackTransparent` : `oi`}>
			<div className={showed ? SearchBarStyle.searchBar2 : SearchBarStyle.searchBar}>
				<div className={showed ? SearchBarStyle.inputArea2 : SearchBarStyle.inputArea}>
					<div className={SearchBarStyle.icon}>
						<FontAwesomeIcon icon={faSearch} />
					</div>
					<input onClick={() => props.mobileSearch(true)} onChange={onkeydown} onKeyDown={onkeydown} type="search" placeholder={props.placeholder} />
				</div>
			</div>

			{showed ?
				<div className={`${SearchBarStyle.searchBar} ${SearchBarStyle.myBar}`}>

					<p className={SearchBarStyle.linkBusca}>SUGESTÃO DE BUSCA</p><br />
					{busca.map((bsc) => (
						<div key={bsc.id} className={SearchBarStyle.searchResult}>
							<div >
								<p key={Math.random()} className={SearchBarStyle.linkBusca}>{bsc.product_site_name.split(" ").map((txt) =>
									txt ?
										txt.toLocaleLowerCase().trim()?.indexOf(valueSearch.toLocaleLowerCase().trim()) > -1 ? <span onClick={() => location.replace('/busca?' + bsc.product_site_name)}>&nbsp;<b>{txt}</b>&nbsp;</span> : <span onClick={() => location.replace('/busca?' + bsc.product_site_name)}>&nbsp;{caseA(txt)}&nbsp;</span>
										:
										<p key={Math.random()}></p>
								)}</p>
							</div>

						</div>
					))}
					<br />
					<p className={SearchBarStyle.linkBusca}>PRODUTOS SUGERIDOS</p><br />
					{busca.map((bsc) => (
						bsc.product_status == 'active' ?
							<div key={bsc.id}>

								<ProductInSearch
									increase={props.increase}
									decrease={props.decrease}
									noCarrinho={props.noCarrinho}
									product={bsc}
								/>
							</div>
							:
							<div key={Math.random()}></div>
					))}




				</div>

				:
				<div key={Math.random()}></div>
			}



		</div>

	)
}

SearchBar.defaultProps = {
	placeholder: 'Procure por produto ou marca'
}

export default SearchBar;