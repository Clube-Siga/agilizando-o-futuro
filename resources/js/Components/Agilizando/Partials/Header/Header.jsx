import Logo from "../../Components/Logo/Logo";
import Navbar from "../../Components/Navbar/Navbar";

export default function Header(){
    return (
        <>
            <nav className="bg-gray-100 border-gray-200 dark:bg-gray-900 w-mw-100 flex justify-evenly min-w-full px-4">
                <Logo/>
                <Navbar/>
            </nav>
        </>
    )
}
