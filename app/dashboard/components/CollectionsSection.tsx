import { useEffect, useState } from "react";
import { FaPlus, FaImage } from "react-icons/fa";
import Alert from "@/components/Alert";
import { GameData } from "@/app/utils/AppContext";
import CreateCollectionForm from "./createCollectionForm";
import { useAppContext } from "@/app/utils/AppContext";
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
  const [isLoading, setIsLoading] = useState(false);
  const { auth, setCollectionData } = useAppContext();
  useEffect(() => {
    console.log("re render collections section");
  }, [auth.collectionData]);

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
  const collections = auth.collectionData;

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
          {collections && collections.map((collection) => (
            <div
              key={collection.address}
              onClick={() => setSelectedCollection(collection.address || null)}
              className={`min-w-[200px] h-[260px] border rounded-xl p-4 cursor-pointer 
                         transition-all duration-300 ${selectedCollection === collection.address
                  ? 'border-[#14F195] bg-white/5'
                  : 'border-white/10 hover:border-white/30'
                }`}
            >
              <div className="w-24 h-24 mx-auto bg-black border border-white/10 rounded-full 
                            flex items-center justify-center mb-4">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover rounded-full"
                />
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
              ? `NFTs in ${collections?.find(c => c.address === selectedCollection)?.name}`
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
        <CreateCollectionForm setShowCreateForm={setShowCreateForm} selectedGame={selectedGame} />
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