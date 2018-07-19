<template>
  <div id="app">
    <AcademicalBanner />
    <div id='container'>
      <AcademicalSidebar 
        :addClass="addClass"
        :hoverClass="hoverClass"
        :unhoverClass="unhoverClass"
        />
      <div class='schedule-container'>
        <CustomSchedule
          :timeGround="[6, 20]" 
          :weekGround="['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']" 
          :taskDetail="schedule"
          :hoveredClassSchedules="convertBannerToSchedules(hoveredClass)"
          />
      </div>
    </div>
  </div>
</template>

<script>
import AcademicalSidebar from './components/Sidebar';
import AcademicalBanner from './components/Banner';
import CustomSchedule from './components/CustomSchedule';
const jsonDays = ["L", "M", "I", "J", "V", "S", "D"];
export default {
  name: 'app',
  components:{
    AcademicalBanner,
    AcademicalSidebar,
    CustomSchedule
  },
  data () {
    return {
      classes: [],
      hoveredClass: undefined,
      schedule_:[]
    }
  },
  computed: {
    schedule(){
      let schedule = [
        [],[],[],[],[],[] //Models days from monday to saturday
      ]
      for(const class_ of this.classes){
        for(const classSchedule of class_.schedules){
          for(const day of jsonDays){
            if(classSchedule[day]){
              const index = jsonDays.indexOf(day)
              schedule[index].push({
                dateStart: this.convertToDate(classSchedule.time_ini),
                dateEnd: this.convertToDate(classSchedule.time_fin),
                title: this.convertTitle(class_.title),
                detail: this.generateDetail(class_)
              })
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
      const conflicts = this.checkConflicts(_class);
      if (conflicts.length > 0)
      {
        alert(conflicts);
        console.log(conflicts)
        //Alert with proper info
      }
      else
      {
        this.classes.push(_class)
        //Alert class successfully created
        alert('Bien!')
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
      console.log('conflicts: ', conflicts);
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
      if(classTitle.length > 31){
        return classTitle.substring(0,30) + '...'
      }else{
        return classTitle
      }
    },
    generateDetail(class_){
      return class_.title;
    },
    hoverClass(_class){
      console.log(_class);
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
      for(const classSchedule of _class.schedules){
        for(const day of jsonDays){
          if(classSchedule[day]){
            const index = jsonDays.indexOf(day)
            schedules[index].push({
              dateStart: this.convertToDate(classSchedule.time_ini),
              dateEnd: this.convertToDate(classSchedule.time_fin),
              title: this.convertTitle(_class.title),
              detail: this.generateDetail(_class)
            });
          }
        }
      }

      schedules.conflicts = _class.conflicts;
      return schedules;
    }
  }
}
</script>

<style>
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
</style>
