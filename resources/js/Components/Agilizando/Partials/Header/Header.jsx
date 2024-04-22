import Logo from "../../Components/Logo/Logo";
import { Link } from "@inertiajs/react";
import {
    Navbar,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
} from "flowbite-react";

export default function Header({ headerClass }) {
    return (
        <>
            <Navbar className={headerClass} fluid rounded>
                <div className="flex flex-row sm:flex sm:flex-row">
                    <Logo />
                    <NavbarToggle />
                </div>
                <NavbarCollapse>
                    <NavbarLink className="ml-2" href="/" active>
                        Home
                    </NavbarLink>
                    <NavbarLink as={Link} href="/#about">
                        Sobre
                    </NavbarLink>
                    <NavbarLink as={Link} href="/#courses">
                        Cursos
                    </NavbarLink>
                    <NavbarLink as={Link} href="/#cta">
                        Apoie
                    </NavbarLink>
                    <NavbarLink as={Link} href="/#blog">
                        Blog
                    </NavbarLink>
                    <NavbarLink as={Link} href="/#contact">
                        Contato
                    </NavbarLink>
                </NavbarCollapse>
            </Navbar>
        </>
    );
}
