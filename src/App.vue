<template>
  <div id="app">
    <Schedule 
			:time-ground="['09:00', '18:00']" 
			:week-ground="['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']" 
			:task-detail="[
				[
					{
						dateStart: '09:30',
						dateEnd: '10:30',
						title: 'Metting',
						detail: 'Metting (German: Mettingen) is a commune in the Moselle department in Grand Est in north-eastern France.',
            detail
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
</template>

<script>

import courses from './../courses';

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
