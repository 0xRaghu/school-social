import React, { Component } from 'react';
import Moment from 'react-moment';

class ProfileCreds extends Component {
  render() {
    const { competitions, achievements } = this.props;

    const expItems = competitions.map(comp => (
      <li key={comp._id} className="list-group-item">
        <h4>{comp.title}</h4>
        <p>
          <Moment format="DD MMM YYYY">{comp.onDate}</Moment>
        </p>
        <p>
          <strong>Conducted By:</strong> {comp.company}
        </p>
        <p>
          {comp.location === '' ? null : (
            <span>
              <strong>Location: </strong> {comp.location}
            </span>
          )}
        </p>
        <p>
          {comp.description === '' ? null : (
            <span>
              <strong>Description: </strong> {comp.description}
            </span>
          )}
        </p>
        <p>
          {comp.prize === '' ? null : (
            <span>
              <strong>Prize: </strong> {comp.prize}
            </span>
          )}
        </p>
        <p>
          {comp.fee === '' ? null : (
            <span>
              <strong>Registration Fee: </strong> {comp.fee}
            </span>
          )}
        </p>
      </li>
    ));

    const eduItems = achievements.map(ach => (
      <li key={ach._id} className="list-group-item">
        <h4>{ach.competition}</h4>
        <p>
          <Moment format="DD MMM YYYY">{ach.onDate}</Moment>
        </p>
        <p>
          <strong>Student Name:</strong> {ach.studentname}
        </p>
        <p>
          <strong>Prize:</strong> {ach.prize}
        </p>
        <p>
          {ach.description === '' ? null : (
            <span>
              <strong>Description: </strong> {ach.description}
            </span>
          )}
        </p>
      </li>
    ));
    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Competitions</h3>
          {expItems.length > 0 ? (
            <ul className="list-group">{expItems}</ul>
          ) : (
            <p className="text-center">No Competition Listed</p>
          )}
        </div>

        <div className="col-md-6">
          <h3 className="text-center text-info">Achievements</h3>
          {eduItems.length > 0 ? (
            <ul className="list-group">{eduItems}</ul>
          ) : (
            <p className="text-center">No Achievement Listed</p>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileCreds;
