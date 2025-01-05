export default function Row({children, rowClass}){
    return (
        <>
            <div className={rowClass}>
                {children}
            </div>
        </>
    )
}
