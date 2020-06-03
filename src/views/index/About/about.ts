import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import { SmartQuery } from 'vue-apollo-decorator';
import gql from 'graphql-tag';
import {ILanguages, LANGUAGES} from '@/constants/languages';
import taskQuery from './tasks.gql';

interface Languages {
  locale: string;
  flag: string;
  title: string;
}

@Component({
  components: {
  },
})
export default class About extends Vue {
  private name: string = '';
  private description: string = '';
  private language: string = '';

  private languages: Languages[] = LANGUAGES;
  private selected: Languages|any = {};

  @SmartQuery((taskQuery as any).TaskQuery) private tasks: any;
  // // OR
  // @SmartQuery<Home, Task.Query, Task.Variables>({
  //   query: TaskQuery,
  //   // variables() {
  //   //   return { id: '...' };
  //   // }
  // })
  // task: Task;

  @Emit()
  private async createTask() {
    const name = this.name;
    const description = this.description;

    // Call to the graphql mutation
    const data = await this.$apollo.mutate({
      // Query
      mutation: (taskQuery as any).TaskCreate,
      // Parameters
      variables: {
        name,
        description,
      },
      update: (store, { data: { createTask } }) => {
        const response: any = store.readQuery({ query: (taskQuery as any).TaskQuery });
        response.tasks.push(createTask.task);
        store.writeQuery({ query: (taskQuery as any).TaskQuery, data: response });
      },
    });
    this.name = '';
    this.description = '';
  }

  @Emit()
  private async updateTask(i: any) {
    await this.$apollo.mutate({
      mutation: (taskQuery as any).TaskUpdate,
      variables: {
        id: i.id,
        isDone: !i.isDone,
      },
    });
  }
}
