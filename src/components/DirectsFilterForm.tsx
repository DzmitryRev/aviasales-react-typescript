import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useFilterForm } from "../hooks/useFilterForm";

// Тип объекта чекбоксов
export type InputsType = {
    name: string,
    text: string, 
    checked: boolean,
    id: number,
    all?: boolean
}

// чекбоксы
const inputs: InputsType[] = [
    {name: "all", text: "Все", checked: true, id: 1, all: true}, // имеет поле all, что означает что выбирает все.
    {name: "withoutDirects", text: "Без пересадок", checked: false, id: 2},
    {name: "oneDirect", text: "1 Пересадка", checked: false, id: 3},
    {name: "twoDirect", text: "2 Пересадки", checked: false, id: 4},
    {name: "threeDirect", text: "3 Пересадки", checked: false, id: 5}
]

// Типы для props DirectsForm 
type DirectsFilterFormType = {
    setSelectedDirectsInputs:  Dispatch<SetStateAction<never[]>>
}

export const DirectsFilterForm = ({setSelectedDirectsInputs}: DirectsFilterFormType): JSX.Element => {

    const {inputsValue, onChangeInputsValue, selectedInputs} = useFilterForm(inputs)

    // По монтированию или изменению selectedInputs и отправляет его в App
    // App принимает его и применяет манипуляции для изменения исходного массива tickets
    useEffect(() => {
        setSelectedDirectsInputs(selectedInputs)
    }, [selectedInputs, setSelectedDirectsInputs])

	return (
        <form>
            {inputsValue.map((input, index) => {
                return (
                    <React.Fragment key={input.id.toString()}>
                        <input     
                            type='checkbox'
                            className='custom-checkbox'
                            id={input.name}
                            name={input.name}
                            checked={input.checked}
                            onChange={() => {
                                onChangeInputsValue(input.name)
                            }}
                        />
                        <label htmlFor={input.name}>{input.text}</label>
                    </React.Fragment>
                )
            })}
        </form>
      
	);
};



