import Navitem from '../Navitem/Navitem';

export default function Navbar() {
    return (

        <ul className="mr-4 flex flex-col font-medium p-4 md:p-0 mt-4 border border-primary-100 rounded-lg bg-primary-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-primary-100 md:dark:bg-primary-900 dark:bg-primary-800 dark:border-primary-700">
            <Navitem namePath={"Home"} path={'#home'} />
            <Navitem namePath={"About"} path={'#about'} />
            <Navitem namePath={"Services"} path={'#services'} />
            <Navitem namePath={"Contact"} path={'#contact'} />
            <Navitem namePath={"Call to Action"} path={'#calltoaction'} />
        </ul>

    )
}
