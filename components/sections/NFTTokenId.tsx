import { useTheme } from '@/app/context/ThemeProvider'

const NFTTokenId = ({ nft, onNFTSelect }: any) => {
  const { theme } = useTheme()

  const handleNFTSelect = () => {
    // Call the onNFTSelect function with the tokenId
    onNFTSelect(nft.edition);
  };

  return (
    <div>
      <div className={`flex-1 min-w-64 ${theme === 'dark' ? 'bg-[#2e2b44]' : 'bg-white'} rounded-2xl p-4 lg:mr-8 mr-6 my-2 mx-2 cursor-pointer shadow-[#251e67] shadow-md`} onClick={handleNFTSelect}>
        <div className="relative w-full h-52 rounded-2xl overflow-hidden">
          <img src={nft.image} className='image' alt="nft01" />
        </div>
        <div className="mt-3 flex flex-col">
          <p className={`font-poppins ${theme === 'dark' ? 'text-white' : 'text-nft-black-1'} font-semibold text-sm lg:text-xl`}>{nft.name}</p>
          <p className={`font-poppins ${theme === 'dark' ? 'text-white' : 'text-nft-black-1'} text-sm lg:text-base`}>{nft.description}</p>
        </div>
      </div>
    </div>
  )
}

export default NFTTokenId
