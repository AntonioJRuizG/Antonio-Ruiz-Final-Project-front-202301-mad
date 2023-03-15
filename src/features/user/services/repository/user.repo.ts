import { ProtoUserStructure, UserStructure } from "../../model/user.model";

export class UserRepo {
  url: string;
  constructor() {
    // RENDER SERVER: this.url = "https://antonio-ruiz-final-project-2023.onrender.com/users";
    this.url = "http://localhost:4500/users";
  }

  async registerUser(user: ProtoUserStructure): Promise<UserStructure> {
    const resp = await fetch(this.url + "/register", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = (await resp.json()) as UserStructure;
    return data;
  }

  async loginUser(user: ProtoUserStructure): Promise<UserStructure> {
    const resp = await fetch(this.url + "/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = (await resp.json()) as UserStructure;
    return data;
  }
}
