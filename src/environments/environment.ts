// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAyK1pTlfeNkplP68oM_g9xbvfi-_GnJyc",
    authDomain: "fooddb-d2d9c.firebaseapp.com",
    databaseURL: "https://fooddb-d2d9c.firebaseio.com",
    projectId: "fooddb-d2d9c",
    storageBucket: "fooddb-d2d9c.appspot.com",
    messagingSenderId: "767798307512",
    appId: "1:767798307512:web:50da0bac5b3666e5b4a24d",
    measurementId: "G-48MPG7KJXX"
  },
  onesignal: {
    appId: '8488a97d-de52-48f7-ad50-9191245f9693',
    googleProjectNumber: '',
    restKey: 'NmRmNDcxOWUtN2M4OC00M2EyLWFlYWItMDJkNjcxZmYyYzdj'
  },
  stripe: {
    sk: ''
  },
  general: {
    symbol: '€',
    code: 'Eur'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
