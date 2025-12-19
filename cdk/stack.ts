import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3Deployment from 'aws-cdk-lib/aws-s3-deployment';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import { Construct } from 'constructs';

export type LocalsScrapperAppInfraStackProps = cdk.StackProps & {
  stage: 'dev' | 'prod';
  domainName: string;
  certificateArn: string;
};

export class LocalsScrapperAppInfraStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    props: LocalsScrapperAppInfraStackProps,
  ) {
    super(scope, id, props);

    // Helper function to generate consistent resource names
    const getResourceName = (resourceType: string) =>
      `${this.stackName}-${resourceType}-${stage}`;

    // Helper function to generate consistent resource IDs
    const getResourceId = (resourceType: string) => `${resourceType}-${stage}`;

    const stage = props?.stage || 'dev';

    // Create an S3 bucket for the static site
    const websiteBucket = new s3.Bucket(this, getResourceId('WebsiteBucket'), {
      bucketName: `locals-scrapper-${stage}`,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      autoDeleteObjects: false,
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    });

    // Deploy static site content to the S3 bucket
    new s3Deployment.BucketDeployment(this, getResourceId('DeployWebsite'), {
      sources: [s3Deployment.Source.asset('./dist')],
      destinationBucket: websiteBucket,
      prune: true,
    });

    // Create an Origin Access Control (OAC) for secure access to the bucket
    const originAccessControl = new cloudfront.CfnOriginAccessControl(
      this,
      getResourceId('ReactAppOAC'),
      {
        originAccessControlConfig: {
          name: getResourceName('ReactAppOAC'),
          originAccessControlOriginType: 's3',
          signingBehavior: 'always',
          signingProtocol: 'sigv4',
        },
      },
    );

    const distribution = new cloudfront.Distribution(
      this,
      getResourceId('ReactAppDistribution'),
      {
        defaultBehavior: {
          origin: origins.S3BucketOrigin.withOriginAccessControl(websiteBucket),
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
        defaultRootObject: 'index.html',
        errorResponses: [
          {
            httpStatus: 404,
            responseHttpStatus: 200,
            responsePagePath: '/index.html',
            ttl: cdk.Duration.seconds(0),
          },
          {
            httpStatus: 403,
            responseHttpStatus: 200,
            responsePagePath: '/index.html',
            ttl: cdk.Duration.seconds(0),
          },
        ],
        domainNames: [props.domainName],
        certificate: acm.Certificate.fromCertificateArn(
          this,
          'SiteCertificate',
          props.certificateArn,
        ),
      },
    );

    const cfnDistribution = distribution.node
      .defaultChild as cloudfront.CfnDistribution;
    cfnDistribution.addPropertyOverride(
      'DistributionConfig.Origins.0.OriginAccessControlId',
      originAccessControl.attrId,
    );

    websiteBucket.addToResourcePolicy(
      new iam.PolicyStatement({
        actions: ['s3:GetObject'],
        resources: [websiteBucket.arnForObjects('*')],
        principals: [new iam.ServicePrincipal('cloudfront.amazonaws.com')],
        conditions: {
          StringEquals: {
            'AWS:SourceArn': `arn:aws:cloudfront::${this.account}:distribution/${distribution.distributionId}`,
          },
        },
      }),
    );

    // Output the S3 website URL
    new cdk.CfnOutput(this, 'WebsiteURL', {
      value: `https://${distribution.domainName}`,
      description: 'The URL of the deployed static site',
    });
  }
}
