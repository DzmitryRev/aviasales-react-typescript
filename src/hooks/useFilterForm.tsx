import { useEffect, useState } from "react"
import { TicketType } from "../App"
import { InputsType } from "../components"


//Модуль принимает на входе массив объектов инпутов
//Тип объектов в массиве: 
// type InputsType = {
//     name: string,
//     text: string, 
//     checked: boolean,
//     id: number,
//     all?: boolean
// }
// есть callback для изменения состояния полей - onChangeInputsValue
// useEffect отслеживает изменения inputsValue и формирует массив строк активныв чекбоксов

export const useFilterForm = (inputs: InputsType[]) => {
    const [inputsValue, setInputsValue] = useState(inputs)
    const [selectedInputs, setSelectedInputs] = useState([])

    useEffect(() => {
        let result: any = []
        inputsValue.forEach(item => {
            if(item.checked === true) {
                result.push(item.name)
            }
        })
        setSelectedInputs(result)
    }, [inputsValue, setSelectedInputs])

    const onChangeInputsValue = (name: any) => {
        const copy = inputsValue.map(input => {
            return {...input}
        })
        const elementToChange = copy.find(item => item.name === name)
        if(elementToChange?.all && elementToChange.checked === true) {
            return
        }
        if(elementToChange?.all && elementToChange.checked === false) {
            copy.forEach(item => {
                if(!item.all) {
                    item.checked = false
                } else {
                    item.checked = !item.checked
                }
            })
            setInputsValue(copy)
            return
        }
        if(!elementToChange?.all && elementToChange?.checked === false) {
            copy.forEach(item => {
                if(item.name === name) {
                    item.checked = true
                }
                if(item.all) {
                    item.checked = false
                }
            })
            setInputsValue(copy)
            return
        }
        if(!elementToChange?.all && elementToChange?.checked === true) {
            let checkedInputs = []
            copy.forEach(item => {
                if(!item.all && item.checked === true && item.name !== name) {
                    checkedInputs.push(item.name)
                }
            })
            copy.forEach(item => {
                if(item.name === name) {
                    item.checked = false
                }
                if(item.all && checkedInputs.length === 0) {
                    item.checked = true
                }
            })
            setInputsValue(copy)
            return
        }
    }

    return {inputsValue, onChangeInputsValue, selectedInputs}
}


// Утилита для сортировки
// Принимает массив активных чекбоксов и массив билетов типа TicketType
// case содержат имена чекбоксов и функции для обработки 


export function directFilterUtil(selectedInputs: string[], items: TicketType[]) {
    let data = items
    let result: any = []
    if(selectedInputs.length === 0) {
        return
    }
    selectedInputs.forEach((item: string) => {
        switch (item) {
            case "all": {
                result = data
                return 
            }
            case "withoutDirects": {
                result = [...result, ...data?.filter((item: any) => item.segments[0].stops.length === 0 )] 
                return 
            }
            case "oneDirect": {
                result = [...result, ...data?.filter((item: any) => item.segments[0].stops.length === 1 )]
                return 
            }
            case "twoDirect": {
                result = [...result, ...data?.filter((item: any) => item.segments[0].stops.length === 2 )]
                return 
            }
            case "threeDirect": {
                result = [...result, ...data?.filter((item: any) => item.segments[0].stops.length === 3 )]
                return 
            }
            default: {
                break
            }
        }
    })
    return result
}