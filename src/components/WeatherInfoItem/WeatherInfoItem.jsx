import './WeatherInfoItem.css'

export const WeatherInfoItem = ({ title, info }) => {
    return (
        <h2 className='weatherInfo'>
            <span>{title}</span>
            <span>{info}</span>
        </h2>
    )
}