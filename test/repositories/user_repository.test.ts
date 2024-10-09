import { beforeAll, describe, expect, it } from "bun:test";
import { UserRepository } from "../../src/repositories/user_repository";
import { logger } from "../../src/app/utils/logging";
import { initConfig } from "../init";

describe("User Repository", () => {
    beforeAll(() => {
        logger.info("Testing User Repository");
        initConfig();
    });

    it("should return a list of users", async () => {
        const response = await UserRepository.gets();
        logger.info(response);

        expect(response).not.toBeNull();
    });

    it("should return a user by uid", async () => {
        const response = await UserRepository.getByUid("c3c61d70010046cdb739e6a75738f42b");
        logger.info(response);

        expect(response).not.toBeNull();
    });
});
