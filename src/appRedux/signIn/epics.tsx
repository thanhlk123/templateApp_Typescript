import {combineEpics} from 'redux-observable';
import {catchError, mergeMap, filter} from 'rxjs/operators';
import camelcaseKeys from 'camelcase-keys';

import {of, from} from 'rxjs';
// import * as currentUserActions from 'appRedux/currentUser/reducers';
import {loginApi, loginSocialApi} from './apis';
import {
  postStart,
  postSuccess,
  postFailure,
  verifyStart,
  verifySuccess,
  verifyFailure,
} from './reducers';

const loginEpic = (action$) =>
  action$.pipe(
    filter(postStart.match),
    mergeMap(({payload}) =>
      loginApi(payload).pipe(
        mergeMap(({response}) => {
          const listActions = [
            postSuccess(camelcaseKeys(response)),
            // currentUserActions.fetchStart(),
          ];
          return from(listActions).pipe(mergeMap((action) => of(action)));
        }),
        catchError((err) => {
          return of(postFailure('Email or password incorrect.'));
        }),
      ),
    ),
  );

const loginSocialEpic = (action$) =>
  action$.pipe(
    filter(verifyStart.match),
    mergeMap(({payload}) =>
      loginSocialApi(payload).pipe(
        mergeMap(({response}) => {
          const listActions = [
            verifySuccess(camelcaseKeys(response)),
            // currentUserActions.fetchStart(),
          ];
          return from(listActions).pipe(mergeMap((action) => of(action)));
        }),
        catchError((err) => {
          return of(verifyFailure(err));
        }),
      ),
    ),
  );

export default combineEpics(loginEpic, loginSocialEpic);
