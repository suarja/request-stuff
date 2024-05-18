import {
  FirebaseAdminDatabase,
  FirebaseAdminDatabaseOptions,
} from "@/common/data/firebase/admin-database";
import ServerAdapter from "@/features/server/application/adapters/server-adapter";
import ServerUsecases from "@/features/server/application/usecases/server-usecases";
import ServerRepository from "@/features/server/application/repositories/server-repository";
import { container } from "tsyringe";
import { getStorage } from "firebase-admin/storage";
import { getFirestore } from "firebase-admin/firestore";
import { auth } from "firebase-admin";
import { customInitApp } from "@/common/data/firebase/admin-config";
import RequestRouter from "../requests/request-router";
customInitApp();
const options: FirebaseAdminDatabaseOptions = {
  storage: getStorage(),
  firestore: getFirestore(),
  auth: auth(),
};
// Register the database options and other dependecy for injection
container.register("firebaseDatabaseAdminOptions", { useValue: options });
export const serverDatabase = container.resolve(FirebaseAdminDatabase);
container.register("serverRepository", { useClass: ServerRepository });
container.register("serverRepositoryOptions", {
  useValue: { database: serverDatabase },
});
container.register("serverAdapter", { useClass: ServerAdapter });
container.register("serverUsecases", { useClass: ServerUsecases });
export const serverAdapter = container.resolve(ServerAdapter);
export const requestRouter = container.resolve(RequestRouter);
