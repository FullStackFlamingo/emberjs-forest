import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

type EmInputArgs = {
  /** required id arg */
  id: string;
};

/** App's Input */
export default class EmInput extends Component<EmInputArgs> {
  @tracked text: string = 'default text';

  handleInput = (event: InputEvent) => {
    this.text = (event.target as HTMLInputElement)?.value;
  };

  <template>
    <label for={{@id}}>{{yield}}</label>
    <div>
      <input
        class="border"
        id={{@id}}
        value={{this.text}}
        {{on "input" this.handleInput}}
      /></div>
    <div>{{this.text}}</div>
  </template>
}
