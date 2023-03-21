import { loginServerResStructure, UserStructure } from "../../model/user.model";

export class UserRepo {
  url: string;
  constructor() {
    /* RENDER URL
     this.url =
      "https://antonio-ruiz-final-project-2023.onrender.com/usuarios", */

    this.url = "http://localhost:4500/usuarios";
  }

  async registerUser(user: Partial<UserStructure>): Promise<UserStructure> {
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
    user: Partial<UserStructure>
  ): Promise<loginServerResStructure> {
    const resp = await fetch(this.url + "/acceso", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = (await resp.json()) as loginServerResStructure;
    localStorage.removeItem("token");
    if (data.token) JSON.stringify(localStorage.setItem("token", data.token));
    return data;
  }
}
