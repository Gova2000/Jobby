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
        <div className="row ">
          <Link to="/" className="link">
            <p>Home</p>
          </Link>
          <Link to="/jobs" className="link">
            <p>Jobs</p>
          </Link>
        </div>
      </div>

      <button type="button" onClick={onClickLogout} className="hide logbtn">
        Logout
      </button>

      <div className="row11">
        <div className="row">
          <Link to="/">
            <AiFillHome size="36" className="logutbtn link" />
          </Link>
          <Link to="/jobs">
            <GiSuitcase size="36" className="logutbtn link" />
          </Link>
        </div>
        <button type="button" className="logutbtn" onClick={onClickLogout}>
          <FiLogOut size="36" />
        </button>
      </div>
    </div>
  )
}
export default withRouter(Header)
