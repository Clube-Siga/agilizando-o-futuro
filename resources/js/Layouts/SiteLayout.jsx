import { } from '@inertiajs/react'
import { Head } from '@inertiajs/react';
import Footer from '@/Components/Agilizando/Partials/Footer/Footer';
import Header from '@/Components/Agilizando/Partials/Header/Header';

export default function SiteLayout({ children }) {

    return (
        <div className='min-h-screen flex flex-col items-center'>
            <Head title="Agilizando o Futuro">
                <link rel="icon" type="image/png" sizes="16x16" href="/iconB.png"/>
                <script src="https://www.google.com/recaptcha/api.js?render=6LdXPtUpAAAAAKU2klAvdl-Cpof-ficcscCvL7SD"></script>
            </Head>
            <Header headerClass={"w-full border-b-2 border-secondary fixed z-50 bg-primary text-defaultW grid-cols-2 py-2.5 flex-wrap justify-evenly sm:w-full lg:px-6 dark:bg-secondary"} />
            {children}
            <Footer  footerClass={"w-full grid-cols-2 border-t-2 border-defaultW justify-evenly p-4 bg-secondary sm:p-6 dark:bg-defaultB"} />
        </div>
    )
}
