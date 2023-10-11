import './index.css'

const Same = props => {
  const {each} = props
  const {
    companyLogo,

    employeType,
    description,
    location,
    rating,

    title,
  } = each
  return (
    <li className="carding">
      <div>
        <img src={companyLogo} alt={title} />
        <div>
          <h1>{title}</h1>
          <div>
            <p>{rating}</p>
          </div>
        </div>
      </div>
      <h1>Description</h1>
      <p>{description}</p>
    </li>
  )
}

export default Same
