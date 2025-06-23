export interface UserRepository {
  findAll(): Promise<{ id: number; email: string; nickname: string; createdAt: Date }[]>;
  findById(id: number): Promise<{ id: number; email: string; nickname: string; createdAt: Date } | null>;
  updateUser(id: number, data: { email?: string; nickname?: string; password?: string }): Promise<boolean>;
}
