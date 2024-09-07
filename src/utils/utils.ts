import nlp from "compromise";
import nlpDates from "compromise-dates";

nlp.extend(nlpDates);

type ParsedTask = {
  date?: string;
  priority?: string;
  remainingText: string;
};

export const parseTask = (input: string): ParsedTask => {
  const doc = nlp(input);
  const parsedTask: ParsedTask = { remainingText: input };

  // Extract dates
  const dates = doc.dates().get();
  if (dates.length > 0) {
    parsedTask.date = dates[0].start.substring(0, 10);

    // Remove the extracted date from the remaining text
    const dateStr = doc.dates().out("text");
    parsedTask.remainingText = parsedTask.remainingText
      .replace(dateStr, "")
      .trim();
  }

  //Extract priority
  const priority = doc
    .match("(hp|mp|lp|high priority|medium priority|low priority)")
    .out("text");

  switch (priority) {
    case "hp":
    case "high priority":
      parsedTask.priority = "high";
      break;

    case "mp":
    case "medium priority":
      parsedTask.priority = "medium";
      break;

    case "lp":
    case "low priority":
      parsedTask.priority = "low";
      break;

    default:
      parsedTask.priority = "no";
      break;
  }

  // Remove the extracted priority from the remaining text
  const priorityStr = doc
    .match("(hp|mp|lp|high priority|medium priority|low priority)")
    .out("text");
  parsedTask.remainingText = parsedTask.remainingText
    .replace(priorityStr, "")
    .trim();

  return parsedTask;
};

// format Date as YYYY-MM-DD
export const formatDate = (date: Date) => {
  return date.toISOString().split("T")[0];
};

export const formatDateToMonthDay = (date: string) => {
  const monthNamesShort = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dateArr = date.split("-");
  const monthIndex = +dateArr[1] - 1;
  return `${monthNamesShort[monthIndex]} ${dateArr[2]}`; //return "MM DD"
};

// format Date based on the date
export const formatDateBasedOnVal = (givenDate: string): string => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const givenDateArr = givenDate.split("-");
  const todayArr = formatDate(today).split("-");

  if (formatDate(today) === givenDate) {
    return "Today";
  } else if (formatDate(tomorrow) === givenDate) {
    return "Tomorrow";
  } else {
    //the same year
    if (givenDateArr[0] === todayArr[0]) {
      return formatDateToMonthDay(givenDate); //return "MM DD"
    } else {
      //different year
      return givenDate; //return "YYYY-MM-DD"
    }
  }
};

export const capitalizeWord = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};
