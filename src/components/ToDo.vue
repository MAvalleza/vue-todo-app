<template>
  <div class="todoPage">
    
<!--To-Do List -->

  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>

      <!--To Do List Toolbar -->
        <v-toolbar color="#1334a0"  dark>
          <v-btn icon v-if="deleteTask" v-on:click ="deleteTask=false">
              <v-icon >fa-arrow-left</v-icon>
          </v-btn>

          <v-toolbar-title v-if="!deleteTask">TO-DO LIST</v-toolbar-title>
          <v-toolbar-title v-else >Click the tasks to remove them</v-toolbar-title>
          <v-spacer></v-spacer>

          <v-btn icon v-if="!deleteTask" v-on:click="addWindow = true, openWindow = true">
              <v-icon >fa-plus</v-icon>
          </v-btn>

          <v-btn icon v-if="!deleteTask" v-on:click="deleteTask = true">
              <v-icon >fa-trash-alt</v-icon>
          </v-btn>

        </v-toolbar>

      <!--To Do List Items-->
        <v-list v-if="undoneCount==0">  <!--If there are no undone items -->
            There are no available tasks
        </v-list>

        <v-list two-line v-else-if="undoneCount>0" >
            
          <template v-for="(task, index) in tasks" >
            <v-list-tile v-if ="!task.completed" :key="task.title" ripple
              @click="toggle(index)"
              v-on:mouseover="editMouseOver(task)"
              v-on:mouseleave="editMouseLeave(task)">

            <v-list-tile-action v-if="!deleteTask" v-on:click ="statusTask(index)" >
              <v-icon >far fa-square</v-icon>
            </v-list-tile-action>


            <v-list-tile-action v-else>
              <v-icon v-on:click="removeTask(index)">far fa-times-circle</v-icon>
            </v-list-tile-action>

              <v-list-tile-content >
                <v-list-tile-title>{{ task.title }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ task.desc }}</v-list-tile-sub-title>
               
              </v-list-tile-content>

            <v-list-tile-action>
                 <v-list-tile-sub-title>{{ task.deadline }}</v-list-tile-sub-title>
                <v-btn icon v-if="task.showEdit && !deleteTask" 
                      v-on:click="getTaskDetails(task,index)">
                    <v-icon>fa-pen</v-icon>
                </v-btn>
            </v-list-tile-action>
            

            </v-list-tile>
            <v-divider
              v-if="index + 1 < tasks.length"
              :key="index"
            ></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>


<!--Add and Edit Dialog Form
        addWindow indicates that user is in Create a Task
        updateWindow indicates that user is in Edit A Task  -->

  <v-layout row justify-center>
      <v-dialog v-model="openWindow" persistent max-width="600px">
        <v-card>
          <v-card-title v-if="addWindow" class="blue darken-4">
            <h2 class="headline headerText" >Create A Task</h2>
          </v-card-title>
          <v-card-title v-else-if="updateWindow" class="purple darken-2">
            <h2 class="headline headerText" >Edit A Task</h2>
          </v-card-title>


          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-if="addWindow" v-model="newTask.title" 
                      v-validate ="'required'" data-vv-name="title"
                      :error-messages="errors.collect('name')"
                      label="What is the task?*"
                      ></v-text-field>
                  

                   <v-text-field v-else-if="updateWindow" v-model="selectedTask.title"
                      v-validate ="'required'" data-vv-name="title"
                      label="What is the task?*"></v-text-field>
                    
                    <p v-if="errors.has('title')">{{ errors.first('title')}}</p>
                </v-flex>

                <v-flex xs12>

              <!-- Date Picker -->

                <!-- Picker for Add Task -->
                  <v-dialog v-if="addWindow" ref="dialog" v-model="dateModal"
                      :return-value.sync="date" persistent lazy full-width width="290px">
                      <template v-slot:activator="{ on }">
                        <v-text-field v-model="date" label="Click to set deadline*"
                          prepend-icon="event" readonly v-on="on"></v-text-field>
                      </template>
                      <v-date-picker v-model="date" color="blue darken-4" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="dateModal = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                      </v-date-picker>
                  </v-dialog>

              <!--Picker for Edit Task -->
                   <v-dialog v-else-if="updateWindow" ref="dialog" v-model="dateModal"
                      :return-value.sync="selectedTask.deadline" persistent lazy
                      full-width width="290px">
                      <template v-slot:activator="{ on }">
                        <v-text-field v-model="selectedTask.deadline" label="Click to set deadline*"
                          prepend-icon="event" readonly v-on="on"></v-text-field>
                      </template>
                      <v-date-picker v-model="selectedTask.deadline" color="purple darken-2" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="dateModal = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.dialog.save(selectedTask.deadline)">OK</v-btn>
                      </v-date-picker>
                  </v-dialog>

                </v-flex>

                <v-flex xs12>
                  <v-textarea v-if="addWindow" v-model="newTask.desc" label="Description"
                      maxlength="120" single-line></v-textarea>
                  <v-textarea v-else-if="updateWindow" v-model="selectedTask.desc" label="Description"
                      maxlength="120" single-line></v-textarea>
                </v-flex>
               
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" outline @click="closeWindows">CLOSE</v-btn>
            <v-btn v-if = "addWindow" color="blue darken-4" dark @click="addTask">ADD</v-btn>
            <v-btn v-else-if = "updateWindow" color="purple darken-2" dark @click="updateTask">UPDATE</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
   </v-layout>
  </div>
</template>


<script>
  export default {

    computed: {
      tasks(){ // calls from central store
        return this.$store.state.tasks;
      },
      undoneCount(){  // undone tasks counter
        return this.$store.getters.undoneCounter;
      }
    },

    data (){
      return{
        selected: [2],
        newTask: { title: '', deadline: '', desc: '', showEdit: false, completed: false},
        selectedTask: { title: '', deadline: '', desc: '', taskIndex:''},
        date: new Date().toISOString().substr(0,10),
        dateModal: false, // is date modal open
        deleteTask: false, // on delete mode
        openWindow: false, // is it add or edit modal
        addWindow: false, // is add modal open
        updateWindow: false, // is edit modal open
      }
    },

    methods: {
      toggle (index) {
        const i = this.selected.indexOf(index)

        if (i > -1) {
          this.selected.splice(i, 1)
        } else {
          this.selected.push(index)
        }
      },

// Mouse Hovering over an Item
      editMouseOver(task){
        task.showEdit = true;
      },
// Mouse Leaving Hover
      editMouseLeave(task){
        task.showEdit = false;
      },

// Close all Modals
      closeWindows(){
        this.openWindow = false;
        this.addWindow = false;
        this.updateWindow = false; 
      },

// Add A New Task
      addTask(){
        this.$validator.validateAll().then((result) => {
          if(result){
            let taskDetails = {
                title: this.newTask.title,
                deadline: this.date,
                desc: this.newTask.desc,
                showEdit: false,
                completed: false,
            }

            this.$store.dispatch('addTask', taskDetails);
            this.newTask.title =''; this.newTask.deadline ='';
            this.newTask.desc ='';
            this.closeWindows();
          }
        })
      },

// Remove A Task
      removeTask(index){
        this.$store.dispatch('removeTask', index);
      },

// Get Details of Selected Item
      getTaskDetails(task,index){
        this.selectedTask.title = task.title;
        this.selectedTask.deadline = task.deadline;
        this.selectedTask.desc = task.desc;
        this.selectedTask.taskIndex = index;
        this.updateWindow = true; this.openWindow = true;
      },
// Update Details of Selected Item
      updateTask(){
        this.$store.dispatch('updateTask', this.selectedTask);
        this.closeWindows();
      },

// Check mark task
      statusTask(index){
        this.$store.dispatch('statusTask', index);
      }
    }
  }

</script>
<style>

.todoPage{
  font-family: 'Montserrat';
}

.headerText{
   font-family: 'Montserrat';
  color: white;
}
</style>
