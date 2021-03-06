import React, {useEffect, useState} from 'react'
import { Title, FormInput, WeatherInfoItem, ErrorCity } from './components'
import Button from '@mui/material/Button';
import Moment from "react-moment";
import './index.css'
import { CircleLoader } from 'react-spinners';
import { API, API_KEY, API_URL_ICON } from './constants/api';

const App = () => {
  const [weatherData, setWeatherData] = useState(null)
  const [city, setCity] = useState('Saint Petersburg')
  const [errorMsg, setErrorMsg] = useState('')
  const [icon, setIcon] = useState(`${API_URL_ICON}10d@2x.png`)
  const [loader, setLoader] = useState(false);
  
  const fetchWeather = (event) => {
    event?.preventDefault()
    fetch(`${API}appid=${API_KEY}&q=${city}&units=metric`)
      .then(res => res.json())
      .then((data) => {
        if (data?.cod === "404") {
          setErrorMsg(data.message)
          setWeatherData(null)
        } else {
          setWeatherData(data)
          setErrorMsg('')
          setIcon(`${API_URL_ICON + `10d@2x.png`}`)
        }
      })
      .catch((err) => console.log(err))
      
  }
 
  const searchInputHandler = (event) => {
    setLoader(true)
    setTimeout(() => {
      setLoader(false)
    setCity(event.target.value)
    }, 5000);
  }
 
  const searchInputHandlerButton = (event) => {
    setCity(event.target.innerText)
  }

    useEffect(() => {
      fetchWeather()
    },[city])

  return (
    <div className='containerLeft'>
      <div className='appOne'>
        <Title text="Weather City" />
        <form className='form' onSubmit={fetchWeather}>
          <div className='searchBox'>
            <FormInput onChange={searchInputHandler} placeholder="search city..." />
          </div>
        </form>
        <div className='button_item'>
        <Button variant="contained" type='submit' onClick={searchInputHandlerButton}>London</Button>
        <Button variant="contained" type='submit' onClick={searchInputHandlerButton}>Kyiv</Button>
        <Button variant="contained" type='submit' onClick={searchInputHandlerButton}>Moscow</Button>
        <Button variant="contained" type='submit' onClick={searchInputHandlerButton}>Lisbon</Button>
        <Button variant="contained" type='submit' onClick={searchInputHandlerButton}>Paris</Button>
        </div>
      </div>

      <div className='appTwo'>
      {loader === true ? <CircleLoader/> : <>
        {
          weatherData
          &&
          (<>
              <h1 className='today'>Today</h1>
              <div className="containerRight">
                <div className='BoxLeft'>
                  <WeatherInfoItem title='' info={`${weatherData.name}, ${weatherData?.sys?.country}`} />
                  <img className='icon' src={icon} data={weatherData} alt="" />
                  <Moment format='MMMM Do YYYY, h:mm:ss a' interval={1000} />
                  <WeatherInfoItem className="temp" title='' info={`${Math.round(weatherData?.main?.temp)}???`} /></div>
                <div className='BoxRight'>
                  <WeatherInfoItem title='RealFeel:' info={`${Math.round(weatherData?.main?.feels_like)}???`} />
                  <WeatherInfoItem title='Max Temp:' info={`${Math.round(weatherData?.main?.temp_max)}???`} />
                  <WeatherInfoItem title='Min Temp:' info={`${Math.round(weatherData?.main?.temp_min)}???`} />
                  <WeatherInfoItem title='Humidity:' info={`${weatherData?.main?.humidity}%`} />
                  <WeatherInfoItem title='Wind:' info={`${weatherData?.wind?.speed} m/s`} />
                </div>

              </div>
            </>
          )}  
            
        {
          errorMsg
          &&
          (
            <div className="container"><ErrorCity errorMsg={errorMsg} /></div>
          )}
          </>
        } 
      </div>
    </div>
  )
}

export default App