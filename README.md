# iMeet! · Event management front-end

Web front-end for iMeet!, an event management system where organizers publish events by category, attendees browse and register, and admins manage users, companies and check-in. Team project for Software Architecture and Design at ESEN.

| | |
|---|---|
| **Team** | Kathleen Argueta, Nicky2811, leví, RobertoMilan, Alejo |
| **Stack** | React 19 · Vite · React Router · Tailwind CSS · Axios · Docker · Nginx |
| **Portfolio** | [kathleenargueta.github.io](https://kathleenargueta.github.io) |

## My part

I set up the React + Vite project and built the event flow, 11 of the repository's commits:

- **Event catalog and cards:** the cards attendees see, and a dedicated attendee view.
- **Event registration form:** connected to the back-end, with the signed-in user shown on the form.
- **Category manager:** a view to create the categories events are filed under, wired to the API.
- **Visual consistency:** the shared theme and a light mode for the sign-in screens so they match the rest of the system.

Teammates built authentication with bearer tokens, the admin and company screens, check-in, component tests and the Docker + Nginx setup.

## Screens

| Route | What it shows |
|---|---|
| `/login`, `/register`, `/forgot-password` | Account access |
| `/dashboard` | Event catalog and event form |
| `/asistentes` | Attendee view |
| `/empresas` | Companies |
| `/admin/users` | User administration |
| `/profile` | The signed-in user's profile |

## Run it locally

The app expects the iMeet! API at `http://localhost:3000`.

```bash
npm install
npm run dev
```

Or build and serve it with Nginx:

```bash
docker build -t imeet-frontend .
docker run -p 8080:80 imeet-frontend
```
