import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteAchievement } from '../../actions/profileActions';

class Education extends Component {
  onDeleteClick(id) {
    this.props.deleteAchievement(id);
  }

  render() {
    const achievement = this.props.achievements.map(edu => (
      <tr key={edu._id}>
        <td>{edu.competition}</td>
        <td>{edu.studentname}</td>
        <td>{edu.prize}</td>
        <td>
          <Moment format="DD MMM YYYY">{edu.onDate}</Moment>
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, edu._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Achievements</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Competition</th>
              <th>Student Name</th>
              <th>Prize</th>
              <th>Date</th>
              <th />
            </tr>
            {achievement}
          </thead>
        </table>
      </div>
    );
  }
}

Education.propTypes = {
  deleteAchievement: PropTypes.func.isRequired
};

export default connect(null, { deleteAchievement })(Education);
