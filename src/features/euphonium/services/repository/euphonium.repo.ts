import {
  EuphoniumProps,
  EuphoniumResponseBody,
} from "../../model/euphonium.model";

export interface EuphoniumRepoStructure {
  loadEuphoniums(): Promise<EuphoniumResponseBody[]>;
  getEuphonium(id: EuphoniumProps["id"]): Promise<EuphoniumResponseBody>;
  createEuphonium(euphonium: EuphoniumProps): Promise<EuphoniumResponseBody>;
  update(euphonium: Partial<EuphoniumProps>): Promise<EuphoniumResponseBody>;
  delete(id: EuphoniumProps["id"]): Promise<void>;
}

export class EuphoniumRepo {
  url: string;
  constructor() {
    /* RENDER URL
    this.url =
      "https://antonio-ruiz-final-project-2023.onrender.com/bombardinos", */

    this.url = "http://localhost:4500/bombardinos";
  }

  async loadEuphoniums(): Promise<EuphoniumResponseBody> {
    const resp = await fetch(this.url);
    if (!resp.ok)
      throw new Error("Error http fetch" + resp.status + "" + resp.statusText);
    const data: EuphoniumResponseBody = await resp.json();
    return data;
  }

  async loadEuphoniumsPaginated(
    offset: string
  ): Promise<EuphoniumResponseBody> {
    const url = this.url + "?offset=" + offset;
    const resp = await fetch(url);
    if (!resp.ok)
      throw new Error("Error http fetch" + resp.status + "" + resp.statusText);
    const data: EuphoniumResponseBody = await resp.json();
    return data;
  }

  async loadEuphoniumsFiltered(
    offset: string,
    level: string
  ): Promise<EuphoniumResponseBody> {
    const url = this.url + "/filter?offset=" + offset + "&level=" + level;
    const resp = await fetch(url);
    if (!resp.ok)
      throw new Error("Error http fetch" + resp.status + "" + resp.statusText);
    const data: EuphoniumResponseBody = await resp.json();
    return data;
  }

  async getEuphonium(id: EuphoniumProps["id"]): Promise<EuphoniumResponseBody> {
    const url = this.url + "/" + id;
    const resp = await fetch(url);
    if (!resp.ok)
      throw new Error("Error getting instrument details " + resp.status);
    const data: EuphoniumResponseBody = await resp.json();
    return data;
  }

  async deleteEuphonium(
    id: EuphoniumProps["id"],
    token: string
  ): Promise<void> {
    const url = this.url + "/" + id;
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
    euphonium: Partial<EuphoniumProps>,
    token: string
  ): Promise<EuphoniumResponseBody> {
    const resp = await fetch(this.url, {
      method: "POST",
      body: JSON.stringify(euphonium),
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const data = await resp.json();
    return data;
  }

  async updateEuphonium(
    euphonium: Partial<EuphoniumProps>,
    token: string
  ): Promise<EuphoniumResponseBody> {
    const url = this.url + "/" + euphonium.id;
    const resp = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(euphonium),
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const data = await resp.json();
    return data;
  }
}
