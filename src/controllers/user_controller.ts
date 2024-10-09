import type { Response, NextFunction } from "express";
import { Body, Delete, Get, OperationId, Path, Post, Put, Route, Tags } from "tsoa";
import type { DataResponse } from "../app/middlewares/response/data_response";
import type { ErrorResponse } from "../app/middlewares/response/error_response";
import type { UserCreateRequest, UserUpdateRequest } from "../data/requests/user_request";
import { UserService } from "../services/user_service";
import { erroHandle } from "../app/utils/error";
import type { UserModel } from "../data/models/user_model";
import type { MessageResponse } from "../app/middlewares/response/message_response";

@Tags("User Management")
@Route("/api/v1/user")
export class UserController {
    private res: Response;
    private next: NextFunction;

    constructor(res: Response, next: NextFunction) {
        this.res = res;
        this.next = next;
    }

    @OperationId("createUser")
    @Post("/create")
    public async create(@Body() reqBody: UserCreateRequest): Promise<DataResponse<string> | ErrorResponse> {
        try {
            const data = await UserService.create(reqBody);
            const response: DataResponse<string> = {
                status: this.res.statusCode,
                data: data
            };

            return response;
        } catch (error) {
            return erroHandle(error, this.next);
        }
    }

    @OperationId("getAllUser")
    @Get("/all")
    public async gets(): Promise<DataResponse<UserModel[]> | ErrorResponse> {
        try {
            const data = await UserService.gets();
            const response: DataResponse<UserModel[]> = {
                status: this.res.statusCode,
                data: data.map((item) => item)
            };

            return response;
        } catch (error) {
            return erroHandle(error, this.next);
        }
    }

    @OperationId("getUserById")
    @Get("/:uid")
    public async getById(@Path("uid") uid: string): Promise<DataResponse<UserModel> | ErrorResponse> {
        try {
            const data = await UserService.getByUid(uid);
            const response: DataResponse<UserModel> = {
                status: this.res.statusCode,
                data: data
            };

            return response;
        } catch (error) {
            return erroHandle(error, this.next);
        }
    }

    @OperationId("updateDataUser")
    @Put("/update-data/:uid")
    public async updateData(
        @Path("uid") uid: string,
        @Body() reqBody: UserUpdateRequest
    ): Promise<MessageResponse | ErrorResponse> {
        try {
            const data = await UserService.updateData(uid, reqBody);
            const response: MessageResponse = {
                status: this.res.statusCode,
                message: data
            };

            return response;
        } catch (error) {
            return erroHandle(error, this.next);
        }
    }

    @OperationId("deleteUser")
    @Delete("/delete/:uid")
    public async delete(@Path("uid") uid: string): Promise<MessageResponse | ErrorResponse> {
        try {
            const data = await UserService.delete(uid);
            const response: MessageResponse = {
                status: this.res.statusCode,
                message: data
            };

            return response;
        } catch (error) {
            return erroHandle(error, this.next);
        }
    }
}
