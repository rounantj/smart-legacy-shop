import Image from 'next/image'

import logoStyle from "@styles/components/Logo.module.css";
import { useEffect, useState } from 'react';
import { ajustStrigfy } from '@models/masks';
import SmartImage from '@components/SmartImage';

export default function LogoBranco() {
	const [imageLogo, setImageLogo] = useState<string>("/images/1/logo_correto.png")
	// useEffect(() => {
	// 	let txt = localStorage.getItem("FULL_DELIVERY_DEFAULT")
	// 	let masterIDTxt = process.env.AFFILIATE_ID
	// 	if (txt == null) {
	// 		txt = '[]'
	// 	}
	// 	if (masterIDTxt == null) {
	// 		masterIDTxt = '0'
	// 	}
	// 	let FULL_DATA: any = JSON.parse(ajustStrigfy(txt))
	// 	let masterID: number = Number(masterIDTxt)

	// 	for (const k in FULL_DATA) {
	// 		if (FULL_DATA[k].affiliate_id == masterID) {

	// 			setImageLogo(FULL_DATA[k].master_custom_logo)
	// 		}
	// 	}
	// }, [])
	let masterId1 = process.env.MASTER_ID;
	let affiliateId1 = process.env.AFFILIATE_ID;
	const MASTER_ID = Number(masterId1)
	const AFFILIATE_ID = Number(affiliateId1)
	const [affiliateId, setAffiliateId] = useState<number>(AFFILIATE_ID);

	useEffect(() => {
		let txt = localStorage.getItem("FULL_DELIVERY_DEFAULT")
		if (!txt || txt == null) { txt = '[]' }

		let FULL_DATA: any = JSON.parse(ajustStrigfy(txt))
		let affID = AFFILIATE_ID
		let ESSA_LOJA: any;
		for (const k in FULL_DATA) {
			if (FULL_DATA[k].affiliate_id == AFFILIATE_ID) {
				ESSA_LOJA = FULL_DATA[k]
			}
		}

		//console.log("ESSA_LOJA", ESSA_LOJA)


		localStorage.setItem("MY_DELIVERY_AREA", ESSA_LOJA.faixa_cep_values)

		if (ESSA_LOJA) {
			try {
				let homePage: any = JSON.parse(ESSA_LOJA.home_main_info)
				setImageLogo(homePage.logotipo.url)
			} catch (err) {
				//console.log(err)
			}

		} else {

			try {
				let homePage: any = JSON.parse(FULL_DATA[0].home_main_info)
				setImageLogo(homePage.logotipo.url)
			} catch (err) {
				//console.log(err)
			}
		}



	}, [])

	useEffect(() => {

	}, [imageLogo])

	return (
		<div className={logoStyle.logo}>
			<SmartImage src={imageLogo} objectFit={'contain'} layout={'fill'} />
		</div>
	)
}