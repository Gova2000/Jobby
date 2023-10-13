import {MdLocationOn} from 'react-icons/md'

import {FaSuitcase} from 'react-icons/fa'
import {BsBoxArrowUpRight} from 'react-icons/bs'

import {AiFillStar} from 'react-icons/ai'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import Same from '../similar'
import Failview from '../failureView'
import './index.css'

class Similar extends Component {
  state = {
    Job: {},
    Skills: [],
    SimilarJobs: [],
    lifeCompany: {},
    failJobs: false,
  }

  componentDidMount() {
    this.get()
  }

  get = async () => {
    const {Job, lifeCompany} = this.state
    const {match} = this.props

    const {params} = match
    const {id} = params
    const cook = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${cook}`,
      },
      method: 'GET',
    }
    const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, options)

    if (response.ok) {
      const data = await response.json()

      const jobDetails = {
        companyLogo: data.job_details.company_logo_url,
        companyWebsite: data.job_details.company_website_url,
        employeType: data.job_details.employment_type,
        Id: data.job_details.id,
        description: data.job_details.job_description,
        Package: data.job_details.package_per_annum,
        location: data.job_details.location,
        rating: data.job_details.rating,
        title: data.job_details.title,
      }

      const skills = data.job_details.skills.map(each => ({
        imageUrl: each.image_url,
        name: each.name,
      }))

      const LifeAtCompany = {
        description2: data.job_details.life_at_company.description,
        imageUrl2: data.job_details.life_at_company.image_url,
      }

      const SJobs = data.similar_jobs.map(each => ({
        companyLogo: each.company_logo_url,
        employeType: each.employment_type,
        Id: each.id,
        description: each.job_description,
        Location: each.location,
        Rating: each.rating,
        title: each.title,
      }))

      this.setState({
        Skills: skills,
        lifeCompany: LifeAtCompany,
        Job: jobDetails,
        SimilarJobs: SJobs,
      })
    } else {
      this.setState({failJobs: true})
    }
  }

  Skils = () => {
    const {Skills} = this.state

    return Skills.map(each => (
      <li className="row1" key={each.name}>
        <img src={each.imageUrl} alt={each.name} className="margin" />
        <p>{each.name}</p>
      </li>
    ))
  }

  Sert = () => {
    this.get()
  }

  MainCard = () => {
    const {Job, lifeCompany, SimilarJobs, failJobs} = this.state

    const {description2, imageUrl2} = lifeCompany
    const {
      companyLogo,
      companyWebsite,
      employeType,
      description,
      location,
      rating,
      Package,
      title,
    } = Job

    return (
      <div>
        <Header />
        {failJobs !== true ? (
          <div className="mg">
            <div className="maincard1">
              <div className="card">
                <img src={companyLogo} alt={title} className=" profile" />
                <div>
                  <h1>{title}</h1>
                  <div className="row1">
                    <AiFillStar className="star" />
                    <p>{rating}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="row">
                  <div className="row1">
                    <MdLocationOn className="fill" />
                    <p>{location}</p>
                  </div>
                  <div className="row1">
                    <FaSuitcase className="fill" />
                    <p>{employeType}</p>
                  </div>
                </div>

                <div>
                  <p>{Package}</p>
                </div>
              </div>
              <hr />
              <div>
                <div className="row">
                  <h1>Description</h1>
                  <div className="row1 anch">
                    <a href={companyWebsite}>Visit</a>
                    <BsBoxArrowUpRight />
                  </div>
                </div>

                <p>{description}</p>
              </div>
              <div>
                <h1>Skills</h1>
                <ul className="row2">{this.Skils()}</ul>
              </div>
              <div>
                <h1>Life at Company</h1>
                <div className="row1">
                  <p className="margin">{description2}</p>
                  <img src={imageUrl2} alt="life at company" />
                </div>
              </div>
            </div>

            <h1>Similar Jobs</h1>
            <ul className="ulcard">
              {SimilarJobs.map(each => (
                <Same each={each} key={each.id} />
              ))}
            </ul>
          </div>
        ) : (
          <Failview Ser={this.Sert} />
        )}
      </div>
    )
  }

  render() {
    return <div>{this.MainCard()}</div>
  }
}
export default Similar
