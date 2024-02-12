export interface DeletePostUseCase {
    execute(id: string): Promise<void>;
}
