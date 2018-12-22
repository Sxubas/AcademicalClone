<template>
  <div id="app">
    <div v-if="loading" class="loading-container">
      <h2 class="loading-title">Cargando...</h2>
      <BounceLoader :loading="loading" color="#3493E7"/>
      <h4 class="loading-text">
        Estamos verificando los cupos disponibles de los cursos <br>
        Esto puede tomar varios segundos <br>
        Gracias por su paciencia! <br>
        <academical-note>Después de terminar, se ejecutará en segundo plano para seguir actualizando los cupos</academical-note>
      </h4>
    </div>
    <div v-else>
      <AcademicalBanner />
      <div id='container'>
        <AcademicalSidebar
          :addClass="addClass"
          :hoverClass="hoverClass"
          :unhoverClass="unhoverClass"
          :magistralClass="magistralClass"
          :registeringCompl="registeringCompl"
          :isCompl="isCompl"
          :cancelCompl="cancelCompl"
          :showing8A="showing8A"
          :showA="showA"
          :showB="showB"
          />
        <div class='schedule-container'>
          <CustomSchedule
            :timeGround="[6, 21]"
            :weekGround="['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']"
            :taskDetail="schedule"
            :hoveredClassSchedules="convertBannerToSchedules(hoveredClass)"
            :removeClass="removeClass"
            />
        </div>
      </div>
      <flash-message class="flash-message"/>
    </div>
    <AcademicalModalMessage v-if="showMessage && !loading" :show="showMessage" @close="showMessage = false"/>
  </div>
</template>

<script>
import AcademicalSidebar from './components/Sidebar';
import AcademicalBanner from './components/Banner';
import CustomSchedule from './components/CustomSchedule';
import AcademicalModalMessage from './components/ModalMessage';

import BounceLoader from 'vue-spinner/src/PulseLoader.vue';

import courses from './../data/courses.json';
import courses8A from './../data/courses8A.json';
import courses8B from './../data/courses8B.json';
import coursesMED from './../data/coursesMED.json';

const jsonDays = ["L", "M", "I", "J", "V", "S", "D"];
const WELCOME_MESSAGE = 'holidays';

let timeout = undefined;

export default {
  name: 'app',
  components:{
    AcademicalBanner,
    AcademicalSidebar,
    CustomSchedule,
    BounceLoader,
    AcademicalModalMessage
  },
  data () {
    return {
      classes: [],
      hoveredClass: undefined,
      schedule_:[],
      registeringCompl: false,
      magistralClass: {},
      isCompl: false,
      showing8A: true,
      loading: true,
      showMessage: true
    }
  },
  computed: {
    schedule(){
      let schedule = [
        [],[],[],[],[],[] //Models days from monday to saturday
      ]
      for(const class_ of this.classes){
        if((class_.cycle === '8A' && this.showing8A) || (class_.cycle === '8B' && !this.showing8A) || class_.cycle === "1" || class_.cycle === "3"){
          for(const classSchedule of class_.schedules){
            for(const day of jsonDays){
              if(classSchedule[day]){
                const index = jsonDays.indexOf(day);
                schedule[index].push({
                  dateStart: this.convertToDate(classSchedule.time_ini),
                  dateEnd: this.convertToDate(classSchedule.time_fin),
                  title: this.convertTitle(class_.title),
                  detail: this.generateDetail(class_),
                  nrc: class_.nrc,
                  classroom: classSchedule.classroom.slice(1)
                })
              }
            }
          }
        }
      }
      this.schedule_ = schedule;
      return schedule;
    }
  },
  methods: {
    addClass(_class){

      window.onbeforeunload = () => "Los horarios no se guardan, refrescar borra todas las materias planeadas"

      const conflicts = this.checkConflicts(_class);
      if (conflicts.length > 0)
      {
        let conflictsStr = ''
        for(const conflict of conflicts){
          conflictsStr += '<br>' + conflict.title + ' [' + conflict.day + ']'
        }
        this.flash('No se puede agregar la clase "' + _class.title.toLowerCase() + '" porque entra en conflicto con: ' + conflictsStr, 'error', {
          important: false,
          timeout: 4000,
          pauseOnInteract: true
        });
      }
      else
      {
        this.checkEmpty(_class);
        if(_class.compl.length > 0 || _class.mag.length > 0){
          if(_class.mag.length > 0){
            this.isCompl = true;
          }
          this.magistralClass = _class;
          this.registeringCompl = true;
        }
        else if(this.registeringCompl){
          this.classes.push(this.magistralClass, _class);
          this.magistralClass = {};
          this.registeringCompl = false;
          if(this.isCompl)
            this.isCompl = false;
        }
        else{
          this.classes.push(_class)
          //Alert class successfully created
          this.flash('Clase "' + _class.title.toLowerCase()  + '" añadida correctamente', 'success', {
            important: true,
            timeout: 3300,
            pauseOnInteract: true
          })
          //alert('Bien!')
        }
      }
    },
    checkEmpty(_class){
      if(_class.cupos){
        if(_class.cupos <= 0){
          this.flash('La clase que añadió NO tiene cupos disponibles', 'error', {
            important: true,
            timeout: 5500,
            pauseOnInteract: true
          })
        }
      }
    },
    checkConflicts(_class){
      let conflicts = []
      for(const schedule of _class.schedules){
        for(const day of jsonDays){
          if(schedule[day]){
            const conflict = this.checkConflict(schedule, day)
            if(conflict){
              conflicts.push(conflict)
            }
          }
        }
      }
      return conflicts;
    },
    checkConflict(schedule, day){ //Returns the plannedSchedule object which the parameter schedule conflicts with.
      const dayIndex = jsonDays.indexOf(day)
      for(const plannedSchedule of this.schedule_[dayIndex]){
        const startA = parseInt(plannedSchedule.dateStart.split(':').join('')) //Remove : from 'HH:MM'
        const endA = parseInt(plannedSchedule.dateEnd.split(':').join(''))
        const startB = parseInt(schedule.time_ini)
        const endB = parseInt(schedule.time_fin)
        //There is a conflict if
        if(startA >= startB && startA < endB){ //The start date of A is between the start and end of B
          return plannedSchedule;
        }
        else if(startB >= startA && endA > startB){ //The end date of A is after the start of B
          return plannedSchedule;
        }
        else{ //No conflict
          //Makia
        }
      }
      return undefined;
    },
    convertToDate(intSrting){
      return intSrting.substring(0,2) + ':' + intSrting.substring(2,4)
    },
    convertTitle(classTitle){
      return classTitle.toLowerCase();
    },
    generateDetail(class_){
      return class_.title;
    },
    hoverClass(_class){
      const conflicts = this.checkConflicts(_class);
      _class.conflicts = conflicts;
      this.hoveredClass = _class;
    },
    unhoverClass(){
      this.hoveredClass = undefined;
    },
    convertBannerToSchedules(_class){
      if(!_class)
        return []; //Return empty array when null object is passed
      let schedules = [
        [],[],[],[],[],[] //Models days from monday to saturday
      ]
      const classArray = [_class];
      if(this.registeringCompl){
        classArray.push(this.magistralClass)
      }
      for(const _class_ of classArray){
        for(const classSchedule of _class_.schedules){
          let classRoom= classSchedule.classroom;
          for(const day of jsonDays){
            if(classSchedule[day]){

              let isDuplicated = false;

              //Store in variables to avoid calling parsing multiple times
              const newDateStart = this.convertToDate(classSchedule.time_ini);
              const newDateEnd = this.convertToDate(classSchedule.time_fin);
              const newTitle = this.convertTitle(_class_.title);
              const newDetail = this.generateDetail(_class_);

              const index = jsonDays.indexOf(day);

              for(const schedule of schedules[index]){
                if(
                  newDateStart === schedule.dateStart &&
                  newDateEnd === schedule.dateEnd &&
                  newTitle === schedule.title &&
                  newDetail === schedule.detail
                  ){
                  isDuplicated = true;
                  break;
                }
              }

              if(!isDuplicated){
                schedules[index].push({
                  dateStart: this.convertToDate(classSchedule.time_ini),
                  dateEnd: this.convertToDate(classSchedule.time_fin),
                  title: this.convertTitle(_class_.title),
                  detail: this.generateDetail(_class_),
                  classroom: classRoom.slice(1)
                });
              }
            }
          }
        }
      }

      schedules.conflicts = _class.conflicts;
      return schedules;
    },
    cancelCompl(){
      this.registeringCompl = false;
      this.magistralClass = {};
      this.isCompl = false;
    },
    showA(){
      this.showing8A = true;
    },
    showB(){
      this.showing8A = false;
    },
    removeClass(class_){
      for(const _class of this.classes){
        if(_class.nrc === class_.nrc){
          const index = this.classes.indexOf(_class);
          this.classes.splice(index, 1)
          this.flash('Clase "' + class_.title.toLowerCase() + '" removida correctamente', 'success', {
            important: true,
            timeout: 4400
          })
        }
      }
    },
    checkEmptyCourses(){

      const benchmark = (new Date()).getTime();

      const url = "https://cuposuniandes.herokuapp.com/";
      fetch(url, { mode: 'cors' }).then( response => {
        if(response.status === 500)
        {
          console.log(response);
          this.loading = false;
          this.flash('Hubo un error actualizando los cupos disponibles de los cursos', 'error', {
            important : true,
            timeout: 5500,
            pauseOnInteract: true
          });
        }
        response.json().then( jsonResponse => {
          jsonResponse["records"].forEach( element => {
            let found = false;

            for(let course of courses.records){
              if(course.nrc === element.nrc){
                course.cupos = element.empty;
                found = true;
                break;
              }
            }

            if(!found)
              for(let course of courses8A.records){
                if(course.nrc === element.nrc){
                  course.cupos = element.empty;
                  break;
                }
              }
            if(!found)
              for(let course of courses8B.records){
                if(course.nrc === element.nrc){
                  course.cupos = element.empty;
                  break;
                }
              }
            
            if(!found)
              for(let course of coursesMED.records){
                if(course.nrc === element.nrc){
                  course.cupos = element.empty;
                  break;
                }
              }

          });
          console.log('finished in ' + ( (new Date()).getTime() - benchmark ) + 'ms');
          this.loading = false;
          this.flash('Cupos actualizados correctamente', 'info', {
            important: true,
            timeout: 5500,
            pauseOnInteract: true
          });
        });
      })
      .catch(error => {
        console.log(error)
        this.loading = false;
        this.flash('Hubo un error actualizando los cupos disponibles de los cursos', 'error', {
            important : true,
            timeout: 5500,
            pauseOnInteract: true
          });
      });
    }
  },
  mounted(){
    // this.checkEmptyCourses(); not longer supported
    let lastMessage = window.localStorage.getItem('AcademicalWelcomeMessage');

    //Only show when prior message was not shown or last message differs from the current one
    if(!lastMessage || lastMessage !== WELCOME_MESSAGE){
      this.showMessage = true;
      window.localStorage.setItem('AcademicalWelcomeMessage', WELCOME_MESSAGE);
    }
    else{
      this.showMessage = false;
    }

    this.loading = false;
  },
  destroyed(){
    clearInterval(timeout);
  }
}
</script>

<style>

.loading-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  font-size: 1.5rem;
  color: #4286f4;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.loading-title{

}

.loading-text{
  
}

body{
  margin: 0px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100vw;
}
#container{
  display: flex;
  flex-direction: row;
}
.schedule-container{
  width: 100%;
  height: 900px;
  font-size: 10px;
  overflow-y: scroll;
}
.schedule{
  max-width: 2000;
}
html{
  overflow-x: hidden;
  overflow-y: hidden;
  padding: 0;
}
h1, h2 {
  font-weight: normal;
}
span{
  padding-top: 35px;
}
ul {
  list-style-type: none;
  padding: 0;
}

.flash-message{
  position: fixed;
  bottom: 5vh;
  right: 5vh;
  z-index: 10;
}

/* tooltip styling */

.tooltip {
  display: block !important;
  z-index: 10000;
}

.tooltip .tooltip-inner {
  background: rgb(255, 208, 0);
  color: black;
  font-size: 0.9rem;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  border-radius: 16px;
  padding: 3px 6px 2px;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: rgb(255, 208, 0);
  z-index: 1;
}

.tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}

.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="bottom"] {
  margin-top: 5px;
}

.tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="right"] {
  margin-left: 5px;
}

.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[x-placement^="left"] {
  margin-right: 5px;
}

.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip.popover .popover-inner {
  background: #f9f9f9;
  color: black;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(black, .1);
}

.tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}

.tooltip[aria-hidden='true'] {
  visibility: hidden;
  opacity: 0;
  transition: opacity .15s, visibility .15s;
}

.tooltip[aria-hidden='false'] {
  visibility: visible;
  opacity: 1;
  transition: opacity .15s ease-in-out;
}

academical-note{
  font-size: 0.78rem;
  color: gray;
}
</style>
