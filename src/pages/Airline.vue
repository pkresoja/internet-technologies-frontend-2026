<script lang="ts" setup>
import DataCard from '@/components/DataCard.vue';
import Loading from '@/components/Loading.vue';
import type { AirlineModel } from '@/models/airline.model';
import { DataService } from '@/services/data.service';
import { formatDate } from '@/utils';
import { onMounted, ref } from 'vue';

const airlines = ref<AirlineModel[]>([])


function deleteData(airline: AirlineModel) {
    if (!confirm(`Are you sure you want to delete ${airline.name}?`))
        return

    DataService.deleteAirline(airline.id)
        .then(rsp => loadData())
}

function loadData() {
    DataService.getAirlines()
        .then(rsp => airlines.value = rsp.data)
}

onMounted(() => loadData())
</script>

<template>
    <DataCard title="Airline List" btn-title="Create Airline" btn-to="/airline/new" v-if="airlines.length > 0">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Updated At</th>
                    <th scope="col">Options</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="a in airlines">
                    <th scope="row">{{ a.id }}</th>
                    <td>{{ a.name }}</td>
                    <td>{{ formatDate(a.createdAt) }}</td>
                    <td>{{ formatDate(a.updatedAt) }}</td>
                    <td>
                        <div class="btn-group">
                            <RouterLink type="button" class="btn btn-sm btn-success" :to="`/airline/${a.id}`">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </RouterLink>
                            <button type="button" class="btn btn-sm btn-danger" @click="deleteData(a)">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </DataCard>
    <Loading v-else />
</template>