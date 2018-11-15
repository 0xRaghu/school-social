import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteCompetition } from '../../actions/profileActions';

class Experience extends Component {
  onDeleteClick(id) {
    this.props.deleteExperience(id);
  }

  render() {
    const competition = this.props.competitions.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="DD MMM YYYY">{exp.onDate}</Moment>
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, exp._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Competitions</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Conducted By</th>
              <th>Name</th>
              <th>Date</th>
              <th />
            </tr>
            {competition}
          </thead>
        </table>
      </div>
    );
  }
}

Experience.propTypes = {
  deleteCompetition: PropTypes.func.isRequired
};

export default connect(null, { deleteCompetition })(Experience);
