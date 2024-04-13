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
        try {
            await this.client.set(productId, name);
            return true;
        } catch {
            return false;
        }

    }

    async getCartContents(cartId: string): Promise<string | null> {
        var cartContents;
        try {
            cartContents = await this.client.get(cartId);
            return cartContents ?? null;
        } catch (error) {
            return null;
        }
    }
}