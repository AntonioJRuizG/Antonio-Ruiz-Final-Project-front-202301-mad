import { UserStructure } from "../../user/model/user.model";

export type EuphoniumStructure = {
  id: string;
  alias: string;
  manufacturer: string;
  instrumentModel: string;
  valves: number;
  level: string;
  marchingBand: boolean;
  image: string;
  creator: Partial<UserStructure>;
};

export type ServerEuphoniumResp = {
  results: EuphoniumStructure[];
};

export class ProtoEuphonium implements Partial<EuphoniumStructure> {
  constructor(
    public alias: string,
    public manufacturer: string,
    public instrumentModel: string,
    public valves: number,
    public marchingBand: boolean,
    public image: string
  ) {}
}
