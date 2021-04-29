function toSeconds(time_str) {
  // Extract hours, minutes and seconds
  var parts = time_str.split(':');
  // compute  and return total seconds
  return (
    parts[0] * 3600 + // an hour has 3600 seconds
    parts[1] * 60 + // a minute has 60 seconds
    +parts[2]
  ); // seconds
}

export function getTimeStatus(a, b, op) {
  var difference;
  if (op) {
    difference = Math.abs(toSeconds(a) - toSeconds(b));
  } else {
    difference = Math.abs(toSeconds(a) + toSeconds(b));
  }
  // format time differnece
  var result = [
    Math.floor(difference / 3600), // an hour has 3600 seconds
    Math.floor((difference % 3600) / 60), // a minute has 60 seconds
    difference % 60,
  ];

  // 0 padding and concatation
  result = result
    .map(function (v) {
      return v < 10 ? '0' + v : v;
    })
    .join(':');
  // alert(result);
  return result;
}

// var hms = '02:04:33';   // your input string
// var a = hms.split(':'); // split it at the colons

// // Hours are worth 60 minutes.
// var minutes = (+a[0]) * 60 + (+a[1]);

// console.log(minutes);
