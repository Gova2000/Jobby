const Button = props => {
  const {Ser} = props

  const Kk = () => {
    Ser()
  }

  return (
    <button type="button" onClick={Kk} data-testid="searchButton">
      Retry
    </button>
  )
}

export default Button
