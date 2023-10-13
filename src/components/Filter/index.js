/* eslint-disable no-unreachable */
import Loader from 'react-loader-spinner'
import Button from '../Button'
import './index.css'

const Filter = props => {
  const TypeList = () => {
    const {TypesList, type} = props

    return TypesList.map(each => {
      const {employmentTypeId, label} = each
      const Click1 = () => type(employmentTypeId)
      return (
        <li key={employmentTypeId} className="filter-list">
          <input
            type="checkBox"
            id="label"
            name="Type of Employment"
            value={label}
            onChange={Click1}
            className="inp"
          />
          <label htmlFor="label">{label}</label>
        </li>
      )
    })
  }

  const SearchList = () => {
    const {salaryList} = props

    return salaryList.map(each => {
      const {pakage} = props
      const {salaryRangeId, label} = each
      const Click = () => pakage(salaryRangeId)

      return (
        <li key={salaryRangeId} className="filter-list">
          <input
            type="radio"
            id="label1"
            name="Salary Range"
            value={label}
            onChange={Click}
            className="inp"
          />
          <label htmlFor="label1">{label}</label>
        </li>
      )
    })
  }

  const Load = () => (
    <div className="Loading1" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  const Fdesign = () => {
    const {profile, profileSearch} = props
    const {Image, name, Bio, Ser} = profile

    return (
      <div>
        <div className="Fcard">
          {profileSearch !== false ? (
            <>
              <div className="profilebg">
                <img src={Image} alt="profile" />
                <h1>{name}</h1>
                <p>{Bio}</p>
              </div>
            </>
          ) : (
            <Button Ser={Ser} />
          )}
          <hr />
          <div>
            <h1>Type of Employment</h1>
            <ul>{TypeList()}</ul>
          </div>
          <hr />

          <div>
            <h1>Salary Range</h1>
            <ul> {SearchList()}</ul>
          </div>
        </div>
      </div>
    )
  }

  return <div>{Fdesign()}</div>
}

export default Filter
