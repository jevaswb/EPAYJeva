const api_key = 'f19f3113-c6ae-409a-9ab7-c3ee49a9f55e'

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