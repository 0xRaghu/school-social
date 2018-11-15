import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addAchievements } from '../../actions/profileActions';

class AddAchievements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      competition: '',
      studentname: '',
      prize: '',
      onDate: '',
      description: '',
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

    const eduData = {
      competition: this.state.competition,
      studentname: this.state.studentname,
      prize: this.state.prize,
      onDate: this.state.onDate,
      description: this.state.description
    };

    this.props.addAchievements(eduData, this.props.history);
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
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Achievement</h1>
              <p className="lead text-center">
                Add anything that your school students have achieved
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Competition"
                  name="competition"
                  value={this.state.competition}
                  onChange={this.onChange}
                  error={errors.competition}
                />
                <TextFieldGroup
                  placeholder="* Name of the Student(s)"
                  name="studentname"
                  value={this.state.studentname}
                  onChange={this.onChange}
                  error={errors.studentname}
                />
                <TextFieldGroup
                  placeholder="* Prize Won"
                  name="prize"
                  value={this.state.prize}
                  onChange={this.onChange}
                  error={errors.prize}
                />
                <h6>On Date</h6>
                <TextFieldGroup
                  name="onDate"
                  type="date"
                  value={this.state.onDate}
                  onChange={this.onChange}
                  error={errors.onDate}
                />
                <TextAreaFieldGroup
                  placeholder="Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Tell us about the student and competition"
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

AddAchievements.propTypes = {
  AddAchievements: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addAchievements })(
  withRouter(AddAchievements)
);
