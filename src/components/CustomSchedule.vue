<template>
<div class="container">
   <div id="background-grid" class="schedule-grid">
        <div v-for="n in totalCells" :key="n" :class="['cell']">{{ textBackgroundCell(calcPositionCell(n)) }}</div>
   </div>
   <div id="courses-grid" class="schedule-grid">
      <div 
        v-for="(course, i) in scheduleArray"
        :key="course.nrc + ' ' + i"
        @click="removeClass(course)"
        class="course-cell"
        :style="coursePosition(course)">
          {{classTitle(course.title)}}
          <p class="classroom">{{course.classroom}}</p>
      </div>
      <div 
        v-for="(hoveredClass, i) in hoveredClassArray"
        class="course-cell"
        :style="[coursePosition(hoveredClass), hoveredStyle(hoveredClass)]"
        :key="hoveredClass.nrc + 'hover'+ i">
          {{hoveredClass.title}}
          <p>{{hoveredClass.classroom}}</p>
      </div>
   </div> 
</div>
</template>

<script>
const jsonDays = ["L", "M", "I", "J", "V", "S", "D"];
export default {
    props:[
    'timeGround',
    'weekGround',
    'taskDetail',
    'hoveredClassSchedules',
    'removeClass'
  ],
  computed: {
      daysWithSpace() {
          let arr=[];
          for(let day in this.weekGround){
              arr.push(this.weekGround[day].substring(0,3));
          }
          return arr;
      },
      hoursCount(){
          return (this.timeGround[1]-this.timeGround[0])*2
      },
      totalCells(){
          return (this.timeGround[1]-this.timeGround[0])*2 * (this.weekGround.length+1)
      },
      scheduleArray(){
          //console.log("holi",this.taskDetail);
          let arr= this.taskDetail;
          let coursesArray=[];
          for (let i = 0; i < arr.length; i++) {
              if(arr[i])
              {
                   for (let j = 0; j < arr[i].length; j++) {
                       arr[i][j].day=jsonDays[i];
                       coursesArray.push(arr[i][j]);
                   }

              }
          }
          //console.log("hola",coursesArray);
          return coursesArray;
      },
      hoveredClassArray(){
          //console.log("holawe",this.hoveredClassSchedules);
          let arr= this.hoveredClassSchedules;
          let coursesArray=[];
          for (let i = 0; i < arr.length; i++) {
              if(arr[i])
              {
                   for (let j = 0; j < arr[i].length; j++) {
                       arr[i][j].day=jsonDays[i];
                       coursesArray.push(arr[i][j]);
                   }

              }
          }
          //console.log("hola",coursesArray);
          return coursesArray;
      }
  },
  methods: {
      colClass(day){
          let x="calc("+(100/this.weekGround.length)+ "% - "+150/this.weekGround.length+"px)"
          return {width: x};
      },
      calcPositionCell(number){
          let col = (number)%(this.weekGround.length+1);
          col = col==0 ? this.weekGround.length+1: col;
          let row= Math.floor(number/(this.weekGround.length+1));
          if(number % (this.weekGround.length+1)==0){
              row--;
          }
          return row + "-" + col;
      },
      textBackgroundCell(strCell){
          let row= strCell.split('-')[0];
          let col= strCell.split('-')[1];
          if(row==0)
          {
            if(col==1) return "";
             return this.weekGround[col-2];
          }
          if(col==1)
          {
              if(row%2==1)
              {
                  let initHour=+this.timeGround[0];
                  let intervalAdd=+((+row-1)/2);
                  let totalSum= initHour+intervalAdd;
                  return totalSum+ ":00";
              }
          }
          return "";
      },
      coursePosition(course){
        if(course){
          let col=-1;
          for(let i=0; i<jsonDays.length; i++){
              if(jsonDays[i]===course.day){
                  col=i+2;
                  //console.log('enc',col);
                  break;
              }
          }
      
          let row= 0;
          let hour= course.dateStart.split(':')[0];
          let minutes= course.dateStart.split(':')[1];
          let despl= (hour-this.timeGround[0])*2;
          row=despl+2;
          let horaInic= course.dateStart.split(':')[0];
          let horaFin= course.dateEnd.split(':')[0];
          let minInic= course.dateStart.split(':')[1];
          let minFin= course.dateEnd.split(':')[1];
          if(minutes==="30")
          {
          row++;
          }
          let duracion= (+horaFin*60 - +horaInic*60)+ +minFin - +minInic;
          //console.log(duracion);
          //console.log(course);
          duracion= (duracion+10)/30;
          //console.log(course.dateStart + " " +course.dateEnd);
          //console.log(duracion);
          return {'grid-column': col, 'grid-row': row + ' / span ' + duracion};
        }
        else
          return {};
      },
      hoveredStyle(hoveredClass){
        if(this.hoveredClassSchedules.conflicts.length > 0){
          return { 'background-color': 'rgba(212,98,98,0.7)', 'transform' : 'translate(5px, 5px)' }
        }
        else{
          return { 'background-color': 'rgba(84,155,226,0.7)' }
        }
      },
      classTitle(title){
        if(title.length > 35)
          return title.substring(0,38) + '...';
        else
          return title;
      }
  },
  mounted(){
      let grid= document.getElementById('background-grid');
      grid.style.gridTemplateColumns="100px repeat("+this.weekGround.length+",1fr)" 
      grid.style.gridTemplateRows="repeat("+this.hoursCount+",1fr)" 

      grid= document.getElementById('courses-grid');
      grid.style.gridTemplateColumns="100px repeat("+this.weekGround.length+",1fr)" 
      grid.style.gridTemplateRows="repeat("+this.hoursCount+",1fr)" 
  }

}
</script>
<style scoped>

.schedule-table{
    border-collapse: collapse;
    width: 100%;
    margin-left: 2px;
    table-layout: fixed;
}

.cell{
    border: 1px solid #dddddd;
    /* width: calc((100% / 6) - (50px / 6)); */
    color:#8b8b8b;
    height: 30px;
    box-sizing: border-box;
}

.first-col{
    box-sizing: border-box;
    width: 50px;
    overflow: hidden;
    border-top: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
}

.first-row{
    box-shadow: 3px 0px 9px #3f3e3e;
}

.currentDay{
    color:#e46411;
}

.week-day{
    color:inherit;
    text-align: left;
    font-size: 0.7rem;
    margin:0;
    height:1rem;
    margin-top:3px;
    margin-left:5px;
}

.week-number{
    color:inherit;
    font-size: 3rem;
    font-weight: 200;
    margin:0;
    height:3rem;
}
.container{
    position:relative;
    height: 100%;
}

.schedule-grid{
    display:grid;
    height:100%;
    width:100%;
}

.course-cell
{
    color:white;
    display:inline-block;
    width: 90%;
    margin: 2px auto;
    max-height: 100%;
    font-size:1rem;
    background-color: #4286f4; 
    text-align: center;
	  border-radius: 10px 10px 10px 10px; 
    transition: background-color 0.15s ease-in-out;
    cursor: pointer;
    user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -o-user-select: none;
}

.course-cell:hover{
  background-color: rgb(255, 110, 110);
}

#courses-grid{
    z-index: 10;
    position:absolute;
    top:0;
    left:0;
}

.course-title{
    margin:0.5rem 0;
    word-break: break-all;
  font-weight: bold;
}

.classroom {
  margin-top: 8px;
  padding: 0;
  font-size: 0.9rem;
  color: white;
}

</style>
