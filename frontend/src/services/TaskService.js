import { baseUrl } from './url'

export async function getAll() {
    let d;
    try {
        await fetch(baseUrl+"/task/all", {
            method: "GET"
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

export async function getUserByJWT() {
    let d;
    let token = localStorage.getItem('token');
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', token);

    try {
        await fetch(baseUrl+"/task/user", {
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

export async function getUserDoneByJWT() {
    let d;
    let token = localStorage.getItem('token');
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', token);

    try {
        await fetch(baseUrl+"/task/userdone", {
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

export async function remove(id) {
    try {
        let token = localStorage.getItem('token');
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', token);
        let res = await fetch(baseUrl + "/task/remove", {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({
                _id: id,
            }),
        });
        console.log(res)
    } catch (err) {
        console.log(err);
    }
}


export async function done(id) {
    try {
        let token = localStorage.getItem('token');
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', token);
        let res = await fetch(baseUrl+"/task/done", {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({
                _id: id,
            }),
        });
        console.log(res)
    } catch (err) {
        console.log(err);
    }
}
