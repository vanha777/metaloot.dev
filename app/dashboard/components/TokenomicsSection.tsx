import { useState } from "react";
import { IoWalletOutline } from "react-icons/io5";
import { FaPlus, FaCopy } from "react-icons/fa";
import Alert from "@/components/Alert";

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

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setFormData(prev => ({
//         ...prev,
//         metadata: file
//       }));
//     }
//   };

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
    <div className="space-y-6 p-2 md:p-8">
      <div className="flex items-center gap-3">
        <IoWalletOutline className="text-3xl text-green" />
        <h2 className="text-2xl font-bold text-white">Token Management</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Token Creation Form */}
        <div className="bg-grey p-6 rounded-xl">
          <h3 className="text-xl text-white mb-6">Create New Token</h3>
          <div className="space-y-4">
            <div>
              <h3 className="text-gray-400 mb-2 flex items-start gap-1">Token Name <span className="opacity-50 text-xs">*required</span></h3>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-black/50 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green"
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
                className="w-full bg-black/50 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green"
                placeholder="Enter token symbol"
              />
            </div>
            <div>
              <h3 className="text-gray-400 mb-2">URI <span className="opacity-50 text-xs">*required</span></h3>
              <input
                type="text"
                name="uri"
                value={formData.uri}
                onChange={handleChange}
                className="w-full bg-black/50 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green"
                placeholder="Enter URI"
              />
            </div>
            {/* <div>
              <h3 className="text-gray-400 mb-2">Decimals</h3>
              <input
                type="number"
                name="decimals"
                value={formData.decimals}
                onChange={handleChange}
                className="w-full bg-black/50 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green"
                placeholder="Enter decimals"
              />
            </div> */}
            {/* <div>
              <h3 className="text-gray-400 mb-2 flex items-start gap-1">Total Supply <span className="opacity-50 text-xs">*required</span></h3>
              <input
                type="number"
                name="totalSupply"
                value={formData.totalSupply}
                onChange={handleChange}
                className="w-full bg-black/50 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green"
                placeholder="Enter total supply"
              />
            </div> */}
            {/* <div>
              <h3 className="text-gray-400 mb-2">Metadata</h3>
              <label className="flex items-center gap-2 bg-black/50 text-white rounded-lg px-4 py-2 cursor-pointer hover:bg-black/60">
                <FaUpload className="text-green" />
                <span>{formData.metadata ? formData.metadata.name : 'Upload metadata JSON'}</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div> */}
            <button
              onClick={createToken}
              className="w-full bg-green hover:bg-green/90 text-grey px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 mt-6"
            >
              <FaPlus className="text-sm" />
              <span>Create Token</span>
            </button>
          </div>
        </div>

        {/* Token List */}
        <div className="bg-grey p-6 rounded-xl">
          <h3 className="text-xl text-white mb-6">Your Tokens</h3>
          <div className="space-y-4">
            <div className="bg-black/50 p-4 rounded-lg">
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
                    <input className="bg-transparent w-20 border-b border-white/20 focus:outline-none text-white" type="number" value="100000" />
                </div>
                <button className="text-green">Mint</button>
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