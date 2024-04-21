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
                    <Navbar.Link href="#" active>
                        Home
                    </Navbar.Link>
                    <Navbar.Link as={Link} href="#">
                        About
                    </Navbar.Link>
                    <Navbar.Link href="#">Services</Navbar.Link>
                    <Navbar.Link href="#">Pricing</Navbar.Link>
                    <Navbar.Link href="#">Contact</Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}
