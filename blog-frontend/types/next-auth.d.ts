// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            name?: string | null;
            email?: string | null;
            image?: string | null;
            role?: string; // 👈 thêm dòng này
        };
    }

    interface User {
        role?: string;
    }
}
