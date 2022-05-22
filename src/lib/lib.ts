import dayjs from 'dayjs';
import 'dayjs/locale/ru';
dayjs.locale('ru');

export const getDataReviewFormat = (date: string, format: string): string => dayjs(date).format(format);

