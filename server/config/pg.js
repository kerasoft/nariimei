import { CFEnvironment, CFConfig }
from "cashfree-pg-sdk-nodejs";
import dotenv from 'dotenv'

dotenv.config()

const cfConfig = new CFConfig(CFEnvironment.SANDBOX, "2022-09-01", process.env.CF_CLIENT_ID, process.env.CF_CLIENT_SECRET)

export default cfConfig