import { baseUrl } from './url'
import { useFetchWrapper } from "../util/fetch-wrapper";


export function TaskHistoryService() {
    const fetchWarpper = useFetchWrapper();
    const url = baseUrl +"/historytask/"
    return{
        getHistory
    }
    function getHistory() {
        return fetchWarpper.get(url + 'user/');
    }
}