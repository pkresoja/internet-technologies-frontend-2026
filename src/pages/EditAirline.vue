<script lang="ts" setup>
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

function update() {
    if (!confirm('Save changes?')) {
        return
    }

    DataService.updateAirline(id, airline.value!)
        .then(rsp => router.push('/airline'))
}
</script>

<template>
    <div class="crud-wrapper" v-if="airline">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <RouterLink to="/">Home</RouterLink>
                </li>
                <li class="breadcrumb-item">
                    <RouterLink to="/airline">Airlines</RouterLink>
                </li>
                <li class="breadcrumb-item active" aria-current="page">Edit</li>
            </ol>
        </nav>
        <div class="card">
            <div class="card-header">
                <strong>Edit Airline</strong>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <label for="id" class="form-label">ID</label>
                    <input type="number" class="form-control" id="id" v-model="airline.id" disabled>
                </div>
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" v-model="airline.name">
                </div>
            </div>
            <div class="card-footer">
                <button type="button" class="btn btn-sm btn-success" @click="update">
                    <i class="fa-solid fa-floppy-disk"></i> Save changes
                </button>
            </div>
        </div>
    </div>
    <Loading v-else />
</template>