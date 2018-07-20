<template>
  <div class="resultsContainer">
    <div v-for="result in results" :key="result.crn">
      <AcademicalSearchResult 
        :result=result
        :addClass="addClass" 
        :hoverClass="hoverClass"
        :unhoverClass="unhoverClass"/>
    </div>
  </div>
</template>

<script>

import AcademicalSearchResult from './Result';
import courses from '../../../courses';
import courses8A from '../../../courses8A';
import courses8B from '../../../courses8B';

export default {
  components:{
    AcademicalSearchResult
  },
  props:[
    'search',
    'addClass',
    'hoverClass',
    'unhoverClass'
  ],
  computed: {
    results(){
      if(this.search.length < 3)
        return [];

      //16 week courses
      let longCourses = courses.records.filter(course => {

        const inTitle = course.title.toLowerCase().includes(this.search.toLowerCase())
        const inCRN = course.nrc.includes(this.search)

        return inTitle || inCRN
      });
      
      console.log('1', longCourses);
      //8 week first-half courses
      const firstHalfCourses = courses8A.records.filter(course => {

        const inTitle = course.title.toLowerCase().includes(this.search.toLowerCase())
        const inCRN = course.nrc.includes(this.search)

        return inTitle || inCRN
      });

      console.log('2', firstHalfCourses);      
      // 8 week second-half courses
      const secondHalfCourses = courses8B.records.filter(course => {

        const inTitle = course.title.toLowerCase().includes(this.search.toLowerCase())
        const inCRN = course.nrc.includes(this.search)

        return inTitle || inCRN
      });

      console.log('f', secondHalfCourses);

      return longCourses.concat(firstHalfCourses.concat(secondHalfCourses));
    }
  }
}
</script>

<style scoped>

</style>
