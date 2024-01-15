const api_key = process.env.API_KEY || 'testapik-9c7d-444d-8bf1-e3f125ba72b2'

export default async function sendEmail(func: string, data: any) {
    data["test_key"] = api_key

    switch (func) {
        case 'req':
            const value = await fetch('http://localhost:4000/email/request', {
                method: 'POST',
                credentials: 'omit',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(data => data.json())
                .then(data => data)

            return value
    }
}