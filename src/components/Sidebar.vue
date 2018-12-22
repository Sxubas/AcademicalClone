<template>
  <div class="sidebar-container">
    <AcademicalModal v-if="showingInfo" @close="showingInfo = false"/>
    <div class="icon-container">
      <i  
        v-tooltip="'Más información'"
        @click="showingInfo=true"        
        class="material-icons">help_outline</i>
      <i 
        v-tooltip="'Mostrar cursos de las primeras 8 semanas del semestre'" 
        :class="{ selected : showing8A }"
        @click="showA"
        class="material-icons">filter_1</i>
      <i 
        v-tooltip="'Mostrar cursos de las últimas 8 semanas del semestre'"
        :class="{ selected : !showing8A }"
        @click="showB"
        class="material-icons">filter_2</i>
    </div>
    <div class="search-bar">
      <i class="material-icons">search</i>
      <input class="search" v-model="search" placeholder="Buscar por NRC o nombre de la materia"/>
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
import AcademicalModal from './Modal';
import AcademicalSearchResults from './search/ResultList';

export default {
  components:{
    AcademicalSearchResults,
    AcademicalModal
  },
  props:[
    'addClass',
    'hoverClass',
    'unhoverClass',
    'registeringCompl',
    'magistralClass',
    'isCompl',
    'cancelCompl',
    'showing8A',
    'showA',
    'showB'
  ],
  data(){
    return {
      search: '',
      showingInfo: false
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
  background-color: #4286f4;
  padding: 8px;
  color: whitesmoke;
}

.icon-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  border-top: 4px whitesmoke solid;
  border-bottom: 4px whitesmoke solid;
  padding: 6px 0px;
}

.selected{
  background-color: rgb(35, 116, 187);
  border: 1px whitesmoke dashed;
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
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 8px 0px;
  height: 3vh;
  font-size: 1.05rem;
  min-height: 1.05rem;
}
.search{
  background-color: #0000;
  color: whitesmoke;
  border: none;
  width: 90%;
  font-size: 1rem;
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

i{
  padding: 2px;
  transition: background-color 0.2s ease-in-out;
  user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;
  cursor: pointer;
}

i:hover{
  background-color: rgb(83, 153, 214);
}

i:active{
  background-color: rgb(35, 116, 187);  
}

::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: whitesmoke;
    opacity: 1; /* Firefox */
}

:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: whitesmoke;
}

::-ms-input-placeholder { /* Microsoft Edge */
    color: whitesmoke;
}

</style>
