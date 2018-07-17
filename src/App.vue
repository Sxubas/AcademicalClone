<template>
  <div id="app">
    <AcademicalBanner />
    <div id='container'>
      <AcademicalSidebar />
      <div id='scheduleContainer'>
        <Schedule
          :time-ground="['06:30', '20:00']" 
          :week-ground="['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']" 
          :task-detail="[
            [
              {
                dateStart: '09:30',
                dateEnd: '11:30',
                title: 'Metting',
                detail: 'Metting (German: Mettingen) is a commune in the Moselle department in Grand Est in north-eastern France.'
              },
              {
                dateStart: '11:30',
                dateEnd: '13:50',
                title: 'Metting',
                detail: 'Metting (German: Mettingen) is a commune in the Moselle department in Grand Est in north-eastern France.'
              }
              
            ],
            [
              {
                dateStart: '10:30',
                dateEnd: '12:00',
                title: 'Metting',
              },
              {
                dateStart: '12:30',
                dateEnd: '14:50',
                title: 'Metting',
              }
              
            ],
            [
              {
                dateStart: '12:30',
                dateEnd: '13:30',
                title: 'Metting',
              },
              {
                dateStart: '15:30',
                dateEnd: '16:50',
                title: 'Metting',
              }
              
            ],
            [
              {
                dateStart: '09:50',
                dateEnd: '10:50',
                title: 'Metting',
              },
              {
                dateStart: '11:30',
                dateEnd: '13:50',
                title: 'Metting',
              }
              
            ],
            [
              {
                dateStart: '12:30',
                dateEnd: '13:30',
                title: 'Metting',
              },
              {
                dateStart: '14:30',
                dateEnd: '15:50',
                title: 'Metting',
              }
              
            ]
          ]">
        </Schedule>
      </div>
    </div>
  </div>
</template>

<script>
import AcademicalSidebar from './components/Sidebar';
import AcademicalBanner from './components/Banner';

export default {
  name: 'app',
  components:{
    AcademicalBanner,
    AcademicalSidebar
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
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

#scheduleContainer{
  width: 100%;
  margin-left: 10%;
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

ul {
  list-style-type: none;
  padding: 0;
}

a {
  color: #42b983;
}
</style>
