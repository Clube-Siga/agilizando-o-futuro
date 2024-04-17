import About from '@/Components/Agilizando/Partials/About/About';
import Blog from '@/Components/Agilizando/Partials/Blog/Blog';
import CallToAction from '@/Components/Agilizando/Partials/CallToAction/CallToAction';
import Contact from '@/Components/Agilizando/Partials/Contact/Contact';
import Courses from '@/Components/Agilizando/Partials/Courses/Courses';
import Footer from '@/Components/Agilizando/Partials/Footer/Footer';
import Header from '@/Components/Agilizando/Partials/Header/Header';
import Hero from '@/Components/Agilizando/Partials/Hero/Hero';
import { Link, Head } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';

export default function Home({ auth, laravelVersion, phpVersion }) {

    return (<>
        <SiteLayout>
            <Head title="Agilizando" />
            <Header />
            <Hero />
            <About />
            <Courses />
            <CallToAction />
            <Blog />
            <Contact />
            <Footer />
        </SiteLayout>
    </>);
}
