const api={
    key:"6289e5be2d11314bbf3b9716741ca763",
   url:"https://api.openweathermap.org/data/2.5/"
 ,
 urlO:"https://api.openweathermap.org/data/2.5/onecall?"
}
document.addEventListener("DOMContentLoaded",refresh);
function refresh(){
 fetch (`${api.url}weather?q=New York&units=metric&APPID=${api.key}`)
 //  fetch(`${api.urlO}lat=40.71&lon=-74.01&exclude=monthtly&units=metric&APPID=${api.key}`)
  
   .then(weather=>weather.json())
    .then(displayResults);
}

const search=document.getElementById('search');

search.addEventListener('keypress',setQuery );
function setQuery(e){
    if(e.keyCode===13){
        getResults(search.value);
     

   
    }
} 

function getResults(query){
fetch(`${api.url}weather?q=${query}&units=metric&APPID=${api.key}`)
   
    .then(weather=>{
       return weather.json()
       
    })
    .then(displayResults);
  

}
function displayResults(weather){
    console.log(weather);
 
    let city=document.getElementById('city')
 city.innerHTML=`${weather.name}, ${weather.sys.country}`
 let date=document.getElementById('date');
 let now=new Date();
 date.innerHTML=dateBuilder(now);

 let temp=document.getElementById('temp');
 temp.innerHTML=`${weather.main.temp} <span>°C</span>`
let weatherr=document.getElementById('weather');
weatherr.innerHTML=`Its going to be ${weather.weather[0].description} `
let hiLow=document.getElementById('hi-low');
hiLow.innerHTML=`${weather.main.temp_min}°C / ${weather.main.temp_max}°C`
}
function dateBuilder(d){
    let months=['January','February','March','April','May','June','July','August','September','October','November','December'];
    let days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let day=days[d.getDay()];
    let date=d.getDate();
    let month=months[d.getMonth()];
    let year=d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
}

