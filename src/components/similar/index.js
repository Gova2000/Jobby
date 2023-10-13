import {AiFillStar} from 'react-icons/ai'
import './index.css'

const Same = props => {
  const {each} = props
  const {
    companyLogo,

    employeType,
    description,
    location,
    Rating,

    title,
  } = each

  return (
    <li className="carding">
      <div className="row">
        <img
          src={companyLogo}
          alt="similar job company logo"
          className="logo"
        />
        <div>
          <h1>{title}</h1>
          <div className="row1">
            <AiFillStar className="star" />
            <p>{Rating}</p>
          </div>
        </div>
      </div>
      <h1 className="margin1">Description</h1>
      <p>{description}</p>
    </li>
  )
}

export default Same
