<script lang="ts" setup>
import type { FlightModel } from '@/models/flight.model';
import { FlighService } from '@/services/flight.service';
import { formatDate } from '@/utils';
import { ref } from 'vue';

const flights = ref<FlightModel[]>([])

FlighService.getFlights()
    .then(rsp => {
        flights.value = rsp.data.sort((f1, f2) => {
            return new Date(f1.scheduledAt).getTime() - new Date(f2.scheduledAt).getTime()
        })
    })
</script>

<template>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Flight Number</th>
                <th scope="col">Destination</th>
                <th scope="col">Scheduled At</th>
                <th scope="col">Estimated At</th>
                <th scope="col">Is Connected</th>
                <th scope="col">Plane Model</th>
                <th scope="col">Terminal</th>
                <th scope="col">Options</th>
            </tr>
        </thead>
        <tbody v-if="flights.length > 0">
            <tr v-for="f in flights">
                <th scope="row">{{ f.id }}</th>
                <td>{{ f.flightNumber }}</td>
                <td>{{ f.destination }}</td>
                <td>{{ formatDate(f) }}</td>
                <td>
                    <span class="text-warning fw-bold" v-if="f.estimatedAt">LATE</span>
                    <span class="text-success fw-bold" v-else>ON TIME</span>
                </td>
                <td>{{ f.connectedFlight ?? '/' }}</td>
                <td>{{ f.plane }}</td>
                <td>{{ f.terminal }}</td>
                <td>
                    <RouterLink :to="`/details/${f.id}`" class="btn btn-sm btn-primary" title="View Details">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </RouterLink>
                </td>
            </tr>
        </tbody>
    </table>
    <pre>{{ flights }}</pre>
</template>