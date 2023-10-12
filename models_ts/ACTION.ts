export interface ACTION {
    name: string;
    act: (prop: any) => Promise<any>;
}