
export default function Span({children, spanClass, spanContent}){
    return(<>
        <span className={spanClass}>
            {spanContent}
            {children}
        </span>
    </>)
}
