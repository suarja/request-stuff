import ServerUsecases from "../application/usecases/server-usecases"

export type ServerReturnTypes = ReturnType< ServerUsecases["registerRequest"]> | ReturnType< ServerUsecases["getUserRequests"]>  