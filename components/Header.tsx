'use client'
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Header() {
  const { data: session } = useSession();
  const router=useRouter();

  const handleSignOut = async () => {
    await signOut();
  };

  const handleSignIn = () => {
    
    window.location.href = '/login';
  };

  return (
    <div className="bg-gray-800 text-white p-4 shadow-md">
      <div className="flex justify-between items-center">
      <button
       className="btn bg-black-100 text-black hover:bg-black-700 px-4 py-2 rounded-lg transition-all duration-300"
      onClick={() => {
        if (session?.user?.id) {
          router.push('/upload-video');
        } else {
          router.push('/login');
        }
      }}
    >
      Upload Video
     </button>
        <button
          onClick={session?.user?.id ? handleSignOut : handleSignIn}
          className="btn bg-black-100 text-black hover:bg-black-700 px-4 py-2 rounded-lg transition-all duration-300"
        >
          {session?.user?.id ? "Logout" : "Login"}
        </button>
      </div>
    </div>
  );
}
