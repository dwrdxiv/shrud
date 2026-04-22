<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// Mapeo de datos por página
const pageData = computed(() => {
  switch (route.path) {
    case '/inventario':
      return {
        titulo: 'Inventario',
        gif: 'https://media1.tenor.com/m/wPJ8uBHZ6joAAAAd/homelander-based.gif' // Ejemplo: Libreta/Admin
      };
    case '/':
    default:
      return {
        titulo: 'Inicio - Catálogo de Calzado',
        gif: 'https://media1.tenor.com/m/u0vtZJmUZ_MAAAAd/cat-meme.gif' // Ejemplo: Zapato/Tienda
      };

  }
});
</script>

<template>
    <header class="main-header">
    <nav class="top-nav">
      <div class="brand">SHRUD</div>
      <div class="botonesUser">
        <button class="loginButton">Iniciar Sesion</button>
        <button class="registerButton">Registrarse</button>
      </div>
    </nav>

    <div class="banner" :style="{ backgroundImage: `url(${pageData.gif})` }">
      <div class="overlay">
        <h1 style="margin-left: 20px;">{{ pageData.titulo }}</h1>
      </div>
    </div>
  </header>
</template>

<style scoped>
.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 5%;
  background: white;
  border-bottom: 1px solid #eee;
}

.brand { font-weight: bold; font-family: Arial, Helvetica, sans-serif; font-size: 1.5rem; }

.auth-buttons { display: flex; gap: 10px; }
.loginButton {
  background-color: #42a846;
  color: white;
  font-weight: bold;
  border: none;
  height: 30px;
  padding: 5px 10px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
}
.loginButton:hover {
  background-color: #1e611e;
  transform: scale(1.05);
  }
.loginButton:active{
  transform: scale(1);
}

.registerButton {
  background-color: #3b7ee2;
  color: white;
  font-weight: bold;
  border: none;
  height: 30px;
  padding: 5px 10px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
}
.registerButton:hover {
  background-color: #114aa0;
  transform: scale(1.05);
  }
.registerButton:active{
  transform: scale(1);
}


.banner {
  height: 350px;
  background-size: cover;
  background-position: center;
  position: relative;
  transition: all 0.5s ease;
}

.overlay {
  background: rgba(0, 0, 0, 0.548); /* Oscurecer para leer texto */
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.2rem;
  width: 100%;
  height: 100%;
  display: flex;
  align-items:end;
  justify-content:last baseline;
}



</style>