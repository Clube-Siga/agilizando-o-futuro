import React from 'react';
import { Head } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import About from '@/Components/Agilizando/Partials/About/About';
import Blog from '@/Components/Agilizando/Partials/Blog/Blog';
import CallToAction from '@/Components/Agilizando/Partials/CallToAction/CallToAction';
import Contact from '@/Components/Agilizando/Partials/Contact/Contact';
import Courses from '@/Components/Agilizando/Partials/Courses/Courses';
import Footer from '@/Components/Agilizando/Partials/Footer/Footer';
import Header from '@/Components/Agilizando/Partials/Header/Header';
import Hero from '@/Components/Agilizando/Partials/Hero/Hero';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
{/*import {} from 'flowbite-react'*/ }

export default function Home({ error, message }) {

    const MySwal = withReactContent(Swal)
    {/*implementar uma verificacao se message foi atribuida, se sim executar o alert*/}
    if(message && message == 'Sua mensagem foi enviada com sucesso!'){
        MySwal.fire({
            title: 'Success!',
            text: message,
            icon: 'success',
            confirmButtonColor: '#3085d6',
        });
    } 
    
    return (
        <>
            <SiteLayout>
                <Head title="Agilizando" />
                <Header headerClass={"w-full fixed z-50 bg-primary-200 grid-cols-2 py-2.5 flex-wrap justify-evenly sm:w-full lg:px-6 dark:bg-white"} />
                <Hero heroClass={"flex justify-center w-full sm:flex-col sm:items-center md:flex-row md:space-around"} />
                <About aboutClass={"w-full grid-cols-2 justify-evenly bg-white dark:bg-primary-300"} />
                <Courses coursesClass={"w-full bg-white dark:bg-primary-300"} />
                <CallToAction ctaClass={"w-full bg-white dark:bg-primary-300"} />
                <Blog blogClass={"w-full bg-white dark:bg-primary-300"} />
                <Contact
                    contactClass={"w-full grid-cols-2 justify-evenly bg-primary-300 dark:bg-white"}
                    message={message}
                />
                <Footer  footerClass={"w-full grid-cols-2 justify-evenly p-4 bg-primary-300 sm:p-6 dark:bg-white"} />
            </SiteLayout>
        </>
    );
}
