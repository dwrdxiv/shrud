<script setup>
import { ref, onMounted } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const zapatos = ref([]);
const cargando = ref(true);

const obtenerZapatos = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "zapatos"));
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
  <main class="min-h-screen bg-gray-50">
    <section class="bg-black text-white py-20 px-6 text-center">
      <h1 class="text-5xl font-extrabold mb-4 italic">STEP UP YOUR GAME</h1>
      <p class="text-gray-400 text-lg mb-8">La colección más exclusiva de sneakers ahora a tu alcance.</p>
      <button class="bg-white text-black px-8 py-3 font-bold rounded-full hover:bg-gray-200 transition">
        Ver Colección
      </button>
    </section>

    <section class="max-w-7xl mx-auto py-12 px-6">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-3xl font-bold text-gray-800">Novedades</h2>
        <span class="text-sm text-gray-500">{{ zapatos.length }} Productos encontrados</span>
      </div>

      <div v-if="cargando" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="zapato in zapatos" :key="zapato.id" class="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 relative">
          
          <button class="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          <div class="h-64 overflow-hidden bg-gray-200">
            <img 
              :src="zapato.imagen || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600'" 
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          <div class="p-4">
            <div class="flex justify-between items-start mb-1">
              <h3 class="font-bold text-lg text-gray-900">{{ zapato.nombre }}</h3>
              <span class="text-blue-600 font-bold">${{ zapato.precio_venta }}</span>
            </div>
            <p class="text-gray-500 text-sm mb-4">{{ zapato.marca }}</p>
            
            <button class="w-full bg-gray-900 text-white py-2 rounded-lg font-medium hover:bg-black transition-colors">
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>

      <div v-if="!cargando && zapatos.length === 0" class="text-center py-20">
        <p class="text-gray-400 italic">No hay zapatos disponibles en el inventario.</p>
        <RouterLink to="/admin" class="text-blue-500 underline">Ir al panel de Admin para agregar</RouterLink>
      </div>
    </section>
  </main>
</template>