import { AttendenceCancelledHandler } from './attendence-canceled';
import { AttendenceRequestedHandler } from './attendence-requested';
import { HostApprovedAttendenceHandler } from './host-approved-attendence';

export const Commands = [
  AttendenceRequestedHandler,
  AttendenceCancelledHandler,
  HostApprovedAttendenceHandler,
];
