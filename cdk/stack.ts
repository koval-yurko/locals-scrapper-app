import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3Deployment from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';

export type LocalsScrapperAppInfraStackProps = cdk.StackProps & {
  stage: 'dev' | 'prod';
};

export class LocalsScrapperAppInfraStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    props?: LocalsScrapperAppInfraStackProps,
  ) {
    super(scope, id, props);

    const stage = props?.stage || 'dev';

    // Create an S3 bucket for the static site
    const websiteBucket = new s3.Bucket(this, 'WebsiteBucket', {
      bucketName: `locals-scrapper-${stage}`,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: '404.html',
      publicReadAccess: true,
      blockPublicAccess: new s3.BlockPublicAccess({
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      }),
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // Deploy static site content to the S3 bucket
    new s3Deployment.BucketDeployment(this, 'DeployWebsite', {
      sources: [s3Deployment.Source.asset('./dist')],
      destinationBucket: websiteBucket,
    });

    // Output the S3 website URL
    new cdk.CfnOutput(this, 'WebsiteURL', {
      value: websiteBucket.bucketWebsiteUrl,
      description: 'The URL of the deployed static site',
    });
  }
}
