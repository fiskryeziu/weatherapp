import axios from 'axios'
import { useEffect, useState } from 'react'
import Spinner from './Components/Spinner'

const App = () => {
  const [input, setInput] = useState('')
  const [weatherData, setWeatherData] = useState({})
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)
  const fetchWeather = async () => {
    setLoading(true)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Prizren&appid=${process.env.REACT_APP_WEATHER_KEY}`
    const { data } = await axios.get(url)
    setWeatherData(data)
    setLoading(false)
  }
  useEffect(() => {
    fetchWeather()
  }, [])

  const submitHandler = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${process.env.REACT_APP_WEATHER_KEY}`
      const { data } = await axios.get(url)
      setWeatherData(data)
      setInput('')
      setLoading(false)
      return data
    } catch (err) {
      const message =
        err.response && err.response.data
          ? err.response.data.message
          : err.message

      setError(true)
      setMessage(message)
    }
  }
  return (
    <div className="container">
      <h1 className="textH">Weather | App</h1>
      <form onSubmit={submitHandler} className="inputField">
        <input
          type="text"
          value={input}
          required
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className="card">
        {loading ? (
          <Spinner />
        ) : error ? (
          <h1>{message}</h1>
        ) : (
          <>
            <p className="cityP">{weatherData.name}</p>
            <h1>{Math.round(weatherData.main.temp - 273.15)}⁰</h1>
            <p>{weatherData.weather[0].description}</p>
            <div>
              <p>H: {Math.round(weatherData.main.temp_max - 273.15)}⁰</p>
              <p>L: {Math.round(weatherData.main.temp_min - 273.15)}⁰</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default App
