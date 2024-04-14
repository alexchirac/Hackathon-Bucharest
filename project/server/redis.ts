import { GenezioDeploy } from "@genezio/types";
import Redis from "ioredis";

@GenezioDeploy()
export class UserService {
    client: Redis;
    prevNoOfUsers: number;
    constructor() {
        if (!process.env.UPSTASH_REDIS_URL) {
            throw new Error("UPSTASH_REDIS_URL is not set in the `.env` file.");
        }
        this.client = new Redis(process.env.UPSTASH_REDIS_URL);
        this.prevNoOfUsers = 0;
        console.log(process.env.UPSTASH_REDIS_URL);
    }

    async addNotification(string: string) {
        try {
            var noOfNotifications = await this.client.get("noOfNotifications");
            if (noOfNotifications == null) {
                noOfNotifications = "0";
            }
            const notifKey = `Notification:${noOfNotifications}`;
            await this.client.set(notifKey, string);
            this.client.set("noOfUsers", parseInt(noOfNotifications) + 1)
            return true;
        } catch {
            return false;
        }
    }

    async getMessages(): Promise<string[]> {
        console.log("s-a apelat")
        const sortedContents: string[] = [];
        try {
            var noOfUsers = await this.client.get("noOfUsers");
            if (noOfUsers == null) {
                noOfUsers = "0";
            }

            for (var i = this.prevNoOfUsers; i < parseInt(noOfUsers); i++) {
                const user = await this.client.get(`User:${i}`);
                if (user !== null)
                    sortedContents.push(user);
                else
                    throw new Error('No user found');
            }
            this.prevNoOfUsers = parseInt(noOfUsers);
            console.log(sortedContents)
            return sortedContents;

        } catch (error) {
            return [];
        }
    }
}