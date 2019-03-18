<template>
  <div class="checkedList">
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>

        <!-- Toolbar -->

        <v-toolbar color="#1b894b" dark>
          <v-btn icon v-if="deleteTask" v-on:click ="deleteTask=false">
              <v-icon >fa-arrow-left</v-icon>
          </v-btn>

          <v-toolbar-title v-if="!deleteTask">ACCOMPLISHED TASKS</v-toolbar-title>
          <v-toolbar-title v-else >Click the tasks to remove them</v-toolbar-title>
          <v-spacer></v-spacer>

          <v-btn icon v-if="!deleteTask" v-on:click="deleteTask = true">
              <v-icon >fa-trash-alt</v-icon>
          </v-btn>

        </v-toolbar>

        <v-list v-if="doneCount==0">
            There are no accomplished tasks
        </v-list>

        <!-- Listing of Accomplished Tasks-->

        <v-list two-line v-else-if="doneCount>0">
          <template v-for="(task, index) in tasks" >
            <v-list-tile v-if="task.completed" :key="task.title" ripple @click="toggle(index)">

                <v-list-tile-action v-if="!deleteTask" v-on:click="statusTask(index)">
                    <v-icon >far fa-check-square</v-icon>
                </v-list-tile-action>

                <v-list-tile-action v-else>
                    <v-icon v-on:click="removeTask(index)">far fa-times-circle</v-icon>
                </v-list-tile-action>

                <v-list-tile-content >
                    <v-list-tile-title>{{ task.title }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{ task.desc }}</v-list-tile-sub-title>
                </v-list-tile-content>

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

  </div>
</template>


<script>
  export default {

    computed: {
      tasks(){
        return this.$store.state.tasks;
      },
      doneCount(){
        return this.$store.getters.doneCounter;
      }
    },

    data (){
      return{
        selected: [2],
        deleteTask: false, // is in delete mode
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

    // Remove Task
      removeTask(index){
        this.$store.dispatch('removeTask', index);
      },
    // Uncheck Task
      statusTask(index){
        this.$store.dispatch('statusTask', index);
      }
    }
  }

</script>

<style>

.checkedList{
     font-family: 'Montserrat';
}

</style>
