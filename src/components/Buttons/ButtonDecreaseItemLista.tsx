import { LISTA_COMPRA, Product2 } from "@models/Product2"
import { ProductOrder } from "@models/ProductOrder"
import styles from "@styles/components/buttons/ButtonDecreaseIncreaseItem.module.css"

interface ACTIONS{
	fn: any;
	lista : LISTA_COMPRA; 
	product: Product2;
}
export default function ButtonDecreaseItemLista(props: ACTIONS) {
	return ( 
		<button onClick={  () => props.fn(props.product.product_code, props.lista.lista_name)}  className={`${styles.boxIcon} ${styles.decreaseItem}`}></button>  
	)
}