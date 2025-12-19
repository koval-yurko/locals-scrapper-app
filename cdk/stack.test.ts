import { describe, test, expect } from 'vitest';
import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { LocalsScrapperAppInfraStack } from './stack';

describe('LocalsScrapperAppInfraStack Tests', () => {
  test('SQS Queue Created', () => {
    const app = new cdk.App();
    const stack = new LocalsScrapperAppInfraStack(app, 'MyTestStack', {
      env: {
        account: '000000000000',
        region: 'us-east-1',
      },
      stage: 'dev',
      domainName: 'DOMAIN_NAME',
      certificateArn:
        'arn:aws:acm:us-east-1:000000000000:certificate/00000000-xxxx-xxxx-xxxx-000000000000',
    });
    const template = Template.fromStack(stack);
    expect(template.toJSON()).toMatchSnapshot();
  });
});
