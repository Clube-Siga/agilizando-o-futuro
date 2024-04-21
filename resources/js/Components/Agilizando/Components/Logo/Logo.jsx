{/* Principio da Responsabilidade componente Logo sua responsabilidade e a logo mais nada*/}
import Image from '../Image/Image'
import Span from '../Span/Span'
export default function Logo(){
    return (
        <>
            <Image altText={"Logo"} imgPath={"https://flowbite.com/docs/images/logo.svg"} />
            <Span spanClass={"self-center text-2xl font-semibold whitespace-nowrap dark:text-white"} spanContent={"Flowbite"}/>
        </>
    )
}
