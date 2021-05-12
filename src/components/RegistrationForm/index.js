// Write your JS code here
import {Component} from 'react'

import './index.css'

class RegistrationForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    showFirstNameError: false,
    showLastNameError: false,
    isFormSubmitted: false,
  }

  validateFirstName = () => {
    const {firstName} = this.state
    return firstName !== ''
  }

  validateLastName = () => {
    const {lastName} = this.state
    return lastName !== ''
  }

  onBlurFirstName = () => {
    const isValidFirstName = this.validFirstName()
    this.setState({showFirstNameError: !isValidFirstName})
  }

  onBlurLastName = () => {
    const isValidLastName = this.validLastName()
    this.setState({showLastNameError: !isValidLastName})
  }

  onChangeFirstName = event => {
    this.setState({firstName: event.target.value})
  }

  onChangeLastName = event => {
    this.setState({lastName: event.target.value})
  }

  onSuccessfulSubmission = () => {
    this.setState(prevState => ({
      isFormSubmitted: !prevState.isFormSubmitted,
      firstName: '',
      lastName: '',
    }))
  }

  onSubmitForm = event => {
    event.preventDefault()
    const isValidFirstName = this.validFirstName()
    const isValidLastName = this.validLastName()
    if (isValidFirstName && isValidLastName) {
      this.setState({isFormSubmitted: true})
    } else {
      this.setState({
        showFirstNameError: !isValidFirstName,
        showLastNameError: !isValidLastName,
        isFormSubmitted: false,
      })
    }
  }

  renderFirstName = () => {
    const {firstName, showFirstNameError} = this.state
    const errorHighlight = showFirstNameError ? 'error-field' : ''
    return (
      <>
        <label className="input-label" htmlFor="firstName">
          FIRST NAME
        </label>
        <input
          type="text"
          id="firstName"
          className={`first-name-input-field ${errorHighlight}`}
          value={firstName}
          placeholder="First name"
          onChange={this.onChangeFirstName}
          onBlur={this.onBlurFirstName}
        />
      </>
    )
  }

  renderLastName = () => {
    const {lastName, showLastNameError} = this.state
    const errorHighlight = showLastNameError ? 'error-field' : ''
    return (
      <>
        <label htmlFor="lastName" className="input-label">
          LAST NAME
        </label>
        <input
          type="text"
          className={`last-name-input-field ${errorHighlight}`}
          id="lastName"
          value={lastName}
          placeholder="LastName"
          onBlur={this.onBlurLastName}
          onChange={this.onChangeLastName}
        />
      </>
    )
  }

  renderRegistrationForm = () => {
    const {showLastNameError, showFirstNameError} = this.state
    return (
      <form>
        <div className="form-container" onSubmit={this.onSubmitForm}>
          <div>{this.renderFirstName()}</div>
          {showFirstNameError && <p className="error_message">Required</p>}
          <div>{this.renderLastName()}</div>
          {showLastNameError && <p className="error_message">Required</p>}
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    )
  }

  renderSubmissionReport = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        alt="success"
        className="success-image"
      />
      <p>Submitted Successfully</p>
      <button
        type="button"
        className="submit-button"
        onClick={this.onSuccessfulSubmission}
      >
        Submit Another Response
      </button>
    </>
  )

  render() {
    const {isFormSubmitted} = this.state
    return (
      <div className="registration-form-container">
        <h1 className="form-title">Registration</h1>
        <div className="container">
          {isFormSubmitted
            ? this.renderSubmissionReport()
            : this.renderRegistrationForm()}
        </div>
      </div>
    )
  }
}

export default RegistrationForm
