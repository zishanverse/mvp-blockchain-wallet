declare module 'bcrypt' {
    export function genSaltSync(rounds?: number): string;
    export function genSalt(rounds?: number): Promise<string>;
    export function hashSync(data: string, saltOrRounds: string | number): string;
    export function hash(data: string, saltOrRounds: string | number): Promise<string>;
    export function compareSync(data: string, encrypted: string): boolean;
    export function compare(data: string, encrypted: string): Promise<boolean>;
  }
  