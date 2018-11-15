import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addCompetitions } from '../../actions/profileActions';

class AddCompetitions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: '',
      title: '',
      location: '',
      onDate: '',
      registertill: '',
      opentilllast: false,
      description: '',
      prize:'',
      fee:'',
      errors: {},
      disabled: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const expData = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      onDate: this.state.onDate,
      registertill: this.state.registertill,
      opentilllast: this.state.opentilllast,
      description: this.state.description,
      prize: this.state.prize,
      fee: this.state.fee
    };

    this.props.addCompetitions(expData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Competition</h1>
              <p className="lead text-center">
                Add any Competition that your school is conducting
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Conducted By?"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                />
                <TextFieldGroup
                  placeholder="* Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                />
                <h6>On Date</h6>
                <TextFieldGroup
                  name="onDate"
                  type="date"
                  value={this.state.onDate}
                  onChange={this.onChange}
                  error={errors.onDate}
                />
                <h6>Register Till</h6>
                <TextFieldGroup
                  name="registertill"
                  type="date"
                  value={this.state.registertill}
                  onChange={this.onChange}
                  error={errors.registertill}
                  disabled={this.state.disabled ? 'disabled' : ''}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="opentilllast"
                    value={this.state.opentilllast}
                    checked={this.state.opentilllast}
                    onChange={this.onCheck}
                    id="opentilllast"
                  />
                  <label htmlFor="opentilllast" className="form-check-label">
                    Can do Spot Registration
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Tell us about the the competition"
                />
                <h6>Prize</h6>
                <TextFieldGroup
                  name="prize"
                  type="text"
                  value={this.state.prize}
                  onChange={this.onChange}
                  error={errors.prize}
                />
                <h6>Registration Fee</h6>
                <TextFieldGroup
                  name="fee"
                  type="text"
                  value={this.state.fee}
                  onChange={this.onChange}
                  error={errors.fee}
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddCompetitions.propTypes = {
  AddCompetitions: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addCompetitions })(
  withRouter(AddCompetitions)
);
