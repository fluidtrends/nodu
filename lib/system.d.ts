export declare function captureIO(): {
    release: () => {
        out: string;
        err: string;
    };
};
export declare function exec(cmd: string, args: string[], log?: any): Promise<string>;
