export default function Label({children, objective}) {
    return (
        <>
            <label
                htmlFor={objective}
                className="font-body block mb-2 text-sm font-medium text-defaultW dark:text-primary"
            >{children}</label>
        </>
    );
}
