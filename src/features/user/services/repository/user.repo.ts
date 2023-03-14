import { ProtoUserStructure, UserStructure } from "../../model/user.model";

export class UserRepo {
  url: string;
  constructor() {
    this.url = "https://antonio-ruiz-final-project-2023.onrender.com/users";
  }

  async registerUser(user: ProtoUserStructure): Promise<UserStructure> {
    const resp = await fetch(this.url + "/register", {
      method: "POST",
      body: JSON.stringify(user),
    });
    const data = (await resp.json()) as UserStructure;
    return data;
  }

  async loginUser(user: ProtoUserStructure): Promise<UserStructure> {
    user.name = ""; // En el formulario de login no se pide name
    const resp = await fetch(this.url + "/login", {
      method: "POST",
      body: JSON.stringify(user),
    });
    const data = (await resp.json()) as UserStructure;
    return data;
  }
}
