import { useState } from "react";
import { FaPlus, FaCopy } from "react-icons/fa";
import Alert from "@/components/Alert";
import { MdGeneratingTokens } from "react-icons/md";

interface TokenForm {
  name: string;
  symbol: string;
  uri: string;
  // decimals: string;
  // totalSupply: string;
  // metadata: File | null;
}

export default function TokenomicsSection() {
  const [formData, setFormData] = useState<TokenForm>({
    name: '',
    symbol: '',
    uri: '',
    // decimals: '9',
    // totalSupply: '',
    // metadata: null
  });
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: 'info' as 'success' | 'error' | 'info'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const createToken = async () => {
    if (!formData.name || !formData.symbol || !formData.uri) {
      setAlert({
        show: true,
        message: 'Please fill in all required fields',
        type: 'error'
      });
      return;
    }

    try {
      console.log('Creating token with data:', formData);
      setAlert({
        show: true,
        message: 'Token created successfully!',
        type: 'success'
      });
    } catch (error) {
      setAlert({
        show: true,
        message: 'Failed to create token: ' + error,
        type: 'error'
      });
    }
  };

  return (
    <div className="flex flex-col gap-6 p-2 md:p-8 min-h-full">
      <div className="flex items-center gap-3">
        <MdGeneratingTokens className="text-3xl text-green" />
        <h2 className="text-2xl font-bold text-white">Token Management</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Token Creation Form */}
        <div className="space-y-4 bg-slate-800/80 p-6 rounded-lg">
          <h3 className="text-xl text-white mb-6">Create New Token</h3>
          <div className="space-y-4">
            <div>
              <h3 className="text-gray-400 mb-2 flex items-start gap-1">Token Name <span className="opacity-50 text-xs">*required</span></h3>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-slate-900/90 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green border border-slate-700/50"
                placeholder="Enter token name"
              />
            </div>

            <div>
              <h3 className="text-gray-400 mb-2 flex items-start gap-1">Symbol <span className="opacity-50 text-xs">*required</span></h3>
              <input
                type="text"
                name="symbol"
                value={formData.symbol}
                onChange={handleChange}
                className="w-full bg-slate-900/90 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green border border-slate-700/50"
                placeholder="Enter token symbol"
              />
            </div>

            <div>
              <h3 className="text-gray-400 mb-2 flex items-start gap-1">URI <span className="opacity-50 text-xs">*required</span></h3>
              <input
                type="text"
                name="uri"
                value={formData.uri}
                onChange={handleChange}
                className="w-full bg-slate-900/90 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green border border-slate-700/50"
                placeholder="Enter URI"
              />
            </div>

            <button
              onClick={createToken}
              className="w-full bg-green hover:bg-green/90 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 mt-6"
            >
              <FaPlus className="text-sm" />
              <span>Create Token</span>
            </button>
          </div>
        </div>

        {/* Token List */}
        <div className="space-y-4 bg-slate-800/80 p-6 rounded-lg">
          <h3 className="text-xl text-white mb-6">Your Tokens</h3>
          <div className="space-y-4">
            <div className="bg-slate-900/90 p-4 rounded-lg border border-slate-700/50">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-white font-medium">AWG</h4>
                  <p className="text-gray-400 text-sm">Awesome Game 101</p>
                  <p className="text-gray-400 text-sm">GA4jV9ESNBwjxQKs6HgoSebTFTMztacZPCYv8NCs8y8J</p>
                </div>
                <button 
                  className="text-gray-400 hover:text-white"
                  onClick={() => {
                    navigator.clipboard.writeText("token_address_here");
                    setAlert({
                      show: true,
                      message: 'Address copied to clipboard',
                      type: 'info'
                    });
                  }}
                >
                  <FaCopy />
                </button>
              </div>
              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-2">
                  <label className="text-gray-400">Supply: </label>
                  <input className="bg-transparent w-20 border-b border-slate-700/50 focus:outline-none text-white" type="number" value="100000" />
                </div>
                <button className="text-green hover:text-green/90">Mint</button>
              </div>
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