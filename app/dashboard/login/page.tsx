'use client';
import { FcGoogle } from 'react-icons/fc';
import { BsApple } from 'react-icons/bs';
import { AppProvider, useAppContext } from "@/app/utils/AppContext";

const SSOLogin = () => {
  const handleSSOLogin = async (provider: string) => {
    if (provider === 'google') {
      window.location.href = 'https://metaloot-cloud-d4ec.shuttle.app/v1/api/player/oauth/google?redirect_uri=http://localhost:3000/dashboard/oauth/callback';
    }
    //     setTokens('test-access-token', 'test-refresh-token');
    //     setUser({
    //       id: 'test-id',
    //       email: 'test@test.com',
    //       name: 'Test User',
    //       avatar: 'https://example.com/avatar.jpg'
    //     });
    //     setGame([
    //         {
    //             id: '0x1234567890123456789012345678901234567890',
    //       name: 'Test Game',
    //       genre: 'Action',
    //       publisher: 'Test Publisher',
    //       photo: 'https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/demo.jpg',
    //       releaseDate: '2024-03-15'
    //     },
    //     {
    //         id: '0x1234567890123456789012345678901234567891',
    //       name: 'Test Game 2',
    //       genre: 'Adventure',
    //       publisher: 'Test Publisher 2',
    //       photo: 'https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/cuttherope',
    //       releaseDate: '2024-04-20'
    //     },
    //     {
    //         id: '0x1234567890123456789012345678901234567892',
    //       name: 'Test Game 3',
    //       genre: 'RPG',
    //       publisher: 'Test Publisher 3',
    //       photo: 'https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/uncleahmed',
    //       releaseDate: '2024-05-10'
    //     }
    // ]);
    // try {
    //   await signIn(provider, { callbackUrl: '/dashboard' });
    // } catch (error) {
    //   console.error('SSO login error:', error);
    // }
  };

  return (
    <div className="bg-black/90 overflow-hidden flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-6 w-full max-w-sm p-8 bg-gradient-to-b from-gray-900 to-black rounded-xl border border-gray-800 shadow-2xl relative overflow-hidden">
        {/* Decorative blockchain-inspired elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="animate-pulse absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0CC0DF] via-[#14F195] to-[#0CC0DF]"></div>
          <div className="absolute -left-20 top-10 w-40 h-40 bg-[#0CC0DF]/10 rounded-full blur-3xl"></div>
          <div className="absolute -right-20 bottom-10 w-40 h-40 bg-[#14F195]/10 rounded-full blur-3xl"></div>
        </div>

        <h2 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#0CC0DF] to-[#14F195]">
          Secure Authentication Portal
        </h2>

        <button
          onClick={() => handleSSOLogin('google')}
          className="flex items-center justify-center gap-3 w-full py-3 px-4 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-800 hover:border-[#0CC0DF]/50 transition-all duration-300 text-gray-200 backdrop-blur-sm"
        >
          <FcGoogle className="text-2xl" />
          <span>Access via Google</span>
        </button>

        <button
          onClick={() => handleSSOLogin('apple')}
          className="flex items-center justify-center gap-3 w-full py-3 px-4 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-800 hover:border-[#14F195]/50 transition-all duration-300 text-gray-200 backdrop-blur-sm"
        >
          <BsApple className="text-2xl" />
          <span>Access via Apple</span>
        </button>

        <div className="text-sm text-gray-400 text-center mt-2 px-4">
          By proceeding, you acknowledge our{' '}
          <span className="text-[#0CC0DF] hover:text-[#14F195] cursor-pointer">Protocol Terms</span>{' '}
          and{' '}
          <span className="text-[#0CC0DF] hover:text-[#14F195] cursor-pointer">Security Policy</span>
        </div>
      </div>
    </div>
  );
};

export default SSOLogin;
