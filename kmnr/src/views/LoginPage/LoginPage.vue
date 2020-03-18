<template>
    <div class="full-page container">
        <div class="row">
            <div class="col s4 offset-s4">
                <h1>Login</h1>
                <form>
                    <div class="row">
                        <div class="input-field col s12">
                            <label for="username">Username</label>
                            <input required type="text" id="username" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <label for="password">Password</label>
                            <input required type="password" id="password" />
                        </div>
                    </div>

                    <button class="btn" type="submit">Login</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./LoginPage.ts" />

<style lang="scss" scoped>
    .full-page {
        padding-top: 10%;
    }
</style>