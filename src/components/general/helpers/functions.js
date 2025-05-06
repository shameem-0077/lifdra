export const secondsTohm = (d) => {
  d = Number(d);
  let h = Math.floor(d / 3600);
  let m = Math.floor((d % 3600) / 60);

  let hDisplay =
    h > 0 ? h + (h === 1 ? " hr" : " hrs") + (m > 0 ? " " : "") : "";
  let mDisplay = m > 0 ? m + (m === 1 ? " min" : " mins") : "";
  return hDisplay + mDisplay;
};

export const zeroPad = (num, size) => {
  if (num) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
  } else {
    return "";
  }
};
export const middleTruncate = (str) => {
  if (str.length > 25) {
    return str.substr(0, 10) + "..." + str.substr(str.length - 10, str.length);
  }
  return str;
};

export const calcAssessmentTime = (hours) => {
  if (hours) {
    let hours_split = Math.floor(hours);
    let min_split = (hours % 1).toFixed(2);
    let minutes = Math.floor(min_split * 60);
    if (hours === 1) {
      return `${hours} Hour`;
    } else if (hours_split === 1) {
      return `${hours_split} Hr ${
        minutes === 0
          ? ""
          : minutes === 1
          ? `${minutes} min`
          : `${minutes} mins`
      }`;
    } else {
      return `${hours_split} Hrs ${
        minutes === 0
          ? ""
          : minutes === 1
          ? `${minutes} min`
          : `${minutes} mins`
      }`;
    }
  } else {
    return "";
  }
};

function zfill(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

export const secondsTohms = (d, type = "regular") => {
  d = Number(d);
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);

  if (type === "regular") {
    const hDisplay =
      h > 0
        ? h + (h === 1 ? " hr" : " hrs") + (m > 0 && s > 0 ? ", " : "")
        : "";
    const mDisplay =
      m > 0 ? m + (m === 1 ? " min" : " mins") + (s > 0 ? ", " : "") : "";
    const sDisplay = s > 0 ? s + (s === 1 ? " sec" : " secs") : "";
    return hDisplay + mDisplay + sDisplay;
  } else if (type === "time_format") {
    const hDisplay = h > 0 ? `${zfill(h, 2)}:` : "";
    const mDisplay = m > 0 ? `${zfill(m, 2)}:` : "00:";
    const sDisplay = s > 0 ? `${zfill(s, 2)}` : "00";
    return `${hDisplay}${mDisplay}${sDisplay}`;
  }
};

export const getDateStr = (value) => {
  let date = new Date(value && value.replace(" ", "T"));

  let month = [
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
  ][date.getMonth()];
  let date_str = date.getDate() + " " + month + " " + date.getFullYear();
  return date_str;
};

export const getDateStrWithoutReplace = (value) => {
  let date = new Date(value);

  let month = [
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
  ][date.getMonth()];
  let date_str = date.getDate() + " " + month + " " + date.getFullYear();
  return date_str;
};

export const getTimeStr = (value) => {
  if (value) {
    let values = value.split(":");
    let hr = values[0];
    let min = values[1];
    let ampm = values[2].split(" ")[1];
    let time_str = hr + ":" + min + " " + ampm;
    return time_str;
  } else {
    return null;
  }
};
export const getShortMonthName = (date) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return monthNames[date.getMonth()].substring(0, 3);
};

export const getTimeStrFromDate = (value, type = "hm") => {
  let date = new Date(value);
  date = new Date(date.toUTCString());
  let tzOffset = date.getTimezoneOffset();
  date = new Date(date.getTime() - tzOffset * 60 * 1000);

  return tConvert(date.toLocaleTimeString(), type);
};

export const getUserTimeFromUTC = (value, type = "hm") => {
  let date = new Date(value);
  return tConvert(date.toLocaleTimeString(), type);
};

export const getUserDateFromUTC = (value, type = "hm") => {
  return getDateStr(value);
};

export const getTimeFromDate = (value, type = "hm") => {
  let date = new Date(value);
  return tConvert(date.toLocaleTimeString(), type);
};

function tConvert(time, type) {
  if (time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      if (type === "hm") {
        time.pop();
      }
      time[5] = +time[0] < 12 ? " am" : " pm"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }

    return time.join(""); // return adjusted time or original string
  } else {
    return null;
  }
}

export const findObjectFromArray = (array, key, value) => {
  let result = array.find((item) => {
    return item[key] === value;
  });
  return result;
};

export function getRandomColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
export const totalDays = (value) => {
  let todate = new Date(value).getDate();
  let tomonth = new Date(value).getMonth() + 1;
  let toyear = new Date(value).getFullYear();
  let original_date = tomonth + "/" + todate + "/" + toyear;
  let today = new Date();
  // let dd = String(today.getDate()).padStart(2, "0");
  // let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  // let yyyy = today.getFullYear();

  const date1 = new Date(today);
  const date2 = new Date(original_date);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export function getLetterColor(letter) {
  let colors = [
    {
      letter: "A",
      color: "#e53935",
    },
    {
      letter: "B",
      color: "#D81B60",
    },
    {
      letter: "C",
      color: "#8E24AA",
    },
    {
      letter: "D",
      color: "#5E35B1",
    },
    {
      letter: "E",
      color: "#3949AB",
    },
    {
      letter: "F",
      color: "#1E88E5",
    },
    {
      letter: "G",
      color: "#039BE5",
    },
    {
      letter: "H",
      color: "#00ACC1",
    },
    {
      letter: "I",
      color: "#00897B",
    },
    {
      letter: "J",
      color: "#43A047",
    },
    {
      letter: "K",
      color: "#7CB342",
    },
    {
      letter: "L",
      color: "#C0CA33",
    },
    {
      letter: "M",
      color: "#FDD835",
    },
    {
      letter: "N",
      color: "#FFB300",
    },
    {
      letter: "O",
      color: "#FB8C00",
    },
    {
      letter: "P",
      color: "#F4511E",
    },
    {
      letter: "Q",
      color: "#6D4C41",
    },
    {
      letter: "R",
      color: "#757575",
    },
    {
      letter: "S",
      color: "#607D8B",
    },
    {
      letter: "T",
      color: "#E64A19",
    },
    {
      letter: "U",
      color: "#F57C00",
    },
    {
      letter: "V",
      color: "#FFA000",
    },
    {
      letter: "W",
      color: "#FBC02D",
    },
    {
      letter: "X",
      color: "#AFB42B",
    },
    {
      letter: "Y",
      color: "#689F38",
    },
    {
      letter: "Z",
      color: "#303F9F",
    },
    {
      letter: "a",
      color: "#e53935",
    },
    {
      letter: "b",
      color: "#D81B60",
    },
    {
      letter: "c",
      color: "#8E24AA",
    },
    {
      letter: "d",
      color: "#5E35B1",
    },
    {
      letter: "e",
      color: "#3949AB",
    },
    {
      letter: "f",
      color: "#1E88E5",
    },
    {
      letter: "g",
      color: "#039BE5",
    },
    {
      letter: "h",
      color: "#00ACC1",
    },
    {
      letter: "i",
      color: "#00897B",
    },
    {
      letter: "j",
      color: "#43A047",
    },
    {
      letter: "k",
      color: "#7CB342",
    },
    {
      letter: "l",
      color: "#C0CA33",
    },
    {
      letter: "m",
      color: "#FDD835",
    },
    {
      letter: "n",
      color: "#FFB300",
    },
    {
      letter: "o",
      color: "#FB8C00",
    },
    {
      letter: "p",
      color: "#F4511E",
    },
    {
      letter: "q",
      color: "#6D4C41",
    },
    {
      letter: "r",
      color: "#757575",
    },
    {
      letter: "s",
      color: "#607D8B",
    },
    {
      letter: "t",
      color: "#E64A19",
    },
    {
      letter: "u",
      color: "#F57C00",
    },
    {
      letter: "v",
      color: "#FFA000",
    },
    {
      letter: "w",
      color: "#FBC02D",
    },
    {
      letter: "x",
      color: "#AFB42B",
    },
    {
      letter: "y",
      color: "#689F38",
    },
    {
      letter: "z",
      color: "#303F9F",
    },
  ];
  let color = findObjectFromArray(colors, "letter", letter);
  return color ? color.color : "#8BC34A";
}

export const truncateString = (string, maxLength = 50) => {
  if (!string) return null;
  if (string.length <= maxLength) return string;
  return `${string.substring(0, maxLength)}...`;
};

export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export const numberWithCommas = (number) => {
  if (number) return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  else return number;
};
