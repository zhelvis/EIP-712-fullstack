import * as dotenv from "dotenv";

dotenv.config();

export const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY as string;
export const BSC_BE_API_KEY = process.env.BSC_BE_API_KEY as string;
