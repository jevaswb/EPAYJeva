# Frontend

I already made the design of the login and the registration.
Also did the design for the nav bar for the startpage and login page and registration page.

TODO (just the biggest things i thought about right now):
Make the backend of the login and registration (pasword hashing with salt and pepper) -> saving users into the database

Design sidenav for the main-page when you're logged in.
Make everything else after the login.

for now there are no errors for database complicytions like already existing emails, wrong password, wrong email

And just for contex -> the dashbord is whats after the login...

## Setup / Development

Installieren der [`Node.js`](https://nodejs.org/en/learn) Packages

```sh
npm install
```

Frontend Server [`Next.js`](https://nextjs.org/docs)

```sh
node run dev
```

im [next_js_frontend](./next_js_frontend) Unterverzeichnis; Parameter in `.env.local` Datei hinzufügen ([.env.example](.env.example) als Template verwenden).