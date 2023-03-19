import { UserStructure } from "../../user/model/user.model";

export type BombardinoStructure = {
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

export type ServerBombardinoResp = {
  results: BombardinoStructure[];
};
