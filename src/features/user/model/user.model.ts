export type UserId = {
  id: string;
};

export type ProtoUserStructure = {
  name: string;
  email: string;
  passwd: string;
};

export type UserStructure = UserId & ProtoUserStructure;

export class ProtoUser implements ProtoUserStructure {
  constructor(
    public name: string,
    public email: string,
    public passwd: string
  ) {}
}
