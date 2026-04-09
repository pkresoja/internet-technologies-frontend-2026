<script lang="ts" setup>
import FormCard from '@/components/FormCard.vue';
import type { AirlineModel } from '@/models/airline.model';
import { DataService } from '@/services/data.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const airline = ref<Partial<AirlineModel>>({
    name: ''
})

const crumbs = [
    {
        title: 'Airlines',
        to: '/airline'
    },
    {
        title: 'New'
    }
]

function update() {
    if (!confirm('Create new Airline?')) {
        return
    }

    DataService.createAirline(airline.value!)
        .then(rsp => router.push('/airline'))
}
</script>

<template>
    <FormCard title="Create Airline" :crumbs="crumbs" :on-click="update">
        <div class="mb-3">
            <label for="name" class="form-label">Name:</label>
            <input type="text" class="form-control" id="name" v-model="airline.name">
        </div>
    </FormCard>
</template>