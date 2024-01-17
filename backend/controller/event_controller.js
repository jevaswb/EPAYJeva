const db = require('../postgre_config')
const { check_key } = require('../functions');
const { json } = require('express');
const crypto = require('crypto');

const getAllEventNames = (req, res, next) => {  //post
    const test_key = req.body.test_key

    if (check_key(test_key)) { res.status(500).json(JSON.stringify('Something went wrong. Please try again later')); return }

    const user_id = req.body.user_id // todo
    const query = `select name from "event" inner join "admin" a on a.id = event.created_by where a.id = $1 order by name asc;`
    db.postgre.query(query, [user_id], (error, result) => {
        if (error) {
            //throw new Error(error.Error)
            res.status(500).json(JSON.stringify('Something went wrong. Please try again later'))
            return
        }
        res.status(200).json(result.rows)
    })
}

const getEvent = (req, res, next) => {  //post
    const test_key = req.body.test_key

    if (check_key(test_key)) { res.status(500).json(JSON.stringify('Something went wrong. Please try again later')); return }

    const user_id = req.body.user_id // todo
    const event_name = req.body.event_name

    const query = `select e.id, e.name, e.date, e.start_time, e.price, e.currency from event e inner join admin a on a.id = e.created_by where a.id = $1 AND e.name = $2;`
    db.postgre.query(query, [user_id, event_name], (error, result) => {
        if (error) {
            //throw new Error(error.Error)
            res.status(500).json(JSON.stringify('Something went wrong. Please try again later'))
            return
        }

        if (result.rowCount === 0) {
            res.status(404).json('404 - Event Not found')
            return
        }

        if (result.rowCount !== 1) {
            res.status(405).json(JSON.stringify('Data-response rejected! - Something went wrong. Please try again later'))
            return
        }
        res.status(200).json(result.rows.pop())
    })
}

const createEvent = (req, res, next) => { //post
    const test_key = req.body.test_key

    if (check_key(test_key)) { res.status(500).json(JSON.stringify('Something went wrong. Please try again later')); return }

    const user_id = req.body.user_id // todo
    const event_name = req.body.event_name
    const date = req.body.date
    const start_time = req.body.start_time
    const price = req.body.price
    const currency = req.body.currency

    if (price < 0) {
        res.status(400).json(JSON.stringify('Param price is negative!'))
        return
    }

    const query = `insert into event(id, created_by, name, date, start_time, price, currency) values ($1,$2,$3,$4,$5,$6,$7);`
    db.postgre.query(query, [crypto.randomUUID(), user_id, event_name, date, start_time, price, currency], (error, result) => {
        if (error) {
            //console.error(error)
            res.status(500).json(JSON.stringify('Something went wrong. Please try again later'))
            return
        }
        res.status(200).json(JSON.stringify('Event successfully created'))
    })
}

//todo do not work like i want -> if row does not exists - del is successful (but if it has an allocation i am not sure)
const deleteEvent = (req, res, next) => {  //delete
    const test_key = req.body.test_key

    if (check_key(test_key)) { res.status(500).json(JSON.stringify('Something went wrong. Please try again later')); return }

    const user_id = req.body.user_id // todo
    const event_name = req.body.event_name
    const query = `delete from event where created_by = $1  AND name = $2 ;`
    db.postgre.query(query, [user_id, event_name], (error, result) => {
        if (error) {
            console.log(error)
            //throw new Error(error.Error)
            res.status(500).json(JSON.stringify('Something went wrong and participant could not be removed. Please try again later'))
        }
        res.status(200).json(JSON.stringify('Event successfully removed'))
    })

}

//todo improve error-messages - (duplication -> unique values)
const editName = (req, res, next) => {  //put
    const test_key = req.body.test_key

    if (check_key(test_key)) { res.status(500).json(JSON.stringify('Something went wrong. Please try again later')); return }

    const user_id = req.body.user_id // todo
    const event_id = req.body.event_id
    const event_name = req.body.evnt_name  //new name

    const query = `update event set name= $1 where created_by = $2  AND id = $3 ;`
    db.postgre.query(query, [event_name, user_id, event_id], (error, result) => {
        if (error) {
            //throw new Error(error.Error)
            res.status(500).json(JSON.stringify('Something went wrong and name could not be updated. Please try again later'))

        }
        res.status(200).json(JSON.stringify('Event name successfully updated'))
    })
}

const editDate = (req, res, next) => {  //put
    const test_key = req.body.test_key

    if (check_key(test_key)) { res.status(500).json(JSON.stringify('Something went wrong. Please try again later')); return }

    const user_id = req.body.user_id // todo
    const event_id = req.body.event_id
    const date = req.body.date  //new date

    const query = `update event set date= $1 where created_by = $2  AND id = $3 ;`
    db.postgre.query(query, [date, user_id, event_id], (error, result) => {
        if (error) {
            //throw new Error(error.Error)
            res.status(500).json(JSON.stringify('Something went wrong and date could not be updated. Please try again later'))

        }
        res.status(200).json(JSON.stringify('Event date successfully updated'))
    })
}

const editStartTime = (req, res, next) => {  //put
    const test_key = req.body.test_key

    if (check_key(test_key)) { res.status(500).json(JSON.stringify('Something went wrong. Please try again later')); return }

    const user_id = req.body.user_id // todo
    const event_id = req.body.event_id
    const start_time = req.body.start_time  //new start_time

    const query = `update event set start_time= $1 where created_by = $2  AND id = $3 ;`
    db.postgre.query(query, [start_time, user_id, event_id], (error, result) => {
        if (error) {
            //throw new Error(error.Error)
            res.status(500).json(JSON.stringify('Something went wrong and start_time could not be updated. Please try again later'))

        }
        res.status(200).json(JSON.stringify('Event start_time successfully updated'))
    })
}

const editPrice = (req, res, next) => {  //put
    const test_key = req.body.test_key

    if (check_key(test_key)) { res.status(500).json(JSON.stringify('Something went wrong. Please try again later')); return }

    const user_id = req.body.user_id // todo
    const event_id = req.body.event_id
    const price = req.body.price  //new price

    const query = `update event set price= $1 where created_by = $2  AND id = $3 ;`
    db.postgre.query(query, [price, user_id, event_id], (error, result) => {
        if (error) {
            //throw new Error(error.Error)
            res.status(500).json(JSON.stringify('Something went wrong and price could not be updated. Please try again later'))

        }
        res.status(200).json(JSON.stringify('Event price successfully updated'))
    })
}
const editCurrency = (req, res, next) => {  //put
    const test_key = req.body.test_key

    if (check_key(test_key)) { res.status(500).json(JSON.stringify('Something went wrong. Please try again later')); return }

    const user_id = req.body.user_id // todo
    const event_id = req.body.event_id
    const currency = req.body.currency  //new currency

    const query = `update event set currency= $1 where created_by = $2  AND id = $3 ;`
    db.postgre.query(query, [currency, user_id, event_id], (error, result) => {
        if (error) {
            //throw new Error(error.Error)
            res.status(500).json(JSON.stringify('Something went wrong and currency could not be updated. Please try again later'))

        }
        res.status(200).json(JSON.stringify('Event currency successfully updated'))
    })
}

const getInfoOfParticipantsFromEvent = (req, res, next) => {  //post
    const test_key = req.body.test_key

    if (check_key(test_key)) { res.status(500).json(JSON.stringify('Something went wrong. Please try again later')); return }

    const user_id = req.body.user_id // todo
    const event_name = req.body.event_name

    const query = `select p.email, p.screen_name, ep.is_payed, e.name, e.date, e.start_time, e.price, e.currency
        from participant p
            inner join admin a on a.id = p.created_by
            inner join event_participant ep on p.id = ep.participant_id
            inner join event e on e.id = ep.event_id
            where e.name = $1 AND a.id = $2;`
    db.postgre.query(query, [event_name, user_id], (error, result) => {
        if (error) {
            //throw new Error(error.Error)
            res.status(500).json(JSON.stringify('Something went wrong. Please try again later'))
            return
        }
        res.status(200).json(result.rows)
    })
}
const contains = (req, res, next) => {  //post
    const test_key = req.body.test_key

    if (check_key(test_key)) { res.status(500).json(JSON.stringify('Something went wrong. Please try again later')); return }

    const user_id = req.body.user_id // todo
    const name = req.body.name

    const query = `select e.name from "event" e inner join "admin" a on a.id = e.created_by where e.name = $1 AND a.id = $2;`
    db.postgre.query(query, [name, user_id], (error, result) => {
        if (error) {
            //throw new Error(error.Error)
            res.status(500).json(JSON.stringify('Something went wrong. Please try again later'))
            return
        }
        if (result.rowCount === 0) {
            res.status(200).json((false))
            return
        }
        switch (result.rowCount) {
            case 0: res.status(200).json((false)); return
            case 1: res.status(200).json((true)); return
            default: res.status(405).json(JSON.stringify('Data-response rejected! - Something went wrong. Please try again later')); return
        }
    })
}


module.exports = {
    getAllEventNames,
    getEvent,
    deleteEvent,
    createEvent,
    editCurrency,
    editDate,
    editName,
    editPrice,
    editStartTime,
    getInfoOfParticipantsFromEvent,
    contains
}

