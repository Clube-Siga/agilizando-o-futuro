import Logo from "../../Components/Logo/Logo";
import Navbar from "../../Components/Navbar/Navbar";

export default function Header({headerClass}){
    return (
        <>
            <nav className={headerClass}>
                <Logo/>
                <Navbar/>
            </nav>
        </>
    )
}
