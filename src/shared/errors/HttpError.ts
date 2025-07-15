export class HttpError {
  constructor(
    public readonly status: number,
    public readonly message: string,
  ) {}
}
