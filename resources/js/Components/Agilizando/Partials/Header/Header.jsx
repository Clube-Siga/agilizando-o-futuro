import Logo from "../../Components/Logo/Logo";
import { Link } from '@inertiajs/react';
import { Navbar } from "flowbite-react";

export default function Header({ headerClass }) {
    
    return (
        <>
            <Navbar fluid rounded>
                <Logo className="mr-4" />
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Navbar.Link href="/" active>
                        Home
                    </Navbar.Link>
                    <Navbar.Link as={Link} href="#about">
                        Sobre
                    </Navbar.Link>
                    <Navbar.Link href="#">Services</Navbar.Link>
                    <Navbar.Link href="#">Pricing</Navbar.Link>
                    <Navbar.Link 
                        href="#contact"
                        onClick={(event) => handleContactClick(event)}
                    >Contact
                    </Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}
