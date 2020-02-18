import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import { SmartQuery } from 'vue-apollo-decorator';
import gql from 'graphql-tag';
import VuiSelect from '@/components/VuiSelect/VuiSelect.vue';


const TaskQuery = gql`
  query {
    tasks {
      id
      isDone
      name
      description
    }
  }
`;

const TaskCreate = gql`mutation createTask($name:String, $description: String) {
  createTask(name: $name, description: $description) {
    task {
        id
        isDone
        name
        description
    }
    ok
  }
}`;

const TaskUpdate = gql`mutation updateTask($id: String, $IsDone: Boolean) {
  updateTask(id: $id, IsDone: $IsDone) {
    task {
      id
      isDone
      name
      description
    }
    ok
  }
}`;
interface Languages {
  locale: string;
  flag: string;
  title: string;
}


@Component({
  components: {
    VuiSelect,
  },
})
export default class About extends Vue {

  private name: string = '';
  private description: string = '';

  private languages: Languages[] = [
    {locale: 'en', flag: 'us', title: 'English'},
    {locale: 'ru', flag: 'ru', title: 'Russian'},
    {locale: 'ru', flag: 'ru', title: 'Russianssssssssssssssssssssssssdasda sd asd as as ds asd sa d'},
    {locale: 'ru', flag: 'ru', title: 'Russianassssssda sd as as das dasd asd as das '},
    {locale: 'ru', flag: 'ru', title: 'Russianasd asd asd as das das das d '},
    {locale: 'ru', flag: 'ru', title: 'Russianasd asd asd as as '},
    {locale: 'ru', flag: 'ru', title: 'Russianasd asd asd as da'},
    {locale: 'ru', flag: 'ru', title: 'Russianasd asd asd '},
    {locale: 'ru', flag: 'ru', title: 'Russianasd asd asd as das das sd asd asd as'},
    {locale: 'ru', flag: 'ru', title: 'Russianasd as das das as dasd as asd asdas dsa dasd as dasd asd asd asd asd asd asd asdsa '},
    {locale: 'ru', flag: 'ru', title: 'Russian'},
    {locale: 'ru', flag: 'ru', title: 'Russian'},
    {locale: 'ru', flag: 'ru', title: 'Russian'},
  ];
  private selected: Languages|any = {};

  @SmartQuery(TaskQuery) private tasks: any;
  // // OR
  // @SmartQuery<Home, Task.Query, Task.Variables>({
  //   query: TaskQuery,
  //   // variables() {
  //   //   return { id: '...' };
  //   // }
  // })
  // task: Task;

  private created() {
    this.selected = this.languages.filter(
      (c) => c.locale === this.$i18n.locale,
    )[0];
  }
  @Emit()
  private localeChange() {
    this.$i18n.locale = this.selected.locale;
    localStorage.setItem('language', this.selected.locale);
  }

  @Emit()
  private async createTask() {
    const name = this.name;
    const description = this.description;

    // Call to the graphql mutation
    const data = await this.$apollo.mutate({
      // Query
      mutation: TaskCreate,
      // Parameters
      variables: {
        name,
        description,
      },
      update: (store, { data: { createTask } }) => {
        // Add to All tasks list
        const response: any = store.readQuery({ query: TaskQuery });
        response.tasks.push(createTask.task);
        store.writeQuery({ query: TaskQuery, data: response });
      },
    });
    console.log('Added: ' , data.data.createTask.task);
    this.name = '';
    this.description = '';
  }

  @Emit()
  private async updateTask(i: any) {
    await this.$apollo.mutate({
      mutation: TaskUpdate,
      variables: {
        id: i.id,
        IsDone: !i.isDone,
      },
    });
  }
}
