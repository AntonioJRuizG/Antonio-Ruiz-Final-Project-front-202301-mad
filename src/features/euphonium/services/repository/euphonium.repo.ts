import {
  EuphoniumStructure,
  ServerEuphoniumResp,
} from "../../model/euphonium.model";

export interface EuphoniumRepoStructure {
  loadEuphoniums(): Promise<ServerEuphoniumResp[]>;
  getEuphonium(id: EuphoniumStructure["id"]): Promise<ServerEuphoniumResp>;
  createEuphonium(euphonium: EuphoniumStructure): Promise<ServerEuphoniumResp>;
  update(euphonium: Partial<EuphoniumStructure>): Promise<ServerEuphoniumResp>;
  delete(id: EuphoniumStructure["id"]): Promise<void>;
}

export class EuphoniumRepo {
  url: string;
  constructor() {
    /*  this.url =
      "https://antonio-ruiz-final-project-2023.onrender.com/bombardinos", */

    this.url = "http://localhost:4500/bombardinos";
  }

  async loadEuphoniums(): Promise<ServerEuphoniumResp> {
    const resp = await fetch(this.url);
    if (!resp.ok)
      throw new Error("Error http fetch" + resp.status + "" + resp.statusText);
    const data: ServerEuphoniumResp = await resp.json();
    return data;
  }

  async getEuphonium(
    id: EuphoniumStructure["id"]
  ): Promise<ServerEuphoniumResp> {
    const url = this.url + "/" + id;
    const resp = await fetch(url);
    if (!resp.ok)
      throw new Error("Error getting instrument details " + resp.status);
    const data: ServerEuphoniumResp = await resp.json();
    return data;
  }

  async deleteEuphonium(id: EuphoniumStructure["id"]): Promise<void> {
    const url = this.url + "/" + id;

    let token = localStorage.getItem("token");
    if (!token) token = "";
    const resp = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (!resp.ok) throw new Error("Delete not possible");
  }

  async createEuphonium(
    euphonium: Partial<EuphoniumStructure>
  ): Promise<ServerEuphoniumResp> {
    const resp = await fetch(this.url, {
      method: "POST",
      body: JSON.stringify(euphonium),
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await resp.json();
    return data;
  }

  /* Extension future methods

  async update(
    euphonium: Partial<EuphoniumStructure>
  ): Promise<EuphoniumStructure> {
    const url = this.url + "/" + euphonium.id;
    const resp = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(euphonium),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = (await resp.json()) as EuphoniumStructure;
    return data;
  }

   */
}
