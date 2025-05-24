/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Component, useState, onWillStart } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
export class OwlTodoList extends Component{
    static template = "todolist.TodoList"
    setup(){
        this.orm = useService("orm");
        this.model = "todolist";
        this.state = useState({
            modalTitle: "",
            task: this.defaultTask,
            taskList: [],
            isEdit: false,
            activeId: false,
        })
        onWillStart(async () => {
            await this.getAllTasks()
        });
    }
    get defaultTask(){
        return {name: "", color: "#FF000000", completed: false}
    }
    
    async getAllTasks(){
        this.state.taskList = await this.orm.searchRead(this.model, [], ["name", "color", "completed"])
    }

    addTask(){
        this.state.task = this.defaultTask
        this.state.activeId = false
        this.state.isEdit = false
        this.state.modalTitle = "New Task"
    }

    editTask(task){
        this.state.modalTitle = "Edit Task " + task.name;
        this.state.task = {...task}
        this.state.activeId = task.id
        this.state.isEdit = true
    }

    async deleteTask(taskId){
        await this.orm.unlink(this.model, [taskId])
        this.getAllTasks()
    }

    async saveTask(){
        if( !this.state.isEdit ){
            this.orm.create(this.model, [this.state.task])
        } else {
            this.orm.write(this.model, [this.state.activeId], this.state.task)
        }
        this.getAllTasks()
    }
}

registry.category('actions').add('todo-list.owl_todolist', OwlTodoList)