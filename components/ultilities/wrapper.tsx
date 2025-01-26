// import { ReactNode } from 'react';
// import { useRouter } from 'next/router';
// import { useAuth } from '@/context/AuthContext'; // Assuming you have an AuthContext

// interface WrapperProps {
//   children: ReactNode;
//   requireAuth?: boolean;
// }

// const Wrapper = ({ children, requireAuth = false }: WrapperProps) => {
//   const router = useRouter();
//   const { user, loading } = useAuth(); // Get auth state from context

//   // Show loading state while checking authentication
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   // Redirect to login if authentication is required but user is not logged in
//   if (requireAuth && !user) {
//     router.push('/login');
//     return null;
//   }

//   // Render children if authentication check passes
//   return <>{children}</>;
// };

// export default Wrapper;
