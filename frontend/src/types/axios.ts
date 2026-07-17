import { ProjectListData } from "./models/project";

export type BackendApiClient = {
    get<T>(url: string, config?: any): Promise<T>;
    post<T>(url: string, data?: any, config?: any): Promise<T>;
    put<T>(url: string, data?: any, config?: any): Promise<T>;
    patch<T>(url: string, data?: any, config?: any): Promise<T>;
    delete<T>(url: string, config?: any): Promise<T>;
}

// Project Types for API

export type ProjectSuccess<T> = {
    success: true,
    data: T
};

export type ProjectFailure = {
    success: false,
    message: string,
    details: any
};

export type ProjectList = ProjectSuccess<ProjectListData>