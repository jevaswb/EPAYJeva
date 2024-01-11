require('dotenv')
const api_key = 'f19f3113-c6ae-409a-9ab7-c3ee49a9f55e'

export default async function fetchData(func: string, data: any) {
    data["test_key"] = api_key

    switch (func) {
        case 'reg':
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
            
            return value_log
    }
}