import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale';


export function formatDateEpisodes(sDate){

    let temp = sDate;

    var dateFormated = parseISO(sDate)
    var result = format(dateFormated, 'd MMM yy', {locale: ptBR})

    return result
}


