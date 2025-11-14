import Seance from "../seance"


export default interface ISeanceService {
    getSeances:() => Promise<Seance[]>,
    addSeance:(seance: Seance) => Promise<void>    
}