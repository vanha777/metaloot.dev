import { useState } from "react";
import { IoImagesOutline } from "react-icons/io5";
import { FaPlus, FaUpload, FaImage } from "react-icons/fa";
import Alert from "@/components/Alert";

interface CollectionForm {
  name: string;
  symbol: string;
  description: string;
  image: File | null;
  metadata: File | null;
}

interface NFTForm {
  name: string;
  description: string;
  image: File | null;
  attributes: { trait_type: string; value: string }[];
}

export default function CollectionsSection() {
  const [collectionForm, setCollectionForm] = useState<CollectionForm>({
    name: '',
    symbol: '',
    description: '',
    image: null,
    metadata: null
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
    <div className="space-y-6 p-2 md:p-8">
      <div className="flex items-center gap-3">
        <IoImagesOutline className="text-3xl text-green" />
        <h2 className="text-2xl font-bold text-white">NFT Collections</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Collection Creation Form */}
        <div className="bg-grey p-6 rounded-xl">
          <h3 className="text-xl text-white mb-6">Create New Collection</h3>
          <div className="space-y-4">
            <div>
              <h3 className="text-gray-400 mb-2 flex items-start gap-1">Collection Name <span className="opacity-50 text-xs">*required</span></h3>
              <input
                type="text"
                name="name"
                value={collectionForm.name}
                onChange={handleCollectionChange}
                className="w-full bg-black/50 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green"
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
                className="w-full bg-black/50 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green"
                placeholder="Enter collection symbol"
              />
            </div>
            <div>
              <h3 className="text-gray-400 mb-2">Description</h3>
              <textarea
                name="description"
                value={collectionForm.description}
                onChange={handleCollectionChange}
                className="w-full bg-black/50 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green h-24 resize-none"
                placeholder="Enter collection description"
              />
            </div>
            <div>
              <h3 className="text-gray-400 mb-2">Collection Image</h3>
              <label className="flex items-center gap-2 bg-black/50 text-white rounded-lg px-4 py-2 cursor-pointer hover:bg-black/60">
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
            <div>
              <h3 className="text-gray-400 mb-2">Metadata</h3>
              <label className="flex items-center gap-2 bg-black/50 text-white rounded-lg px-4 py-2 cursor-pointer hover:bg-black/60">
                <FaUpload className="text-green" />
                <span>{collectionForm.metadata ? collectionForm.metadata.name : 'Upload metadata JSON'}</span>
                <input
                  type="file"
                  name="metadata"
                  accept=".json"
                  onChange={(e) => handleFileChange(e, 'collection')}
                  className="hidden"
                />
              </label>
            </div>
            <button
              onClick={createCollection}
              className="w-full bg-green hover:bg-green/90 text-grey px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 mt-6"
            >
              <FaPlus className="text-sm" />
              <span>Create Collection</span>
            </button>
          </div>
        </div>

        {/* NFT Minting Form */}
        <div className="bg-grey p-6 rounded-xl">
          <h3 className="text-xl text-white mb-6">Mint NFT</h3>
          <div className="space-y-4">
            <div>
              <h3 className="text-gray-400 mb-2">Select Collection</h3>
              <select
                value={selectedCollection || ''}
                onChange={(e) => setSelectedCollection(e.target.value)}
                className="w-full bg-black/50 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green"
              >
                <option value="">Select a collection</option>
                <option value="example">Example Collection</option>
              </select>
            </div>
            <div>
              <h3 className="text-gray-400 mb-2 flex items-start gap-1">NFT Name <span className="opacity-50 text-xs">*required</span></h3>
              <input
                type="text"
                name="name"
                value={nftForm.name}
                onChange={(e) => setNftForm(prev => ({ ...prev, name: e.target.value }))}
                className="w-full bg-black/50 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green"
                placeholder="Enter NFT name"
              />
            </div>
            <div>
              <h3 className="text-gray-400 mb-2">Description</h3>
              <textarea
                name="description"
                value={nftForm.description}
                onChange={(e) => setNftForm(prev => ({ ...prev, description: e.target.value }))}
                className="w-full bg-black/50 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green h-24 resize-none"
                placeholder="Enter NFT description"
              />
            </div>
            <div>
              <h3 className="text-gray-400 mb-2 flex items-start gap-1">NFT Image <span className="opacity-50 text-xs">*required</span></h3>
              <label className="flex items-center gap-2 bg-black/50 text-white rounded-lg px-4 py-2 cursor-pointer hover:bg-black/60">
                <FaImage className="text-green" />
                <span>{nftForm.image ? nftForm.image.name : 'Upload NFT image'}</span>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'nft')}
                  className="hidden"
                />
              </label>
            </div>
            <button
              onClick={mintNFT}
              className="w-full bg-green hover:bg-green/90 text-grey px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 mt-6"
              disabled={!selectedCollection}
            >
              <FaPlus className="text-sm" />
              <span>Mint NFT</span>
            </button>
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