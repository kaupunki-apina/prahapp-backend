import * as actionCore from '../core/action-core';
import {createJsonRoute, throwStatus} from '../util/express';
import {assert} from '../validation';
import * as imageHttp from './image-http';

let postAction = createJsonRoute(function(req, res) {
  const action = assert(req.body, 'action');

  if (action.type === 'IMAGE') {
      return imageHttp.postImage(req, res);
  } else {
    return actionCore.getActionType(action.type)
    .then(type => {
        if (type === null) {
            throwStatus(400, 'Action type ' + action.type + ' does not exist');
        }
    })
    .then(() => {
        return actionCore.createAction(req.body).then(rowsInserted => undefined);
    });
  }

});

export {
  postAction
};
