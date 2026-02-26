<script lang="ts" setup>
import { formatDate, getImageUrl } from '@/utils';
import axios from 'axios';
import { onBeforeUnmount, onMounted, ref } from 'vue';

const flights = ref<any[]>()

function loadData() {
    axios.get('https://flight.pequla.com/api/flight/list?type=departure')
        .then(rsp => {
            flights.value = rsp.data
        })
}

const interval = setInterval(() => loadData(), 5 * 60 * 1000)
onMounted(() => loadData())
onBeforeUnmount(() => clearInterval(interval))
</script>

<template>
    <div class="card-wrapper" v-if="flights">
        <div class="card flight-card" v-for="f of flights">
            <img :src="getImageUrl(f)" class="card-img-top" :alt="f.destination">
            <div class="card-body">
                <h5 class="card-title">
                    {{ f.destination }}
                </h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">
                    {{ f.flightNumber }} - {{ formatDate(f) }}
                </h6>
            </div>
            <div class="card-footer">
                <RouterLink :to="`/details/${f.id}`" class="btn btn-primary">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i> Details
                </RouterLink>
            </div>
        </div>
    </div>
    <div class="text-center" v-else>
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <h5>Loading data</h5>
        <p>Please wait while we load the latest flight data!</p>
    </div>
</template>

<style>
.card-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 5px;
}

.flight-card {
    max-width: 300px;
}
</style>