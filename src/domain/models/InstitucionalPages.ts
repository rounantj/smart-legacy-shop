export interface InstitucionalPage { 
	status: number  | null,	
	id?: number,	
	master_id?: number  | null,
	name_page: string  | null,
	content_page: string  | null,
	bannerTopo?: string | null,
	LGPD_alert?: number  | null,	
	updatedAt?: Date,
	createdAt?:Date, 
}
 



