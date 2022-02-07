// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8081',
  admine: 'mahdihadjsassi1@gmail.com',
  firebase: {
    apiKey: 'AIzaSyCUa1-RGYctGMX9T44QHhTPVQL43whB60I',
    authDomain: 'u-book-6ac29.firebaseapp.com',
    projectId: 'u-book-6ac29',
    storageBucket: 'u-book-6ac29.appspot.com',
    messagingSenderId: '285478163789',
    appId: '1:285478163789:web:e6f2cc43bde72648f7d304',
    measurementId: 'G-9R4LGNCSSP'
  }
};
