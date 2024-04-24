import Banner from "@/components/sections/Banner";
import Header from "@/components/shared/Header";


export default function Home() {

  return (
    <main className="min-h-screen min-w-full">
      <Header />
      <div className="w-11/12 m-auto py-12 px-2">
        <Banner
          name={(<>Discover, collect, and sell <br /><br /> extraordinary NFTs</>)}
          childStyles="md:text-4xl sm:text-2xl text-xl text-left"
          parentStyle="justify-start sm:h-72 xs:h-60 xs:p-12 p-4 h-44 rounded-3xl"
        />
      </div>
    </main>
  );
}
