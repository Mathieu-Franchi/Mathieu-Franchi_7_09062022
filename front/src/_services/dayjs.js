import dayjs from 'dayjs';
require('dayjs/locale/fr')
dayjs.locale('fr')
let relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

export default dayjs