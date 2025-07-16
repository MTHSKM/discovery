export interface IReactAgent {
  run(question: string): Promise<string>;
}
