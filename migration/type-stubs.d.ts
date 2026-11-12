declare namespace JSX {
  interface IntrinsicElements { [elemName: string]: any }
  interface IntrinsicAttributes { key?: any }
}
declare module 'react' {
  export type CSSProperties = Record<string, any>;
  export type FormEvent<T=any> = any;
  export type PointerEvent<T=any> = any;
  export type ReactNode = any;
  export type AnchorHTMLAttributes<T> = Record<string, any>;
  export function useState<T>(initial:T|(()=>T)): [T,(next:T|((prev:T)=>T))=>void];
  export function useEffect(effect:()=>void|(()=>void), deps?:any[]): void;
  export function useMemo<T>(factory:()=>T,deps:any[]):T;
  export function useRef<T>(initial:T): {current:T};
}
declare module 'react/jsx-runtime' { export const Fragment:any; export function jsx(type:any,props:any,key?:any):any; export function jsxs(type:any,props:any,key?:any):any; }
