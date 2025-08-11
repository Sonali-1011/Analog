const hourHand = document.getElementById("hour");
const minuteHand = document.getElementById("minute");
const secondHand = document.getElementById("second");
const citySelect = document.getElementById("city-select");
const locationText = document.getElementById("location");

let offset = 0;

async function fetchTimeData(timezone) {
  try {
    const res = await fetch(`https://worldtimeapi.org/api/timezone/${timezone}`);
    const data = await res.json();
    const dateTime = new Date(data.datetime);
    offset = dateTime.getTime() - Date.now();
    locationText.innerText = `Current Timezone: ${timezone}`;
  } catch (error) {
    alert("Failed to fetch time data.");
    console.error(error);
  }
}

function updateClock() {
  const now = new Date(Date.now() + offset);

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const hourDeg = ((hours % 12) + minutes / 60) * 30;
  const minuteDeg = (minutes + seconds / 60) * 6;
  const secondDeg = seconds * 6;

  hourHand.style.transform = `translate(-50%, -100%) rotate(${hourDeg}deg)`;
  minuteHand.style.transform = `translate(-50%, -100%) rotate(${minuteDeg}deg)`;
  secondHand.style.transform = `translate(-50%, -100%) rotate(${secondDeg}deg)`;
}

citySelect.addEventListener("change", () => {
  fetchTimeData(citySelect.value);
});

setInterval(updateClock, 1000);

// Initial load
fetchTimeData(citySelect.value);
