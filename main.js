const container = document.getElementById('cards-container')
let timeFrame

function createProfileCard() {
  return `
    <li class="card profile">
      <div>
        <img src="./images/image-jeremy.png" alt="profile icon" />
        <div>
          <span>Report for </span>
          <span>Jeremy Robson</span>
        </div>
      </div>
      <ul id="time-list">
        <li>Daily</li>
        <li>Weekly</li>
        <li>Monthly</li>
      </ul>
    </li>
  `
}

function appendItem(item) {
  let time = timeFrame || 'weekly'
  let timePeriod = 'Last Week'
  const colorMap = {
    Work: 'orange',
    Play: 'blue',
    Study: 'pink',
    Exercise: 'green',
    Social: 'purple',
    'Self Care': 'yellow',
  }

  if (time === 'Daily') {
    timePeriod = 'Yesterday'
  } else if (time === 'Monthly') {
    timePeriod = 'Last Month'
  } else {
    timePeriod = 'Last Week'
  }

  const color = colorMap[item.title] || 'orange'

  container.innerHTML += `
  
     <li class="card ${color} ${item.title.toLowerCase() === 'self care' ? 'self-care' : item.title.toLowerCase()}">
        <div>
          <img src="./images/icon-${item.title.toLowerCase() === 'self care' ? 'self-care' : item.title.toLowerCase()}.svg" alt="${item.title.toLowerCase()} icon" />
        </div>
        <div>
          <div>
            <span>${item.title}</span>
            <span><img src="./images/icon-ellipsis.svg" alt="icon ellipsis" /></span>
          </div>
          <div>
            <span>${item.timeframes[time.toLowerCase()].current}hrs</span>
            <span>${timePeriod} - ${item.timeframes[time.toLowerCase()].previous}hrs</span>
          </div>
        </div>
      </li>`
}

function populateDOM(data) {
  container.innerHTML = createProfileCard()
  data.forEach(appendItem)
}

function handleClick(data) {
  const timeList = document.getElementById('time-list')
  // convert node list in an array
  const arr = [...timeList.children]
  arr.forEach((item) => {
    item.addEventListener('click', () => {
      timeFrame = item.innerText
      populateDOM(data)
      handleClick(data)
    })
  })
  setInitState(arr)
}

function setInitState(array) {
  const activeText = timeFrame || 'Weekly'
  array.forEach((item) => {
    if (item.innerText === activeText) {
      item.style.color = 'white'
    }
  })
}

function fetchData(timeFrame = 'weekly') {
  fetch('./data.json')
    .then((response) => {
      if (!response.ok) return console.log('Oops! Something went wrong.')

      return response.json()
    })
    .then((data) => {
      populateDOM(data)
      handleClick(data)
    })
}
fetchData()
