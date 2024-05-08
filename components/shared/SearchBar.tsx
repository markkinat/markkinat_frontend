"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from '@/app/context/ThemeProvider';

const SearchBar = ({ activeSelect, setActiveSelect, handleSearch, clearSearch }: any) => {
  const [search, setSearch] = useState('');
  const [toggle, setToggle] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => setSearch(debouncedSearch), 1000);
    return () => clearTimeout(timer);
  }, [debouncedSearch]);

  useEffect(() => {
    if (search) {
      handleSearch(search);
    } else {
      clearSearch();
    }
  }, [clearSearch, handleSearch, search]);

  return (
    <div className='w-full flex flex-col md:flex-row'>
      <div className="flex-1 flex md:justify-start justify-center dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-gray-2 py-3 px-4 rounded-md mb-2 md:mb-0">
        <Image
          src={"/Search.png"}
          objectFit="contain"
          width={20}
          height={20}
          alt="search"
          className={theme === 'cupcake' ? 'filter invert' : undefined}
        />
        <input
          type="text"
          placeholder="Search item here"
          className="dark:bg-nft-black-2 bg-white mx-4 w-full lg:w-300px font-poppins dark:text-white text-nft-black-1 font-normal text-xs outline-none"
          onChange={(e) => setDebouncedSearch(e.target.value)}
          value={debouncedSearch}
        />
      </div>

      <div
        onClick={() => setToggle(!toggle)}
        className="flex-1 relative md:ml-4 sm:ml-0 sm:mt-2 md:mt-0 dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-gray-2 py-3 px-4 rounded-md"
      >
        <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-xs">{activeSelect}</p>
        <Image
          src={"/arrow.png"}
          objectFit="contain"
          width={15}
          height={15}
          alt="arrow"
          className={theme === 'cupcake' ? 'filter invert' : undefined}
        />

        {toggle && (
          <div className="absolute top-full left-0 right-0 w-full mt-3 z-10 dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-gray-2 py-3 px-4 rounded-md">
            {['Recently added', 'Price (low to high)', 'Price (high to low)'].map((item) => (
              <p
                className="font-poppins dark:text-white text-nft-black-1 font-normal text-xs my-3 cursor-pointer"
                onClick={() => setActiveSelect(item)}
                key={item}
              >
                {item}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
