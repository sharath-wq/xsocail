export interface BlockUserUseCase {
    execute(id: string): Promise<void>;
}
