import { AttendToDinnerHandler } from '../../guest/use-cases/attend-dinner';
import { NewDinnerHandler } from '../../host/use-cases/create-dinner';
import { AttendenceRequestedHandler } from './attendence-requested';
export const Commands = [
  NewDinnerHandler,
  AttendToDinnerHandler,
  AttendenceRequestedHandler,
];
