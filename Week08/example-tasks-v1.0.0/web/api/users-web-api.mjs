import * as usersServices from "../../services/mock-users-services.mjs";
import { errorToHttp } from "./errors-to-http-responses.mjs";

// FUNCTIONS (WEB API):

export function addUser(req, res){
  //console.log(req.body);
  const output = usersServices.addUser(req.body.username);
  if (output.internalError){
    const error = errorToHttp(output);
    res.status(error.status);
    res.json(error.body);
    return ;
  }
  // Success
  const userToken = output;
  res.status(201);
  res.json(userToken);
}
