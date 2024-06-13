import styles from  './App.module.css';
import Alert from './components/Alert';
import Form from './components/Form';
import Spinner from './components/Spinner';
import WeatherDetail from './components/WeatherDetail';
import useWeather from './hooks/useWeather';

function App() {

  const { weather, error, fetchWeather, loading, notFound, hasWeatherData } = useWeather();

  return (
    <>
      <h1 className={styles.title}>
        App clima
      </h1>
      <div className={styles.container}>
        <Form fetchWeather={fetchWeather} />
        {
          loading && <Spinner />
        }
        {
          hasWeatherData && <WeatherDetail weather={weather} />
        }
        {
          notFound && <Alert>Ciudad no encontrada</Alert>
        }
        {
          error && <Alert>{error}</Alert>
        }
      </div>
    </>
  )
}

export default App
