# 🎺🎶 Community of Euphonium Enthusiasts

This is a full-stack MERN application that allows Bombardino players to share information about their instruments, such as a photo and technical specifications.

## Configuración

El frontend se abre por defecto en el puerto 4500. Se necesitan rellenar los ficheros `.env` con las claves para configurar la conexión a MongoDB y a Firebase. Se adjuntan ficheros `sample.env` de referencia.

## Installation and Setup

> npm install

instala todas las dependencias para el servidor y el cliente.

> npm run build

construye los archivos estáticos para la aplicación de React.

> npm start

inicia la aplicación completa MERN.

## The application includes the following features

- List of Euphonium instruments
- Details page for each instrument
- Create instrument page with a form and a required image field
- Edit instrument page
- Delete instrument function
- Pagination (infinite roll)
- Filters (in the list itself, to filter without changing pages)
- User login and registration
- User feedback
- Error handling
- Firebase

## Frontend

- TypeScript
- React + Redux for state management
- moduleCSS / styled components
- Unit tests
- SonarCloud 100% code analisys
- Integration tests
- 100% coverage
- Zero technical debt
- Lighthouse with metrics 100%

## Backend

- TypeScript
- Node + Express
- auth with JWT
- Unit tests
- SonarCloud 100% code analisys
- Endpoint tests (supertest)
- Saving binary files to disk / Firebase
- Image optimization (sharp)
- Request validation with Joi
- 100% coverage
- 0 technical debt
- Postman endpoint collection exported as JSON (in the root of the project)
- E2E
- User login process tested with Cypress

## Project managment

- Figma
- Component responsibilities
- Backend routes
- Trello
