import NFTSection from '@/components/sections/NFTSection';
import TopSeller from '@/components/sections/TopSeller';
import { BackgroundCircles } from '@/components/designs/Home';
import Details from '@/components/sections/Details';
import { TopCollection } from '@/components/shared/TopCollection';
import Hero from '@/components/sections/Hero';
import HotBids from '@/components/sections/HotBids';



export default function Home() {
    
   
    console.log("mangoooooooooo");
    
    
    return (
        <main className="min-h-screen min-w-full py-12">
           
            <div className="w-11/12 m-auto px-2 py-12">
                <Hero />
                <NFTSection name={"MKNDAO Collections"} />
                <TopCollection />
                <HotBids name={"Hot Bids"} />
                <TopSeller />
                <Details />
            </div>
                <BackgroundCircles />

        </main>
    );
}
