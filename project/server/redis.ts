import { GenezioDeploy } from "@genezio/types";
import Redis from "ioredis";

@GenezioDeploy()
export class UserService {
    client: Redis;
    noOfUsers: number;
    constructor() {
        if (!process.env.UPSTASH_REDIS_URL) {
            throw new Error("UPSTASH_REDIS_URL is not set in the `.env` file.");
        }
        this.client = new Redis(process.env.UPSTASH_REDIS_URL);
        this.noOfUsers = 0;
        console.log(process.env.UPSTASH_REDIS_URL);
    }

    getNoOfUsers() {
        return this.noOfUsers;
    }

    async addMessage(username: string) {
        try {
            const userKey = `User:${this.noOfUsers}`;
            await this.client.set(userKey, username);
            this.noOfUsers++;
            console.log(this.noOfUsers);
            return true;
        } catch {
            return false;
        }

    }

    async getMessages(): Promise<string[] | null> {
        // var cartContents;
        try {
            const cartContents = await this.client.keys('User:*');
            const sortedContents = cartContents
                .map(item => item.split(":"))
                .sort((a, b) => parseInt(a[1], 10) - parseInt(b[1]))
                .map(item => item.join(":"))
                .map(async item => {
                    const value = await this.client.get(item);
                    if (value === null) {
                        throw new Error(`Value for key '${item}' is missing or invalid`);
                    }
                    return value;
                });

            return await Promise.all(sortedContents);
        } catch (error) {
            return null;
        }
    }
}