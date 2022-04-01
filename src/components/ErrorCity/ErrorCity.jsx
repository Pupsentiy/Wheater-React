import './ErrorCity.css'
import ErrImg from '../../assets/images/error.jpg'

export const ErrorCity = ({ errorMsg }) => {
    return (
        <div className='error'>
            <h2>{errorMsg}</h2>
            <img src={ErrImg} alt="img" />
        </div>
    )
}