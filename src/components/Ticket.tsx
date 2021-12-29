import { dateCreactorUtil, durationCreatorUtil } from "../utils/UtilsForTicket"; // Утилиты для формирования читабельной даты и длительности.
import TicketLogoSVG from "../assets/TicketLogoSVG"; // Логотип авиакомпании
import { SegmentType } from "../App"; //Тип сегемента
// Segment - объект полёта, их 2 (туда и обратно)
// type SegmentType = {
//     origin: string
//     destination: string
//     date: string
//     stops: string[]
//     duration: number
// }


// типы для props Ticket
type TicketPropsType = {
    price: number
    segments: SegmentType[]
}


export const Ticket = ({price = 0, segments = []}: TicketPropsType): JSX.Element => {

	return( 
        
    <div className="ticket">

        <div className="ticket-header">
            <h1>{price.toLocaleString()} Р</h1>
            <div className="ticket-logo">
                <TicketLogoSVG />
            </div>
        </div>

        {segments.map(segment => { 
            return (
                <div key={segment.duration} className="ticket-info">
                    <div>
                        <h2>{segment.origin}-{segment.destination}</h2>
                        <span>{dateCreactorUtil(segment.date, segment.duration )}</span>
                    </div>
                    <div>
                        <h2>в пути</h2>
                        <span>{durationCreatorUtil(segment.duration)}</span>
                    </div>
                    <div>
                        <h2>
                            {segment.stops.length === 0
                            ? "Без пересадок" 
                            : segment.stops.length + `${segment.stops.length === 1? " пересадка": " пересадки" }`}
                        </h2>
                        <span>{segment.stops.length !== 0? segment.stops.toString() :"-"}</span>
                    </div>
                </div>
            )
        })}
    </div>);
};
