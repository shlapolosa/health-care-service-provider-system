export interface IVerification {
  id?: number;
  type?: string;
  details?: string;
}

export class Verification implements IVerification {
  constructor(public id?: number, public type?: string, public details?: string) {}
}
