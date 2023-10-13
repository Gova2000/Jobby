import Button from '../Button'

const NoJOb = props => {
  const {Ser} = props
  return (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
        alt="no jobs"
      />

      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters</p>
      <Button Ser={Ser} />
    </div>
  )
}

export default NoJOb
