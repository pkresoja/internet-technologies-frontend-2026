<script lang="ts" setup>
import type { AirlineModel } from '@/models/airline.model';
import { DataService } from '@/services/data.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const airline = ref<Partial<AirlineModel>>({
    name: ''
})

function update() {
    if (!confirm('Create new Airline?')) {
        return
    }

    DataService.createAirline(airline.value!)
        .then(rsp => router.push('/airline'))
}
</script>

<template>
    <div class="crud-wrapper">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <RouterLink to="/">Home</RouterLink>
                </li>
                <li class="breadcrumb-item">
                    <RouterLink to="/airline">Airlines</RouterLink>
                </li>
                <li class="breadcrumb-item active" aria-current="page">New</li>
            </ol>
        </nav>
        <div class="card">
            <div class="card-header">
                <strong>Create Airline</strong>
            </div>
            <div class="card-body">
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
</template>