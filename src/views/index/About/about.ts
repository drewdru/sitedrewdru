import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import { SmartQuery } from 'vue-apollo-decorator';
import gql from 'graphql-tag';

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


@Component({
  components: {
  },
})
export default class About extends Vue {

  private name: string = '';
  private description: string = '';

  @SmartQuery(TaskQuery) private tasks: any;
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
