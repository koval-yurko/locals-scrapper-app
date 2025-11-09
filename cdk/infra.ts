import { config } from './config';
import * as cdk from 'aws-cdk-lib';
import { LocalsScrapperAppInfraStack } from './stack';

const app = new cdk.App();

new LocalsScrapperAppInfraStack(app, 'LocalsScrapperAppDevStack', {
  env: {
    account: config.CDK_DEFAULT_ACCOUNT,
    region: config.CDK_DEFAULT_REGION,
  },
  stage: 'dev',
  domainName: config.DOMAIN_NAME,
  certificateArn: config.CERTIFICATE_ARN,
});

new LocalsScrapperAppInfraStack(app, 'LocalsScrapperAppProdStack', {
  env: {
    account: config.CDK_DEFAULT_ACCOUNT,
    region: config.CDK_DEFAULT_REGION,
  },
  stage: 'prod',
  domainName: config.DOMAIN_NAME,
  certificateArn: config.CERTIFICATE_ARN,
});
