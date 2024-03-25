export interface MarkAsReadUseCase {
    execute(cId: string, userId: string): Promise<void>;
}
