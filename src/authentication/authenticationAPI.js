export default async function authenticationAPI(data) {
    const response = await fetch(
        'http://localhost:8080/',
        {
            method: 'POST',
            // mode: app.mode === 'local' ? 'no-cors': 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });
    const successStatuses = [200, 201];
    if (successStatuses.includes(response.status)) {
        return response.json();
    } else {
        throw await response.json();
    }
}