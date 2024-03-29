import Image from 'next/image'

import logoStyle from "@styles/components/Logo.module.css";
import { useEffect, useState } from 'react';
import { ajustStrigfy } from '@models/masks';
import SmartImage from '@components/SmartImage';

export default function LogoBranco() {
	const [imageLogo, setImageLogo] = useState<string>("/images/1/logo_correto.png")
	useEffect(() => {
		let txt = localStorage.getItem("FULL_DELIVERY_DEFAULT")
		let masterIDTxt = process.env.AFFILIATE_ID
		let ESSA_LOJA: any;
		if (txt == null) {
			txt = '[]'
		}
		if (masterIDTxt == null) {
			masterIDTxt = '0'
		}
		let FULL_DATA: any = JSON.parse(ajustStrigfy(txt))
		let masterID: number = Number(masterIDTxt)

		for (const k in FULL_DATA) {
			if (FULL_DATA[k].affiliate_id == masterID) {
				ESSA_LOJA = FULL_DATA[k]
			}
		}

		if (ESSA_LOJA) {
			try {
				let homePage: any = JSON.parse(ESSA_LOJA.home_main_info)
				setImageLogo(homePage.footerLogo.url)
			} catch (err) {
				//console.log(err)
			}

		} else {

			try {
				let homePage: any = JSON.parse(FULL_DATA[0].home_main_info)
				setImageLogo(homePage.footerLogo.url)
			} catch (err) {
				//console.log(err)
			}
		}
		//console.log("ESSA_LOJA", ESSA_LOJA)
	}, [])

	useEffect(() => {

	}, [imageLogo])

	return (
		<div className={logoStyle.logo}>
			<SmartImage src={imageLogo} width={150} height={60} objectFit={"contain"} layout={"responsive"} />
		</div>
	)
}