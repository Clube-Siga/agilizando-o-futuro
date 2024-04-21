import { Link } from "@inertiajs/react";
export default function Navitem({ namePath, path }) {
    return (
        <>
            {/* <li>
                <Link
                    href={path}
                    className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
                    aria-current="page"
                >
                    {namePath}
                </Link>
            </li> */}
            <li>
                <Link
                    href={path}
                    className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                    {namePath}
                </Link>
            </li>
        </>
    );
}
