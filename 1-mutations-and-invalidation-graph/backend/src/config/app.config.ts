import { registerAs } from "@nestjs/config"

/**
 * Type-safe config for the app server (port + CORS origin).
 */
export interface AppConfig {
    port: number
    frontendOrigin: string
}

export default registerAs("app", (): AppConfig => ({
    port: parseInt(process.env.PORT ?? "3000", 10),
    frontendOrigin: process.env.FRONTEND_ORIGIN ?? "http://localhost:3001",
}))
