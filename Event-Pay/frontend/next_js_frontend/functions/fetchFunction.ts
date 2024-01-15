// https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#loading-environment-variables
const api_key = process.env.API_KEY || 'testapik-9c7d-444d-8bf1-e3f125ba72b2'

export default async function fetchData(func: string, data: any) {
    data["test_key"] = api_key

    switch (func) {
        case 'reg':
            console.log('register', data);

            const value_reg = await fetch('http://localhost:4000/admin/add', {
                method: 'POST',
                credentials: 'omit',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(data => data.json())
                .then(data => data)

            return value_reg

        case 'log':
            console.log('login', data);

            const value_log = await fetch('http://localhost:4000/admin/get', {
                method: 'POST',
                credentials: 'omit',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(data => data.json())
                .then(data => data)

            console.log('value_log', value_log);

            return value_log
    }
}