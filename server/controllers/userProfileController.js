

import UserProfile from "../models/UserProfile.js";
import httpStatus from "../constants/httpStatus.js";
import messages  from "../constants/messages.js";

// Create profile
 export const createProfile = async (req, res) => {
  try {
    const { user_id, phone, dob, gender } = req.body;

    const profile = new UserProfile({ user_id, phone, dob, gender });
    await profile.save();

    res.status(httpStatus.CREATED).json(profile);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

// Get profile by userId
export const getProfileByUserId = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ user_id: req.params.id });

    if (!profile) {
      return res.status(httpStatus.NOT_FOUND).json({ message: "Profile not found" });
    }

    res.status(httpStatus.OK).json(profile);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

// Update OR create profile
export const updateProfile = async (req, res) => {
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

      return res.status(httpStatus.CREATED).json(profile);
    }

    // Update existing
    profile.phone = phone;
    profile.dob = dob;
    profile.gender = gender;

    await profile.save();

     res.status(httpStatus.OK).json(profile);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

// Delete profile
export const deleteProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findByIdAndDelete(req.params.id);

    if (!profile) {
      return res.status(httpStatus.NOT_FOUND).json({ message: "Profile not found" });
    }

     res.status(httpStatus.OK).json({ message: "Profile deleted" });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

// export default {
//   createProfile,
//   getProfileByUserId,
//   updateProfile,
//   deleteProfile,
// };
