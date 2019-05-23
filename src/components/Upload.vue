<template>
  <div>
    <label>File
    <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
    </label>
    <button v-on:click="submitFile()">Submit</button>

    <hr>

    <div v-for="data in userUploadedJson">
        {{ data }}
    </div>

  </div>
</template>

<script>
const axios = require('axios');

// https://simon-schraeder.de/posts/filereader-async/
function readFileAsync(file){
    return new Promise((resolve, reject)=>{
        let reader = new FileReader();

        reader.onload = (event)=>{
            let result = JSON.parse(event.target.result);
            resolve(result);
        }

        reader.onerror = reject;

        reader.readAsText(file);
        
    });
}

async function processFile(file){
    try{
        let contentBuffer = await readFileAsync(file);
        // return contentBuffer;
        console.log(contentBuffer);
        localStorage.userJSON = JSON.stringify(contentBuffer);
    } catch(error){
        console.log(error);
    }
}
  export default {
    data(){
      return {
        file: '',
        importedJson: {},
        userUploadedJson: {}
      }
    },
    methods: {
      submitFile(){
            let formData = new FormData();
            formData.append('file', this.file);
            axios.post( 'http://localhost:4000/api/post',{
                dataObject: this.formData
              }
            ).then(function(){
          console.log('SUCCESS!!');
        })
        .catch(function(){
          console.log('FAILURE!!');
        });
      },

      handleFileUpload(){
        let tempFile = this.$refs.file.files[0];

        // Some validations
        let isFileSizeSmall = tempFile.size > 500000;
        let isFileJSONformat = tempFile.type === "application/json";

        processFile(tempFile);
      }
    },
    mounted(){
        this.userUploadedJson = processFile(this.$refs.file.files[0]);
    }
  }
</script>