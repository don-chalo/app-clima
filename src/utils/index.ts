export const getCelciousDegrees = (kelvinTemperature: number) => {
    return parseInt((kelvinTemperature - 273.15).toString(), 10);
};