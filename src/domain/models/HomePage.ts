export interface HomePage {
	id: number,
	master_id: number | null,
	rowType: string | null,
	bannerMedio01: string | null,
	bannerMedio02: string | null,
	productList: string | null,
	updatedAt: Date,
	createdAt: Date,
}
export interface IBody {
	id: string | null,
	type: string | null,
	products: number[] | null,
	categories: number[] | null,
	offers: boolean | null,
	personal: boolean | null,
	smart: boolean | null,
	title: obj | null,
	first: obj | null,
	second: obj | null,
}
export interface obj {
	url: string | null,
	link: string | null,
	text: string | null,
}




