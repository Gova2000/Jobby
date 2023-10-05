import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', toggle: false, error: ''}

  username = event => {
    this.setState({username: event.target.value})
  }

  password = event => {
    this.setState({password: event.target.value})
  }

  Success = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onFailure = error => {
    this.setState({toggle: true, error})
  }

  fetch = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userdetails = {username, password}
    console.log(username)

    const Api = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userdetails),
    }

    const Urlfetch = await fetch(Api, options)
    const data = await Urlfetch.json()
    if (Urlfetch.ok === true) {
      this.Success(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  login = () => {
    const {username, password, toggle, error} = this.state
    return (
      <div className="login-mianbg">
        <div className="login-bg">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-logo"
          />
          <form className="login-block" onSubmit={this.fetch}>
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
            <button type="submit" className="login-btn">
              Login
            </button>
            {toggle && (
              <p className="errormsg">*Username and Password didn't match</p>
            )}
          </form>
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
