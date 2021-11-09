import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import Button from './Button'


const Header = ({ title, onAdd, onShow }) => {
    // const onClick = (e) => {
    //     console.log('Click Add Button')
    // }
    const location = useLocation()

    return (
        <header className="header">
            <h1>{title}</h1>
            { location.pathname === "/" && <Button  color={ onShow ? 'Red' : 'Green' } text={ onShow ? 'Close' : 'Add' } onClick={ onAdd } /> }            
        </header>
    )
}

Header.defaultProps = {
    title: "Task Tracker"
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}
// CSS in JS
// const HeadingSytle = {
//     color: 'red', 
//     backgroundColor: 'black'
// }

export default Header
