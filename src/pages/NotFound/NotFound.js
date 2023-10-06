import { Link } from "react-router-dom"

import './NotFound.css'

const NotFound = ({isExpanded}) => {
  return (
    
    <div className='frem'>
        <p>404</p>
        <h2>Look like you're lost</h2>
        <h5>te page you are looking for not available</h5>
        <Link to={'/'}>Go to Home</Link>
    </div>
  )
}

export default NotFound