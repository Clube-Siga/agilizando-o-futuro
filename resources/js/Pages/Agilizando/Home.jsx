import React, { useEffect, useState } from 'react';
import SiteLayout from '@/Layouts/SiteLayout';
import About from '@/Components/Agilizando/Partials/About/About';
import Blog from '@/Components/Agilizando/Partials/Blog/Blog';
import CallToAction from '@/Components/Agilizando/Partials/CallToAction/CallToAction';
import Contact from '@/Components/Agilizando/Partials/Contact/Contact';
import Courses from '@/Components/Agilizando/Partials/Courses/Courses';
import Hero from '@/Components/Agilizando/Partials/Hero/Hero';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


{/*import {} from 'flowbite-react'*/ }
//declarar siteKey
export default function Home({ message, siteKey }) {

    const MySwal = withReactContent(Swal);
    const [hasShownMessage, setHasShownMessage] = useState(false);
    const siteKeyhome = siteKey
    console.log('Site Key in Home:', siteKeyhome);
    
    // garantir que so chama o swal quando receber uma mensagem, corrigindo o loop infinito
    useEffect(() => {
        if (message && message === 'Sua mensagem foi enviada com sucesso!' && !hasShownMessage) {
            MySwal.fire({
                title: 'Success!',
                text: message,
                icon: 'success',
                confirmButtonColor: '#3085d6',
            });
            setHasShownMessage(true);
        }
    }, [message, hasShownMessage, MySwal]);


    return (
        <>
            <SiteLayout>
                <Hero heroClass={"flex justify-center bg-defaultW w-full sm:flex-col sm:items-center md:flex-row md:space-around dark:bg-defaultB"} />
                <About aboutClass={"w-full grid-cols-2 justify-evenly bg-secondary dark:bg-secondary"} />
                <Courses coursesClass={"w-full bg-defaultW dark:bg-defaultB"} />
                <CallToAction ctaClass={"w-full bg-primary dark:bg-secondary"} />
                <Blog blogClass={"w-full bg-defaultW dark:bg-defaultB"} />
                <Contact
                    contactClass={"w-full grid-cols-2 justify-evenly bg-secondary dark:bg-secondary"}
                    message={message}
                    siteKey={siteKeyhome} //passar site key
                />
            </SiteLayout>
        </>
    );
}
