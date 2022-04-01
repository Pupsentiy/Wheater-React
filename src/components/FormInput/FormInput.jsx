import './FormInput.css'

export const FormInput = ({ onChange, placeholder }) => {
    return <input className='searchInput' type="text" onChange={onChange} placeholder={placeholder} />
}