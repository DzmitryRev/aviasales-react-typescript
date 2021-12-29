import { useEffect, useState } from "react";
import { DirectsFilterBar, TicketsBlock } from "./components";
import LogoSVG from "./assets/LogoSVG";
import Loader from './assets/Loader.svg'
import useFetch from "use-http"
import { directFilterUtil } from "./hooks/useFilterForm";



import {Sorter, SorterCriterion} from "./modules/sorter_module/Sorter_Module_TS";
import { topFilterSortingUtil } from "./utils/UtilsForTopFilter";
import { Filter, FilterField } from "./modules/checkbox_filter_module/Filter_Module_TS";


//Типы ответа api
export type SegmentType = {
    origin: string
    destination: string
    date: string
    stops: string[]
    duration: number
}

export type TicketType = {
    price: number,
    carrier: string,
    segments: Array<SegmentType>
} 

function App(): JSX.Element {

    // use http запрос в папке trash можно найти аналогичный fetch запрос
    const {get, response, loading, error} = useFetch("https://front-test.beta.aviasales.ru")
    // билеты, готовые к сортировке и филтрации
    const [tickets, setTickets] = useState<Array<TicketType> | undefined>([])
    // массив выбранных чекбоксов пересадок
    const [selectedDirectsInputs, setSelectedDirectsInputs] = useState([])
    // Выбранный критерий для сортировки
    const [sortingCritetion, setSortingCritetion] = useState<string>("")
    // Запрос за searchId и сразу же за билетами, результат сохраняется в localStorage 
    useEffect(() => {
        async function getTickets() {
            const searchIdResponse = await get("/search")
            if(!response.ok) return
            const initialTickets = await get(`/tickets=?searchId=${searchIdResponse.searchId}`)
            if(!response.ok) {
                return
            }
            localStorage.setItem("data", JSON.stringify(initialTickets.tickets)) // сохраняем в localStorage
            setTickets(JSON.parse(localStorage.getItem("data") || "[]")) // достаем из localStorage и устанавливаем в хук tickets
        }
        getTickets()

        return localStorage.clear() //При размонтировании очищаем localStorage
    }, [get, response])

    // При монтировании и именении массива активных чекбоксов selectedDirectsInputs вызывается функция фильтрующая tickets в 
    // соответствии с выбранными чекбоксами
    useEffect(() => {
        setTickets(directFilterUtil(selectedDirectsInputs, JSON.parse(localStorage.getItem("data") || '[]')))
    }, [selectedDirectsInputs])

   function test(tr: any) {
        console.log(tr)
    }
    return (
		<div className='app'>


			<div className='container'>
				<div className='logo-container'>	
    				<LogoSVG />
				</div>
				<main className='main'>
                <section className='left-section'>
                        <DirectsFilterBar setSelectedDirectsInputs={setSelectedDirectsInputs} />
					</section>
					<section className='right-section'>

                        <Sorter handlerChange={test} className="top-filter-bar">
                            <SorterCriterion name="faster" className="cri">самый быстрый</SorterCriterion>
                            <SorterCriterion name="cheaper" active={true} className="cri">самый дешевый</SorterCriterion>   
                            <SorterCriterion name="chear" className="cri">самый дешевый</SorterCriterion> 
                            <SorterCriterion name="cher" className="cri">самый дешевый</SorterCriterion> 
                            <SorterCriterion name="chr" className="cri">самый дешевый</SorterCriterion> 
                            <SorterCriterion name="cr" className="cri">самый дешевый</SorterCriterion> 

                        </Sorter>
                        
                        {
                            error 
                            && <div>
                                    <div>Ошибка загрузки. Попробуйте снова.</div>
                                    <br />
                                    <button onClick={() => {
                                        // fetchData()
                                    }}>Перезагрузка</button>
                                </div>
                        }

                        {
                            loading
                            ? <div className="loader-container"><img src={Loader} alt="loading" /></div>
                            : <TicketsBlock tickets={topFilterSortingUtil(sortingCritetion,tickets)} />
                        }

					</section>
				</main>
			</div>
		</div>
	);
}

export default App;
