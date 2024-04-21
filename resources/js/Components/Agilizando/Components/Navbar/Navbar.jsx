import {Link} from '@inertiajs/react';
import Navitem from '../Navitem/Navitem';

export default function Navbar(){
    return (

                <div className="items-center justify-between hidden w-1/2 md:flex md:w-auto md:order-1" id="mobile-menu-2">
                    <ul className="mr-4 flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-gray-100 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <Navitem namePath={"Home"} path={'#home'}/>
                        <Navitem namePath={"About"} path={'#about'}/>
                        <Navitem namePath={"Services"} path={'#services'}/>
                        <Navitem namePath={"Contact"} path={'#contact'}/>
                        <Navitem namePath={"Call to Action"} path={'#calltoaction'}/>
                    </ul>
                </div>


    )
}
