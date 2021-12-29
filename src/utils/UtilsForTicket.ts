export const durationCreatorUtil = (duration: number) => {
    let hours: number = Math.trunc(duration / 60)
    let minutes: number = 0
    if(duration - hours * 60 !== 0) {
        return `${hours}ч ${duration - hours * 60}м` 
    }
    return `${hours}ч ${minutes}м` 
}

export const dateCreactorUtil = (date: string, duration: number) => {
    let departureTime = new Date(date)
    let arrivalTime = new Date(date)
    arrivalTime.setMinutes(arrivalTime.getMinutes() + duration)
    
    const result = `
                   ${departureTime.getHours()}:${departureTime.getMinutes().toString().length === 1?`0${departureTime.getMinutes()}`:departureTime.getMinutes()}
                   - 
                   ${arrivalTime.getHours()}:${arrivalTime.getMinutes().toString().length === 1?`0${arrivalTime.getMinutes()}`:arrivalTime.getMinutes()} `
    return result
}