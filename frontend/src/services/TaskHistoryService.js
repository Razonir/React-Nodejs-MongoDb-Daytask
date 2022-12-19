import { baseUrl } from './url'

export async function getHistory() {
    let d;
    let token = localStorage.getItem('token');
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', token);

    try {
        await fetch(baseUrl + "/historytask/user", {
            method: "GET",
            headers: myHeaders
        })
            .then((response) => response.json())
            .then((data) => {
                d = data;
            });
        return d;
    } catch (err) {
        return []
    }
}
