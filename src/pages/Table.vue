<script lang="ts" setup>
import DataCard from '@/components/DataCard.vue';
import Loading from '@/components/Loading.vue';
import type { FlightModel } from '@/models/flight.model';
import { DataService } from '@/services/data.service';
import { formatScheduledDate } from '@/utils';
import { ref } from 'vue';

const flights = ref<FlightModel[]>([])

DataService.getFlights()
    .then(rsp => flights.value = rsp.data)
</script>

<template>
    <DataCard title="Flight List" v-if="flights.length > 0">
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
                    <td>{{ formatScheduledDate(f) }}</td>
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
    </DataCard>
    <Loading v-else />
</template>