import { Component, Vue } from 'vue-property-decorator';
import axios from "axios";

@Component
export default class LogPage extends Vue {
    currentShow: string = "EXAMPLE_SHOW";
    song: string = "";
    artist: string = "";
    album: string = "";
    entries: Object[] = [];
    num: number = 0;
    files = new FormData();
    files2: Object[] = [];
    savedPlaylists: Object[] = [];

    addSong() {
        let entry = {
            num: this.num++,
            song: this.song,
            artist: this.artist,
            album: this.album

        };

        this.entries.push(entry);
    }

    removeSong(val: number) {
        this.currentShow = val.toString();
        this.entries.splice(val, 1);
        num: this.num--;
        //this.entries[num] = 0;
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