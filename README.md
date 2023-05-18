## MVP of uploading images to the server
The application was created using create-react-app.

When the application is opened, a server is calling.
The server may return the URL and id, 
or it may return an error. 
In the latter case, an error notification will be displayed.

If there is no error from the server, then after selecting the files (it accepts only images) to upload, the "upload" button becomes active. 
By clicking on this button, the application uploads files to the server. 
In this case, the server may return an error, in which case the user will see the corresponding notification. 
The notification will also be displayed after a successful upload.

During the upload, a user may click the "cancel" button, then the file upload request will be aborted.

By passing a handler function to the upload component, it is possible to get the file upload status

## Set up
- Download the app
- In your terminal run the command `npm install`
- Run `npm run start`
- Open [http://localhost:3000](http://localhost:3000)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
