import { Dispatch, useEffect, useState } from "react"


type FilterPropsType = {
    className?: string,
    handlerChange: Dispatch<string[]>
}

export const Filter = ({className, handlerChange}: FilterPropsType) => {
    const [selectedFilters, setSelectedFilter] = useState([])
    useEffect(() => {
        handlerChange(selectedFilters)
    }, [selectedFilters, handlerChange])
    return (
        <div className={className}>
			
		</div>
    )
}