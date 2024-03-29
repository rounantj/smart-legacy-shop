import { Product2 } from "@models/Product2"
import { ProductOrder } from "@models/ProductOrder"
import styles from "@styles/components/buttons/ButtonDecreaseIncreaseItem.module.css"
interface ACTIONS{
	fn: any;
	product_code : number; 
	product: Product2 | 0;
}
export default function ButtonIncreaseItemMobile(props: ACTIONS) {
	return (
		props.product != 0 ?
		<button  onClick={  () => props.fn(props.product_code,props.product)}  className={`${styles.boxIconMobile} ${styles.increaseItemMobile}`}></button>
		:
		<button  onClick={  () => props.fn(props.product_code)}  className={`${styles.boxIconMobile} ${styles.increaseItemMobile}`}></button>

	)
}