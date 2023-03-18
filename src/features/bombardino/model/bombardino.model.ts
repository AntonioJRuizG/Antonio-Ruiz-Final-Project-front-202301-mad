export type BombardinoStructure = {
  id: string;
  alias: string;
  manufacturer: string;
  instrumentModel: string;
  valves: number;
  level: string;
  marchingBand: boolean;
  image: string;
  creator: {};
};

export type ServerBombardinoResp = {
  results: BombardinoStructure[];
};
