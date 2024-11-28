<template>
    <div id="app" class="min-h-screen bg-gray-100">
        <header class="bg-blue-600 text-white py-4 shadow-md">
            <nav class="container mx-auto px-4">
                <h1 class="text-2xl font-bold flex justify-center items-center">Inventory Management System</h1>
            </nav>
        </header>

        <main class="container mx-auto px-4 py-6">
            <router-view />
        </main>
    </div>
</template>

<script>
export default {
    name: "App",
};
</script>

<style>
body {
    margin: 0;
    font-family: Arial, sans-serif;
}
</style>
