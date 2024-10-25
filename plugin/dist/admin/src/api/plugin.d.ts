export type Speciality = {
    id: number;
    name: string;
    activity: boolean;
    documentId: string;
    tasks: Task[];
};
type Task = {
    id: number;
    documentId: string;
    activity: boolean;
    name: string;
    taskText: string;
};
type DataSpeciality = {
    data: Speciality[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
};
export declare function getSpecialities(): Promise<DataSpeciality>;
export declare function addUUID(speciality: string): Promise<any>;
export declare function getUUID(documentId: string): Promise<any>;
export {};
