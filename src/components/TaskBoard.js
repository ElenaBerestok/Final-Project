import { Form } from "./Form";
import {taskConfig} from './formConfig';
import { Input } from "./Input";
import { api } from "./API";
import { Task } from "./Task";

const getTaskForm = (onTaskCreated) => new Form({
    title: 'Add task',
    inputs: taskConfig.map((input) => new Input(input)),
    submitBtnText: "Add",
    onSubmit: async (data) => {
        const createTask = await api.createTask(data);
        onTaskCreated(createTask)
    }
})

export class TaskBoard{
    constructor ({
        appContainer
    }){
        this.appContainer = appContainer;
        this.taskForm = getTaskForm(this.addTask.bind(this));
        this.tasksContainer = document.createElement('div');
    }

    renderLayout() {
        const board = document.createElement("div");
        const formContainer = document.createElement("div");

        board.classList.add("board");
        formContainer.classList.add("task-form");
        // this.tasksContainer.classList.add("task-card");

        board.append(formContainer, this.tasksContainer);
        this.taskForm.render(formContainer);

        this.appContainer.append(board)
    }

    addTask(taskData) {
        const task = new Task(taskData)

        task.renderCard(this.tasksContainer)
    }

    logout () {
        this.tasksContainer.innerHTML = '';
    }
}