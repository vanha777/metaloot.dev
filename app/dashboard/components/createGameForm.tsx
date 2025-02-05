'use client'

import { Db } from '@/app/utils/db'
import { motion } from 'framer-motion'
import { useState, FormEvent, ChangeEvent } from 'react'
import { AppProvider, useAppContext } from "@/app/utils/AppContext";
import SimpleLoading from './simpleLoading';

interface CreateGameFormProps {
    setIsCreateOverlayOpen: (isOpen: boolean) => void
}

interface FormDataType {
    name: string
    genre: string
    publisher: string
    releaseDate: string
    photo: File | null
    symbol: string
    description: string
}

export default function CreateGameForm({ setIsCreateOverlayOpen }: CreateGameFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const { auth, setGame } = useAppContext();
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState<FormDataType>({
        name: '',
        genre: '',
        publisher: '',
        releaseDate: '',
        photo: null,
        symbol: '',
        description: ''
    })

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target

        if (type === 'file') {
            const fileInput = e.target as HTMLInputElement
            const file = fileInput.files?.[0]

            if (file) {
                // Check file size (10MB = 10 * 1024 * 1024 bytes)
                if (file.size > 10 * 1024 * 1024) {
                    alert('File size must be less than 10MB')
                    fileInput.value = ''
                    return
                }

                setFormData(prev => ({
                    ...prev,
                    [name]: file
                }))
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }

    const nextStep = () => {
        setCurrentStep(prev => Math.min(prev + 1, 3))
    }

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (currentStep !== 3) {
            nextStep();
            return;
        } else {
            setIsLoading(true)
            console.log("submitting", formData)
            try {
                //  Handle photo upload to Supabase storage
                let photoUrl = "";
                if (formData.photo) {
                    const { data: uploadData, error: uploadError } = await Db.storage
                        .from('metaloot')
                        .upload(`photo/game-${Date.now()}-${formData.name}`, formData.photo);

                    if (uploadError) {
                        console.error('Error uploading photo:', uploadError);
                        return;
                    }
                    console.log("uploadData", uploadData)
                    // Get public URL for the uploaded photo
                    const { data: { publicUrl } } = Db.storage
                        .from('metaloot')
                        .getPublicUrl(uploadData.path);

                    console.log("publicUrl", publicUrl)
                    photoUrl = publicUrl;
                }
                const metadata = {
                    name: formData.name,
                    symbol: formData.symbol,
                    description: formData.description,
                    image: photoUrl,
                    attributes: [
                        {
                            trait_type: "genre",
                            value: formData.genre
                        },
                        {
                            trait_type: "publisher",
                            value: formData.publisher
                        },
                        {
                            trait_type: "released_date",
                            value: formData.releaseDate
                        },
                        {
                            trait_type: "logo",
                            value: photoUrl
                        }
                    ],
                    properties: {
                        category: "image",
                        creators: [
                            {
                                address: "GA4jV9ESNBwjxQKs6HgoSebTFTMztacZPCYv8NCs8y8J",
                                share: 100
                            }
                        ],
                        files: [
                            {
                                uri: photoUrl,
                                type: formData.photo?.type
                            }
                        ]
                    }
                };

                const metadataBlob = new Blob([JSON.stringify(metadata)], {
                    type: 'application/json'
                });

                const { data: uploadData, error: uploadError } = await Db.storage
                    .from('metaloot')
                    .upload(`metadata/game-${Date.now()}-${formData.name}`, metadataBlob);

                if (uploadError) {
                    console.error('Error uploading photo:', uploadError);
                    return;
                }
                console.log("uploadData", uploadData)
                // Get public URL for the uploaded photo
                const { data: { publicUrl } } = Db.storage
                    .from('metaloot')
                    .getPublicUrl(uploadData.path);

                console.log("metadata", publicUrl)
                let uniqueId = formData.name.toLowerCase().replace(/ /g, '');


                const response = await fetch('https://metaloot-cloud-d4ec.shuttle.app/v1/api/game', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        game_id: uniqueId,
                        name: formData.name,
                        symbol: formData.symbol,
                        uri: publicUrl,
                        native_token: null,
                        nft_collection: null
                    })
                });


                if (!response.ok) {
                    throw new Error('Failed to create game');
                }

                const data = await response.json();
                let game_address = data.address;

                //update game_registries table
                const { data: gameRegistryData, error: gameRegistryError } = await Db.from('game_registries').insert({
                    game_id: uniqueId,
                    game_uri: publicUrl,
                    address: game_address,
                    user_id: auth.userData?.id,
                })
                console.log("gameRegistryData", gameRegistryData)
                let prevGames = auth.gameData ?? [];
                prevGames.push({
                    id: uniqueId,
                    name: formData.name,
                    photo: photoUrl,
                    description: formData.description || '',
                    symbol: formData.symbol || '',
                    genre: formData.genre || '',
                    publisher: formData.publisher || '',
                    releaseDate: formData.releaseDate || '',
                    address: game_address
                });
                setGame(prevGames);
            } catch (error) {
                console.error('Error handling photo upload:', error);
                setIsLoading(false)
                setIsCreateOverlayOpen(false)
                return;
            }
            setIsLoading(false)
            setIsCreateOverlayOpen(false)
            console.log("Create game Successfully");
         
        }

    }

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
            {isLoading ? (
                <SimpleLoading />
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gray-900 rounded-2xl p-8 max-w-2xl w-full mx-4 border border-[#0CC0DF]/20"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-[#0CC0DF] to-[#14F195] bg-clip-text text-transparent">
                            Create New Game
                        </h2>
                        <button
                            onClick={() => setIsCreateOverlayOpen(false)}
                            className="text-gray-400 hover:text-white"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <ul className="steps steps-horizontal w-full mb-6">
                        <li className={`step ${currentStep >= 1 ? 'step-primary' : ''}`}>Info</li>
                        <li className={`step ${currentStep >= 2 ? 'step-primary' : ''}`}>Media</li>
                        <li className={`step ${currentStep >= 3 ? 'step-primary' : ''}`}>Description</li>
                    </ul>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {currentStep === 1 && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Game Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-800 rounded-lg border border-gray-700 px-4 py-2 text-white focus:border-[#0CC0DF] focus:ring-1 focus:ring-[#0CC0DF] outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Genre</label>
                                    <input
                                        type="text"
                                        name="genre"
                                        value={formData.genre}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-800 rounded-lg border border-gray-700 px-4 py-2 text-white focus:border-[#0CC0DF] focus:ring-1 focus:ring-[#0CC0DF] outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Publisher</label>
                                    <input
                                        type="text"
                                        name="publisher"
                                        value={formData.publisher}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-800 rounded-lg border border-gray-700 px-4 py-2 text-white focus:border-[#0CC0DF] focus:ring-1 focus:ring-[#0CC0DF] outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Release Date</label>
                                    <input
                                        type="date"
                                        name="releaseDate"
                                        value={formData.releaseDate}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-800 rounded-lg border border-gray-700 px-4 py-2 text-white focus:border-[#0CC0DF] focus:ring-1 focus:ring-[#0CC0DF] outline-none"
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Game Cover Image (Max 10MB)</label>
                                    <input
                                        type="file"
                                        name="photo"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file && file.size > 10 * 1024 * 1024) {
                                                alert('File size must be less than 10MB');
                                                e.target.value = '';
                                                return;
                                            }
                                            handleInputChange(e);
                                        }}
                                        className="file-input file-input-bordered w-full bg-gray-800 border-gray-700 text-white focus:border-[#0CC0DF] focus:ring-1 focus:ring-[#0CC0DF]"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Game On-Chain Symbol</label>
                                    <input
                                        type="text"
                                        name="symbol"
                                        value={formData.symbol}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-800 rounded-lg border border-gray-700 px-4 py-2 text-white focus:border-[#0CC0DF] focus:ring-1 focus:ring-[#0CC0DF] outline-none"
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Game Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="w-full bg-gray-800 rounded-lg border border-gray-700 px-4 py-2 text-white focus:border-[#0CC0DF] focus:ring-1 focus:ring-[#0CC0DF] outline-none h-32"
                                    required
                                />
                            </div>
                        )}

                        <div className="flex justify-between gap-4">
                            {currentStep > 1 && (
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl 
                  transition-all duration-200"
                                >
                                    Previous
                                </button>
                            )}
                            <button
                                type="submit"
                                className="flex-1 bg-[#0CC0DF] hover:bg-[#0AA0BF] text-white font-bold py-3 px-6 rounded-xl 
                shadow-lg shadow-[#0CC0DF]/30 transition-all duration-200"
                            >
                                {currentStep === 3 ? 'Create Game' : 'Next'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            )}
        </div>
    )
}
