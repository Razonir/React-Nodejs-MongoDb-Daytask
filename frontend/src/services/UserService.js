import { baseUrl } from './url'
import { useFetchWrapper } from "../util/fetch-wrapper";


export function UserService() {
  const fetchWarpper = useFetchWrapper();
  const url = baseUrl + "/user/"
  return {
    remove
  }
  function remove() {
    return fetchWarpper.post(url + 'remove');
  }
}
