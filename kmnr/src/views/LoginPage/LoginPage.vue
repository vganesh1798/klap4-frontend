<template>
    <div class="full-page container">
        <h1>Login</h1>
        <form>
            <label for="username">Username</label>
            <input required type="text" id="username"/>

            <label for="password">Password</label>
            <input required type="password" id="password"/>

            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script lang="ts" src="./LoginPage.ts" />