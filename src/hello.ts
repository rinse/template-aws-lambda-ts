import {APIGatewayProxyEvent, APIGatewayProxyResult, Context, Handler} from "aws-lambda";
import {v4 as uuidv4} from "uuid";

export const handler: Handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    console.log(event);
    console.log(context);
    console.log(uuidv4())
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Hello World!"
        }),
    };
};
