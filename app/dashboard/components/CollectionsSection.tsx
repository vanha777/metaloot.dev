import { useEffect, useState } from "react";
import { FaPlus, FaImage } from "react-icons/fa";
import Alert from "@/components/Alert";
import { CollectionData, GameData, NFTData } from "@/app/utils/AppContext";
import CreateCollectionForm from "./createCollectionForm";
import { useAppContext } from "@/app/utils/AppContext";
import CreateNftForm from "./createNftForm";
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
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showMintForm, setShowMintForm] = useState(false);
  const [showCreateNFTForm, setShowCreateNFTForm] = useState(false);

  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [collectionNFTs, setCollectionNFTs] = useState<NFTData[]>([]);
  const [selectedNFTs, setSelectedNFTs] = useState<NFTData | null>(null);

  useEffect(() => {
    console.log("re render collections section");
  }, [auth.collectionData]);

  const selectCollection = async (collection: CollectionData) => {
    console.log("selecting collection", collection);
    setSelectedCollection(collection.address || null);
    if (collection.address) {
      try {
        setIsLoading(true);
        // You'll need to implement this function in your API/backend
        const response = await fetch(`https://metaloot-cloud-d4ec.shuttle.app/v1/api/collection/${collection.address}/nfts`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${auth.accessToken}`,
            'Content-Type': 'application/json'
          }
        });
        const array_nfts = await response.json();
        setCollectionNFTs(array_nfts);
      } catch (error) {
        console.error("Failed to fetch NFTs:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setCollectionNFTs([]);
    }
  }

  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: 'info' as 'success' | 'error' | 'info'
  });


  const collections = auth.collectionData;

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
              onClick={() => selectCollection(collection)}
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
            <div
              onClick={() => setShowCreateNFTForm(true)}
              className="aspect-square border border-white/10 rounded-xl p-4 
                          hover:border-white/30 transition-all duration-300 cursor-pointer">
              <div className="w-full h-full bg-white/5 rounded-lg flex items-center 
                            justify-center">
                <FaPlus className="text-white/60 text-2xl" />
              </div>
            </div>
          )}
          {collectionNFTs.map((nft) => (
            <div
              key={nft.address}
              className={`aspect-square border rounded-xl p-4 
                         hover:border-white/30 transition-all duration-300
                         ${selectedNFTs?.address === nft.address
                  ? 'border-[#14F195] bg-white/5'
                  : 'border-white/10'}`}
              onClick={() => setSelectedNFTs(nft)}
            >
              <div className="w-full h-full rounded-lg overflow-hidden">
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-2">
                <h3 className="text-white text-sm">{nft.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-4 gap-6 mt-12 border-t border-white/10 pt-8">

        {/* <div className="stat-card">
          <div className="text-white/60 text-sm">Floor Price</div>
          <div className="text-2xl text-white font-light">0.00</div>
          <div className="text-white/40 text-sm">SOL</div>
        </div> */}

        {/* <div className="stat-card">
          <div className="text-white/60 text-sm">Volume</div>
          <div className="text-2xl text-white font-light">0.00</div>
          <div className="text-white/40 text-sm">SOL</div>
        </div> */}

        <div className="stat-card">
          <div className="text-white/60 text-sm">Total NFTs</div>
          <div className="text-2xl text-white font-light">{selectedNFTs?.supply}</div>
          <div className="text-white/40 text-sm">Minted</div>
        </div>

        <div className="stat-card">
          <div className="text-white/60 text-sm">Symbol</div>
          <div className="text-2xl text-white font-light">{selectedNFTs?.symbol}</div>
          <div className="text-white/40 text-sm">Unique</div>
        </div>

        <div className="stat-card">
          <div className="text-white/60 text-sm">Owner</div>
          <div className="text-2xl text-white font-light">
            {selectedNFTs?.owner && (
              <a
                href={`https://solscan.io/account/${selectedNFTs.address}?cluster=devnet`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#14F195] transition-colors"
              >
                {`${selectedNFTs.owner.slice(0, 4)}...${selectedNFTs.owner.slice(-4)}`}
              </a>
            )}
          </div>
          <div className="text-white/40 text-sm">Unique</div>
        </div>

        <div className="stat-card">
          <div className="text-white/60 text-sm">Onchain</div>
          <div className="text-2xl text-white font-light">
            {selectedNFTs?.address && (
              <a
                href={`https://solscan.io/account/${selectedNFTs.address}?cluster=devnet`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#14F195] transition-colors"
              >
                {`${selectedNFTs.address.slice(0, 4)}...${selectedNFTs.address.slice(-4)}`}
              </a>
            )}
          </div>
          <div className="text-white/40 text-sm">Unique</div>
        </div>
      </div>

      {/* Create Collection Modal */}
      {showCreateForm && (
        <CreateCollectionForm setShowCreateForm={setShowCreateForm} selectedGame={selectedGame} />
      )}

      {showCreateNFTForm && (
        <CreateNftForm
          setShowCreateForm={setShowCreateNFTForm}
          selectedCollection={selectedCollection || ''}
          collectionNFTs={collectionNFTs}
          setCollectionNFTs={setCollectionNFTs}
        />
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