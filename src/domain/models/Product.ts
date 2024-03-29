export interface Product {
	id: number,
	name: string,
	img: string,
	production_type: string,
	units: number,
	rating: number,
	price: number,
	promotional_price?: number,
	category: string
}
