export type UserStructure = {
  id: string;
  name: string;
  email: string;
  pw: string;
  token?: string;
};

export class ProtoUser implements Partial<UserStructure> {
  constructor(public name: string, public email: string, public pw: string) {}
}
