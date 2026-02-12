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
    id: string;
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
    bootstrapAdminWithCredentials(userName: string, password: string): Promise<void>;
    getAllContactSubmissions(): Promise<Array<ContactSubmission>>;
    getAllContactSubmissionsJunk(): Promise<Array<ContactSubmission>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    incrementSystemUserCounter(userName: string, password: string): Promise<bigint>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitContactForm(name: string, email: string, phoneCountry: string, phoneNumber: string, message: string, honeypot: string, elapsedTime: number): Promise<string>;
    testConnection(): Promise<string>;
}
