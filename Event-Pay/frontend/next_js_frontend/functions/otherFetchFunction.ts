import { Currency, Data, ReturnObject } from "@/ts_classes/ts_export_classes"

const api_key: string = 'f19f3113-c6ae-409a-9ab7-c3ee49a9f55e'


//todo
export default function hallo() {
    console.log("default func")
}
export async function participantOrEventInfoFetch(user: string, screen_name: string, participant: boolean): Promise<any> {
    //error messages
    const error0 = `Person isn't assigned to any event`
    const error1 = `Event isn't assigned to any person`
    const errorObject = { error: true, message: `` }

    let values: object[] = []

    const body = new Data(api_key, user);
    body.screen_name = screen_name;
    body.event_name = screen_name;

    const optionFetch: any = {
        method: 'POST',
        credentials: 'omit',
        mode: 'cors',//cors, no-cors, *cors, same-origin
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    }

    if (participant) {
        const responese = await fetch('http://localhost:4000/participant/search', optionFetch)
        const data = await responese.json()
        //error handling
        if (!responese.ok) {
            errorObject.message = data
            return errorObject
        }
        if (data.length === 0) {  //no events found for that person
            errorObject.message = error0
            return errorObject
        }
        //ok handling
        console.log("print-p", data)
        return data
    }
    else {
        const responese = await fetch('http://localhost:4000/event/search', optionFetch)
        const data = await responese.json()
        //error handling
        if (!responese.ok) {
            errorObject.message = data
            return errorObject
        }
        //console.log("print-e",data)
        if (data.length === 0) {  //no events found for that person
            errorObject.message = error1
            return errorObject
        }
        //ok handling
        console.log("print-e", data)
        return data
    }
}
export async function DBcontains(user: string, name: string): Promise<any> {
    //error messages
    const error0 = `Searched input not found _ 404 - Not found`
    const errorObject = { error: true, message: `` }

    const body = new Data(api_key, user);
    body.name = name;

    const optionFetch: any = {
        method: 'POST',
        credentials: 'omit',
        mode: 'cors',//cors, no-cors, *cors, same-origin
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    }

    const responeseEvent = await fetch('http://localhost:4000/event/contain', optionFetch)
    let dataEvent = await responeseEvent.json()
    const responeseParticipant = await fetch('http://localhost:4000/participant/contain', optionFetch)
    let dataParticipant = await responeseParticipant.json()

    //console.log("conatin methode - event: ", dataEvent, " partic: ", dataParticipant)
    //console.log(typeof dataEvent, typeof dataParticipant)

    //error handling
    if (!responeseEvent.ok) {
        errorObject.message = dataEvent
        return errorObject
    }
    //error handling
    if (!responeseParticipant.ok) {
        errorObject.message = dataParticipant
        return errorObject
    }
    //check that the return values are booleans otherwise the statments below do not work correct
    if ((typeof dataParticipant != "boolean") || (typeof dataEvent != "boolean")) {
        errorObject.message = `Error - That should not happen, please contact the software engineers!`
        return errorObject
    }
    //error handling
    if (!dataEvent && !dataParticipant) { // both are false
        errorObject.message = error0
        return errorObject
    }

    if (dataEvent && dataParticipant) {
        return "both"
    }
    if (dataEvent && !dataParticipant) {
        return "event"
    }
    //( ( dataEvent && dataParticipant ) ? "both" : (dataEvent && !dataParticipant) ? "event"  : "participant")
    return "participant"
}
export async function getNeededDatafromAdmin(email: string): Promise<any> {
    //error messages
    const returnObject = { error: false, data: null, message: null }

    const body = new Data(api_key, ``);
    body.email = email;

    const optionFetch: any = {
        method: 'POST',
        credentials: 'omit',
        mode: 'cors',//cors, no-cors, *cors, same-origin
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    }

    const responese = await fetch('http://localhost:4000/admin/getKey', optionFetch)
    const data = await responese.json()
    //error handling
    if (!responese.ok) {
        returnObject.error = true
        returnObject.message = data
        return returnObject
    }
    //ok handling
    returnObject.data = data
    //console.log("needed admin data return object", returnObject, data)
    return returnObject
}

export async function payAnEvent(email: string, screen_name: string, event_name: string): Promise<ReturnObject> {
    //get admin key //todo this in all files (fetch-files where the admin id is needed)
    const responeseAdminKey = await getNeededDatafromAdmin(email)
    if (responeseAdminKey.error) {
        return responeseAdminKey
    }
    const user = JSON.parse(responeseAdminKey.data)
    //console.log("user", user, responeseAdminKey)

    //return object
    const returnObject: ReturnObject = { error: false, data: null, message: null }

    //post data package
    const body = new Data(api_key, user);
    body.screen_name = screen_name;
    body.event_name = event_name

    const optionFetch: any = {
        method: 'POST',
        credentials: 'omit',
        mode: 'cors',//cors, no-cors, *cors, same-origin
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    }
    //console.log(body)
    //get participant key
    const responesePKey = await fetch('http://localhost:4000/participant/get', optionFetch)
    const dataPKey = await responesePKey.json()
    if (!responesePKey.ok) {
        returnObject.error = true
        returnObject.message = dataPKey
        return returnObject
    }

    //get event key
    const responeseEKey = await fetch('http://localhost:4000/event/get', optionFetch)
    const dataEKey = await responeseEKey.json()
    if (!responeseEKey.ok) {
        returnObject.error = true
        returnObject.message = dataEKey
        return returnObject
    }


    body.participant_id = dataPKey.id
    body.event_id = dataEKey.id

    //update body of optionFetch
    optionFetch.body = JSON.stringify(body)


    const responese = await fetch('http://localhost:4000/participant/pay', optionFetch)
    const data = await responese.json()
    //error handling
    if (!responese.ok) {
        returnObject.error = true
        returnObject.message = data
        return returnObject
    }
    //ok handling
    returnObject.data = data
    return returnObject
}
export async function addParticipant(adminEmail: string, screen_name: string, email: string): Promise<ReturnObject> {
    //get admin key 
    const responeseAdminKey = await getNeededDatafromAdmin(adminEmail)
    if (responeseAdminKey.error) {
        return responeseAdminKey
    }
    const user = JSON.parse(responeseAdminKey.data)
    //console.log("user", user,responeseAdminKey)

    //return object
    const returnObject: ReturnObject = { error: false, data: null, message: null }

    //post data package
    const body = new Data(api_key, user);
    body.screen_name = screen_name;
    body.email = email

    const optionFetch: any = {
        method: 'POST',
        credentials: 'omit',
        mode: 'cors',//cors, no-cors, *cors, same-origin
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    }
    //console.log(body)
    //add participant
    const responese = await fetch('http://localhost:4000/participant/add', optionFetch)
    const data = await responese.json()

    //error handling
    if (!responese.ok) {
        returnObject.error = true
        returnObject.message = data
        return returnObject
    }
    //ok handling
    returnObject.data = data
    return returnObject
}

export async function addEvent(adminEmail: string, event_name: string, event_date: string, start_time: string, currency: Currency, price: number): Promise<ReturnObject> {
    //get admin key 
    const responeseAdminKey = await getNeededDatafromAdmin(adminEmail)
    if (responeseAdminKey.error) {
        return responeseAdminKey
    }
    const user = JSON.parse(responeseAdminKey.data)
    //console.log("user", user,responeseAdminKey)

    //return object
    const returnObject: ReturnObject = { error: false, data: null, message: null }

    //post data package
    //event_name, date, start_time, currency - (€,$,£), price
    const body = new Data(api_key, user);
    body.event_name = event_name
    body.date = event_date
    body.start_time = start_time
    body.currency = currency
    body.price = price


    const optionFetch: any = {
        method: 'POST',
        credentials: 'omit',
        mode: 'cors',//cors, no-cors, *cors, same-origin
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    }
    
    //add event
    const responese = await fetch('http://localhost:4000/event/add', optionFetch)
    const data = await responese.json()

    //error handling
    if (!responese.ok) {
        returnObject.error = true
        returnObject.message = data
        return returnObject
    }
    //ok handling
    returnObject.data = data
    return returnObject
}

export async function createAllocation(adminEmail: string, screen_name: string, event_name: string): Promise<ReturnObject> {
    //get admin key
    const responeseAdminKey = await getNeededDatafromAdmin(adminEmail)
    if (responeseAdminKey.error) {
        return responeseAdminKey
    }
    const user = JSON.parse(responeseAdminKey.data)

    //return object
    const returnObject: ReturnObject = { error: false, data: null, message: null }

    //post data package
    const body = new Data(api_key, user);
    body.screen_name = screen_name;
    body.event_name = event_name

    const optionFetch: any = {
        method: 'POST',
        credentials: 'omit',
        mode: 'cors',//cors, no-cors, *cors, same-origin
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    }

    //get participant key
    const responesePKey = await fetch('http://localhost:4000/participant/get', optionFetch)
    const dataPKey = await responesePKey.json()
    if (!responesePKey.ok) {
        returnObject.error = true
        returnObject.message = dataPKey
        return returnObject
    }

    //get event key
    const responeseEKey = await fetch('http://localhost:4000/event/get', optionFetch)
    const dataEKey = await responeseEKey.json()
    if (!responeseEKey.ok) {
        returnObject.error = true
        returnObject.message = dataEKey
        return returnObject
    }


    body.participant_array = [dataPKey.id]
    body.event_array = [dataEKey.id]

    //update body of optionFetch
    optionFetch.body = JSON.stringify(body)


    const responese = await fetch('http://localhost:4000/allocation/add', optionFetch)
    const data = await responese.json()
    //error handling
    if (!responese.ok) {
        returnObject.error = true
        returnObject.message = data
        return returnObject
    }
    //ok handling
    returnObject.data = data
    return returnObject

}

export type Choose = "event" | "participant" | "both"

export async function datalistFetch(option: Choose, adminEmail: string): Promise<ReturnObject> {
    //get admin key
    const responeseAdminKey = await getNeededDatafromAdmin(adminEmail)
    if (responeseAdminKey.error) {
        return responeseAdminKey
    }
    const user = JSON.parse(responeseAdminKey.data)
    //return object
    const returnObject: ReturnObject = { error: false, data: null, message: null }

    const optionFetch: any = {
        method: 'POST',
        credentials: 'omit',
        mode: 'cors',//cors, no-cors, *cors, same-origin
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(new Data(api_key, user)) //post data package
    }

    if (option === "participant" || option === "both") {
        const responese = await fetch('http://localhost:4000/participant/getAllScreenNames', optionFetch)

        if (!responese.ok) {
            returnObject.error = true
            returnObject.message = await responese.json() //should be a string
            return returnObject
        }

        const data: any[] = await responese.json()

        returnObject.data = data.map(d => d.screen_name)

        if (option === "participant") {
            return returnObject
        }

    }
    if (option === "event" || option === "both") {
        const responese = await fetch('http://localhost:4000/event/getAllNames', optionFetch)

        if (!responese.ok) {
            returnObject.error = true
            returnObject.message = await responese.json() //should be a string
            return returnObject
        }

        const data: any[] = await responese.json()

        if (option === "event") {
            returnObject.data = data.map(d => d.name)
            return returnObject
        }
        returnObject.data.push(...data.map(d => d.name))
    }
    
    return returnObject
}
