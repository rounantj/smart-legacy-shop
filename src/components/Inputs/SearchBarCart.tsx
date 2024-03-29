import PropTypes from "prop-types";
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import SearchBarStyle from '@styles/components/SearchBar.module.css'
import { useEffect, useState } from "react";
import { useSearch } from "src/hooks/useSearch";
import ProductInSearch from "./ProductInSearch";

interface SearchBarProps {
	placeholder: string; 
	searchFunction : any;
}



function SearchBarCart(props: SearchBarProps) {
	const [showed, setShowed] = useState<boolean>(false)
	const [valueSearch, setValueSearch] = useState<string>('')
 
	const onkeydown = (event: any) => {
 
		props.searchFunction(event.nativeEvent.target.value)		
	}
	function caseA(text: string){ 
		var list = text.split(" "), newText = "" 
		for(const k in list){
		  var word = list[k].split(""), counter = 0, newWord = "" 
		  for(const u  in word){
			if(counter === 0){
			  if(word[u] != ""){
				newWord+= word[u].toUpperCase()
			  }
			}
			else{
				newWord+= word[u].toLowerCase()
			  }
			counter ++
		  } 
		  newText+= newWord+" " 
		}
		return newText
	  }

	useEffect(() =>{
 
		
	}, [setShowed, showed, valueSearch])


	return (
		<div>
			<div className={SearchBarStyle.searchBarCart}>
				<div className={SearchBarStyle.inputArea}>
					<div className={SearchBarStyle.icon}>
						<FontAwesomeIcon icon={faSearch} />
					</div>
					<input onChange={onkeydown} onKeyDown={onkeydown} type="search" placeholder={props.placeholder} />
				</div>
			</div>
			
		 
				
		

		</div>
		
	)
}

SearchBarCart.defaultProps = {
	placeholder: 'Procure por produto ou marca'
}

export default SearchBarCart;