/* eslint-disable no-unreachable */
import './index.css'

const Filter = props => {
  console.log(props)
  const TypeList = () => {
    const {TypesList, type} = props

    return
    TypesList.map(each => {
      const Click1 = () => type(each.employmentTypeId)

      return (
        <li key={each.employmentTypeId} onClick={Click1}>
          <p>{each.label}</p>
        </li>
      )
    })
  }

  const SearchList = () => {
    const {salaryList} = props
    return
    salaryList.map(each => {
      const {pakage} = props
      const Click = () => pakage(each.salaryRangeId)

      return (
        <li key={each.salaryRangeId} onClick={Click}>
          <p>{each.label}</p>
        </li>
      )
    })
  }

  const Search = event => {
    const {getsearch} = props

    if (event.key === 'Enter') {
      getsearch()
    }
  }

  const INPUT = event => {
    const {search} = props
    search(event.target.value)
  }

  const Fdesign = () => {
    const {username, password} = props

    return (
      <div className="Fcard">
        <div className="profilebg">
          <p>nm m</p>
        </div>
        <div>
          <h1>Type of Employment</h1>
          {TypeList()}
        </div>
        <hr />

        <hr />
        <div>
          <h1>Salary Range</h1>
          {SearchList()}
        </div>
      </div>
    )
  }

  return <div>{Fdesign()}</div>
}

export default Filter
