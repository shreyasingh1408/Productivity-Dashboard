function openFeatures() {
  var allElems = document.querySelectorAll(".elem");
  var fullElemPage = document.querySelectorAll(".fullElem");
  var fullElemPageBackBtn = document.querySelectorAll(".fullElem .back");

  allElems.forEach(function (elem) {
    elem.addEventListener("click", function () {
      fullElemPage[elem.id].style.display = "block";
    });
  });

  fullElemPageBackBtn.forEach(function (back) {
    back.addEventListener("click", function () {
      fullElemPage[back.id].style.display = "none";
    });
  });
}
openFeatures()


function todoList() {
  var currentTask = [];

  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.log("Task list is empty");
  }

  function renderTask() {
    var allTask = document.querySelector(".allTask");

    let sum = "";

    currentTask.forEach(function (elem, idx) {
      sum += `<div class="task">
                        <h5>${elem.task} <span class="${elem.imp}">imp</span></h5>
                        <button id=${idx}>Mark as Completed</button>
                    </div>`;
    });

    allTask.innerHTML = sum;
    localStorage.setItem("currentTask", JSON.stringify(currentTask));

    document.querySelectorAll(".task button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      currentTask.splice(btn.id, 1);
      renderTask();
      
      });
    });
  }

  renderTask();

  let form = document.querySelector(".addTask form");
  let taskInput = document.querySelector(".addTask form #task-input");
  let taskDetailsInput = document.querySelector(".addTask form textarea");
  let taskCheckbox = document.querySelector(".addTask form #check");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    currentTask.push({
      task: taskInput.value,
      details: taskDetailsInput.value,
      imp: taskCheckbox.checked,
    });

    renderTask();
    
    taskCheckbox.checked=false
    taskInput.value=''
    taskDetailsInput=''
  });

  
}
todoList()


function dailyPlanner(){
  var dayPlanner= document.querySelector('.day-planner')
var dayPlanData=JSON.parse(localStorage.getItem('dayPlanData'))||{}


var hours=Array.from({length:18},(_,idx)=> `${6+idx}:00 - ${7+idx}:00`)



var wholeDaySum=''
hours.forEach(function(elem,idx){

  var savedData=dayPlanData[idx] || ''

  wholeDaySum+=`<div class="day-planner-time">
                    <p>${elem}</p>
                    <input id=${idx} type="text" placeholder="..." value=${savedData}>
                </div>`
})


dayPlanner.innerHTML=wholeDaySum

var dayPlannerInput=document.querySelectorAll('.day-planner input')

dayPlannerInput.forEach(function(elem){
  elem.addEventListener('input',function(){
    dayPlanData[elem.id]=elem.value
    localStorage.setItem('dayPlanData',JSON.stringify(dayPlanData))

  })
})
}
dailyPlanner()


function motivationQuote(){
  var motivationQuoteContent=document.querySelector('.motivation-2 h1')
  var motivationAuthor=document.querySelector('.motivation-3 h2')

  async function fetchQuote(){
  try{
  let response= await fetch("https://api.quotable.io/random")
  let data=await response.json()
  motivationQuoteContent.innerHTML=data.content
  motivationAuthor.innerHTML=data.author
  }catch(err){
    console.log(err)
  }
}
fetchQuote()

}
motivationQuote()


function pomodoroTimer(){
  let timer=document.querySelector('.pomo-timer h1')
let startBtn=document.querySelector('.pomo-timer .start-timer')
let pauseBtn=document.querySelector('.pomo-timer .pause-timer')
let resetBtn=document.querySelector('.pomo-timer .reset-timer')
var session=document.querySelector('pomodoro-fullpage .session')
var isWorkSession=true

let timerInterval=null
let totalSeconds=25*60

function updateTimer(){
  let minutes=Math.floor(totalSeconds/60)
  let seconds=totalSeconds%60

  timer.innerHTML=`${String(minutes).padStart('2','0')}:${String(seconds).padStart('2','0')}`

}

function startTimer(){
  clearInterval(timerInterval)

  if(isWorkSession){

    timerInterval=setInterval(function(){
    if(totalSeconds>0){
      totalSeconds--
      updateTimer()
    }else{
      isWorkSession=false
      clearInterval(timerInterval)
      timer.innerHTML='05:00'
      session.innerHTML='Take a Break'
      session.style.backgroundColor='var(--blue)'
      totalSeconds=5*60
    }
  },1000)

  }else{

    timerInterval=setInterval(function(){
    if(totalSeconds>0){
      totalSeconds--
      updateTimer()
    }else{
      isWorkSession=true
      clearInterval(timerInterval)
      timer.innerHTML='25:00'
      session.innerHTML='Work Session'
      session.style.backgroundColor='var(--green)'
      totalSeconds=25*60
    }
  },1000)
  }

}


function pauseTimer(){
  clearInterval(timerInterval)
}
function resetTimer(){
  
  totalSeconds=25*60
  clearInterval(timerInterval)
   updateTimer()
}
startBtn.addEventListener('click',startTimer)
pauseBtn.addEventListener('click',pauseTimer)
resetBtn.addEventListener('click',resetTimer)


}

pomodoroTimer()


var apiKey="8a275668bcf844d78e1165556262403"
var city='Kanpur'
var header1Time=document.querySelector('.header1 h1')
var header1Date=document.querySelector('.header1 h2')
var header2Temp=document.querySelector('.header2 h2')
var header2Condition=document.querySelector('.header2 h4')
var pricipitation=document.querySelector('.header2 .pricipitation')
var humidity=document.querySelector('.header2 .humidity')
var wind=document.querySelector('.header2 .wind')

var data=null

async function weatherAPICall(){
  var response=await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
   data=await response.json()
   console.log(data.current)

   header2Temp.innerHTML=`${data.current.temp_c} °C`
   header2Condition.innerHTML=`${data.current.condition.text}`
   wind.innerHTML=`Wind: ${data.currentw.wind_kph} km/h`
   humidity.innerHTML=`Humidity: ${data.current.humidity} %`
   pricipitation.innerHTML=`HeatIndex: ${data.current.heatindex_c} %`


}
weatherAPICall()


function timeDate(){
  const totalDaysOfWeek=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"
]
  var date=new Date()
  var dayOfWeek=totalDaysOfWeek[date.getDay()]
  var hours=date.getHours()
  var minutes=date.getMinutes()
  var seconds=date.getSeconds()
  var tarik=date.getDate()
  var month=monthNames[date.getMonth()]
  var year=date.getFullYear()
  header1Date.innerHTML=`${tarik} ${month}, ${year}`
  if(hours > 12){
    header1Time.innerHTML=`${dayOfWeek}, ${hours -12 }:${minutes}:${seconds} PM`

  }else{
    header1Time.innerHTML=`${dayOfWeek}, ${hours}:${minutes}:${seconds} AM` 

  }

}

setInterval(()=>{
  timeDate()
},1000)
  
