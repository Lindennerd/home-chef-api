import { AttendenceCancelledHandler } from './attendence-canceled';
import { AttendenceRequestedHandler } from './attendence-requested';
import { DinnerStatusUpdatedHandler } from './dinner-status-updated';
import { HostApprovedAttendenceHandler } from './host-approved-attendence';

export const Commands = [
  AttendenceRequestedHandler,
  AttendenceCancelledHandler,
  HostApprovedAttendenceHandler,
  DinnerStatusUpdatedHandler,
];
