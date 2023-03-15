export type UserId = {
  id: string;
};

export type ProtoUserStructure = {
  name: string;
  email: string;
  pw: string;
};

export type UserStructure = UserId & ProtoUserStructure;

export class ProtoUser implements ProtoUserStructure {
  constructor(public name: string, public email: string, public pw: string) {}
}
