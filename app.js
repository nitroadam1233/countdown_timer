const months = [
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
const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

//let futureDate = new Date(2023, 1, 25, 11, 30, 0);// the second spot is months and its indexed based starting from 0
//getDay method on Date object is 0 index based as well
const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 30, 0);
const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

let month = futureDate.getMonth();//get a number from 0 to 11
month = months[month];
const date = futureDate.getDate();

const weekday = weekdays[futureDate.getDay()];

giveaway.textContent = `giveaway ends on ${weekday} ${date} ${month} ${year} ${hours}:${minutes}am`;

//future time in ms
const futureTime = futureDate.getTime(); //futureDate for the phone giveaway

function getRemainingTime() {
  const today = new Date().getTime(); //current time
  const t = futureTime - today;//currentTime - futureTime 
  //1s = 1000ms
  //1min = 60sec
  //1hr = 60min
  //1day = 24hrs

  //values in ms
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;

  //calculate all values
  let days = t / oneDay;
  days = Math.floor(days);

  let hours = Math.floor((t % oneDay) / oneHour); // the leftover amount of hours
  let minutes = Math.floor((t % oneHour) / oneMinute); // the leftover amount of minutes
  let seconds = Math.floor((t % oneMinute) / 1000);

  // set values array
  const values = [days,hours,minutes,seconds];

  function format(item) {
    if(item < 10) {
      return item = `0${item}`;
    }
    return item;
  }

  items.forEach(function(item, index) {
    item.innerHTML = format(values[index]);
  })

  if(t < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired</h4>`
  }
}

//countdown 
let countdown = setInterval(getRemainingTime, 1000);
getRemainingTime();
