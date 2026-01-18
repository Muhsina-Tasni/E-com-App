

const UserProfile = require("../models/UserProfile");
const httpStatus = require("../constants/httpStatus");
const messages = require("../constants/messages");

// Create profile
const createProfile = async (req, res) => {
  try {
    const { user_id, phone, dob, gender } = req.body;

    const profile = new UserProfile({ user_id, phone, dob, gender });
    await profile.save();

    res.status(httpStatus.CREATED).json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get profile by userId
const getProfileByUserId = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ user_id: req.params.id });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update OR create profile
const updateProfile = async (req, res) => {
  try {
    const { phone, dob, gender } = req.body;

    let profile = await UserProfile.findOne({ user_id: req.params.id });

    if (!profile) {
      // Create new if not exists
      profile = await UserProfile.create({
        user_id: req.params.id,
        phone,
        dob,
        gender,
      });

      return res.status(201).json(profile);
    }

    // Update existing
    profile.phone = phone;
    profile.dob = dob;
    profile.gender = gender;

    await profile.save();

    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete profile
const deleteProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findByIdAndDelete(req.params.id);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ message: "Profile deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createProfile,
  getProfileByUserId,
  updateProfile,
  deleteProfile,
};
