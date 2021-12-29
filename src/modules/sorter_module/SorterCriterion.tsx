import { Dispatch, useEffect } from "react"


type SorterCriterionPropsType = {
    name: string,
    active?: boolean,
    className?: string,
    children?: string | JSX.Element[],
    setSelectedSort?: Dispatch<string>,
    selectedSort?: string
}

export const SorterCriterion = ({name, 
                                 active, 
                                 className, 
                                 children, 
                                 setSelectedSort = function () {console.log("err")}, 
                                 ...props }: SorterCriterionPropsType) => {
    useEffect(() => {
        if(active) {
            setSelectedSort(name)
        }
    }, [])
    return (
        <button onClick={() => {setSelectedSort(name)}} className={props.selectedSort === name ? `${className} active` : `${className}`}>
            {children}         
        </button>
    )
}