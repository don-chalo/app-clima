import style from './Weather.module.css';
import { Weather } from "../hooks/useWeather";
import { getCelciousDegrees } from "../utils";

type WeatherDetailProps = {
    weather: Weather
}

function WeatherDetail({ weather }: WeatherDetailProps) {
    return (
        <div className={style.container}>
            <h2>
                Clima de: {weather.name}
            </h2>
            <p className={style.current}>
                {getCelciousDegrees(weather.main.temp)} &deg;C
            </p>
            <div className={style.temperatures}>
                <p>
                    Max: <span>{getCelciousDegrees(weather.main.temp_max)} &deg;C</span>
                </p>
                <p>
                    Min: <span>{getCelciousDegrees(weather.main.temp_min)} &deg;C</span>
                </p>
            </div>
        </div>
    );
}

export default WeatherDetail;