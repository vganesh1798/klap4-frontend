<template>
    <div class="uploadBox">
        <div class="col s11"></div>
        <div class="col s1">
            <defaultButton class="corner-btn" style="font-size: 20px;" @click.native="closeUpload()" type="submit">X</defaultButton>
        </div>
        <h1>Upload a Playlist</h1>
        <form enctype="multipart/form-data">
            <input type="file" name="file" id="filebtn" accept=".txt, .csv" v-on:change="fileChange($event.target.files)" />
            <defaultButton class="colored uploadBtn" type="submit" @click.native="upload()">Upload</defaultButton>
        </form>
       <!--form enctype="multipart/form-data">
       <div class="dropbox">
            <input type="file" name="file" id="filebtn" accept=".txt, .csv" v-on:change="fileChange($event.target.files)" />
            <p v-if="isInitial">
              Drag your file(s) here to begin<br> or click to browse
            </p>
            <p v-if="isSaving">
              Uploading {{ fileCount }} files...
            </p>
            <defaultButton class="colored uploadBtn" type="submit" @click.native="upload()">Upload</defaultButton>
       </div>
        </form-->
    </div>
</template>

<script lang='ts'>
    import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
    import axios from "axios";
    import defaultButton from "../components/Button.vue";
    
    @Component ({ 
        components: {defaultButton}
    })
    export default class upload extends Vue {
        files = new FormData();
        close = false
        isInitial = true;
        isSaving = false;
        
        constructor() {
            super()
        }

        @Emit('closeUpload') 
            closeUpload() {
                this.close = true;
            }

        fileChange(fileList) {
            this.files.append("file", fileList[0], fileList[0].name);
        }

        upload() {
            axios({ method: "POST", "url": "http://localhost:3000", "data": this.files }).then(result => {
                console.dir(result.data);
            }, error => {
                console.error(error);
            });
        }
    }
</script>

<style lang="scss" scoped>

.faded-text {
    opacity: 20%;
    font-size: 40px;
}

//input {
//    height: 150px;
//    width: 450px;
//    background-color: lightgray;
//    border-radius: 3%;
//}

#filebtn{
    opacity: 0;
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
    height: 200px;
    width: 600px;
    padding: 0% 5% 17% 5%;
    border-radius: 3%;
}

.uploadBtn {
    position: absolute;
    padding: 2% 2%;
    margin: 0 0 0 0;
    width: 25%;
    bottom: 5%;
    left: 40%;
}

.corner-btn {
    position: absolute;
    left: 94%;
    top: 1%;
}


.dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }

</style>