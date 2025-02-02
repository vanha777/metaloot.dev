import { useState } from "react";
import { IoCodeSlashSharp } from "react-icons/io5";
import { FaPlus, FaTimes, FaTrash, FaPencilAlt } from "react-icons/fa";
import Alert from "@/components/Alert";

interface API {
  name: string;
  key: string;
  status: "active" | "inactive";
  createdAt: string;
  lastUsed: string;
}

export default function APISection() {
  const [apis, setApis] = useState<API[]>([
    {
      name: "Production API",
      key: "sk_live_123456789",
      status: "active",
      createdAt: "2024-03-20",
      lastUsed: "2024-03-21"
    },
    {
      name: "Development API",
      key: "sk_test_987654321",
      status: "active",
      createdAt: "2024-03-19",
      lastUsed: "2024-03-20"
    }
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedApi, setSelectedApi] = useState<API | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    environment: 'development'
  });
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: 'info' as 'success' | 'error' | 'info'
  });

  const handleApiClick = (api: API) => {
    setSelectedApi(api);
    setShowViewModal(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const createApi = () => {
    if (!formData.name) {
      setAlert({
        show: true,
        message: 'Please fill in all required fields',
        type: 'error'
      });
      return;
    }

    // Add API creation logic here
    setAlert({
      show: true,
      message: 'API key created successfully!',
      type: 'success'
    });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 p-2 md:p-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <IoCodeSlashSharp className="text-3xl text-green" />
          <h2 className="text-2xl font-bold text-white">API Management</h2>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green/90 group hover:bg-green border-green text-white px-4 py-2 rounded-full font-medium flex items-center gap-2 transition-all"
        >
          <FaPlus className="text-sm text-white" />
          <span className="text-sm">New API Key</span>
        </button>
      </div>

      <div className="space-y-4 bg-slate-800/80 p-6 rounded-lg">
        <div className="space-y-2">
          {apis.map((api, index) => (
            <>
              <div
                key={index}
                onClick={() => handleApiClick(api)}
                className="grid grid-cols-3 gap-4 cursor-pointer hover:bg-slate-700/50 p-4 rounded-lg transition-colors"
              >
                <div>
                  <h3 className="text-gray-300 text-sm">API Name</h3>
                  <p className="text-white font-medium">{api.name}</p>
                </div>
                <div>
                  <h3 className="text-gray-300 text-sm">Status</h3>
                  <p className={`font-medium ${api.status === 'active' ? 'text-green' : 'text-red-400'}`}>
                    {api.status.charAt(0).toUpperCase() + api.status.slice(1)}
                  </p>
                </div>
                <div>
                  <h3 className="text-gray-300 text-sm">Last Used</h3>
                  <p className="text-white font-medium">{api.lastUsed}</p>
                </div>
              </div>
              {index < apis.length - 1 && (
                <hr className="my-2 border-t border-white/20 w-full" />
              )}
            </>
          ))}
        </div>
      </div>

      {/* Add modals and alert similar to GameSection */}
      {/* Add API Modal */}
      {showAddModal && (
        <div
          className="absolute w-full h-[calc(100vh-4rem)] inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setShowAddModal(false)}
        >
          {/* Modal content similar to GameSection */}
        </div>
      )}

      <Alert
        isOpen={alert.show}
        message={alert.message}
        type={alert.type}
        onClose={() => setAlert(prev => ({ ...prev, show: false }))}
      />
    </div>
  );
} 