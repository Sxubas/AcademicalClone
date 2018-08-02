<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <h3>
              Academical, para todos
            </h3>
          </div>

          <div class="modal-body">
            <p>
              Este clon de <a href="http://uniandes.academical.co" target="_blank">Academical</a> surge de la descontinuación del mismo.
              Es una aplicación web hecha para visualizar horarios para facilitar la planeación e inscripción de materias en Uniandes. 
            </p>
            <p>
              Los datos se derivan de la página web de Admisiones y Registro, no obstante, la oferta puede cambiar por lo que se recomienda SIEMPRE confirmar con Banner o Registro.
              Esto aplica tanto para materias, horarios, NRC's y cupos.
              También, al igual que la aplicación original, este clon no registra materias.
            </p>

            <p>
              Es un proyecto abierto hecho 100% por estudiantes y para los estudiantes de la Universidad de los Andes.
            </p>

            <p>
              Si estás interesado en aportar, todos los detalles técnicos están disponibles <a href="https://github.com/Sxubas/AcademicalClone" target="_blank">aquí</a>. 
            </p>
            <button class="modal-default-button" @click="$emit('close')">
                Continuar usando Academical <i class="material-icons">navigate_next</i>
              </button>
          </div>
        </div>
      </div>
    </div>
  </transition>

</template>

<script>
export default {
  props: [
    'show'
  ]
}
</script>

<style scoped>

a{
  color: rgb(52, 147, 231);
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 460px;
  margin: 0px auto;
  padding: 0px 30px;
  padding-top: 20px;
  padding-bottom: 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: rgb(52, 147, 231);
}

.modal-body {
  margin: 20px 0;
  color: black;
}

.modal-default-button {
  float: right;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(52, 147, 231);
  color: whitesmoke;
  cursor: pointer;
  border: none;
  transition: background-color 0.2s ease-in-out;
}

.modal-default-button:hover{
  background-color: rgb(100, 168, 228);
}

.modal-default-button:active{
  background-color: rgb(52, 125, 189);
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>
