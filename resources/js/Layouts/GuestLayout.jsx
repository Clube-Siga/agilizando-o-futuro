import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import Logo from "@/Components/Agilizando/Components/Logo/Logo";


export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900">
            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-blue-900 dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
                <Link href="/" >
                    <div className="flex flex-col sm:justify-center items-center">
                        <Logo />
                    </div>        
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
