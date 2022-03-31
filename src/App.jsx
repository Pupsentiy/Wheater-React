import React, { useState } from 'react'
import { Title, FormButton, FormInput, WeatherInfoItem, ErrorCity } from './components'
import './index.css'

const App = () => {
  const [weatherData, setWeatherData] = useState(null)
  const [city, setCity] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const API_KEY = 'f5c340f67db5b02bb40d79f20a1bc03e'
  const API = 'https://api.openweathermap.org/data/2.5/weather?'

  const fetchWeather = (event) => {
    event.preventDefault()
    fetch(`${API}appid=${API_KEY}&q=${city}&units=metric`)
      .then(res => res.json())
      .then((data) => {
        if (data?.cod === "404") {
          setErrorMsg(data.message)
          setWeatherData(null)
        } else {
          setWeatherData(data)
          setErrorMsg('')
        }
      })
      .catch((err) => console.log(err))

  }
  const searchInputHandler = (event) => {
    setCity(event.target.value)
  }
  return (
    <div className='app'>
      <Title text="Weather City" />
      <form className='form' onSubmit={fetchWeather}>
        <div className='searchBox'>
          <FormInput onChange={searchInputHandler} placeholder="search city..." />
          <FormButton />
        </div>
      </form>

      {
        weatherData
        &&
        (
          <div className="container">
            <WeatherInfoItem title='City' info={`${weatherData.name}, ${weatherData?.sys?.country}`} />
            <WeatherInfoItem title='Temperature' info={`${weatherData?.main?.temp} ℃`} />
            <WeatherInfoItem title='Pressure' info={weatherData?.main?.pressure} />
            <WeatherInfoItem title='Humidity' info={weatherData?.main?.humidity} />
            <WeatherInfoItem title='Wind' info={`${weatherData?.wind?.speed} m/s`} />
          </div>
        )}

      {errorMsg && (
        <div className="container"><ErrorCity errorMsg={errorMsg} /></div>
      )}


    </div>
  )

}

export default App