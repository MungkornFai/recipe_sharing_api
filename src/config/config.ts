export const config = {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "your_secret_key",
    databaseUrl: process.env.DATABASE_URL || "your_database_url",
}