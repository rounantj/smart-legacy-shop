import { LISTA_COMPRA, Product2 } from "@models/Product2";
import styles from "@styles/components/buttons/ButtonRemoveItem.module.css"
interface ACTIONS{
	fn: any;
	lista : LISTA_COMPRA; 
	product: Product2;
}
export default function ButtonRemoveItemLista(props:ACTIONS) {
	return ( 
		<button  onClick={  () => props.fn(props.product.product_code, props.lista.lista_name)}  className={styles.btnRemoveItem}></button>
	)
}