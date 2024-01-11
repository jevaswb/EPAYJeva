### todos

---

- should i do allocation delete ???
- implement get info

---

- querys are not sql injection secured !!!!!!!!

- admin_conrtoller login check -> think about ....

- participant_controller.js

  - delete participant -> do not work like i want -> if row does not exists - del is successful (but if it has an allocation i am not sure)
  - edit participant -> improve error-messages - (duplication -> unique values)

- event_controller.js

  - delete event --> do not work like i want -> if row does not exists - del is successful (but if it has an allocation i am not sure)
  - edit event -> improve error-messages - (duplication -> unique values)

- allocation_conrtoller.js
  - i do not test if it work when you have an array with more than one participant and event
  - i do not test if it work when you have an array with more than one participant and event and one of this values cause an error at db.query
