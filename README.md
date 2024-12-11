# Ticket Jet

Ticket Jet is a web application for managing and purchasing event tickets. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However, we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Project Structure

- `src/`: Contains the source code of the application.
  - `common/`: Contains common components like `Header`, `Footer`, `SideNavBar`, etc.
  - `dashboards/`: Contains dashboard components for different user roles.
  - `sign-in/`: Contains the sign-in component.
  - `sign-up/`: Contains the sign-up component.
  - `theme/`: Contains theme-related files.
  - `App.tsx`: The main application component.
  - `index.tsx`: The entry point of the application.
- `public/`: Contains the public assets and the `index.html` file.
- `package.json`: Contains the project dependencies and scripts.

## Dependencies

- `@emotion/react`: "^11.13.5"
- `@emotion/styled`: "^11.13.5"
- `@mui/icons-material`: "^6.1.7"
- `@mui/material`: "^6.1.7"
- `@mui/styled-engine-sc`: "^6.1.7"
- `@mui/styles`: "^6.1.7"
- `@stomp/stompjs`: "^7.0.0"
- `@testing-library/jest-dom`: "^5.17.0"
- `@testing-library/react`: "^13.4.0"
- `@testing-library/user-event`: "^13.5.0"
- `@types/jest`: "^27.5.2"
- `@types/node`: "^16.18.118"
- `@types/react`: "^18.3.12"
- `@types/react-dom`: "^18.3.1"
- `@types/react-router-dom`: "^5.3.3"
- `@types/stompjs`: "^2.3.9"
- `axios`: "^0.27.2"
- `react`: "^18.2.0"
- `react-dom`: "^18.2.0"
- `react-router-dom`: "^6.3.0"
- `typescript`: "^4.8.4"

## WebSocket Service

The application uses a WebSocket service to receive real-time updates. The WebSocket service is implemented in `src/service/WebSocketService.ts`.

## Components

### Header

The `Header` component displays the application logo and the logged-in user's name.

### Footer

The `Footer` component provides information about the application and links to social media and contact information.

### SignIn

The `SignIn` component allows users to log in to the application.

### SignUp

The `SignUp` component allows users to register for an account.

### VendorDashboard

The `VendorDashboard` component displays metrics and events for vendors.

### EventTable

The `EventTable` component displays a table of events with options to start, stop, and delete events.

## License

This project is licensed under the MIT License.