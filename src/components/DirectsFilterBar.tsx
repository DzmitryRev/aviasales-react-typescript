import { Dispatch, SetStateAction } from "react";
import { DirectsFilterForm } from ".";

// типы для DirectsFilterBar
type DirectsFilterBarType = {
    setSelectedDirectsInputs: Dispatch<SetStateAction<never[]>>
}

export const DirectsFilterBar = ({setSelectedDirectsInputs}: DirectsFilterBarType): JSX.Element => {
	return (
		<div className='direct-filter-bar'>
			<h1>количество пресадок</h1>
            <DirectsFilterForm setSelectedDirectsInputs={setSelectedDirectsInputs} />
		</div>
	);
};
