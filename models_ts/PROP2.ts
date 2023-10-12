import { RESPONSE } from "./RESPONSE";

export interface PROP2 {
    server: {
        id: string;
        port: number;
        studio_name: string;
        studio_port: number;
        name: string;
        path: string;
        url: string;
    } | undefined;
    body: RESPONSE;
    req: Request;
    res: Response;
}