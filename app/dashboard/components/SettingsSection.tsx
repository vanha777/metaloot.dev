import { useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import { FaSave, FaUser, FaEnvelope, FaDiscord, FaTwitter, FaGithub } from "react-icons/fa";
import Alert from "@/components/Alert";

export default function SettingsSection() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    discord: '',
    twitter: '',
    github: '',
    bio: ''
  });

  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: 'info' as 'success' | 'error' | 'info'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.username || !formData.email) {
      setAlert({
        show: true,
        message: 'Username and email are required',
        type: 'error'
      });
      return;
    }

    console.log('Saving profile:', formData);
    setAlert({
      show: true,
      message: 'Profile updated successfully!',
      type: 'success'
    });
  };

  return (
    <div className="space-y-6 p-2 md:p-8">
      <div className="flex items-center gap-3">
        <IoSettingsSharp className="text-3xl text-green" />
        <h2 className="text-2xl font-bold text-white">Settings</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6 bg-slate-800/80 p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-gray-400 mb-2 flex items-start gap-1">Username <span className="opacity-50 text-xs">*required</span></h3>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full bg-slate-900/90 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green border border-slate-700/50"
                  placeholder="Enter username"
                />
              </div>
            </div>
            <div>
              <h3 className="text-gray-400 mb-2 flex items-start gap-1">Email <span className="opacity-50 text-xs">*required</span></h3>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-slate-900/90 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green border border-slate-700/50"
                  placeholder="Enter email"
                />
              </div>
            </div>
            <div>
              <h3 className="text-gray-400 mb-2">Discord</h3>
              <div className="relative">
                <FaDiscord className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="discord"
                  value={formData.discord}
                  onChange={handleChange}
                  className="w-full bg-slate-900/90 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green border border-slate-700/50"
                  placeholder="Discord username"
                />
              </div>
            </div>
            <div>
              <h3 className="text-gray-400 mb-2">Twitter</h3>
              <div className="relative">
                <FaTwitter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  className="w-full bg-slate-900/90 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green border border-slate-700/50"
                  placeholder="Twitter handle"
                />
              </div>
            </div>
            <div>
              <h3 className="text-gray-400 mb-2">GitHub</h3>
              <div className="relative">
                <FaGithub className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  className="w-full bg-slate-900/90 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green border border-slate-700/50"
                  placeholder="GitHub username"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-gray-400 mb-2">Bio</h3>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full bg-slate-900/90 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green border border-slate-700/50 h-32 resize-none"
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t border-slate-700">
            <button
              onClick={handleSubmit}
              className="bg-green hover:bg-green/90 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2"
            >
              <FaSave className="text-lg" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>

        <div className="bg-slate-800/80 p-6 rounded-lg h-fit">
          <h3 className="text-xl font-bold text-white mb-4">Profile Preview</h3>
          <div className="space-y-4">
            <div className="w-32 h-32 bg-slate-700 rounded-full mx-auto"></div>
            <div className="text-center">
              <h4 className="text-lg font-medium text-white">{formData.username || 'Username'}</h4>
              <p className="text-gray-400">{formData.email || 'email@example.com'}</p>
            </div>
            <div className="space-y-2 pt-4 border-t border-slate-700">
              <p className="text-gray-300 text-sm">{formData.bio || 'No bio provided'}</p>
            </div>
          </div>
        </div>
      </div>

      <Alert
        isOpen={alert.show}
        message={alert.message}
        type={alert.type}
        onClose={() => setAlert(prev => ({ ...prev, show: false }))}
      />
    </div>
  );
} 