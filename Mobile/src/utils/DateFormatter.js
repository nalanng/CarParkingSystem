import moment from 'moment';

export const formatDate = (date) => {
  const now = moment();
  const notificationDate = moment(date);

  if (now.isSame(notificationDate, 'day')) {
    return 'Today';
  } else if (now.subtract(1, 'day').isSame(notificationDate, 'day')) {
    return 'Yesterday';
  } else {
    return notificationDate.format('D MMMM');
  }
};
