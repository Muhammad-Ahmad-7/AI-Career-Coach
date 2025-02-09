import { PrismaClient } from "@prisma/client";

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = db;
}

// globalThis.prisma: This global variable ensures that the prisma client is not recreated each time on the reload during development instead use the same client on each reload. This will potentially save us from the connection errors.