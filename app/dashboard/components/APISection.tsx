import { useState } from "react";
import { FaPlus, FaCopy, FaKey } from "react-icons/fa";
import Alert from "@/components/Alert";
import { GameData } from "@/app/utils/AppContext";

interface API {
  name: string;
  key: string;
  status: "active" | "inactive";
  createdAt: string;
  lastUsed: string;
}

export default function APISection({ selectedGame }: { selectedGame: GameData }) {
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
    <div className="min-h-screen bg-black p-8">
      {/* Compact Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-black border border-white/10 rounded-full flex items-center justify-center">
              <FaKey className="text-2xl text-[#0CC0DF]" />
            </div>
            <div>
              <h1 className="text-white text-2xl font-light">API Keys</h1>
              <p className="text-white/40 text-sm">{apis.length} active keys</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-[#0CC0DF]/10 border border-[#0CC0DF]/20 rounded-lg text-[#0CC0DF] 
                     hover:bg-[#0CC0DF]/20 transition-all duration-300 flex items-center gap-2"
          >
            <FaPlus className="text-sm" />
            Generate New API Key
          </button>
        </div>
      </div>

      {/* Simplified Table */}
      <div className="max-w-6xl mx-auto">
        <div className="rounded-xl overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-6 bg-white/5 text-white/60 text-sm">
            <div className="col-span-6">API Key</div>
            <div className="col-span-3">Created</div>
            <div className="col-span-3 text-right">Status</div>
          </div>
          
          {/* Table Body */}
          <div className="divide-y divide-white/[0.06]">
            {apis.map((api, index) => (
              <div key={index} 
                   className="grid grid-cols-12 gap-4 p-6 hover:bg-white/[0.02] group transition-all duration-200">
                <div className="col-span-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                      <FaKey className="text-[#0CC0DF]" />
                    </div>
                    <div>
                      <div className="text-white/80 font-light">{api.name}</div>
                      <div className="text-white/40 text-xs mt-1">Last used {api.lastUsed}</div>
                    </div>
                  </div>
                </div>
                <div className="col-span-3 flex items-center text-white/40">
                  {api.createdAt}
                </div>
                <div className="col-span-3 flex items-center justify-end gap-4">
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    api.status === 'active' 
                      ? 'bg-[#14F195]/10 text-[#14F195]' 
                      : 'bg-red-500/10 text-red-500'
                  }`}>
                    {api.status}
                  </span>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => navigator.clipboard.writeText(api.key)}
                      className="p-1.5 hover:bg-white/10 rounded-lg transition-all"
                    >
                      <FaCopy className="text-white/60 hover:text-white text-xs" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {apis.length === 0 && (
          <div className="text-center py-16 bg-white/[0.02] rounded-xl border border-white/[0.06]">
            <FaKey className="text-white/10 text-5xl mx-auto mb-4" />
            <p className="text-white/40 font-light">No API keys generated yet</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-4 px-4 py-2 bg-[#0CC0DF]/10 border border-[#0CC0DF]/20 rounded-lg text-[#0CC0DF] 
                       hover:bg-[#0CC0DF]/20 transition-all duration-300 text-sm"
            >
              Generate your first API key
            </button>
          </div>
        )}
      </div>

      {/* Create API Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-black/80 border border-white/10 p-8 rounded-2xl w-[480px] relative">
            <button 
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white"
            >
              ×
            </button>

            <div className="space-y-6">
              <h2 className="text-2xl text-white font-light">Create API Key</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white/60 text-sm mb-2">API Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white"
                    placeholder="e.g., Production API"
                  />
                </div>

                <div>
                  <label className="block text-white/60 text-sm mb-2">Environment</label>
                  <select
                    name="environment"
                    value={formData.environment}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white"
                  >
                    <option value="development">Development</option>
                    <option value="production">Production</option>
                  </select>
                </div>
              </div>

              <button
                onClick={createApi}
                className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-[#0CC0DF] to-[#14F195] 
                         rounded-lg text-black font-medium hover:opacity-90 transition-opacity"
              >
                Generate API Key
              </button>
            </div>
          </div>
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