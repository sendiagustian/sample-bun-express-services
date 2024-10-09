import { describe, it, expect, beforeAll } from "bun:test";
import { UserService } from "../../src/services/user_service";
import { logger } from "../../src/app/utils/logging";
import { initConfig } from "../init";

describe("GET USER DATA SERVICE", () => {
    beforeAll(() => {
        logger.info("Testing User Service");
        initConfig();
    });

    it("GET ALL DATA USER", async () => {
        const response = await UserService.gets();
        logger.info(response);

        expect(response).not.toBeNull();
    });

    it("GET DATA USER BY UID", async () => {
        const response = await UserService.getByUid("c3c61d70010046cdb739e6a75738f42b");
        logger.info(response);

        expect(response).not.toBeNull();
    });
});
