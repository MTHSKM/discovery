import { ICreateDynamicMessagesTemplateDTO } from '../../dtos/ICreateDynamicMessagesTemplateDTO';
import { ICreateFinancialReportDTO } from '../../dtos/ICreateFinancialReportDTO';
import { ICreatePromptMessageDTO } from '../../dtos/ICreatePromptMessageDTO';
import { IMultiplyDTO } from '../../dtos/IMultiplyDTO';

export interface IAIProvider {
  queryLLM(contents: ICreatePromptMessageDTO): Promise<string>;
  createFinancialReportPrompt(
    request: ICreateFinancialReportDTO,
  ): Promise<string>;
  createTechnologyIndustryReportPrompt(region: string): Promise<string>;
  createHistoryProfessorPromptTemplate(question: string): Promise<string>;
  createDynamicMessagesPromptTemplate(
    placeholders: ICreateDynamicMessagesTemplateDTO[],
  ): Promise<string>;
  getRepairInstructionsFromManual(question: string): Promise<string>;
  createResponseBasedOnCategory(question: string): Promise<string>;
  usingMultiplyTool(request: IMultiplyDTO): Promise<number>;
}
