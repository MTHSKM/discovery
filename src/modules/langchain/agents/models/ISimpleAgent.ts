import { ICalculateDTO } from '../../dtos/ICalculateDTO';

export interface ISimpleAgent {
  run(request: ICalculateDTO & { operator: string }): Promise<number>;
}
