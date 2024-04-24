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
                    </NavbarLink>
                </NavbarCollapse>
            </Navbar>
        </>
    )
}
