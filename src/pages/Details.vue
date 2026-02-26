<script lang="ts" setup>
import { formatDate, getImageUrl } from '@/utils';
import axios from 'axios';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const flight = ref<any>()
axios.get('https://flight.pequla.com/api/flight/' + route.params.id)
    .then(rsp => flight.value = rsp.data)
</script>

<template>
    <h5>{{ flight.destination }}</h5>
    <h6 class="mb-2 text-body-secondary">
        {{ flight.flightNumber }}
    </h6>
    <div class="row">
        <div class="col-12 col-md-6 mb-3">
            <div class="card">
                <img :src="getImageUrl(flight)" class="card-img-top" :alt="flight.destination">
            </div>
        </div>
        <div class="col-12 col-md-6 mb-3">
            <div class="card">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <i class="fa-solid fa-lightbulb"></i> {{ flight.id }}
                    </li>
                    <li class="list-group-item">
                        <i class="fa-solid fa-fingerprint"></i> {{ flight.flightKey }}
                    </li>
                    <li class="list-group-item">
                        <i class="fa-solid fa-clock-rotate-left"></i> {{ formatDate(flight) }}
                    </li>
                    <li class="list-group-item">
                        <i class="fa-solid fa-business-time"></i>&nbsp;
                        <span class="text-warning fw-bold" v-if="flight.estimatedAt">LATE</span>
                        <span class="text-success fw-bold" v-else>ON TIME</span>
                    </li>
                    <li class="list-group-item">
                        <i class="fa-solid fa-diamond-turn-right"></i> {{ flight.type.name }}
                    </li>
                    <li class="list-group-item">
                        <i class="fa-solid fa-plane"></i> {{ flight.plane }}
                    </li>
                    <li class="list-group-item">
                        <i class="fa-solid fa-thumbtack"></i> {{ flight.terminal }}
                    </li>
                </ul>
                <div class="card-body">
                    <div class="btn-group">
                        <button type="button" class="btn btn-success">
                            <i class="fa-solid fa-cart-shopping"></i> Order now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <iframe width="100%" height="340" style="border:0" loading="lazy" allowfullscreen
            :src="`https://www.google.com/maps?q=${flight.destination}&output=embed`">
        </iframe>
    </div>
</template>