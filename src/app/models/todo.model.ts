export class Todo {
    id: string;
    isChecked: boolean;
    name: string;

    constructor() {
        this.id = new Date().toISOString();
    }

}