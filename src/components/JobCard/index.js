import './index.css'

const JobCard = props => {
  const {Details} = props
  console.log(Details)
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
    <div>
      <div className="card">
        <img src={CompanyLogo} alt={Title} />
        <div>
          <h1>{Title}</h1>
          <div>
            <p>{Rating}</p>
          </div>
        </div>
      </div>
      <div>
        <div>
          <p>{Location}</p>
        </div>
        <div>
          <p>{EmploymentType}</p>
        </div>
        <div>
          <p>{Package}</p>
        </div>
      </div>

      <div>
        <h1>Description</h1>
        <p>{JobDescripton}</p>
      </div>
    </div>
  )
}

export default JobCard
