<script setup>
import { ref, onMounted } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const zapatos = ref([]);
const cargando = ref(true);

const obtenerZapatos = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "Zapatos"));
    zapatos.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error cargando productos:", error);
  } finally {
    cargando.value = false;
  }
};

onMounted(obtenerZapatos);
</script>

<template>
  <main >
    <section >
      <div class="catalogoTitle">
        <h2 >Productos Disponibles</h2>
      </div>

      <div v-if="cargando">
        <div ></div>
      </div>
      <div v-else class="catalogoDiv">
        <div v-for="zapato in zapatos" :key="zapato.id" class="productoDiv">
          <div >
            <img 
              :src="zapato.imagen_url || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600'"/>
          </div>

          <div class="productInfoDiv" >
            <div >
              <h3 >{{ zapato.nombre }}</h3>
              <p >{{ zapato.marca }}</p>
            </div>
            <span >${{ zapato.precio_venta }}</span>
            
            
            <button >Añadir al carrito</button>
          </div>
        </div>
      </div>

      <div v-if="!cargando && zapatos.length === 0" >
        <p >No hay zapatos disponibles en el inventario.</p>
        <RouterLink to="/admin">Ir al panel de Admin para agregar</RouterLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
.catalogoTitle {
  text-align: center;
  margin-bottom: 20px;
  font-family: Arial, Helvetica, sans-serif;
}

.catalogoDiv {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 55px;
  width: 85%;
  margin: 0 auto 3rem auto;
  border-radius: 20px;
  padding: 40px;
  background-color: rgb(230, 230, 230);
}

.productoDiv {
  background: rgb(255, 255, 255);
  border-radius: 10px;
  width: 300px;
  height: 450px;
  margin: 20px auto;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.274);
  display: flex;
  min-width: 0;
  flex-direction: column;
}
.productoDiv img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}
.productInfoDiv {
  padding: 10px;
  display: flex;
  flex-direction:column;
  justify-content: space-between;
}
.productInfoDiv h3 {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  font-size: 1.2rem;
}
.productInfoDiv p {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0 0;
  color: #555;
}
.productInfoDiv span {
  font-family: Arial, Helvetica, sans-serif;
  text-align: right;
  color: #000000;
  font-size: 1.5rem;
  margin-top: 10px;
}
.productInfoDiv button {
  margin-top: 15px;
  background-color: #42a846;
  color: white;
  font-weight: bold;
  border: none;
  height: 30px;
  padding: 5px 10px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
}

</style>