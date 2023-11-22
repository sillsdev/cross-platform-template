# Create React App for Cross Platform Apps

This project will build for web, Windows, Linux and Mac. It was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It also uses [Electron](https://www.electronjs.org/) and [CRACO](https://craco.js.org/docs/) for building desktop instances for Windows, Linux and Mac. The [Material UI](https://mui.com/) library are included. I also included the [Source Map Explorer](https://github.com/danvk/source-map-explorer#readme) for seeing how the app lays out in memory. (Testing is part of the original Create React App libraries.) It has been setup to use Node 16 or later.

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

### `npm clean`

This command removes the build artifacts.

### `npm analyze`

This command displays to memory consumption.

### `npm dev`

This command launches development with Electron. It is also possible to launch the debugger from VS Code. (Pressing F5 is one way.) There are two profiles in VS Code: `Start & Debug` and `Electron All` that are most useful. `Start & Debug` is used for debugging the web in a controlled browser. `Electron All` hosts the desktop code and allows Electron to interact with it. The electron browser files are stored in AppData\Roaming in a folder with the app name (for final build) or in the Electron folder for development builds.

#### `.env.local`

A local file (that isn't backed up in the repo) can be used to contain settings that should not be made available to everyone. Here is an example of what the file might look like:

``` ini
/* Production */
REACT_APP_SITE_TITLE=Cross Platform Template
```

Similarly, it is useful to have a local file that contains settings used when development as opposed to deploying:

``` ini
/* DEVELOPMENT */
BROWSER=none
REACT_APP_SITE_TITLE=Cross Platform Template DEV
REACT_APP_DEBUG=true
```

You will note that as the React documentation says, in order to be accessible in the Create React Application, these variables need to begin with `REACT_APP_`

### `npm run pack` followed by `npm run dist`

This packages the desktop files and then creates an installer for them. Depending on which platform is being used, the installer is prepared for the current platform

## Accessing the desktop computer from front end

The program has a global variable `ipc`. When this variable is falsey, the program is running on the web. When the variable is truthy it is because there is a set of API methods for interacting with the local computer. All of these function calls are `async` calls. They are defined in the file `public/ipcMethods.js`. You will also find a corresponding list in the file `public/preload.js`. A protocol was set up for reading files in the front end using a URL but it looks like registering the protocal as was doing in `public/file-read-protocol.js` has been deprecated and I haven't explored how that should be done with the latest Electron.

The basic architectural decision was made to try to put most of the code in the `Create React App` front end so that this code is running on the web and in the desktop application. As such, the main Electron process runs from the public folder. The code for that has been kept in JavaScript and isn't being obfuscated like the code of the front end (Electron Rendering task).

If it was desired to have other `.net core` logic delivered as part of the desktop app, the built files could be listed in `package.json` under `build.extraFiles`. Check out the format for that list on in the Electronjs documentation.

## Authentication

If you want to support auth0 authentication, create the file `public/auth0-variables.json` containing:

``` json
{
  "apiIdentifier": "https://some.api",
  "auth0Domain": "your-domain.auth0.com",
  "desktopId": "your-desktop-client-id",
  "webClientId": "your-web-client-id"
}
```

This will be used for authentication. The Authentication code for the desktop is contained in the `public/auth-process.js` and `public/auth-service.js` files. This file follows the examples given by auth0.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
