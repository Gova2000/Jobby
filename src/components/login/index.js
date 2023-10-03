import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'

import './index.css'

class Login extends Component {
  state = {username: '', password: ''}

  username = event => {
    this.setState({username: event.target.value})
  }

  password = event => {
    this.setState({password: event.target.value})
  }

  log = jwtToken => {
    const {history} = this.props
    const {username, password} = this.state
    if (username !== '' && password !== '') {
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      history.replace('/')
    } else {
      this.setState({toggle: true})
    }
  }

  fetch = async () => {
    const {username, password} = this.state
    const userdetails = {username, password}

    const Api = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userdetails),
    }

    const Urlfetch = await fetch(Api, options)
    const data = await Urlfetch.json()
    if (Urlfetch.ok === true) {
      this.log(data.jwtToken)
    }
  }

  login = () => {
    const {username, password, toggle} = this.state
    return (
      <div className="login-mianbg">
        <div className="login-bg">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-logo"
          />
          <div className="login-block">
            <label htmlFor="name">USERNAME</label>
            <div className="user">
              <input
                id="name"
                type="text"
                value={username}
                onChange={this.username}
                placeholder="Username"
              />
            </div>

            <label htmlFor="name">PASSWORD</label>
            <div className="user">
              <input
                type="password"
                id="name"
                value={password}
                onChange={this.password}
                placeholder="Password"
              />
            </div>
            <button type="button" className="login-btn" onClick={this.log}>
              Login
            </button>
            {toggle && (
              <p className="erroemsg">*Username and Password didn't matched</p>
            )}
          </div>
        </div>
      </div>
    )
  }

  render() {
    const check = Cookies.get('jwt_token')
    if (check !== undefined) {
      return <Redirect to="/" />
    }
    return <div>{this.login()}</div>
  }
}

export default Login
