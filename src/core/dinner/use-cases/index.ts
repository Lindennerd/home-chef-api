import { AttendenceCancelledHandler } from './attendence-canceled';
import { AttendenceRequestedHandler } from './attendence-requested';
import { DinnerStatusUpdatedHandler } from './dinner-status-updated';
import { HostApprovedAttendenceHandler } from './host-approved-attendence';
import { GetDinnersQueryHandler } from './queries/get-all-dinners';
import { GetDinnerQueryHandler } from './queries/get-dinner';

export const Commands = [
  AttendenceRequestedHandler,
  AttendenceCancelledHandler,
  HostApprovedAttendenceHandler,
  DinnerStatusUpdatedHandler,
  GetDinnerQueryHandler,
  GetDinnersQueryHandler,
];
