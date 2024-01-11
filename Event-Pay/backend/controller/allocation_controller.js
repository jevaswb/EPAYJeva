const db = require('../postgre_config')
const { check_key } = require('../functions');
const { json } = require('express');

//todo i do not test if it work when you have an array with more than one participant and event 
//todo i do not test if it work when you have an array with more than one participant and event and one of this values cause an error at db.query
const addAllocation = async (req, res, next) => {  //post
    const test_key = req.body.test_key

    if (check_key(test_key)) { res.status(500).json(JSON.stringify('Something went wrong. Please try again later')); return }

    const user_id = req.body.user_id // todo
    const participant_array = req.body.participant_array //array filled with participant_ids
    const event_array = req.body.event_array //array filled with event_ids

    //little param check
    if (!Array.isArray(participant_array) || !Array.isArray(event_array)) {
        //if participant_array or event_array isn't an array -> it should be jumped out of the mehtode
        res.status(400).json(JSON.stringify('At least one array-param is not an array!'))
        return
    }
    if (participant_array.length === 0 || event_array.length === 0) {
        res.status(400).json(JSON.stringify('At least one array-param is empty!'))
        return
    }
    console.log(participant_array, event_array)
    if (!participant_array.reduce((previous, current) => typeof (current) === 'string' && previous, true)
        || !event_array.reduce((previous, current) => typeof (current) === 'string' && previous, true)) {
        //if the statements itselfs returns true everything is fine
        //if participant_array or event_array contain values which are not a string -> it should be jumped out of the mehtode
        res.status(400).json(JSON.stringify('At least one param-value has a incorrect type!'))
        return
    }
    //check if all participants and all events are created by the same admin and then checks if this id equals the user_id from the req.body
    for (const participant_id of participant_array) {
        for (const event_id of event_array) {

            const check_user_id = `select e.created_by as user_id from participant p inner join event e on p.created_by = e.created_by where e.id = $1 AND  p.id = $2;`
            try {
                const result = await db.postgre.query(check_user_id, [event_id, participant_id])

                if (result.rowCount !== 1) {
                    res.status(500).json(JSON.stringify('Something went wrong. Please try again later'))
                    return
                }
                if (result.rows[0].user_id !== user_id) {
                    res.status(400).json(JSON.stringify('User do not created participant and event!'))
                    return
                }
            }
            catch {
                res.status(500).json(JSON.stringify('Something went wrong. Please try again later - That should not happen'))
                return
            }
        }
    }
    
    const message = { status: null, message: {message: null, issue_values: []} }
    //actually insert into table
    const query = `insert into event_participant(event_id, participant_id) values ($1,$2);`
    for (const participant_id of participant_array) {
        for (const event_id of event_array) {
            
            try {
                const result = await db.postgre.query(query, [event_id, participant_id])
                //everythink ok
            }
            catch {
                //throw new Error(error.Error)
                message.status = 500
                message.message.message = 'Something went wrong. Please try again later'
                message.message.issue_values.push({
                    participant_id: participant_id,
                    event_id: event_id
                })
            }

        }
    }
    //set right response
    res.status(message.status ?? 200).json(
        (message.status === null) ? JSON.stringify('Allocation successfully created') : JSON.stringify(message.message))
}

module.exports = {
    addAllocation
}
