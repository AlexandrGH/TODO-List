const App = {
    data() {
        return {
            inputValue:'',
            taskList:['Задача 1'],
            completedTaskList:[],
        };
    },
    methods: {
        deleteTask(index, list){
            if (list == 'todo') {
                this.taskList.splice(index,1)
            }
            else{
                this.completedTaskList.splice(index,1)
            }
        },
        getInput(element){
            this.inputValue = element.target.value 
        },
        addNewTask() {
            if (this.inputValue.length > 0) {
                this.taskList.push(this.inputValue)
                this.inputValue = ''
            }
        },
        moveTask(index, list){
            if (list == 'todo') {
                const task = this.taskList.splice(index,1)
                this.completedTaskList.push(...task)
            }
            else{
                const task = this.completedTaskList.splice(index,1)
                this.taskList.push(...task)
            }
        }, 
    },
    mounted() {
        if (localStorage.inputValue){
            this.inputValue = localStorage.inputValue
        }
        if (localStorage.getItem('taskList')) {
            try {
                this.taskList = JSON.parse(localStorage.getItem('taskList'));
            } catch (e) {
                localStorage.removeItem('taskList');
            }
        }
        if (localStorage.getItem('completedTaskList')) {
            try {
                this.completedTaskList = JSON.parse(localStorage.getItem('completedTaskList'));
            } catch (e) {
                localStorage.removeItem('completedTaskList');
            }
        }
    },
    watch: {
        inputValue(task){
            localStorage.inputValue = task;
        },
        taskList: {
            handler(val, oldVal){
                const parsed = JSON.stringify(this.taskList);
                localStorage.setItem('taskList', parsed);
            },
            deep:true
        },
        completedTaskList: {
            handler(val, oldVal){
                const parsed = JSON.stringify(this.completedTaskList);
                localStorage.setItem('completedTaskList', parsed);
            },
            deep:true
        },
    },
}

Vue.createApp(App).mount('#app')