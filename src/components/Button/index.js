import './index.css'

const Button = props => {
  const {Ser} = props

  const Kk = () => {
    Ser()
  }

  return (
    <div className="btnalign">
      <button
        type="button"
        onClick={Kk}
        className="buttonp"
        data-testid="searchButton"
      >
        Retry
      </button>
    </div>
  )
}

export default Button
