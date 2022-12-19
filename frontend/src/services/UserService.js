import { baseUrl } from './url'

export async function remove() {
  try {
    let token = localStorage.getItem('token');
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', token);
    let res = await fetch(baseUrl + "/user/remove", {
      method: "POST",
      headers: myHeaders
    });
    console.log(res)
  } catch (err) {
    console.log(err);
  }
}