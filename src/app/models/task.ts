export interface Task {
    id?: string | number;
    title: string;
    dueDate: Date | string;
    priority: 'low' | 'medium'| 'high';
    description?: string;
}
