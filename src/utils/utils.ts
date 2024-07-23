import nlp from "compromise";
import nlpDates from "compromise-dates";

nlp.extend(nlpDates);

type ParsedTask = {
  date?: Date;
};
export const parseTask = (input: string): ParsedTask => {
  let doc = nlp(input);
  const parsedTask: ParsedTask = {};

  // Extract dates
  let dates = doc.dates().get();
  if (dates.length > 0) {
    const dateString = dates[0].start.substring(0, 10);
    parsedTask.date = new Date(dateString);
  }

  return parsedTask;
};

// format Date as YYYY-MM-DD
export const formatDate = (date: Date) => {
  return date.toISOString().split("T")[0];
};

// format Date based on the date

export const formatDateBasedOnVal = (date: Date): string => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  console.log("==================================");
  console.log("today: " + today);
  console.log("tomorrow: " + tomorrow);
  console.log("selected date: " + date);
  console.log(date.toDateString() === today.toDateString());
  console.log(date.toDateString() === tomorrow.toDateString());

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return "Tomorrow";
  }
  //   } else {
  //     //the same year
  //     if (date.getFullYear() === today.getFullYear()) {
  //       const dateString = date.toDateString();
  //       const dateStringArr = dateString.split("");
  //       //   return `${dateStringArr[1]} ${dateStringArr[2]}`; //return "MM DD"
  //       return "other";
  //     } else {
  //       //different year
  //       return formatDate(date); //return "YYYY-MM-DD"
  //     }
  //   }
};
