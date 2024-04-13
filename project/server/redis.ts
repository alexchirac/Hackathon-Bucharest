import { GenezioDeploy } from "@genezio/types";
import Redis from "ioredis";

@GenezioDeploy()
export class ShoppingCartService {
    client: Redis;
    constructor() {
        if (!process.env.UPSTASH_REDIS_URL) {
            throw new Error("UPSTASH_REDIS_URL is not set in the `.env` file.");
        }
        this.client = new Redis(process.env.UPSTASH_REDIS_URL);
        console.log(process.env.UPSTASH_REDIS_URL);
    }

    async addItemToCart(cartId: string, productId: string, name: string) {
        // const cartKey = `cart:${cartId}`;
        try {
            await this.client.set(productId, name);
        } catch {
            return false;
        }
        // the rest of the implementation goes here
        return true;
    }

    async getCartContents(cartId: string): Promise<string | null> {
        // const cartKey = `${cartId}`;
        var cartContents;
        try {
            cartContents = await this.client.get(cartId);
        } catch (error) {
            return null;
        }// this.client.keys

        // the rest of the implementation goes here
        // if (!cartItemsKeys || cartItemsKeys.length === 0) {
        //     return null; // If no items found, return null
        // }

        // var cartContents;

        // for (const cartItemKey of cartItemsKeys) {
        //     // const productId = cartItemKey.split(':').pop(); // Extract productId from key
        //     // const quantity = await this.client.get(cartItemKey);
        //     // if (quantity != null)
        //     //     cartContents.set(productId, parseInt(quantity)); // Convert quantity to number
        //     cartContents = cartItemKey.split(':').at(2);
        // }

        return cartContents ?? null;
    }
}