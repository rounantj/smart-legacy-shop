import { Horarios } from "./Horarios";

export interface MetodoEntrega {
	ativo?: boolean,
	descricao: string,
	entrega_agendada?: boolean,
	entrega_agendada_horarios?: Horarios[],
	entrega_agendada_medida?: string,
	entrega_agendada_tempo?: string,
	entrega_padrao?: boolean,
	entrega_padrao_periodo?: string,
	entrega_padrao_tempo?: string,
	localidade_exclui?: boolean,
	localidade_exclui_ceps?: string,
	localidade_padrao?: boolean,
	valor_fixo?: string,
	valor_fixo_status?: boolean,
	valor_km?: number,
	valor_km_status?: boolean,
	valor_km_texto?: string,

 
}
 



