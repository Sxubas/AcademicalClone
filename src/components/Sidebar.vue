<template>
  <div class="sidebar-container">
    <div class="search-bar">
      <i class="material-icons">search</i>      
      <input class="search" v-model="search" placeholder="Buscar por CRN o nombre de la materia"/>
    </div>
    <div class="search-results">
      <AcademicalSearchResults 
        :search="search" 
        :addClass="addClass" 
        :hoverClass="hoverClass"
        :unhoverClass="unhoverClass"/>
    </div>
  </div>
</template>

<script>

import AcademicalSearchResults from './search/ResultList';

export default {
  components:{
    AcademicalSearchResults
  },
  props:[
    'addClass',
    'hoverClass',
    'unhoverClass'
  ],
  data(){
    return {
      search: ''
    }
  }
}
</script>

<style scoped>

.sidebar-container{
  display: flex;
  flex-direction: column;
  width: 28%;
  max-width: 400px;
  min-width: 270px;
  height: calc(100vh - 90px);
  background-color: rgb(52, 147, 231);
  padding: 8px;
  color: whitesmoke;
}

.search-bar{
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 3vh;
}
.search{
  background-color: #0000;
  color: whitesmoke;
  border: none;
  width: 90%
}

.search-results{
  overflow-y: auto;
  height: calc(97vh - 80px);
}

</style>
