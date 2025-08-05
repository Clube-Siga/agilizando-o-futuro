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
                <div className="flex flex-row">
                    <Logo />
                </div>
                <NavbarToggle />
                <NavbarCollapse>
                    <NavbarLink className="ml-2 text-defaultW font-body" href="/">
                        Início
                    </NavbarLink>
                    <NavbarLink className="text-defaultW font-body" as={Link} href="/#about">
                        Sobre
                    </NavbarLink>
                    <NavbarLink className="text-defaultW font-body" as={Link} href="/#register">
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
                    </NavbarLink>
                    <NavbarLink className="text-defaultW font-body" as={Link} href="/login">
                        Login
                    </NavbarLink>
                </NavbarCollapse>
            </Navbar>
        </>
    );
}
