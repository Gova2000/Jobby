import './index.css'

const JobCard = props => {
  const {Details} = props

  const {
    CompanyLogo,
    EmploymentType,
    Id,
    JobDescripton,
    Location,
    Package,
    Rating,
    Title,
  } = Details

  return (
    <div className="maincard">
      <div className="card">
        <img src={CompanyLogo} alt={Title} className="logo" />
        <div>
          <h1>{Title}</h1>
          <div>
            <p>{Rating}</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="row">
          <div className="row1">
            <p>{Location}</p>
          </div>
          <div className="row1">
            <p>{EmploymentType}</p>
          </div>
        </div>

        <div>
          <p>{Package}</p>
        </div>
      </div>
      <hr />
      <div>
        <h1>Description</h1>
        <p>{JobDescripton}</p>
      </div>
    </div>
  )
}

export default JobCard
