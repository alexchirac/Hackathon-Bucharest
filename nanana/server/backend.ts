import { GenezioDeploy } from "@genezio/types";

@GenezioDeploy()
export class BackendService {
  constructor() { }

  async hello(name: string): Promise<string> {
    const formattedTime = new Date().toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `Hello ${name}! You logged in successfully at ${formattedTime}`;
  }
}
