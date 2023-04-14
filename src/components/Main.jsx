import React, {useState, useEffect} from 'react'
import axios from "axios"
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {useSelector, useDispatch} from "react-redux";
import { FaSearchLocation, FaSearch } from "react-icons/fa";
import {motion} from "framer-motion"
import moment from "moment"




export default function Main() {
  const currentDate = new Date()
  const formattedDate = currentDate.toDateString();

  const [city, setCity] = useState("")
  const [temp, setTemp] = useState('')
  const [weatherCondition, setWeatherCondition] = useState('')
  const [stateWeather, setStateWeather] = useState('')
  const [minTemp, setMinTemp]= useState("");
  const [maxTemp, setMaxTemp]= useState("");
  const added = useSelector((state)=> state.editCity.added)
  const dispatch = useDispatch();
  const [error, setError] = useState("")
  const [forecastData, setForecastData] = useState([])
  const getWeatherData = async (city) => {
    
    try{
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=30b718c738ebb2f1f2423b68a560af8f&units=metric`)
      
      if(response.status === 200){
        dispatch({type:"CHECK_CTIY", payload:false})
        setTemp(response.data.main.temp)
        setMaxTemp(response.data.main.temp_max)
        setMinTemp(response.data.main.temp_min)
        setWeatherCondition(response.data.main.temp)
        setStateWeather(response.data.weather[0].main)
       
      }
      else{
        dispatch({type:"CHECK_CTIY"})
      }
        
    
      
    }
    catch(error){
      
      
      console.log(error);
      setMaxTemp("")
      setMinTemp("")
      setTemp("")
      setWeatherCondition("")
      setStateWeather("")
     
      
    }
  }

  const forecastGet = async (city) =>{
    try{
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=30b718c738ebb2f1f2423b68a560af8f&units=metric`);
      const dailyData = response.data.list.filter((data)=> data.dt_txt.includes('12:00:00'))
      setForecastData(dailyData)
      console.log("Done")
      console.log(forecastData)
    }

    catch(error){
      console.log(error)
      setForecastData([])
      console.log("Error")
    }
  }

  useEffect(()=>{
    if(city){
      getWeatherData(city)
      forecastGet(city)
    }
  }, [city])

  /* const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      getWeatherData(city);
    }
  }; */
    
    const cities = useSelector((state)=>state.editCity.cities)
    
    const currentCity = useSelector((state)=> state.editCity.currentCity || "Add new city");
    
    

    useEffect(() => {
      cityWeather(currentCity.name);
    }, [currentCity.name]);

  

  const cityWeather=(city)=>{
    if(city){
      
      setCity(city)
    }
    else{
      
      setTemp("")
      setMaxTemp("")
      setMinTemp("")
      setWeatherCondition("")
      setStateWeather("")
      setError("Enter the city please")
      setForecastData([])
      
    }
  }

  const iconWeather = (weather) =>{
    if(weather === "Clear"){
      return "https://OlegProgrammerua.github.io/weatherManager/assets/weather_icons/day_clear.png"
    }
    else if (weather === "Clouds"){
      return "https://OlegProgrammerua.github.io/weatherManager/assets/weather_icons/cloudy.png"
    }
    else if (weather === "Rain"){
      return "https://OlegProgrammerua.github.io/weatherManager/assets/weather_icons/rain.png"
    }
    else if (weather === "Drizzle"){
      return "https://OlegProgrammerua.github.io/weatherManager/assets/weather_icons/sleet.png"
    }
    else if (weather === "Thunderstorm"){
      return "https://OlegProgrammerua.github.io/weatherManager/assets/weather_icons/rain_thunder.png"
    }
    else if (weather === "Snow"){
      return "https://OlegProgrammerua.github.io/weatherManager/assets/weather_icons/snow.png"
    }
    else if (weather === "Mist"){
      return "https://OlegProgrammerua.github.io/weatherManager/assets/weather_icons/mist.png"
    }
    else if (weather === "Smoke"){
      return "https://OlegProgrammerua.github.io/weatherManager/assets/weather_icons/fog.png"
    }
    else if (weather === "Dust"){
      return "https://OlegProgrammerua.github.io/weatherManager/assets/weather_icons/fog.png"
    }
    else if (weather === "Fog"){
      return "https://OlegProgrammerua.github.io/weatherManager/assets/weather_icons/fog.png"
    }

  }

  return (
    <main>
        {
          temp &&(
            <motion.div animate ={{scale:1}} initial ={{scale:0}}  className="today_weather">
              <div className="weather_icon">
                  <img className ="weather_logo img-responsive" src = {iconWeather(stateWeather)}/>
              </div>
              <div className="weather_information">
                  <div className="temp">{Math.round(maxTemp)}/{Math.round(minTemp)} °C</div>
                  <div className="weather_state">{stateWeather}</div>
                  <div className="weather_date">{formattedDate}</div>
              </div>
           
          </motion.div>
          )
        }

        {!temp && (
          <motion.div animate ={{scale:1}} initial ={{scale:0}} className = "empty_page">
            <FaSearch className = "found_icon"/>
            <div className="title">City was not found or not added.Please add new city</div>
          </motion.div>
        )
          
        }

        {forecastData.length>0 && (
          <motion.div animate ={{scale:1}} initial ={{scale:0}} className = "forecast row text-center">
            {forecastData.map((data)=>(
               <div key ={data.dt} className="forecast_item  col-md-2 col-xs-1 col-6">
               
                   <img className ="weather_logo img-responsive" src = {iconWeather(data.weather[0].main)}/>
               
               <div className="weather_information">
                   <div className="temp">{Math.round(data.main.temp_max)}°C</div>
                   <div className="weather_state">{data.weather[0].main}</div>
                   <div className="weather_date">{moment.unix(data.dt).format('MM/DD/YYYY')}</div>
               </div>
             </div>
            ))}
          </motion.div>
        )}
    {/*    {temp && (
        <div className="forecast row">
          <div className="forecast_item col-md-2">
            <div className="weather_icon">
                <img className ="weather_logo img-responsive" src = {iconWeather({stateWeather})}/>
            </div>
            <div className="weather_information">
                <div className="temp">{Math.round(maxTemp)}/{Math.round(minTemp)} °C</div>
                <div className="weather_state">{stateWeather}</div>
                <div className="weather_date">{formattedDate}</div>
            </div>
          </div>
       </div>
      )} */}
       
    </main>
  )
}
