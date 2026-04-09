<script lang="ts" setup>
import Loading from '@/components/Loading.vue';
import type { AirlineModel } from '@/models/airline.model';
import type { FlightModel } from '@/models/flight.model';
import { DataService } from '@/services/data.service';
import { formatScheduledDate, getImageUrl } from '@/utils';
import { ref } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute()
const id = Number(route.params.id)
const ticket = ref({
    flightId: 0,
    airlineId: 0,
    seatingType: 'e',
    count: 1
})

const flight = ref<FlightModel>()
DataService.getFlightById(id)
    .then(rsp => {
        flight.value = rsp.data
        ticket.value.flightId = rsp.data.id
    })

const airlines = ref<AirlineModel[]>()
DataService.getAirlines()
    .then(rsp => {
        airlines.value = rsp.data
        ticket.value.airlineId = rsp.data[0].id
    })
</script>

<template>
    <div class="crud-wrapper" v-if="flight && airlines">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <RouterLink to="/">Home</RouterLink>
                </li>
                <li class="breadcrumb-item">
                    <RouterLink :to="`/details/${flight.id}`">
                        {{ flight.destination }}
                    </RouterLink>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                    Order
                </li>
            </ol>
        </nav>
        <div class="card">
            <img :src="getImageUrl(flight)" class="card-img-top" :alt="flight.destination">
            <div class="card-body border-bottom">
                <h5 class="card-title">
                    {{ flight.destination }}
                </h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">
                    {{ flight.flightNumber }} - {{ formatScheduledDate(flight) }}
                </h6>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <label for="airline" class="form-label">Airline:</label>
                    <select class="form-select" id="airline" v-model="ticket.airlineId">
                        <option v-for="a in airlines" :value="a.id">{{ a.name }}</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="level" class="form-label">Seating Type:</label>
                    <select class="form-select" id="level" v-model="ticket.seatingType">
                        <option value="e">Economy</option>
                        <option value="b">Business</option>
                        <option value="f">First Class</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="count" class="form-label">Count:</label>
                    <input type="number" class="form-control" id="count" v-model="ticket.count">
                </div>
            </div>
            <div class="card-footer">
                <RouterLink :to="`/details/${flight.id}`" class="btn btn-primary">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i> Details
                </RouterLink>
            </div>
        </div>
    </div>
    <Loading v-else />
</template>