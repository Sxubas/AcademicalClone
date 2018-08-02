<template>
  <div class="result-container" @click="addLocalClass" @mouseover="hoverLocalClass" @mouseleave="unhoverLocalClass">
    <div class="top-info">
      <div>{{result.class + ' ' + result.course}}-{{result.section}}</div>
      <div>cupos: {{result.cupos ? result.cupos : "No disponible :("}} </div>
      <div>NRC: {{result.nrc}}</div>
    </div>
    <div class="title">{{title}}</div>
    <div class="bottom-container">
      <div class="instructor-container">
        <div v-if="result.instructors.length > 0" class="instructor">Instructores:</div>
        <div v-else class="instructor">Instructores por asignar</div>
        <div 
          v-for="instructor in result.instructors"
          :key="instructor.name"
          class="instructor"
        >
        {{instructor.name.toLowerCase()}}
        </div>
      </div>
      <div v-if="result.cycle != '1'" class="icon-container">
        <i 
          v-tooltip="'Curso de 8 semanas'"
          class="material-icons">alarm</i>
        <i 
          v-if="result.cycle === '8A'"
          v-tooltip="'Primer ciclo del semestre'"
          class="material-icons">filter_1</i>
        <i 
          v-if="result.cycle === '8B'"
          v-tooltip="'Segundo ciclo del semestre'"
          class="material-icons">filter_2</i>
      </div>
    </div>    
  </div>
</template>

<script>
export default {
  props:[
    'result',
    'addClass',
    'hoverClass',
    'unhoverClass'
  ],
  methods: {
    addLocalClass(){
      this.addClass(this.result);
    },
    hoverLocalClass(){
      this.hoverClass(this.result);
    },
    unhoverLocalClass(){
      this.unhoverClass();
    }
  },
  computed: {
    title(){
      return this.result.title.toLowerCase();
    },
    CRNStyle(){
      return{
        'user-select': 'all',
        '-moz-user-select': 'all',
        '-khtml-user-select': 'all',
        '-webkit-user-select': 'all',
        '-o-user-select': 'all'
      }
    }
  }
}
</script>

<style scoped>

.result-container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 80px;
  border-top: 1px whitesmoke solid;
  border-bottom: 2px whitesmoke solid;
  padding: 2px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;
}

.result-container:hover{
  background-color: rgb(94, 165, 228);
}

.result-container:active{
  background-color: rgb(74, 158, 231);
}

.top-info{
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 0.8rem;
  padding: 4px;
}

.title{
  margin: 6px 0px;
}

.bottom-container{
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.instructor{
  font-size: 0.8rem;
  text-align: left;
}

.icon-container{
  position: sticky;
  bottom: 0;
  right: 0;
}

</style>
