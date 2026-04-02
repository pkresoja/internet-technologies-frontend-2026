<script lang="ts" setup>
export interface DataCardProps {
    title: string,
    btnTitle?: string,
    btnTo?: string
}

const props = defineProps<DataCardProps>()
</script>

<template>
    <div class="card">
        <div class="card-header">
            <strong>{{ props.title }}</strong>
        </div>
        <div class="card-body">
            <slot></slot>
        </div>
        <div class="card-footer" v-if="btnTitle && btnTo">
            <RouterLink type="button" class="btn btn-sm btn-primary" :to="btnTo">
                <i class="fa-solid fa-plus"></i> {{ btnTitle }} 
            </RouterLink>
        </div>
    </div>
</template>