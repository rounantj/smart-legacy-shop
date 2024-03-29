import styles from "@styles/components/buttons/ButtonRemoveItem.module.css"
interface ACTIONS{
	fn: any;
	product_code : number
}
export default function ButtonRemoveItem(props:ACTIONS) {
	return (
		
		<button  onClick={  () => props.fn(props.product_code)}  className={styles.btnRemoveItem}></button>
	)
}