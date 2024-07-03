import { Construct } from 'constructs';
import * as path from "path";
import * as cdk from 'aws-cdk-lib';
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    // console.log(path.join(__dirname, "functions"));
    const restAPI = new apigateway.RestApi(this, "restapi", {
      restApiName: "aws-lambda-ts-restapi",
    });
    const lambdaLayer = new lambda.LayerVersion(this, "lambdalayer", {
      layerVersionName: "aws-lambda-ts-layer",
      compatibleRuntimes: [lambda.Runtime.NODEJS_20_X],
      code: lambda.Code.fromAsset(path.join(__dirname, "layers"))
    });
    const helloFunc = new lambda.Function(this, "helloFunc", {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: "hello.handler",
      code: lambda.Code.fromAsset(path.join(__dirname, "functions")),
      layers: [lambdaLayer],
    });
    restAPI.root.addResource("api")
      .addResource("v1")
      .addResource("greetings")
      .addResource("hello")
      .addMethod("GET", new apigateway.LambdaIntegration(helloFunc));
  }
}
