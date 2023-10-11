export interface PROP2 {
    id?: string | undefined;
    port?: number | undefined;
    studio_port?: number | undefined;
    name?: string | undefined;
    path?: string | undefined;
    url?: string | undefined;
    req: Request;
    res: Response;
    sender: string;
    senderName: string;
    msg: string;
}