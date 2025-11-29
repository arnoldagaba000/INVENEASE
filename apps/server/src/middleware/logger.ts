import { env } from "@INVENEASE/env";
import { pinoLogger } from "hono-pino";
import pino from "pino";
import pretty from "pino-pretty";

export const logger = () =>
    pinoLogger({
        pino: pino(
            env.NODE_ENV === "production"
                ? undefined
                : pretty({ colorize: true })
        ),
        http: { referRequestIdKey: crypto.randomUUID() },
    });
