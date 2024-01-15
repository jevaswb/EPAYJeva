# Event Pay Backend

## Backend setup

installieren der Node-Packages

```sh
npm install
```

starten des "Servers"

```sh
node ./server.js
```

## Database setup

PGSQL Datenbank erstellen, [SQL Datei](../sql/structure_script.sql) importieren und Parameter in `.env` Datei hinzufügen ([.env.example](.env.example) als Template verwenden).

---

### Endpoints & was zurückgegeben wird

- [participants](#participants)
- [events](#events)
- [allocations](#allocations)

#### participants

```javascript
//example structure
127.0.0.1:port/participant
// returns an array with all participant-screen-names
// ["value0", "value1",...]
```

```javascript
//post
127.0.0.1:4000/participant/getAllScreenNames
//body
{
    test_key: "value of api_key",
    user_id: "value of user_id"
}

```

```javascript
//post
127.0.0.1:4000/participant/add
//body
{
    test_key: null,
    user_id: null,
    email: null,
    screen_name: null
}
```

```javascript
//put
127.0.0.1:4000/participant/edit/screenName
//body
{
    test_key: null,
    user_id: null,
    participant_id: null,
    screen_name: null   //new screenname
}
```

```javascript
//put
127.0.0.1:4000/participant/edit/email
//body
{
    test_key: null,
    user_id: null,
    participant_id: null,
    email: null     //new email
}
```

```javascript
//delete
127.0.0.1:4000/participant/delete
//body
{
    test_key: null,
    user_id: null,
    screen_name: null
}
```

```javascript
//post
127.0.0.1:4000/participant/get
//body
{
    test_key: null,
    user_id: null,
    screen_name: null
}
```

```javascript
//post
127.0.0.1:4000/participant/pay
//body
{
    test_key: null,
    user_id: null,
    participant_id: null,
    event_id: null
}
```

```js
//post
127.0.0.1:4000/participant/search
//body
{
    test_key: null,
    user_id: null,
    screen_name: null
}
```

```js
//post
127.0.0.1:4000/participant/contain
//body
{
    test_key: null,
    user_id: null,
    screen_name: null
}
```

#### events

```js
//example structure
127.0.0.1:port/event
// returns an array with all event-names
// ["value0", "value1",...]
```

```js
//post
127.0.0.1:4000/event/getAllNames
//body
{
    test_key: null,
    user_id: null
}
```

```js
//post
127.0.0.1:4000/event/add
//body
{
    test_key: null,
    user_id: null,
    event_name: null,
    date: null,
    start_time: null,
    currency: null, //is an enum in db allowed values (€,$,£)
    price: null //use . not ,  - e.g. 20.5
}
```

```js
//post
127.0.0.1:4000/event/get
//body
{
    test_key: null,
    user_id: null,
    event_name: null
}
```

```js
//delete
127.0.0.1:4000/event/delete
//body
{
    test_key: null,
    user_id: null,
    event_name: null
}
```

```js
//put
127.0.0.1:4000/event/edit/name
//body
{
    test_key: null,
    user_id: null,
    event_id: null,
    event_name: null //new event_name
}
```

```js
//put
127.0.0.1:4000/event/edit/date
//body
{
    test_key: null,
    user_id: null,
    event_id: null,
    date: null //new date
}
```

```js
//put
127.0.0.1:4000/event/edit/startTime
//body
{
    test_key: null,
    user_id: null,
    event_id: null,
    start_time: null //new stat_time
}
```

```js
//put
127.0.0.1:4000/event/edit/price
//body
{
    test_key: null,
    user_id: null,
    event_id: null,
    price: null //new price //use . not ,  - e.g. 20.5
}
```

```js
//put
127.0.0.1:4000/event/edit/currency
//body
{
    test_key: null,
    user_id: null,
    event_id: null,
    currency: null //new currency //is an enum in db allowed values (€,$,£)
}
```

```js
//post
127.0.0.1:4000/event/search
//body
{
    test_key: null,
    user_id: null,
    event_name: null
}
```

### allocations

```js
//post
127.0.0.1:4000/allocation/add
//body
{
    test_key: null,
    user_id: null,
    participant_array: [], //array of participant_ids
    event_array: []   //array of event_ids
}
```
