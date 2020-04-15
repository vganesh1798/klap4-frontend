<template>
    <div class="uploadBox">
        <button class="borderless-btn corner-btn" style="font-size: 20px;" type="submit">X</button>

        <div class="col l1">
                <h1>Upload a Playlist</h1>
                    <form enctype="multipart/form-data">
                        <input type="file" name="file" v-on:change="fileChange($event.target.files)" />
                        <button class="borderless-btn coloredBtn" type="submit" @click="uploadBrowse()">Upload</button>
                    </form>
        </div>

        <div class="col l1">
            <div class="filedrop" v-cloak @drop.prevent="addFile" @dragover.prevent>
                <h1 class="faded-text" v-if="files2.length == 0">Drop File to Upload</h1>
                    <ul>
                        <li v-for="file in files2" v-bind:key="file.id">
                            {{ file.name }} ({{ file.size | kb }} kb) <button @click="removeFile(file)" title="Remove">X</button>
                        </li>
                    </ul>
                    <!--button :disabled="uploadDisabled" @click="uploadFiles">Upload</button--->
            </div>
        </div>
        <button class="borderless-btn coloredBtn" v-on:click="uploadFile()">Upload</button>        
    </div>
</template>

<script lang='ts'>
    import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
    import axios from "axios";
    
    @Component 
    export default class upload extends Vue {
        files = new FormData();
        files2: Object[] = [];
        savedPlaylists: Object[] = [];
        
        constructor() {
            super()
        }

        fileChange(fileList) {
            this.files.append("file", fileList[0], fileList[0].name);
        }

        uploadBrowse() {
            axios({ method: "POST", "url": "http://localhost:3000", "data": this.files }).then(result => {
                console.dir(result.data);
            }, error => {
                console.error(error);
            });
        }

        savePlaylist() {
            let entry = {
            name: "test playlist",
            totalSongs: 2
        };

        this.savedPlaylists.push(entry);
        }

        addFile(e) {
            let droppedFiles = e.dataTransfer.files;
            if(!droppedFiles) return;
            // this tip, convert FileList to array, credit: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
            ([...droppedFiles]).forEach(f => {
                this.files2.push(f);
            });
            }

        removeFile(file){
        this.files2 = this.files2.filter(f => {
            return f != file;
        });      
        }

        uploadFile() {
        
        let formData = new FormData();
        this.files2.forEach((f:any,x) => {
            formData.append('file'+(x+1), f);
        });
        
        fetch('https://httpbin.org/post', {
            method:'POST',
            body: formData
        })
        .then(res => res.json())
        .then(res => {
            console.log('done uploading', res);
        })
        .catch(e => {
            console.error(JSON.stringify(e.message));
        });
        
        }
         
        uploadDisabled() {
            return this.files2.length === 0;
        }
    }
</script>

<style lang="scss" scoped>

.faded-text {
    opacity: 20%;
    font-size: 40px;
}

.filedrop {
    height: 250px;
    //outline-color: black;
    //outline-style: solid;
    //outline-width: 2px;
    background-color: lightgray;
    border-radius: 3%;
}

h1 {
    color:black;
    text-align: center;
    font-family: "Montserrat";
}

.uploadBox {
    background-color: white;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 550px;
    width: 600px;
    padding: 0% 5% 20% 5%;
    border-radius: 3%;
}

.corner-btn {
    position: relative;
    left: 60%;
    //margin-right: 25px;
    //float: right;
}

</style>