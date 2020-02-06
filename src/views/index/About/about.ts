import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import { SmartQuery } from 'vue-apollo-decorator';
import gql from 'graphql-tag'

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


@Component({
  components: {
  },
})
export default class About extends Vue {

  // @Prop() private tasks: string = '';
  @SmartQuery(TaskQuery) tasks: any;
  // // OR
  // @SmartQuery<Home, Task.Query, Task.Variables>({
  //   query: TaskQuery,
  //   // variables() {
  //   //   return { id: '...' };
  //   // }
  // })
  // task: Task;

}
