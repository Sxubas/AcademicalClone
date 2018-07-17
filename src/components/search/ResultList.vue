<template>
  <div class="resultsContainer">
    <div v-for="result in results" :key="result.crn">
      <AcademicalSearchResult :result=result />
    </div>
  </div>
</template>

<script>

import AcademicalSearchResult from './Result';
import courses from '../../../courses';

export default {
  components:{
    AcademicalSearchResult
  },
  props:[
    'search'
  ],
  computed: {
    results(){
      if(this.search.length < 3)
        return [];
      
      return courses.records.filter(course => {

        const inTitle = course.title.toLowerCase().includes(this.search.toLowerCase())
        const inCRN = course.nrc.includes(this.search)

        return inTitle || inCRN
      });
    }
  }
}
</script>

<style scoped>

</style>
