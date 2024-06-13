import axios, { AxiosError } from "axios";
import { number, object, parse, string, InferOutput } from 'valibot';
import { useMemo, useState } from "react";

import { SearchType } from "../types";

const weatherSchema = object({
    name: string(),
    main: object({
        temp: number(),
        temp_max: number(),
        temp_min: number()
    })
});

export type Weather = InferOutput<typeof weatherSchema>;

const initialState = {
    name: '',
    main: {
        temp: 0,
        temp_max: 0,
        temp_min: 0
    }
};

export default function useWeather() {
    const [weather, setWeather] = useState<Weather>(initialState);
    const [loading, setLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [error, setError] = useState('');
    
    const fetchWeather = async (search: SearchType) => {
        try {
            setLoading(true);
            setWeather(initialState);
            setNotFound(false);
            setError('');
            const appKey = import.meta.env.VITE_API_KEY;
            const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&&appid=${appKey}`;
            const { data } = await axios(geoUrl);

            if (data.length === 0) {
                setNotFound(true);
                return;
            }
            const lat = data[0].lat;
            const lon = data[0].lon;
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appKey}`;
            const { data: weatherData } = await  axios(weatherUrl);
            const result = parse(weatherSchema, weatherData);
            if (result) {
                setWeather(result);
            }
        } catch (error : any | AxiosError) {
            if (axios.isAxiosError(error)) {
                console.log(error.code, error.message);
            } else {
                console.log(error);
            }
            setError('Ups! Algo salio mal. Intenta de nuevo.');
        } finally {
            setLoading(false);            
        }
    };

    const hasWeatherData = useMemo(() => weather.name, [weather]);

    return {
        error,
        fetchWeather,
        hasWeatherData,
        loading,
        notFound,
        weather
    }
};