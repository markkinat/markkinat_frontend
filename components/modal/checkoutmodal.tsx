"use client";
import { Dialog, Flex, Button } from "@radix-ui/themes";
import Image from "next/image";


const CheckoutModal = ({ action }: any) => {
  console.log("vvvvvvhgcjhgggvvv");
  
  return (
    <Dialog.Root>
      <Dialog.Trigger>{action}</Dialog.Trigger>

      <Dialog.Content
        style={{ maxWidth: "80vw", margin: "auto", height: "100%" }}
      >
        <Dialog.Title>Checkout</Dialog.Title>

        <Flex direction="column" gap="3">
          <div className="">
            <div className="flex justify-between">
              <p className="font-bold">item</p>
              <p className="font-bold">Subtotal</p>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex">
                <Image src={`/nft1.png`} fill className="image" alt="nft01" />
                <div>
                  <p className="font-bold">Mia Ayana</p>
                  <p className="">Abstract Smoke Red Blue</p>
                </div>
              </div>
              <p className="font-bold">4.5ETH</p>
            </div>
            <div className="flex justify-between">
              <p className="font-bold">Total</p>
              <p className="font-bold">4.5ETH</p>
            </div>
          </div>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button variant="soft" color="blue">
              Vote
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
export default CheckoutModal;
