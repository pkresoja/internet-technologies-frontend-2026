<script lang="ts" setup>
import FormCard from '@/components/FormCard.vue';
import Loading from '@/components/Loading.vue';
import type { AirlineModel } from '@/models/airline.model';
import { DataService } from '@/services/data.service';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const id = Number(route.params.id)

const airline = ref<AirlineModel>()
DataService.getAirlineById(id)
    .then(rsp => airline.value = rsp.data)
    .catch(e => alert(e))

const crumbs = [
    {
        title: 'Airlines',
        to: '/airline'
    },
    {
        title: 'Edit'
    }
]

function update() {
    if (!confirm('Save changes?')) {
        return
    }

    DataService.updateAirline(id, airline.value!)
        .then(rsp => router.push('/airline'))
}
</script>

<template>
    <FormCard title="Edit Airline" :crumbs="crumbs" :on-click="update" v-if="airline">
        <div class="mb-3">
            <label for="id" class="form-label">ID:</label>
            <input type="number" class="form-control" id="id" v-model="airline.id" disabled>
        </div>
        <div class="mb-3">
            <label for="name" class="form-label">Name:</label>
            <input type="text" class="form-control" id="name" v-model="airline.name">
        </div>
    </FormCard>
    <Loading v-else />
</template>