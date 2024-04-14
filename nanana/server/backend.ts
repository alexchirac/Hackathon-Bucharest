import { GenezioDeploy } from "@genezio/types";
import Redis from "ioredis";

@GenezioDeploy()
export class BackendService {
  client: Redis;
  prevNoOfNotifs: number;
  constructor() {
    if (!process.env.UPSTASH_REDIS_URL) {
      throw new Error("UPSTASH_REDIS_URL is not set in the `.env` file.");
    }
    this.prevNoOfNotifs = 0;
    this.client = new Redis(process.env.UPSTASH_REDIS_URL);
  }

  async getNotifs(): Promise<string[]> {
    const sortedContents: string[] = [];
    try {
      var noOfNotifications = await this.client.get("noOfNotifications");
      if (noOfNotifications == null) {
        noOfNotifications = "0";
      }

      for (var i = this.prevNoOfNotifs; i < parseInt(noOfNotifications); i++) {
        const buffer = await this.client.get(`Notification:${i}`);
        if (buffer !== null)
          sortedContents.push(buffer);
        else
          throw new Error('No user found');
      }
      this.prevNoOfNotifs = parseInt(noOfNotifications);
      return sortedContents;

    } catch (error) {
      return [];
    }
  }

  async addUser(username: string) {
    try {
      var noOfUsers = await this.client.get("noOfUsers");
      if (noOfUsers == null) {
        noOfUsers = "0";
      }
      const userKey = `User:${noOfUsers}`;
      await this.client.set(userKey, username);
      this.client.set("noOfUsers", parseInt(noOfUsers) + 1)
      return true;
    } catch {
      return false;
    }
  }

  async hello(name: string): Promise<string> {
    const formattedTime = new Date().toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `Hello ${name}! You logged in successfully at ${formattedTime}`;
  }
}
