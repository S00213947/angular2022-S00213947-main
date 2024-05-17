// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    apiUri : 'http://localhost:3000',
    auth0:
  {
   //domain: 'dev-7gh4ttlz8xd5eek3.eu.auth0.com',
   // clientId: 'mHnrnnkFxJTpEvSRTNJwIfdhcBo6MBYc',
    domain: 'dev-542njpw2o0b02kdk.us.auth0.com',
    clientId: 'Sx1OBmmUP4mNnqAkWNTum2NYCdzWrMoR',
    callback_URL: 'http://localhost:4200/callback',
    audience: 'http://cocktails'
  }
};
 // this was callbackurl-----localhost:4200/callback
  /*
   * For easier debugging in development mode, you can import the following file
   * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
   *
   * This import should be commented out in production mode because it will have a negative impact
   * on performance if an error is thrown.
   */
  // import 'zone.js/plugins/zone-error';  // Included with Angular CLI.