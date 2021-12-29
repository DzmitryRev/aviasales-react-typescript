import { Ticket } from ".";
import { TicketType } from "../App"; //Типа Ticket
// type TicketType = {
//     price: number,
//     carrier: string,
//     segments: Array<SegmentType>
// } 

// типы Props для TicketsBlock
type TicketsBlockPropsType = {
    tickets: TicketType[] | undefined
}


export const TicketsBlock = ({tickets = []}: TicketsBlockPropsType ): JSX.Element => {
	return (
		<div>
			{tickets.map((item, index) => {
               if(index <= 10) {
                    return  <Ticket key={item.price.toString() + index} price={item.price} segments={item.segments}/>
               }
               return null;
            })}
		</div>
	);
};
