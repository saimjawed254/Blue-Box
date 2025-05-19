import GradientBG from '@/components/BG/Background'

export default function Layout({children}:{children:React.ReactNode}){
    return (
        <div>
            <GradientBG/>
            {children}
        </div>       
    )
}