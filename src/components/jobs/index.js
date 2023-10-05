import {Component} from 'react'

import Cookies from 'js-cookie'

import JobCard from '../JobCard'

import Header from '../Header'

import Filter from '../Filter'

import './index.css'

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

class Jobs extends Component {
  state = {
    eptype: '',
    jobpackage: '',
    title: '',
    List: [],

    username: '',
    password: '',
  }

  componentDidMount() {
    this.Fetchjob()
  }

  Fetchjob = async () => {
    const {eptype, jobpackage, title, List} = this.state

    const jwtToken = Cookies.get('jwt_token')
    const Api = `https://apis.ccbp.in/jobs?employment_type=${eptype}&minimum_package=${jobpackage}&search=${title}`
    const api =
      'https://apis.ccbp.in/jobs?employment_type=FULLTIME&minimum_package=1000000&search='
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
      this.setState({List: formated})
    }
  }

  type = type => {
    this.setState({eptype: type}, this.Fetchjob)
  }

  package = pack => {
    this.setState({package: pack}, this.Fetchjob)
  }

  search = title => {
    this.setState({title})
  }

  getsearch = () => {
    this.Fetchjob()
  }

  ListSuccess = () => {
    const {List, username, password} = this.state

    return (
      <div className="JCard-bg">
        <Header />
        <div className="JFC">
          <Filter
            TypesList={employmentTypesList}
            salaryList={salaryRangesList}
            pakage={this.package}
            search={this.search}
            type={this.type}
            username={username}
            password={password}
          />

          <ul>
            <h1>Jobs</h1>
            {List.map(each => (
              <JobCard Details={each} key={each.Id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    return <div>{this.ListSuccess()}</div>
  }
}

export default Jobs
