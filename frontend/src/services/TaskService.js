import { baseUrl } from './url'
import { useFetchWrapper } from "../util/fetch-wrapper";

export function TaskService() {
    const fetchWarpper = useFetchWrapper();
    const url = baseUrl + "/task/"
    return {
        getAll,
        getUserByJWT,
        getUserDoneByJWT,
        remove,
        done
    }
    function getAll() {
        return fetchWarpper.get(url + 'all/');
    }
    function getUserByJWT() {
        return fetchWarpper.get(url + 'user/');
    }
    function getUserDoneByJWT() {
        return fetchWarpper.get(url + 'userdone/');
    }
    function remove(id) {
        return fetchWarpper.post(url + 'remove/', {_id: id})
    }
    function done(id) {
        return fetchWarpper.post(url + 'done/', {_id: id})
    }

}



