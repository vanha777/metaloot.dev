import { useState } from "react";
import { FaPlus, FaCopy, FaCoins } from "react-icons/fa";
import Alert from "@/components/Alert";
import { MdGeneratingTokens } from "react-icons/md";
import { GameData } from "@/app/utils/AppContext";

interface TokenForm {
  name: string;
  symbol: string;
  uri: string;
  // decimals: string;
  // totalSupply: string;
  // metadata: File | null;
}

export default function TokenomicsSection({ selectedGame }: { selectedGame: GameData }) {
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
  const [showCreateForm, setShowCreateForm] = useState(false);

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
    <div className="h-screen flex flex-col items-center justify-center bg-black relative">
      {/* Minimalist Token Display */}
      <div className="text-center space-y-8 mb-32">
        <div className="relative">
          <div className="w-32 h-32 mx-auto bg-black border border-white/10 rounded-full 
                        flex items-center justify-center relative z-10">
            <span className="text-white text-4xl font-bold">
              {formData.symbol?.[0] || '?'}
            </span>
          </div>
          {/* Glowing effect behind the circle */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0CC0DF]/20 to-[#14F195]/20 
                        blur-xl rounded-full transform scale-150 -z-0"></div>
        </div>

        <div className="space-y-2">
          <h2 className="text-white/60 text-sm tracking-wider">MONETA KEY</h2>
          <h1 className="text-white text-5xl font-light tracking-wider">
            {formData.name || 'Crypto Project'}
          </h1>
          <p className="text-white/40 text-xl">2024</p>
        </div>

        <button
          onClick={() => setShowCreateForm(true)}
          className="mt-8 px-6 py-3 border border-white/10 rounded-full text-white/60 
                   hover:text-white hover:border-white/30 transition-all duration-300"
        >
          Create Token
        </button>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[15%] text-white/20">BTC</div>
        <div className="absolute top-[30%] right-[20%] text-white/20">ETH</div>
        <div className="absolute bottom-[25%] left-[25%] text-white/20">SOL</div>
      </div>

      {/* Create Token Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-black/80 border border-white/10 p-8 rounded-2xl w-[480px] relative">
            {/* Close button */}
            <button 
              onClick={() => setShowCreateForm(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white"
            >
              ×
            </button>

            <div className="space-y-6">
              <h2 className="text-2xl text-white font-light">Create Token</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white/60 text-sm mb-2">Token Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white"
                    placeholder="e.g., My Game Token"
                  />
                </div>

                <div>
                  <label className="block text-white/60 text-sm mb-2">Token Symbol</label>
                  <input
                    type="text"
                    name="symbol"
                    value={formData.symbol}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white"
                    placeholder="e.g., MGT"
                  />
                </div>

                <div>
                  <label className="block text-white/60 text-sm mb-2">Token URI</label>
                  <input
                    type="text"
                    name="uri"
                    value={formData.uri}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <button
                onClick={createToken}
                className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-[#0CC0DF] to-[#14F195] 
                         rounded-lg text-black font-medium hover:opacity-90 transition-opacity"
              >
                Create Token
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Token Stats Grid */}
      <div className="absolute bottom-32 w-full bg-black/40 backdrop-blur-sm border-t border-white/10 p-8">
        <div className="max-w-6xl mx-auto grid grid-cols-4 gap-6">
          <div className="stat-card">
            <div className="text-white/60 text-sm">Market Cap</div>
            <div className="text-2xl text-white font-light">$0.00</div>
            <div className="text-green-400 text-sm">+0.00%</div>
          </div>

          <div className="stat-card">
            <div className="text-white/60 text-sm">Total Supply</div>
            <div className="text-2xl text-white font-light">0</div>
            <div className="text-white/40 text-sm">Tokens</div>
          </div>

          <div className="stat-card">
            <div className="text-white/60 text-sm">Circulating Supply</div>
            <div className="text-2xl text-white font-light">0</div>
            <div className="text-white/40 text-sm">Tokens</div>
          </div>

          <div className="stat-card">
            <div className="text-white/60 text-sm">Holders</div>
            <div className="text-2xl text-white font-light">0</div>
            <div className="text-white/40 text-sm">Addresses</div>
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