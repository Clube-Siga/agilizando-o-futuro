export default function Label({children, objective}) {
    return (
        <>
            <label
                htmlFor={objective}
                className="block mb-2 text-sm font-medium text-primary-900 dark:text-primary-300"
            >{children}</label>
        </>
    );
}
