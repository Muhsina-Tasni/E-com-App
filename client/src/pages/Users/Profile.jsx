
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getUserProfile, updateUserProfile } from "../../api/userProfileApi";

const UserProfile = () => {
  const { user, handleLogout } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ phone: "", dob: "", gender: "" });

  useEffect(() => {
    if (!user) return setLoading(false);

    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(user._id);
        setProfile(data);
        setForm({
          phone: data.phone || "",
          dob: data.dob ? data.dob.slice(0, 10) : "",
          gender: data.gender || "",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updated = await updateUserProfile(user._id, form);
      setProfile(updated);
      setEditMode(false);
    } catch (err) {
      alert(err.message || "Failed to update profile");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!user) return <div className="p-10 text-center">Please login.</div>;

  return (
    <section className="min-h-screen bg-stone-100 px-4 py-16">
      <div className="max-w-3xl mx-auto bg-white border border-stone-200 shadow-xl p-8">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-serif text-stone-800">My Profile</h1>
          <p className="text-stone-500 text-sm">Manage your personal details</p>
        </div>

        {editMode ? (
          <form onSubmit={handleUpdate} className="space-y-6">

            <div>
              <label className="block text-stone-600 text-sm mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border border-stone-300 p-3 focus:outline-none focus:border-amber-600"
                required
              />
            </div>

            <div>
              <label className="block text-stone-600 text-sm mb-1">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                className="w-full border border-stone-300 p-3 focus:outline-none focus:border-amber-600"
                required
              />
            </div>

            <div>
              <label className="block text-stone-600 text-sm mb-1">Gender</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full border border-stone-300 p-3 focus:outline-none focus:border-amber-600"
                required
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 border border-amber-600 text-amber-600 py-3 hover:bg-amber-600 hover:text-white transition"
              >
                Save Changes
              </button>

              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="flex-1 border border-stone-400 text-stone-600 py-3 hover:bg-stone-200 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">

            <ProfileRow label="Name" value={user.name} />
            <ProfileRow label="Email" value={user.email} />
            <ProfileRow label="Phone" value={profile?.phone || "Not added"} />
            <ProfileRow label="DOB" value={profile?.dob?.slice(0, 10) || "Not added"} />
            <ProfileRow label="Gender" value={profile?.gender || "Not added"} />

            <button
              onClick={() => setEditMode(true)}
              className="w-full border border-amber-600 text-amber-600 py-3 hover:bg-amber-600 hover:text-white transition"
            >
              Edit Profile
            </button>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="mt-8 w-full border border-red-600 text-red-600 py-3 hover:bg-red-600 hover:text-white transition"
        >
          Logout
        </button>
      </div>
    </section>
  );
};

const ProfileRow = ({ label, value }) => (
  <div className="border-b pb-3">
    <p className="text-stone-500 text-sm">{label}</p>
    <p className="font-medium text-stone-800">{value}</p>
  </div>
);

export default UserProfile;
