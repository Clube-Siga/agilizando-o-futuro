import React, { useEffect, useState } from 'react';
import SiteLayout from '@/Layouts/SiteLayout';
import About from '@/Components/Agilizando/Partials/About/About';
import Blog from '@/Components/Agilizando/Partials/Blog/Blog';
import CallToAction from '@/Components/Agilizando/Partials/CallToAction/CallToAction';
import Contact from '@/Components/Agilizando/Partials/Contact/Contact';
//import Courses from '@/Components/Agilizando/Partials/Courses/Courses';
import Hero from '@/Components/Agilizando/Partials/Hero/Hero';
import Register from '@/Components/Agilizando/Partials/Register/Register';

//declarar siteKey  <Courses coursesClass={"w-full bg-defaultW dark:bg-defaultB"} />
export default function Home({ message, siteKey,  imgCtaUrl }) {

    const siteKeyhome = siteKey

    return (
        <>
            <SiteLayout>
                <Hero heroClass={"flex justify-center bg-defaultW w-full sm:flex-col sm:items-center md:flex-row md:space-around dark:bg-defaultB"}
                />
                <About aboutClass={"w-full grid-cols-2 justify-evenly bg-secondary dark:bg-secondary"} />
                <Register 
                    registerClass={"w-full bg-defaultW dark:bg-defaultB"}
                    imgCtaUrl={imgCtaUrl} 
                />
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
