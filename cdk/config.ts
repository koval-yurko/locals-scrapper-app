import * as path from 'path';
import * as dotenv from 'dotenv';
import { cleanEnv, str } from 'envalid';

const envPath = path.resolve(__dirname, './.env');
dotenv.config({ path: [envPath], encoding: 'utf-8' });

export const config = cleanEnv(process.env, {
  CDK_DEFAULT_ACCOUNT: str(),
  CDK_DEFAULT_REGION: str(),
  DOMAIN_NAME: str(),
  CERTIFICATE_ARN: str(),
});
