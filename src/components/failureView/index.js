import Button from '../Button'
import './index.css'

const Failview = props => {
  const {Ser} = props
  return (
    <div className="fff">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="fail1"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <Button Ser={Ser} />
    </div>
  )
}

export default Failview
