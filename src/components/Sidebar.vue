<template>
  <div class="sidebar-container">
    <div class="search-bar">
      <i class="material-icons">search</i>      
      <input class="search" v-model="search" placeholder="Buscar por CRN o nombre de la materia"/>
    </div>
    <div v-if="registeringCompl" class="info-container">
        La clase {{magistralClass.title}} cuenta con las siguientes secciones {{ isCompl ? ' magistrales' : ' complementarias'}}:
    </div>
    <div class="search-results">
      <AcademicalSearchResults 
        :search="search" 
        :addClass="addClass" 
        :hoverClass="hoverClass"
        :unhoverClass="unhoverClass"
        :magistralClass="magistralClass"
        :registeringCompl="registeringCompl"
        />
      <div v-if="registeringCompl" @click="cancelCompl" class="cancel-container">
        <i class="material-icons arrow-back">arrow_back</i> 
        <div class="cancel-compl">Volver a la búsqueda </div>
      </div>
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
    'unhoverClass',
    'registeringCompl',
    'magistralClass',
    'isCompl',
    'cancelCompl'
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

.info-container{
  display: flex;
  padding: 4px;
  text-align: center;
  font-weight: 600;
  border-top: 2px whitesmoke solid;
  border-bottom: 2px whitesmoke solid;
  margin: 4px 0px;
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

.cancel-container{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  color: whitesmoke;
  margin: 4px 0px;
  padding: 2px;
  background-color: rgb(42, 129, 206);
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;
}

.cancel-container:hover{
  background-color: rgb(83, 153, 214);
}

.cancel-container:active{
  background-color: rgb(35, 116, 187);  
}

.cancel-compl{
  border: 0px;
  color: inherit;
  font-size: 1.1rem;
  font-weight: 600;
}

</style>
