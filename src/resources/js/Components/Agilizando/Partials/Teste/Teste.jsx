import About from '@/Components/Agilizando/Partials/About/About';
import Blog from '@/Components/Agilizando/Partials/Blog/Blog';
import CallToAction from '@/Components/Agilizando/Partials/CallToAction/CallToAction';
import Contact from '@/Components/Agilizando/Partials/Contact/Contact';
import Courses from '@/Components/Agilizando/Partials/Courses/Courses';
import Footer from '@/Components/Agilizando/Partials/Footer/Footer';
import Header from '@/Components/Agilizando/Partials/Header/Header';
import Hero from '@/Components/Agilizando/Partials/Hero/Hero';
import Section from "@/Components/Agilizando/Partials/Section/Section";
import Testimonials from "@/Components/Agilizando/Partials/Testimonials/Testimonials";
import Newsletter from "@/Components/Agilizando/Partials/Newsletter/Newsletter";
import FAQ from "@/Components/Agilizando/Partials/FAQ/FAQ";
import Team from "@/Components/Agilizando/Partials/Team/Team";

export default function Teste() {
    return (
        <>
            <Header headerClass={"w-full grid-cols-2 gap-4 justify-evenly bg-primary-200 dark:bg-white flex-wrap sm:w-full sm:grid-cols-2 sm:gap-2"}/>
            <Hero heroClass={"w-full grid-cols-2 justify-evenly bg-white dark:bg-primary-300 flex-wrap"}/>
            <About aboutClass={"w-full grid-cols-2 justify-evenly bg-white dark:bg-primary-300"}/>
            <Section sectionClass={"w-full grid-cols-2 justify-evenly bg-primary-300 dark:bg-white"}/>
            <Team teamClass={"w-full grid-cols-2 justify-evenly bg-white dark:bg-primary-300"}/>
            <Courses coursesClass={"w-full bg-white dark:bg-primary-300"}/>
            <Testimonials testimonialsClass={"w-full grid-cols-2 justify-evenly bg-white dark:bg-primary-300"}/>
            <CallToAction ctaClass={"w-full bg-white dark:bg-primary-300"}/>
            <Blog blogClass={"w-full bg-white dark:bg-primary-300"}/>
            <Newsletter newsletterClass={"w-full grid-cols-2 justify-evenly bg-white dark:bg-primary-300"}/>
            <Contact contactClass={"w-full grid-cols-2 justify-evenly bg-primary-300 dark:bg-white"}/>
            <FAQ faqClass={"w-full grid-cols-2 justify-evenly bg-white dark:bg-primary-300"}/>
            <Footer footerClass={"w-full grid-cols-2 justify-evenly p-4 bg-primary-300 dark:bg-white sm:p-6"}/>
            {/*Contact, FAQ, Footer, Newsletter, Section, Team, Testimonials*/}
        </>
    );
}
