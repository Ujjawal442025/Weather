//DOM
const vis = document.querySelector(".Visibility");
const date = document.querySelector(".info .date");
const temperature = document.querySelector(".temp");
const cityy = document.querySelector(".cityy")
const feels = document.querySelector(".Feels");
const humidity = document.querySelector(".Humidity");
const wind = document.querySelector(".Wind");
const pressure = document.querySelector(".Pressure");
const searchinput = document.querySelector("input");
const searchbtn = document.querySelector(".search button");
const weather = document.querySelector(".cloudy");
const img = document.querySelector(".weathericon")
const notFoundSection = document.querySelector(".errormessage")
const SearchSection = document.querySelector(".sectionmessage")
const WeatherInfoSection = document.querySelector(".weather")


showDisplaySection(SearchSection);

//Updating Weather 
async function checkWeather(city){
    const api_key = "0c28d073e4931425604d6a4ef122f868";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;
    const response = await fetch(url);
    
    const data = await response.json();
    
    
    if (data.cod === 200) {
    showDisplaySection(WeatherInfoSection);
    cityy.innerHTML = data.name;
    temperature.innerHTML = Math.round(data.main.temp) + "°c";
    humidity.innerHTML = data.main.humidity + "%";
    wind.innerHTML = data.wind.speed + "m/s";
    feels.innerHTML = Math.round(data.main.feels_like) + "°c";
    pressure.innerHTML = data.main.pressure + "hPa";
    vis.innerHTML = data.visibility + "m";
    weather.innerHTML = data.weather[0].main;
    
    
    if (data.weather[0].main === "Clouds") {
        img.src = "clouds.png";
    } else if (data.weather[0].main === "Clear") {
        img.src = "clear.png";
    } else if (data.weather[0].main === "Rain") {
        img.src = "rain.png";
    } else if (data.weather[0].main === "Drizzle") {
        img.src = "drizzle.png";
    } else if (data.weather[0].main === "Mist") {
        img.src = "few-cloud.png";
    } else if (data.weather[0].main === "Thunderstorm") {
        img.src = "thunderstorm.png";
    } else if (data.weather[0].main === "Snow") {
        img.src = "snow.png";
        
    } 
} else if (data.cod !== 200) {
    showDisplaySection(notFoundSection);
}



    
    
};

function showDisplaySection(section){
    
    let sectionArr = [notFoundSection,SearchSection,WeatherInfoSection];
    sectionArr.forEach((show)=>{
        if(show === section){
            show.style.display = "block";
        }else {
            show.style.display = "none";
        }
    })
};

//Date Update
function currentDate(){
    let currdate = new Date().toDateString().split(' ').slice(0,3);
    //console.log(currdate);//['Thu', 'Aug', '07']
    let formatDate = `${currdate[0]}, ${currdate[2]} ${currdate[1]} `
    //console.log(formatDate);
    date.innerText = formatDate;
}
//Buttons Click
searchbtn.addEventListener("click",()=>{
    checkWeather(searchinput.value)
    currentDate()
})

searchinput.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    searchbtn.click();
  }
});



    
    