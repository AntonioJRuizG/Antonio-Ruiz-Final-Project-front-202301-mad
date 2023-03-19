import {
  BombardinoStructure,
  ServerBombardinoResp,
} from "../../model/bombardino.model";

export interface BombardinoRepoStructure {
  loadBombardinos(): Promise<ServerBombardinoResp[]>;
  getBombardino(id: BombardinoStructure["id"]): Promise<ServerBombardinoResp>;
  createBombardino(
    bombardino: BombardinoStructure
  ): Promise<ServerBombardinoResp>;
  update(
    bombardino: Partial<BombardinoStructure>
  ): Promise<ServerBombardinoResp>;
  delete(id: BombardinoStructure["id"]): Promise<void>;
}

export class BombardinoRepo {
  url: string;
  constructor() {
    this.url =
      "https://antonio-ruiz-final-project-2023.onrender.com/bombardinos";
  }

  async loadBombardinos(): Promise<ServerBombardinoResp> {
    const resp = await fetch(this.url);
    if (!resp.ok)
      throw new Error("Error http fetch" + resp.status + "" + resp.statusText);
    const data: ServerBombardinoResp = await resp.json();
    return data;
  }

  async getBombardino(
    id: BombardinoStructure["id"]
  ): Promise<ServerBombardinoResp> {
    const url = this.url + "/" + id;
    const resp = await fetch(url);
    if (!resp.ok)
      throw new Error("Error getting instrument details " + resp.status);
    const data: ServerBombardinoResp = await resp.json();
    return data;
  }
  /* Extension future methods
  async createBombardino(
    bombardino: ProtoBombardinoStructure
  ): Promise<BombardinoStructure> {
    let token = localStorage.getItem("token");
    const resp = await fetch(this.url, {
      method: "POST",
      body: JSON.stringify(bombardino),
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const data = (await resp.json()) as BombardinoStructure;
    return data;
  }

  async update(
    bombardino: Partial<BombardinoStructure>
  ): Promise<BombardinoStructure> {
    const url = this.url + "/" + bombardino.id;
    const resp = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(bombardino),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = (await resp.json()) as BombardinoStructure;
    return data;
  }

  async delete(id: BombardinoStructure["id"]): Promise<void> {
    const url = this.url + "/" + id;
    const resp = await fetch(url, {
      method: "DELETE",
    });
    if (!resp.ok) throw new Error("Delete not possible");
  } */
}
