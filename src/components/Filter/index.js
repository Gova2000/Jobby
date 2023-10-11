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
        <li
          key={each.employmentTypeId}
          onClick={Click1}
          className="filter-list"
        >
          <input
            type="checkbox"
            id="label"
            name="Type of Employment"
            value={each.label}
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
      const Click = () => pakage(each.salaryRangeId)

      return (
        <li key={salaryRangeId} onClick={Click} className="filter-list">
          <input
            type="radio"
            id="label1"
            name="Salary Range"
            value={each.label}
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
    const {profile, load} = props
    const {Image, name, Bio, Ser} = profile

    return (
      <div>
        {load ? (
          <div className="Fcard">
            {profile.length !== 0 ? (
              <>
                <div className="profilebg">
                  <img src={Image} alt={name} />
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
              {TypeList()}
            </div>
            <hr />

            <div>
              <h1>Salary Range</h1>

              {SearchList()}
            </div>
          </div>
        ) : (
          Load()
        )}
      </div>
    )
  }

  return <div>{Fdesign()}</div>
}

export default Filter
