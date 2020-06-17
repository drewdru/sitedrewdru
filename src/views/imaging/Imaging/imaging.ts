import { Component, Emit, Prop, Vue } from 'vue-property-decorator';


import axios from 'axios';

const HTTP = axios.create({
  baseURL: `${process.env.VUE_APP_REST_URL}`,
})

@Component({
  components: {
  },
})
export default class Imaging extends Vue {
  private file: any = ''; 
  private uid: any = '';
  private result: string = '';
  private status: string = '';

  @Emit()
  private handleFileUpload() {
    this.file = (this.$refs.file as any).files[0];
  }

  @Emit()
  private async getResult() {
    const response = await HTTP.get(`ocr/recognize/`, {
      params: {
        uid: this.uid
      }
    });
    this.status = response.data.status;
    if (this.status !== 'done') {
      window.setTimeout(this.getResult, 10000);
    } else {
      this.result = response.data.result;
    }
  }

  @Emit()
  private async submitFile() {
    this.result = '';
    this.uid = '';
    this.status = '';
    const formData = new FormData();
    formData.append('file', this.file);
    const response: any = await HTTP.post(`ocr/recognize/`,
      formData,
      {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
      }
    );
    this.uid = response.data.uid;
    
    this.getResult()
  }
}
