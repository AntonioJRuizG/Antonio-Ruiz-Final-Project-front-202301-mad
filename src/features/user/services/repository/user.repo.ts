import { storage } from "../../../../utils/storage";
import { ProtoUserStructure, UserStructure } from "../../model/user.model";

export class UserRepo {
  url: string;
  constructor() {
    this.url = "https://antonio-ruiz-final-project-2023.onrender.com/usuarios";
  }

  async registerUser(user: ProtoUserStructure): Promise<UserStructure> {
    const resp = await fetch(this.url + "/registro", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = (await resp.json()) as UserStructure;
    return data;
  }

  async loginUser(
    user: ProtoUserStructure,
    token: string
  ): Promise<UserStructure> {
    const resp = await fetch(this.url + "/acceso", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const data = (await resp.json()) as UserStructure;
    storage.set("token", data.token);
    return data;
  }
}
