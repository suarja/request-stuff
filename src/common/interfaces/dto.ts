export abstract class DTO<T, I = void, O = unknown> {
  abstract fromDomain({ data }: { data: T }): I;
  abstract toDomain({ data }: { data: O }): T;
}
