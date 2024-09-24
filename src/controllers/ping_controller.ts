import { Tags, Route, Get } from "tsoa";

@Tags("Health Check")
@Route("health-check")
export class PingController {
    @Get("/")
    public async ping(): Promise<string> {
        return "Connection is OK!";
    }
}
