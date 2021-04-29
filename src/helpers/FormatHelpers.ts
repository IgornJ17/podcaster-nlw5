import { time } from 'console';
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale';

module.exports = {

    formatDateEpisodes: function(sDate: string){

        let temp = sDate;

        var dateFormated = parseISO(sDate)
        var result = format(dateFormated, 'd MMM yy', {locale: ptBR})

        return result
    },


    formatDuration: function(iData: number) : string {
        
        const hours = Math.floor(iData / 3600)

        const minutes = Math.floor((iData % 3600) / 60)

        const seconds = iData % 60

        const timeArray = [hours, minutes, seconds]

        const timeStamp = timeArray.map(function(unit){
            return String(unit).padStart(2, '0')
        }).join(':')

        return timeStamp

    }

}


