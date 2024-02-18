const CLIENT_ID = 'YOUR_CLIENT_ID';
const API_KEY = 'YOUR_API_KEY';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
let calendar;

function fetchCalendar() {
  const month = document.getElementById('month').value;
  const year = document.getElementById('year').value;
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const startDate = firstDay.toISOString();
  const endDate = lastDay.toISOString();

  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function() {
    gapi.auth2.getAuthInstance().signIn();
    calendar = gapi.client.calendar;
    return calendar.events.list({
      'calendarId': 'primary',
      'timeMin': startDate,
      'timeMax': endDate,
      'showDeleted': false,
      'singleEvents': true,
      'orderBy': 'startTime'
    });
  }).then(function(response) {
    const events = response.result.items;
    displayCalendar(events);
  }, function(reason) {
    console.log('Error: ' + reason.result.error.message);
  });
}

function displayCalendar(events) {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const headerRow = document.createElement('tr');
  daysOfWeek.forEach(day => {
    const th = document.createElement('th');
    th.textContent = day;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  const firstDayOfMonth = new Date(events[0].start.dateTime);
  const lastDayOfMonth = new Date(events[events.length - 1].end.dateTime);
  const numDays = lastDayOfMonth.getDate();
  let currentDate = 1;

  for (let i = 0; i < 6; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < 7; j++) {
      const cell = document.createElement('td');
      if (i === 0 && j < firstDayOfMonth.getDay()) {
        // Empty cells before the first day of the month
        cell.textContent = '';
      } else if (currentDate > numDays) {
        // Empty cells after the last day of the month
        cell.textContent = '';
      } else {
        cell.textContent = currentDate;
        currentDate++;
      }
      row.appendChild(cell);
    }
    tbody.appendChild(row);
  }

  table.appendChild(thead);
  table.appendChild(tbody);
  const calendarContainer = document.getElementById('calendar');
  calendarContainer.innerHTML = '';
  calendarContainer.appendChild(table);
}
