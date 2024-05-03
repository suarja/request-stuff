import { DTO } from "@/common/interfaces/dto";
import UserEntity from "../../domain/entities/user-entity";
import { UserInfra } from "../../domain/types/user";

export default class UserDto implements DTO<UserEntity, UserInfra> {
    fromDomain({ data }: { data: UserEntity; }): UserInfra {
        throw new Error("Method not implemented.");
    }
    toDomain({ data }: { data: unknown; }): UserEntity {
        throw new Error("Method not implemented.");
    }
}
