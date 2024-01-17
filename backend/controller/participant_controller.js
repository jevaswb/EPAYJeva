const db = require('../postgre_config')
const { check_key } = require('../functions');
const { json } = require('express');

const getAllParticipantScreenNames = (req, res, next) => {  //post
    const test_key = req.body.test_key

    if (check_key(test_key)) { res.status(500).json(JSON.stringify('Something went wrong. Please try again later')); return }

    const user_id = req.body.user_id // todo
    const query = `select screen_name from "participant" inner join "admin" a on a.id = participant.created_by where a.id = $1 order by screen_name asc;`
    db.postgre.query(query, [user_id], (error, result) => {
        if (error) {
            //throw new Error(error.Error)
            res.status(500).json(JSON.stringify('Something went wrong. Please try again later'))
            return
        }
        res.status(200).json(result.rows)
    })
}

const getParticipant = (req, res, next) => {  //post
    const test_key = req.body.test_key

    if (check_key(test_key)) { res.status(500).json(JSON.stringify('Something went wrong. Please try again later')); return }

    const user_id = req.body.user_id // todo
    const screen_name = req.body.screen_name

    const query = `select p.id, p.email, screen_name from "participant" p inner join "admin" a on a.id = p.created_by where a.id = $1 AND p.screen_name = $2;`
    db.postgre.query(query, [user_id, screen_name], (error, result) => {
        if (error) {
            //throw new Error(error.Error)
            res.status(500).json(JSON.stringify('Something went wrong. Please try again later'))
            return
        }
        
        if(result.rowCount === 0){
            res.status(404).json('404 - Participant Not found')
            return
        }

        if (result.rowCount !== 1) {
            res.status(405).json(JSON.stringify('Data-response rejected! - Something went wrong. Please try again later'))
            return
        }
        res.status(200).json(result.rows.pop())
    })
}

const createParticipant = (req, res, next) => { //post
    const test_key = req.body.test_key

    if (check_key(test_key)) { res.status(500).json(JSON.stringify('Something went wrong. Please try again later')); return }

    const user_id = req.body.user_id // todo
    const email = req.body.email
    const screen_name = req.body.screen_name
    const query = `insert into participant(id, created_by, email, screen_name) values ($1,$2,$3,$4);`
    db.postgre.query(query, [crypto.randomUUID(), user_id, email, screen_name], (error, result) => {
        if (error) {
            //throw new Error(error.Error)
            res.status(500).json(JSON.stringify('Something went wrong. Please try again later'))
            return
        }
        res.status(200).json(JSON.stringify('Participant successfully created'))
    })
}
//todo improve error-messages - (duplication -> unique values)

const editParticipantScreenName = (req, res, next) => { //put
    const test_key = req.body.test_key

    if (check_key(test_key)) { res.status(500).json(JSON.stringify('Something went wrong. Please try again later')); return }

    const user_id = req.body.user_id // todo
    const screen_name = req.body.screen_name
    const participant_id = req.body.participant_id
    const query = `update participant set screen_name= $1 where created_by = $2  AND id = $3 ;`
    db.postgre.query(query, [screen_name, user_id, participant_id], (error, result) => {
        if (error) {
            //throw new Error(error.Error)
            res.status(500).json(JSON.stringify('Something went wrong and screenname could not be updated. Please try again later'))
            return
        }
        res.status(200).json(JSON.stringify('Participant screenname successfully updated'))
    })
}

const editParticipantEmail = (req, res, next) => {  //put
    const test_key = req.body.test_key

    if (check_key(test_key)) { res.status(500).json(JSON.stringify('Something went wrong. Please try again later')); return }

    const user_id = req.body.user_id // todo
    const email = req.body.email
    const participant_id = req.body.participant_id
    const query = `update participant set email= $1 where created_by = $2  AND id = $3 ;`
    db.postgre.query(query, [email, user_id, participant_id], (error, result) => {
        if (error) {
            //throw new Error(error.Error)
            res.status(500).json(JSON.stringify('Something went wrong and email could not be updated. Please try again later'))

        }
        res.status(200).json(JSON.stringify('Participant email successfully updated'))
    })

}

//todo do not work like i want -> if row does not exists - del is successful (but if it has an allocation i am not sure)
const deleteParticpant = (req, res, next) => {  //delete
    const test_key = req.body.test_key

    if (check_key(test_key)) { res.status(500).json(JSON.stringify('Something went wrong. Please try again later')); return }

    const user_id = req.body.user_id // todo
    const screen_name = req.body.screen_name
    const query = `delete from participant where created_by = $1  AND screen_name = $2 ;`
    db.postgre.query(query, [user_id, screen_name], (error, result) => {
        if (error) {
            console.log(error)
            //throw new Error(error.Error)
            res.status(500).json(JSON.stringify('Something went wrong and participant could not be removed. Please try again later'))
        }
        res.status(200).json(JSON.stringify('Participant successfully removed'))
    })

}

const participantPaysEvent = (req, res, next) => {  //post
    const test_key = req.body.test_key

    if (check_key(test_key)) { res.status(500).json(JSON.stringify('Something went wrong. Please try again later')); return }

    const user_id = req.body.user_id // todo
    const participant_id = req.body.participant_id
    const event_id = req.body.event_id

    //check if participant and event is created by the same admin and then checks if this id equals the user_id from the req.body
    const check_user_id = `select e.created_by as user_id from participant p inner join event e on p.created_by = e.created_by where e.id = $1 AND  p.id = $2;
`
    db.postgre.query(check_user_id, [event_id, participant_id], (error, result) => {
        if (error) {
            //throw new Error(error.Error)
            res.status(500).json(JSON.stringify('Something went wrong. Please try again later - That should not happen'))
            return
        }
        if (result.rowCount !== 1) {
            res.status(500).json(JSON.stringify('Something went wrong. Please try again later'))
            return
        }
        if (result.rows[0].user_id !== user_id) {
            res.status(400).json(JSON.stringify('User do not created participant and event!'))
            return
        }

        //actually update from the ispayed value
        const query = `update event_participant set is_payed = True where event_id = $1 AND  participant_id = $2;`
        db.postgre.query(query, [event_id, participant_id], (error, result) => {
            if (error) {
                //throw new Error(error.Error)
                res.status(500).json(JSON.stringify('Something went wrong. Please try again later'))
                return
            }
            res.status(200).json(JSON.stringify('Participant payed Event'))
        })
    })
}

const getInfoOfEventsFromParticipant = (req, res, next) => {  //post
    const test_key = req.body.test_key

    if (check_key(test_key)) { res.status(500).json(JSON.stringify('Something went wrong. Please try again later')); return }

    const user_id = req.body.user_id // todo
    const screen_name = req.body.screen_name

    const query = `select p.email, p.screen_name, ep.is_payed, e.name, e.date, e.start_time, e.price, e.currency
        from participant p
            inner join admin a on a.id = p.created_by
            inner join event_participant ep on p.id = ep.participant_id
            inner join event e on e.id = ep.event_id
            where p.screen_name = $1 AND a.id = $2;`
    db.postgre.query(query, [screen_name, user_id], (error, result) => {
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
    const screen_name = req.body.name

    const query = `select p.screen_name from "participant" p inner join "admin" a on a.id = p.created_by where p.screen_name = $1 AND a.id = $2;`
    db.postgre.query(query, [screen_name, user_id], (error, result) => {
        if (error) {
            //throw new Error(error.Error)
            res.status(500).json(JSON.stringify('Something went wrong. Please try again later'))
            return
        }
        if(result.rowCount === 0){
            res.status(200).json((false))
            return
        }
        switch(result.rowCount){
            case 0: res.status(200).json((false)); return
            case 1: res.status(200).json((true)); return
            default: res.status(405).json(JSON.stringify('Data-response rejected! - Something went wrong. Please try again later')); return
        }
    })
}





module.exports = {
    getAllParticipantScreenNames,
    createParticipant,
    editParticipantScreenName,
    editParticipantEmail,
    deleteParticpant,
    getParticipant,
    participantPaysEvent,
    getInfoOfEventsFromParticipant,
    contains
}

