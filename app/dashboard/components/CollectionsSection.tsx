import { useState } from "react";
import { FaPlus, FaImage } from "react-icons/fa";
import Alert from "@/components/Alert";
import { GameData } from "@/app/utils/AppContext";

interface CollectionForm {
  name: string;
  symbol: string;
  description: string;
  image: File | null;
}

interface NFTForm {
  name: string;
  description: string;
  image: File | null;
  attributes: { trait_type: string; value: string }[];
}

export default function CollectionsSection({ selectedGame }: { selectedGame: GameData }) {
  const [collectionForm, setCollectionForm] = useState<CollectionForm>({
    name: '',
    symbol: '',
    description: '',
    image: null,
  });

  const [nftForm, setNftForm] = useState<NFTForm>({
    name: '',
    description: '',
    image: null,
    attributes: []
  });

  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: 'info' as 'success' | 'error' | 'info'
  });

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showMintForm, setShowMintForm] = useState(false);

  // Add new states for collections and NFTs
  const [collections, setCollections] = useState([
    { id: '1', name: 'Collection 1', symbol: 'COL1', image: null, nfts: [] },
    { id: '2', name: 'Collection 2', symbol: 'COL2', image: null, nfts: [] },
  ]);

  const handleCollectionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCollectionForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, form: 'collection' | 'nft') => {
    const file = e.target.files?.[0];
    if (file) {
      if (form === 'collection') {
        setCollectionForm(prev => ({
          ...prev,
          [e.target.name]: file
        }));
      } else {
        setNftForm(prev => ({
          ...prev,
          [e.target.name]: file
        }));
      }
    }
  };

  const createCollection = async () => {
    if (!collectionForm.name || !collectionForm.symbol) {
      setAlert({
        show: true,
        message: 'Please fill in all required fields',
        type: 'error'
      });
      return;
    }

    try {
      console.log('Creating collection with data:', collectionForm);
      setAlert({
        show: true,
        message: 'Collection created successfully!',
        type: 'success'
      });
    } catch (error) {
      setAlert({
        show: true,
        message: 'Failed to create collection: ' + error,
        type: 'error'
      });
    }
  };

  const mintNFT = async () => {
    if (!nftForm.name || !nftForm.image) {
      setAlert({
        show: true,
        message: 'Please fill in all required fields',
        type: 'error'
      });
      return;
    }

    try {
      console.log('Minting NFT with data:', nftForm);
      setAlert({
        show: true,
        message: 'NFT minted successfully!',
        type: 'success'
      });
    } catch (error) {
      setAlert({
        show: true,
        message: 'Failed to mint NFT: ' + error,
        type: 'error'
      });
    }
  };

  return (
    <div className="min-h-screen bg-black relative p-8">
      {/* Collections Carousel */}
      <div className="mb-12">
        <h2 className="text-white/60 text-xl mb-6">Collections</h2>
        <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
          {/* Add Collection Button */}
          <button
            onClick={() => setShowCreateForm(true)}
            className="min-w-[200px] h-[260px] border border-white/10 rounded-xl 
                     flex flex-col items-center justify-center gap-4 hover:border-white/30 
                     transition-all duration-300"
          >
            <FaPlus className="text-white/60 text-2xl" />
            <span className="text-white/60">Create Collection</span>
          </button>

          {/* Collection Cards */}
          {collections.map((collection) => (
            <div
              key={collection.id}
              onClick={() => setSelectedCollection(collection.id)}
              className={`min-w-[200px] h-[260px] border rounded-xl p-4 cursor-pointer 
                         transition-all duration-300 ${
                           selectedCollection === collection.id
                             ? 'border-[#14F195] bg-white/5'
                             : 'border-white/10 hover:border-white/30'
                         }`}
            >
              <div className="w-24 h-24 mx-auto bg-black border border-white/10 rounded-full 
                            flex items-center justify-center mb-4">
                {collection.image ? (
                  <img
                    src={URL.createObjectURL(collection.image)}
                    alt={collection.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span className="text-white text-2xl font-bold">
                    {collection.symbol[0]}
                  </span>
                )}
              </div>
              <div className="text-center">
                <h3 className="text-white font-light text-lg mb-1">{collection.name}</h3>
                <p className="text-white/40 text-sm">{collection.symbol}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NFTs Grid Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white/60 text-xl">
            {selectedCollection
              ? `NFTs in ${collections.find(c => c.id === selectedCollection)?.name}`
              : 'Select a Collection'}
          </h2>
          {selectedCollection && (
            <button
              onClick={() => setShowMintForm(true)}
              className="px-4 py-2 border border-white/10 rounded-full text-white/60 
                       hover:text-white hover:border-white/30 transition-all duration-300"
            >
              Mint NFT
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {selectedCollection && (
            <div className="aspect-square border border-white/10 rounded-xl p-4 
                          hover:border-white/30 transition-all duration-300 cursor-pointer">
              <div className="w-full h-full bg-white/5 rounded-lg flex items-center 
                            justify-center">
                <FaPlus className="text-white/60 text-2xl" />
              </div>
            </div>
          )}
          {/* NFT cards would be mapped here */}
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-4 gap-6 mt-12 border-t border-white/10 pt-8">
        <div className="stat-card">
          <div className="text-white/60 text-sm">Total NFTs</div>
          <div className="text-2xl text-white font-light">0</div>
          <div className="text-white/40 text-sm">Minted</div>
        </div>

        <div className="stat-card">
          <div className="text-white/60 text-sm">Floor Price</div>
          <div className="text-2xl text-white font-light">0.00</div>
          <div className="text-white/40 text-sm">SOL</div>
        </div>

        <div className="stat-card">
          <div className="text-white/60 text-sm">Volume</div>
          <div className="text-2xl text-white font-light">0.00</div>
          <div className="text-white/40 text-sm">SOL</div>
        </div>

        <div className="stat-card">
          <div className="text-white/60 text-sm">Holders</div>
          <div className="text-2xl text-white font-light">0</div>
          <div className="text-white/40 text-sm">Unique</div>
        </div>
      </div>

      {/* Create Collection Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-black/80 border border-white/10 p-8 rounded-2xl w-[480px] relative">
            <button 
              onClick={() => setShowCreateForm(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white"
            >
              ×
            </button>

            <div className="space-y-6">
              <h2 className="text-2xl text-white font-light">Create Collection</h2>
              
              {/* Collection Form Fields */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-gray-400 mb-2 flex items-start gap-1">Collection Name <span className="opacity-50 text-xs">*required</span></h3>
                  <input
                    type="text"
                    name="name"
                    value={collectionForm.name}
                    onChange={handleCollectionChange}
                    className="w-full bg-slate-900/90 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green border border-slate-700/50"
                    placeholder="Enter collection name"
                  />
                </div>
                <div>
                  <h3 className="text-gray-400 mb-2 flex items-start gap-1">Symbol <span className="opacity-50 text-xs">*required</span></h3>
                  <input
                    type="text"
                    name="symbol"
                    value={collectionForm.symbol}
                    onChange={handleCollectionChange}
                    className="w-full bg-slate-900/90 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green border border-slate-700/50"
                    placeholder="Enter collection symbol"
                  />
                </div>
                <div>
                  <h3 className="text-gray-400 mb-2">Description</h3>
                  <textarea
                    name="description"
                    value={collectionForm.description}
                    onChange={handleCollectionChange}
                    className="w-full bg-slate-900/90 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green border border-slate-700/50 h-24 resize-none"
                    placeholder="Enter collection description"
                  />
                </div>
                <div>
                  <h3 className="text-gray-400 mb-2">Collection Image</h3>
                  <label className="flex items-center gap-2 bg-slate-900/90 text-white rounded-lg px-4 py-2 cursor-pointer hover:bg-slate-800/90 border border-slate-700/50">
                    <FaImage className="text-green" />
                    <span>{collectionForm.image ? collectionForm.image.name : 'Upload collection image'}</span>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'collection')}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <button
                onClick={createCollection}
                className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-[#0CC0DF] to-[#14F195] 
                         rounded-lg text-black font-medium hover:opacity-90 transition-opacity"
              >
                Create Collection
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