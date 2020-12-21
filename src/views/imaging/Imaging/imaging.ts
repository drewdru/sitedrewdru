import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import {ILanguages} from '@/constants/languages';


import axios from 'axios';

const HTTP = axios.create({
  baseURL: `${process.env.VUE_APP_REST_URL}`,
});

@Component({
  components: {
  },
})
export default class Imaging extends Vue {
  private file: any = '';
  private uid: any = '';
  private result: string = '';
  private status: string = '';
  private progress: number = 0;
  private error: string = '';

  private language: any = null;
  private languages: ILanguages[] = [
    {locale: 'en_2', flag: 'us', title: 'English'},
    {locale: 'ru', flag: 'ru', title: 'Russian'},
    {locale: 'ru_kz', flag: 'kz', title: 'Kazakh and Russian'},
  ];

  @Emit()
  private handleFileUpload() {
    this.file = (this.$refs.file as any).files[0];
  }

  @Emit()
  private async getResult() {
    const response = await HTTP.get(`ocr/recognize/`, {
      params: {
        uid: this.uid,
      },
    });
    this.status = response.data.status;
    this.progress = response.data.progress;
    if (this.status.includes('Error:')) {
      this.error = this.status;
      return;
    }
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
    this.error = '';
    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('lang', this.language.locale);
    try {
      const response: any = await HTTP.post(`ocr/recognize/`,
        formData,
        {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
        },
      );
      this.uid = response.data.uid;
      this.getResult();
    } catch (error) {
      this.error = error.response.data.detail;
    }
  }
}
