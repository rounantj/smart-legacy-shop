import { Product2 } from "@models/Product2"
import { ProductOrder } from "@models/ProductOrder"
import styles from "@styles/components/buttons/ButtonDecreaseIncreaseItem.module.css"
interface ACTIONS{
	fn: any;
	product_code : number; 
	product: Product2 | 0;
	onClick?:any
}
export default function BtnBrancoIncrease(props: ACTIONS) {
	function meClica(product_code: any,product: any){
		if(props.onClick){
			props.onClick()
			if(props.product != 0 ){
				props.fn(props.product_code,props.product)
			}else{
				props.fn(props.product_code)
			}
		}else{
			if(props.product != 0 ){
				props.fn(props.product_code,props.product)
			}else{
				props.fn(props.product_code)
			}
			
		}

	}
	return (
		props.product != 0 ?
		<button  onClick={  () => props.fn(props.product_code,props.product)}  className={`${styles.boxIcon2} ${styles.increaseItem}`}></button>
		:
		<button  onClick={  () => props.fn(props.product_code)}  className={`${styles.boxIcon2} ${styles.increaseItem}`}></button>

	)
}