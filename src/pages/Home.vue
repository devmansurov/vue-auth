<template>
    <div>
        <h1>Главная страница</h1>
    
        <pre v-if="$auth.ready()">
            {{ $auth.user() }}
        </pre>
   
    </div>
</template>