export interface NodeModule  {
    hot?: Hot
}
interface Hot {
    accept(path?: string): void
}