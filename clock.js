
SNOOZE_TIME = 3000;

let gTimeoutHandle, gSnoozeCount = 0;

alarmForm = document.forms['alarmForm']
alarmForm.addEventListener('submit', addAlarm);
  
function addAlarm(e) {
  e.preventDefault();
  const data = e.target.elements;
  const deadline = new Date(data.datetime.value);
  const name = data.name.value || "(unnamed)";
  gSnoozeCount = 0;

  
  document.getElementById("activeAlarmName").textContent = name;

  
  document.getElementById("activeAlarmTime").textContent = deadline.toLocaleString();
  document.getElementById("activeAlarmSnoozeCount").textContent = "";

  
  document.getElementById("alarmInfo").style.display = "block";

  const diff = deadline - new Date();
  gTimeoutHandle = setTimeout(() => activateAlarm(), diff);


  
  e.target.reset();
  
  data.datetime.disabled = true; 
}
  
function activateAlarm() {
  document.getElementById("alarmIndicator").style.display = "block";
  document.getElementById("alarmSound").play();
}
  

function resetAlarmForm() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");

  const dateStr = `${year}-${month}-${day}`;
  const timeStr = `${hours}:${minutes}`;

  document.forms['alarmForm'].elements.datetime.value = `${dateStr}T${timeStr}`;
}

document.addEventListener("DOMContentLoaded", resetAlarmForm);

function cancelAlarm() {
  clearTimeout(gTimeoutHandle);
  document.getElementById("alarmInfo").style.display = "none";
  document.getElementById("alarmIndicator").style.display = "none";
  document.getElementById("alarmSound").pause();
  alarmForm.datetime.disabled = false;
}

document.getElementById("cancelBtn").addEventListener('click', cancelAlarm);
  
function snoozeAlarm() {
  clearTimeout(gTimeoutHandle);
  document.getElementById("alarmIndicator").style.display = "none";
  document.getElementById("alarmSound").pause();
  gTimeoutHandle = setTimeout(() => activateAlarm(), SNOOZE_TIME);
  gSnoozeCount++;
  document.getElementById("activeAlarmSnoozeCount").textContent = `(Snoozed ${gSnoozeCount} times)`;
}

document.getElementById("finishBtn").addEventListener('click', cancelAlarm);
document.getElementById("snoozeBtn").addEventListener('click', snoozeAlarm);

function checkAlarmValidity(e) {
  const deadline = new Date(e.target.value);
  const now = new Date();
  if (e.target.value !== "" && deadline < now) {
    e.target.setCustomValidity("Please enter a future date and time.");
  } else {
    e.target.setCustomValidity(""); 
  }
  e.target.reportValidity();
}


alarmForm.addEventListener('focusout', checkAlarmValidity);