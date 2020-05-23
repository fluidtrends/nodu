export declare function exec(input?: any): Promise<{
    id: any;
    to: any;
    version: string;
    name: string;
    deps: Record<string, string> | undefined;
}>;
declare const _default: (input?: any) => Promise<{
    id: any;
    to: any;
    version: string;
    name: string;
    deps: Record<string, string> | undefined;
} | undefined>;
export default _default;
