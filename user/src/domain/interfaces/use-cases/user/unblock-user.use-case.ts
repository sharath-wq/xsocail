export interface UnblockUserUseCase {
    execute(id: string): Promise<void>;
}
