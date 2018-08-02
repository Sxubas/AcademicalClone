<template>
  <div class="resultsContainer">
    <div v-show="!registeringCompl" v-for="result in results" :key="result.crn">
      <AcademicalSearchResult 
        :result=result
        :addClass="addClass" 
        :hoverClass="hoverClass"
        :unhoverClass="unhoverClass"/>
    </div>
    <template v-if="!isCompl">
      <div v-show="registeringCompl" v-for="compl in magistralClass.compl" :key="compl.crn">
        <AcademicalSearchResult 
          :result=compl
          :addClass="addClass" 
          :hoverClass="hoverClass"
          :unhoverClass="unhoverClass"/>
      </div>
      <div v-if="registeringCompl && magistralClass.compl.length === 0" class="empty-compl">
        <!-- En teoría nunca se entra a esto por como está definido el if en el App.vue, pero ya lo había hecho y después me dí cuenta, entonces rip :(  -->
        La base de datos no contempla ninguna complementaria para esta sección magistral. Por favor intente registrando primero la sección complementaria
      </div>
    </template>
    <template v-else>
      <div v-show="registeringCompl" v-for="mag in magistralClass.mag" :key="mag.crn">
        <AcademicalSearchResult 
          :result=mag
          :addClass="addClass" 
          :hoverClass="hoverClass"
          :unhoverClass="unhoverClass"/>
      </div>
      <div v-if="registeringCompl && magistralClass.mag.length === 0" class="empty-compl">
        <!-- x2 -->
        La base de datos no contempla ninguna magistral para esta complementaria. Por favor intente registrando primero la sección magistral
      </div>
    </template>
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
    'unhoverClass',
    'registeringCompl',
    'magistralClass',
    'isCompl'
  ],
  computed: {
    results(){
      if(this.search.length < 3)
        return [];

      //16 week courses
      let longCourses = courses.records.filter(course => {

        const inTitle = course.title.toLowerCase().includes(this.search.toLowerCase())
        const inCRN = course.nrc.includes(this.search)
        const inClassCourse = ( this.search.toLowerCase().includes(course.class.toLowerCase()) && this.search.toLowerCase().includes(course.course.toLowerCase()) )  || ( (course.class + ' ' + course.course).toLowerCase().includes(this.search) || (course.class + course.course).toLowerCase().includes(this.search) );

        return inTitle || inCRN || inClassCourse
      });

      //8 week first-half courses
      const firstHalfCourses = courses8A.records.filter(course => {

        const inTitle = course.title.toLowerCase().includes(this.search.toLowerCase())
        const inCRN = course.nrc.includes(this.search)
        const inClassCourse = ( this.search.toLowerCase().includes(course.class.toLowerCase()) && this.search.toLowerCase().includes(course.course.toLowerCase()) )  || ( (course.class + ' ' + course.course).toLowerCase().includes(this.search) || (course.class + course.course).toLowerCase().includes(this.search) );

        return inTitle || inCRN || inClassCourse
      });
    
      // 8 week second-half courses
      const secondHalfCourses = courses8B.records.filter(course => {

        const inTitle = course.title.toLowerCase().includes(this.search.toLowerCase())
        const inCRN = course.nrc.includes(this.search)
        const inClassCourse = ( this.search.toLowerCase().includes(course.class.toLowerCase()) && this.search.toLowerCase().includes(course.course.toLowerCase()) )  || ( (course.class + ' ' + course.course).toLowerCase().includes(this.search) || (course.class + course.course).toLowerCase().includes(this.search) );

        return inTitle || inCRN || inClassCourse
      });

      return longCourses.concat(firstHalfCourses.concat(secondHalfCourses));
    }
  }
}
</script>

<style scoped>
.empty-compl{
  font-style: italic;
  font-size: 0.85rem;
  color: orange;
}
</style>
