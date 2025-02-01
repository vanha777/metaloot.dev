import { IoSettingsSharp } from "react-icons/io5";

export default function SettingsSection() {
    return (
      <div className="space-y-6 p-2 md:p-8">
        <div className="flex items-center gap-3">
          <IoSettingsSharp className="text-3xl text-green" />
          <h2 className="text-2xl font-bold text-white">Settings</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        </div>
      </div>
    )
  } 