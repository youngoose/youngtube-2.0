import moment from 'moment';

export default function timeAgo(time) {
  return moment(time).fromNow();
}
