<script lang="ts" setup>
import DataCard from '@/components/DataCard.vue';
import Loading from '@/components/Loading.vue';
import type { TicketModel } from '@/models/ticket.model';
import { DataService } from '@/services/data.service';
import { formatScheduledDate, getSeatingType } from '@/utils';
import { ref } from 'vue';

const tickets = ref<TicketModel[]>()
DataService.getTickets()
    .then(rsp => tickets.value = rsp.data)
</script>

<template>
    <p>TODO: MAKE A BARCODE/QRCODE</p>
    <DataCard title="Orders" v-if="tickets">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Airline</th>
                    <th scope="col">Flight Number</th>
                    <th scope="col">Destination</th>
                    <th scope="col">Scheduled At</th>
                    <th scope="col">Seating Type</th>
                    <th scope="col">Ticket Count</th>
                    <th scope="col">Options</th>
                </tr>
            </thead>
            <tbody v-if="tickets.length > 0">
                <tr v-for="t in tickets">
                    <th scope="row">{{ t.id }}</th>
                    <td>{{ t.airline.name }}</td>
                    <td>{{ t.flight.flightNumber }}</td>
                    <td>{{ t.flight.destination }}</td>
                    <td>{{ formatScheduledDate(t.flight) }}</td>
                    <td>{{ getSeatingType(t.seatingType) }}</td>
                    <td>{{ t.count }}</td>
                    <td>
                        <RouterLink :to="`/details/${t.flight.id}`" class="btn btn-sm btn-primary" title="View Details">
                            <i class="fa-solid fa-arrow-up-right-from-square"></i>
                        </RouterLink>
                    </td>
                </tr>
            </tbody>
        </table>
    </DataCard>
    <Loading v-else />
</template>