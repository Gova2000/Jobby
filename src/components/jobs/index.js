import {Component} from 'react'
import {FiSearch} from 'react-icons/fi'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import JobCard from '../JobCard'

import Header from '../Header'

import Filter from '../Filter'
import NoJOb from '../NoJOb'
import './index.css'
import Failview from '../failureView'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const LoadConst = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',

  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    eptype: [],
    jobpackage: [],
    title: '',
    List: [],
    profile: {},
    listfetch: false,
    profileStatus: false,
    load: false,
    Status: LoadConst.initial,
  }

  componentDidMount() {
    this.Fetchjob()
    this.profilefetch()
  }

  Fetchjob = async () => {
    this.setState({Status: LoadConst.progress})
    const {eptype, jobpackage, title, List} = this.state

    const jwtToken = Cookies.get('jwt_token')
    const Api = `https://apis.ccbp.in/jobs?employment_type=${eptype}&minimum_package=${jobpackage}&search=${title}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const data = await fetch(Api, options)

    if (data.ok === true) {
      const response = await data.json()

      const formated = response.jobs.map(each => ({
        CompanyLogo: each.company_logo_url,
        EmploymentType: each.employment_type,
        Id: each.id,
        JobDescripton: each.job_description,
        Location: each.location,
        Package: each.package_per_annum,
        Rating: each.rating,
        Title: each.title,
      }))
      this.setState({List: formated, load: true, Status: LoadConst.success})
    } else {
      this.setState({listfetch: true, Status: LoadConst.failure})
    }
  }

  profilefetch = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const profileFetch = await fetch('https://apis.ccbp.in/profile', options)

    if (profileFetch.ok) {
      const profileJson = await profileFetch.json()

      const profor = {
        Image: profileJson.profile_details.profile_image_url,
        name: profileJson.profile_details.name,
        Bio: profileJson.profile_details.short_bio,
      }
      this.setState({profile: profor})
    } else {
      this.setState({profileStatus: true})
    }
  }

  ProSer = () => {
    this.profilefetch()
  }

  type = type => {
    const {eptype} = this.state

    if (eptype.includes(type)) {
      const filt = eptype.filter(each => each !== type)
    } else {
      this.setState(prev => ({eptype: [...prev.eptype, type]}), this.Fetchjob)
    }
  }

  package = pack => {
    const {jobpackage} = this.state

    if (jobpackage.includes(pack)) {
      const filt = jobpackage.filter(each => each !== pack)
    } else {
      this.setState(
        prev => ({jobpackage: [...prev.jobpackage, pack]}),
        this.Fetchjob,
      )
    }
  }

  INPUT = event => {
    this.setState({title: event.target.value})
  }

  Ser = () => {
    this.Fetchjob()
  }

  ListSuccess = () => {
    const {List, profile, load, Status, listfetch, profileStatus} = this.state

    return (
      <div className="JCard-bg">
        <Header />
        {List.length !== 0 ? (
          <>
            <div className="inp1">
              <div className="inputrow1 ">
                <input
                  className="input1"
                  type="search"
                  placeholder="search"
                  onChange={this.INPUT}
                />

                <hr className="hr" />
                <div className="icon1">
                  <button
                    type="button"
                    onClick={this.Ser}
                    data-testid="searchButton"
                  >
                    <FiSearch />
                  </button>
                </div>
              </div>
            </div>
            <div className="JFC">
              <Filter
                TypesList={employmentTypesList}
                salaryList={salaryRangesList}
                pakage={this.package}
                type={this.type}
                profile={profile}
                profileStatus={profileStatus}
                Ser={this.Ser}
              />

              <div>
                <div className="inp">
                  <div className="inputrow ">
                    <input
                      className="input1"
                      type="search"
                      placeholder="search"
                      onChange={this.INPUT}
                    />

                    <hr className="hr" />
                    <div className="icon1">
                      <button
                        type="button"
                        onClick={this.Ser}
                        data-testid="searchButton"
                      >
                        <FiSearch />
                      </button>
                    </div>
                  </div>
                </div>

                {List.length === 0 ? (
                  <Failview Ser={this.ProSer} />
                ) : (
                  <ul>
                    {List.map(each => (
                      <JobCard Details={each} key={each.Id} />
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </>
        ) : (
          <NoJOb Ser={this.Ser} />
        )}
      </div>
    )
  }

  Load1 = () => (
    <div className="Loading1" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {Status} = this.state

    switch (Status) {
      case LoadConst.initial:
        return this.Load1()
      case LoadConst.success:
        return this.ListSuccess()
      case LoadConst.progress:
        return this.Load1()
      case LoadConst.failure:
        return <Failview Ser={this.Ser} />

      default:
        return null
    }
  }
}

export default Jobs
