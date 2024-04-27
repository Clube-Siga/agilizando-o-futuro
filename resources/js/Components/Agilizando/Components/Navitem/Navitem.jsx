import { Link } from "@inertiajs/react";
export default function Navitem({ namePath, path }) {
    return (
        <>
            {/* <li>
                <Link
                    href={path}
                    className="block py-2 px-3 md:p-0 text-white bg-secondary-700 rounded md:bg-transparent md:text-secondary-700 md:dark:text-secondary-500"
                    aria-current="page"
                >
                    {namePath}
                </Link>
            </li> */}
            <li>
                <Link
                    href={path}
                    className="block py-2 px-3 md:p-0 text-primary-900 rounded hover:bg-primary-100 md:hover:bg-transparent md:hover:text-secondary-700 md:dark:hover:text-secondary-500 md:dark:hover:bg-transparent dark:text-white dark:hover:bg-primary-700 dark:hover:text-white dark:border-primary-700"
                >
                    {namePath}
                </Link>
            </li>
        </>
    );
}
