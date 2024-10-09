import { it, describe, expect } from "bun:test";
import { getQuery } from "../../src/app/configs/database";
import { logger } from "../../src/app/utils/logging";

describe("Connection", () => {
    it("should connect to the database", async () => {
        const response = await getQuery({
            type: "list",
            query: "SELECT * FROM tbUsers"
        });

        logger.info(response);

        expect(response).not.toBeNull();
    });
});
