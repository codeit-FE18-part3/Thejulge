import acceptedBadge from '@/assets/icon/ic-accepted-badge.svg';
import arrowUp from '@/assets/icon/ic-arrow-up.svg';
import calendar from '@/assets/icon/ic-calendar.svg';
import camera from '@/assets/icon/ic-camera.svg';
import checked from '@/assets/icon/ic-checked.svg';
import chevronLeft from '@/assets/icon/ic-chevron-left.svg';
import chevronRight from '@/assets/icon/ic-chevron-right.svg';
import clock from '@/assets/icon/ic-clock.svg';
import close from '@/assets/icon/ic-close.svg';
import dropdownDown from '@/assets/icon/ic-dropdown-down.svg';
import dropdownUp from '@/assets/icon/ic-dropdown-up.svg';
import envelope from '@/assets/icon/ic-envelope.svg';
import facebook from '@/assets/icon/ic-facebook.svg';
import instagram from '@/assets/icon/ic-instagram.svg';
import map from '@/assets/icon/ic-map.svg';
import notificationOff from '@/assets/icon/ic-notification-off.svg';
import notificationOn from '@/assets/icon/ic-notification-on.svg';
import phone from '@/assets/icon/ic-phone.svg';
import radioOff from '@/assets/icon/ic-radio-off.svg';
import radioOn from '@/assets/icon/ic-radio-on.svg';
import rejectedBadge from '@/assets/icon/ic-rejected-badge.svg';
import search from '@/assets/icon/ic-search.svg';
import successCircle from '@/assets/icon/ic-success-circle.svg';
import success from '@/assets/icon/ic-success.svg';
import warningCircle from '@/assets/icon/ic-warning-circle.svg';
import warning from '@/assets/icon/ic-warning.svg';

export const ICONS = {
  acceptedBadge: acceptedBadge.src,
  arrowUp: arrowUp.src,
  calendar: calendar.src,
  camera: camera.src,
  checked: checked.src,
  chevronLeft: chevronLeft.src,
  chevronRight: chevronRight.src,
  clock: clock.src,
  close: close.src,
  dropdownDown: dropdownDown.src,
  dropdownUp: dropdownUp.src,
  envelope: envelope.src,
  facebook: facebook.src,
  instagram: instagram.src,
  map: map.src,
  notificationOff: notificationOff.src,
  notificationOn: notificationOn.src,
  phone: phone.src,
  radioOff: radioOff.src,
  radioOn: radioOn.src,
  rejectedBadge: rejectedBadge.src,
  search: search.src,
  successCircle: successCircle.src,
  success: success.src,
  warningCircle: warningCircle.src,
  warning: warning.src,
} as const;

export type IconName = keyof typeof ICONS;

export const ICON_SIZES = {
  'x-sm': 'w-2.5 h-2.5',
  sm: 'w-4 h-4',
  rg: 'w-5 h-5',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
} as const;

export type IconSize = keyof typeof ICON_SIZES;
