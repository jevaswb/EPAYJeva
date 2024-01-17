-- create type "currency" as enum ('€','$','£');

drop table if exists "admin";
create table "admin"(
    id uuid not null unique,
    email varchar(120) unique,
    username varchar(40) not null,
    pw varchar(140) not null,
    primary key (id)
);

drop table if exists "participant";
create table "participant"(
    id uuid not null unique,
    created_by uuid not null, -- oder doch ne eigene tabelle machen
    email varchar (120), --muss unique für den admin sein unique zusammen -> wenn nicht null -> created_by + email = unique // emails können null sein
    screen_name varchar(40) not null, -- unique für den admin -> created by + screen_name -> unique
    primary key (id),
    unique (created_by, screen_name)
);

drop table if exists "event";
create table "event"(
    id uuid not null unique,
    created_by uuid not null,
    "name" varchar(40) not null,
    "date" date not null,
    start_time time not null,
    price decimal(6,2) not null check ( price >= 0 ), -- anschaun, wie genau man das anschreibt
    currency currency not null,
    primary key (id),
    unique (created_by, "name")
);

drop table if exists "event_participant";
create table "event_participant"(
    event_id uuid not null,
    participant_id uuid not null,
    is_payed bool default false,
    primary key (event_id,participant_id)
);

--test inserts
insert into admin (id, email, username, pw) VALUES ('4245e812-6a06-4f74-a9ea-0510997ad397','some@email.test','Hallo test 1','I dont want to encrypt this so now its just that');
insert into admin (id, email, username, pw) VALUES ('7960f791-dc5d-46b3-83e0-d7bbf77be034','cla@email.test','Some tests','Hallo');
insert into admin (id, email, username, pw) VALUES ('ee147cd4-c1ad-42bc-94b4-e4c42a5fa446','jeva@email.test','Jeva','Das Ist Jevas Passwort');
insert into admin (id, email, username, pw) VALUES ('57f3ec7a-316a-444f-ae5b-2b3b996ae169','paul@email.test','Paul','Das Ist Pauls Passwort');
insert into participant (id, created_by, email, screen_name) VALUES ('c7969fc9-4893-41de-8d25-ffc78273c143','4245e812-6a06-4f74-a9ea-0510997ad397','part@test.test','Teilnemher');
insert into participant (id, created_by, email, screen_name) VALUES ('a59e0ca3-10a8-4318-85e3-97934bb978c4','57f3ec7a-316a-444f-ae5b-2b3b996ae169','something@test.test','Auch ein Teilnehmer');
insert into participant (id, created_by, email, screen_name) VALUES ('66772e21-3b5f-4943-8a19-0e9f2e787369','7960f791-dc5d-46b3-83e0-d7bbf77be034','something@test.test','Mojmir');
insert into participant (id, created_by, email, screen_name) VALUES ('6fcfe17b-3a31-4ad0-9f2e-187823c38918','7960f791-dc5d-46b3-83e0-d7bbf77be034','something@test.test','Auch ein Teilnehmer');
insert into event (id, created_by, "name", "date", start_time, price, currency) VALUES ('64bbfa64-7cc9-4ffc-a30d-104e5bf4f4e2','4245e812-6a06-4f74-a9ea-0510997ad397', 'event 1', '2018-09-08','09:04','32.58','€');
insert into event (id, created_by, "name", "date", start_time, price, currency) VALUES ('8635d954-ef2b-42d2-aa81-b2d99f9885b7','7960f791-dc5d-46b3-83e0-d7bbf77be034', 'event 2', '2007-11-20','17:09','6.98','€');
insert into event (id, created_by, "name", "date", start_time, price, currency) VALUES ('8bfba620-975f-49a4-a3ec-0b4ab0909dcc','57f3ec7a-316a-444f-ae5b-2b3b996ae169', 'Ausflug nach Reisenberg', '2001-09-28','23:56','345.12','€');
insert into event_participant(event_id, participant_id) VALUES ('64bbfa64-7cc9-4ffc-a30d-104e5bf4f4e2','c7969fc9-4893-41de-8d25-ffc78273c143');
insert into event_participant(event_id, participant_id) VALUES ('8bfba620-975f-49a4-a3ec-0b4ab0909dcc','a59e0ca3-10a8-4318-85e3-97934bb978c4');
insert into event_participant(event_id, participant_id) VALUES ('8635d954-ef2b-42d2-aa81-b2d99f9885b7','6fcfe17b-3a31-4ad0-9f2e-187823c38918');
insert into event_participant(event_id, participant_id) VALUES ('8635d954-ef2b-42d2-aa81-b2d99f9885b7','66772e21-3b5f-4943-8a19-0e9f2e787369');


-- foreign keys

alter table "participant"
    add foreign key (created_by) references "admin" (id);

alter table "event"
    add foreign key (created_by) references "admin" (id);

alter table "event_participant"
    add foreign key (event_id) references "event" (id),
    add foreign key (participant_id) references "participant" (id);

--cosntraints

--participant name must be unique for the admin


