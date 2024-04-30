import Logo from "../../Components/Logo/Logo";
import { Link } from '@inertiajs/react';
import { Navbar, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";

export default function Header({ headerClass }) {
    
    return (
        <>
            <Navbar fluid rounded>
                <Logo />
                <NavbarToggle />
                <NavbarCollapse>
<<<<<<< HEAD
                    <NavbarLink className="ml-8" href="/" active>
                        Home
                    </NavbarLink>
                    <NavbarLink as={Link} href="#about">
                        Sobre
                    </NavbarLink>
                    <NavbarLink href="#">Serviços</NavbarLink>
                    <NavbarLink href="#">Pricing</NavbarLink>
                    <NavbarLink 
                        href="#contact"
                    >Contato
=======
                    <NavbarLink className="ml-2 text-defaultW font-body" href="/">
                        Início
                    </NavbarLink>
                    <NavbarLink className="text-defaultW font-body" as={Link} href="/#about">
                        Sobre
                    </NavbarLink>
                    <NavbarLink className="text-defaultW font-body" as={Link} href="/#courses">
                        Cursos
                    </NavbarLink>
                    <NavbarLink className="text-defaultW font-body" as={Link} href="/#cta">
                        Apoie-nos
                    </NavbarLink>
                    <NavbarLink className="text-defaultW font-body" as={Link} href="/#blog">
                        Blog
                    </NavbarLink>
                    <NavbarLink className="text-defaultW font-body" as={Link} href="/#contact">
                        Contato
>>>>>>> jean
                    </NavbarLink>
                </NavbarCollapse>
            </Navbar>
        </>
    )
}
