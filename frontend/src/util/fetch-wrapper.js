export function useFetchWrapper() {
    return {
        get: request("GET"),
        post: request("POST"),
        put: request("PUT"),
        delete: request("DELETE")
    };
    function request(method) {
        let token = localStorage.getItem('token');
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', token);
        return async (url, body) => {

            const requestOptions = {
                method,
                headers: myHeaders 
            };
            if (body) {
                requestOptions.headers["Content-Type"] = "application/json";
                requestOptions.body = JSON.stringify(body);
            }
            const response = await fetch(url, requestOptions);
            return handleResponse(response);
        };
    }

    function handleResponse(response) {
        return response.text().then((text) => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            return data;
        });
    }
}