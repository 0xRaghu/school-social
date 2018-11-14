const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  school: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  classes: {
    type: String,
    required: true
  },
  extracurricular: {
    type: [String],
    required: true
  },
  desc: {
    type: String
  },
  competitions: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      onDate: {
        type: Date,
        required: true
      },
      registertill: {
        type: Date
      },
      opentilllast: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      },
      prize:{
        type: String
      },
      fee:{
        type: String
      }
    }
  ],
  achievements: [
    {
      competition: {
        type: String,
        required: true
      },
      studentname: {
        type: String,
        required: true
      },
      prize: {
        type: String,
        required: true
      },
      onDate: {
        type: Date,
        required: true
      },
      description: {
        type: String
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
