import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // Import utc plugin
import timezone from "dayjs/plugin/timezone"; // Import timezone plugin
dayjs.extend(utc); // Extend dayjs with utc plugin
dayjs.extend(timezone);
const useUtilsFunction = () => {
  //for formatting number

  const getNumber = (value = 0) => {
    return Number(parseFloat(value || 0).toFixed(2));
  };

  const getNumberTwo = (value = 0) => {
    return parseFloat(value || 0).toFixed(2);
  };

  const showTimeFormat = (data, timeFormat) => {
    return dayjs(data).tz("Asia/Dhaka").format(timeFormat); // Use Bangladesh timezone (Asia/Dhaka)
  };

  const showDateFormat = (data) => {
    return dayjs(data).tz("Asia/Dhaka").format("YYYY-MM-DD"); // Use Bangladesh timezone (Asia/Dhaka) and default format if not provided
  };

  const showDateTimeFormat = (data, dateTimeFormat) => {
    const format = dateTimeFormat;
    return dayjs(data).tz("Asia/Dhaka").format(format); // Use Bangladesh timezone (Asia/Dhaka) and default format if not provided
  };

  return {
    getNumber,
    getNumberTwo,
    showTimeFormat,
    showDateFormat,
    showDateTimeFormat,
  };
};

export default useUtilsFunction;
