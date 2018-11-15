import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    // Get first name
    const firstName = profile.school.trim().split(' ')[0];

    // Skill List
    const extracurricular = profile.extracurricular.map((extracurricular, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check" /> {extracurricular}
      </div>
    ));

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{firstName}'s Description</h3>
            <p className="lead">
              {isEmpty(profile.desc) ? (
                <span>{firstName} does not have a description</span>
              ) : (
                <span>{profile.desc}</span>
              )}
            </p>
            <hr />
            <h3 className="text-center text-info">Skill Set</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {extracurricular}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
