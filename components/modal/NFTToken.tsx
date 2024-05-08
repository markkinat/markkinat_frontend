"use client"
import React, { useState } from 'react'
import { Dialog, Button, Flex, Text, TextField } from "@radix-ui/themes";
import NFTTokenId from '../sections/NFTTokenId';
import { useNFTContext } from '@/app/context/NFTContext';

const NFTToken = ({Vote, handleVote,setTokenId}:any) => {
  const { metaNFTs } = useNFTContext();

  const handleNFTSelect = (selectedTokenId: any) => {
    setTokenId(selectedTokenId);
  };
  console.log(metaNFTs);
  
  return (
    <Dialog.Root>
      <Dialog.Trigger>
         {Vote}
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: "80vw", margin:"auto", height:"100%" }}>
        <Dialog.Title>Pick NFT To Vote</Dialog.Title>

        <Flex direction="column" gap="3">
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
            {metaNFTs?.length === 0 ? (
              <Text>No NFT owned yet</Text>
          ) : (
              metaNFTs?.map((item, i) => (
                <div key={`nft-${i}`} className='cc'>  
                  <NFTTokenId
                    onNFTSelect={handleNFTSelect}
                    nft={{
                      i,
                      name: `${item.name}`,
                      description: `${item.features[0].trait_type}`,
                      image: `${item.image}`,
                      edition: `${item.edition}`
                    }}
                  />
                </div>
              ))
            )}
          </div>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button
              variant="soft"
              color="blue"
              onClick={handleVote}
            >
              Vote
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default NFTToken
