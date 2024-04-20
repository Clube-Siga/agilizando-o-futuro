export default function Label({children, objective}) {
    return (
        <>
            <label
                for={objective}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >{children}</label>
        </>
    );
}
