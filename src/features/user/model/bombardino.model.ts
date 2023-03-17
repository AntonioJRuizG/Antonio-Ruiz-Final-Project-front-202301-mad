export type BombardinoId = {
  id: string;
};

export type ProtoBombardinoStructure = {
  alias: string;
  manufacturer: string;
  instrumentModel: string;
  valves: number;
  level: string;
  marchingBand: boolean;
  image: string;
  creator: {};
};

export type UserStructure = BombardinoId & ProtoBombardinoStructure;

export class ProtoBombardino implements ProtoBombardinoStructure {
  constructor(
    public alias: string,
    public manufacturer: string,
    public instrumentModel: string,
    public valves: number,
    public level: string,
    public marchingBand: boolean,
    public image: string,
    public creator: {}
  ) {}
}
