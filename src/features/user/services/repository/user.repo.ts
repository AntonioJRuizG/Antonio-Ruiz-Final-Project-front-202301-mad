import { UserResponseBody, UserProps } from "../../model/user.model.js";
export class UserRepo {
  url: string;
  constructor() {
    /* RENDER URL
     this.url =
      "https://antonio-ruiz-final-project-2023.onrender.com/usuarios", */

    this.url = "http://localhost:4500/usuarios";
  }

  async registerUser(user: Partial<UserProps>): Promise<UserProps> {
    const resp = await fetch(this.url + "/registro", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = (await resp.json()) as UserProps;
    return data;
  }

  async loginUser(user: Partial<UserProps>): Promise<UserResponseBody> {
    const resp = await fetch(this.url + "/acceso", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = (await resp.json()) as UserResponseBody;
    return data;
  }
}
