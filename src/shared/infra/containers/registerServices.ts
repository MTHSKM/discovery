import { asClass, AwilixContainer } from 'awilix';
import { VerifyHealthService } from '../../../modules/health/services/VerifyHealthService';
import { GenerateFinancialReportService } from '../../../modules/langchain/services/GenerateFinancialReportService';
import { GenerateTechnologyIndustryReportService } from '../../../modules/langchain/services/GenerateTechnologyIndustryReportService';
import { ProcessDynamicMessageService } from '../../../modules/langchain/services/ProcessDynamicMessageService';
import { ProcessGenericChatService } from '../../../modules/langchain/services/ProcessGenericChatService';
import { ProcessHistoryQuestionService } from '../../../modules/langchain/services/ProcessHistoryQuestionService';
import { ProcessChatInstructionsService } from '../../../modules/langchain/services/ProcessChatInstructionsService';
import { ProcessChatInstructionsByCategoryService } from '../../../modules/langchain/services/ProcessChatInstructionsByCategoryService';
import { ProcessToolMultiplyService } from '../../../modules/langchain/services/ProcessToolMultiplyService';
import { GenerateReactAgentService } from '../../../modules/langchain/services/GenerateReactAgentService';
import { GenerateEmbeddingsService } from '../../../modules/langchain/services/GenerateEmbeddingsService';
import { FirstScrappingService } from '../../../modules/web_scrapping/services/FirstScrappingService';
import { SecondScrappingService } from '../../../modules/web_scrapping/services/SecondScrappingService';
import { ThirdScrappingService } from '../../../modules/web_scrapping/services/ThirdScrappingService';

export function registerServices(container: AwilixContainer): void {
  container.register(
    'verifyHealthService',
    asClass(VerifyHealthService, { lifetime: 'SINGLETON' }),
  );

  container.register(
    'generateFinancialReportService',
    asClass(GenerateFinancialReportService, { lifetime: 'SINGLETON' }),
  );

  container.register(
    'generateTechnologyIndustryReportService',
    asClass(GenerateTechnologyIndustryReportService, { lifetime: 'SINGLETON' }),
  );

  container.register(
    'processDynamicMessageService',
    asClass(ProcessDynamicMessageService, { lifetime: 'SINGLETON' }),
  );

  container.register(
    'processGenericChatService',
    asClass(ProcessGenericChatService, { lifetime: 'SINGLETON' }),
  );

  container.register(
    'processHistoryQuestionService',
    asClass(ProcessHistoryQuestionService, { lifetime: 'SINGLETON' }),
  );

  container.register(
    'processChatInstructionsService',
    asClass(ProcessChatInstructionsService, { lifetime: 'SINGLETON' }),
  );

  container.register(
    'processChatInstructionsByCategoryService',
    asClass(ProcessChatInstructionsByCategoryService, {
      lifetime: 'SINGLETON',
    }),
  );

  container.register(
    'processToolMultiplyService',
    asClass(ProcessToolMultiplyService, {
      lifetime: 'SINGLETON',
    }),
  );

  container.register(
    'generateReactAgentService',
    asClass(GenerateReactAgentService, {
      lifetime: 'SINGLETON',
    }),
  );

  container.register(
    'generateEmbeddingsService',
    asClass(GenerateEmbeddingsService, {
      lifetime: 'SINGLETON',
    }),
  );

  container.register(
    'firstScrappingService',
    asClass(FirstScrappingService, {
      lifetime: 'SINGLETON',
    }),
  );

  container.register(
    'secondScrappingService',
    asClass(SecondScrappingService, {
      lifetime: 'SINGLETON',
    }),
  );

  container.register(
    'thirdScrappingService',
    asClass(ThirdScrappingService, {
      lifetime: 'SINGLETON',
    }),
  );
}
