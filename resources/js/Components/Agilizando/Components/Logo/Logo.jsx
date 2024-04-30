{/* Principio da Responsabilidade componente Logo sua responsabilidade e a logo mais nada*/}
import Image from '../Image/Image'
export default function Logo(){
    return (
        <>

            <Image imgClass={"mr-3 h-6 sm:h-9"} altText={"Logo"} imgPath={"https://flowbite.com/docs/images/logo.svg"} />
            <Span spanClass={"self-center text-2xl font-semibold whitespace-nowrap dark:text-white"} spanContent={"Agilizando o futuro"}/>

            <Image imgClass={"ml-3 h-6 sm:h-9"} altText={"Logo"} imgPath={"https://raw.githubusercontent.com/Clube-Siga/agilizando-o-futuro/jean/resources/images/Isologo%20branco.png"} />

        </>
    )
}
