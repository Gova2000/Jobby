import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {GiSuitcase} from 'react-icons/gi'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props

    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>
      <div className="hide">
        <ul className="row ">
          <Link to="/" className="link">
            <li>Home</li>
          </Link>
          <Link to="/jobs" className="link">
            <li>Jobs</li>
          </Link>
        </ul>
      </div>

      <button type="button" onClick={onClickLogout} className="hide logbtn">
        Logout
      </button>

      <div className="row11">
        <ul className="row">
          <Link to="/">
            <li>
              <AiFillHome size="36" className="logutbtn link" />
            </li>
          </Link>
          <Link to="/jobs">
            <li>
              <GiSuitcase size="36" className="logutbtn link" />
            </li>
          </Link>
        </ul>
        <button type="button" className="logutbtn" onClick={onClickLogout}>
          <FiLogOut size="36" />
        </button>
      </div>
    </div>
  )
}
export default withRouter(Header)
