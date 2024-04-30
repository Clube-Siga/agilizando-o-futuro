import { } from '@inertiajs/react'
import { Head } from '@inertiajs/react';
import Footer from '@/Components/Agilizando/Partials/Footer/Footer';
import Header from '@/Components/Agilizando/Partials/Header/Header';

export default function SiteLayout({ children }) {

    return (
        <div className='min-h-screen flex flex-col items-center'>
            <Head title="Agilizando" />
            <Header headerClass={"w-full border-b-2 border-secondary fixed z-50 bg-defaultW text-defaultW grid-cols-2 py-2.5 flex-wrap justify-evenly sm:w-full lg:px-6 dark:bg-secondary"} />
            {children}
            <Footer  footerClass={"w-full grid-cols-2 justify-evenly p-4 bg-defaultW sm:p-6 dark:bg-defaultB"} />
        </div>
    )
}
