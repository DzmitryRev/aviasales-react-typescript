import { TicketType } from "../App";

export const topFilterSortingUtil = (criterion: string, array: TicketType[] | undefined = []) => {
    if(array.length === 0) {
        return;
    }
    const copy = array.map(item => {
        return {...item}
    })
    switch (criterion) {
        case "cheaper": {
            copy.sort((a, b) => a.price - b.price )
            return copy
        }
        case "faster": {
            copy.sort((a, b) => a.segments[0].duration - b.segments[0].duration )
            return copy
        }
        default: {
            copy.sort((a, b) => a.price - b.price )
            console.log("нет такого критерия")
            return copy
        }
    }
}