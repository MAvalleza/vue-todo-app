import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        tasks: [], 
    },

    mutations: {
    
        // Initialize through Local Storage
        initializeStore(state){
            if(localStorage.getItem('store')){
                this.replaceState(
                    Object.assign(state ,JSON.parse(localStorage.getItem('store')))
                );
            }
        },
        
        // Push to Tasks Array
        addTask: (state, payload) =>{
            state.tasks.push(payload);
        },
        
        // Remove from Tasks Array
        removeTask: (state, payload) => {
                state.tasks.splice(payload,1);
        },

        // Update Element
        updateTask: (state, updatedTask)=>{
            for(var key in state.tasks){
                if(key == updatedTask.taskIndex){
                    state.tasks[key].title = updatedTask.title;
                    state.tasks[key].deadline = updatedTask.deadline;
                    state.tasks[key].desc= updatedTask.desc;
                    break;
                }
            }    
        },

        // Check or Uncheck
        statusTask: (state, payload)  =>{
            state.tasks[payload].completed = !state.tasks[payload].completed
        }
        
    },

    actions: {
        addTask: (context, payload) =>{
            context.commit('addTask', payload);
        },

        removeTask: (context, payload) =>{
            context.commit('removeTask', payload);
                
        },
        updateTask: (context, updatedTask) =>{
            context.commit('updateTask', updatedTask);
         
        },

        statusTask: (context, payload) =>{
            context.commit('statusTask', payload)
        }
    },

    getters: {
        undoneCounter: state => {
            var counter = 0;
            for(var key in state.tasks){
                if(state.tasks[key].completed == false){
                    counter++;
                }
            }
            return counter;
        },
        doneCounter: state=>{
            var counter = 0;
            for(var key in state.tasks){
                if(state.tasks[key].completed == true){
                    counter++;
                }
            }
            return counter;
        }
    }

})

// Changes will be reflected in local storage
store.subscribe((mutation, state) =>{
    localStorage.setItem('store', JSON.stringify(state));
});