import { format, compareAsc } from 'date-fns';

/**
 * @param timestamp ts
 * @return HH:mm | 'Yesterday' | DD/MM/YYY
 */

export const ts = (timestamp) => {
  // create date objects
  const now = new Date(Date.now());
  const ts = new Date(timestamp);
  const tsYesterday = new Date(Date.now() - (24 * 60 * 60 * 1000));

  // reset hours for the compared date objects
  now.setHours(0, 0, 0, 0);
  ts.setHours(0, 0, 0, 0);
  tsYesterday.setHours(0, 0, 0, 0);

  // if today return HH:mm
  if (compareAsc(ts, now) === 0) {
    return format(timestamp, 'HH:mm');
  }

  // if yesterday return string 'Yesterday'
  if (compareAsc(tsYesterday, ts) === 0) {
    return 'Вчера';
  }

  // finally return DD/MM/YYY
  return format(timestamp, 'DD/MM/YYYY');
};

/**
 * @param timestamp ts
 * @return HH:mm
 */

export const getTime = (timestamp) => format(timestamp, 'HH:mm');
