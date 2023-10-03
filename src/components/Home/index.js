import {Link, Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <div className="homebg">
      <Header />

      <div className="Homebg">
        <h1>Find The Job That Fits Fits Your Life</h1>
        <p className="p">Millions of people are searching for jobs,salary</p>
        <Link to="/jobs">
          <button type="button" className="findjob">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home
