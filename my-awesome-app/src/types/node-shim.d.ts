declare module "node:path" {
  export function join(...parts: string[]): string;
}

declare const process: {
  cwd(): string;
};