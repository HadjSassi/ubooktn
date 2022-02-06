// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8081',
  admine: 'mahdihadjsassi1@gmail.com',
  firebase: {
    apiKey: 'AIzaSyCLDdR-mNcsDA9hHSk9Au4kQMXW3_qheHA',
    authDomain: 'gigantic-podium-student.firebaseapp.com',
    databaseURL: 'https://gigantic-podium-student-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'gigantic-podium-student',
    storageBucket: 'gigantic-podium-student.appspot.com',
    messagingSenderId: '908012976149',
    appId: '1:908012976149:web:c01f7f87995a9b5c5fb61c',
    measurementId: 'G-F8ZHSPHT03'
  }
};
