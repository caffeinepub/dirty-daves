import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactSubmission {
    name: string;
    email: string;
    phoneCountryCallingCode: string;
    message: string;
    timestamp: bigint;
    phoneNumber: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllContactSubmissions(): Promise<Array<ContactSubmission>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getDeploymentInfo(): Promise<{
        canisterTime: bigint;
    }>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    resetBootstrap(): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    /**
     * / Allows first admin to bootstrap system via self-assign when
     * / no admin has been set yet (firstAdminBootstrapped == false).
     * /
     * / After first admin has been assigned, all further
     * / assignments require the caller to be an existing admin.
     * /
     * / Bootstrap check: Uses a persistent flag 'firstAdminBootstrapped'
     * / to determine if the system has been initialized with an admin.
     */
    setMeAsAdmin(): Promise<void>;
    submitContactForm(name: string, email: string, phoneCountry: string, phoneNumber: string, message: string, _honeypot: string, _elapsedTime: number): Promise<string>;
    testConnection(): Promise<string>;
}
