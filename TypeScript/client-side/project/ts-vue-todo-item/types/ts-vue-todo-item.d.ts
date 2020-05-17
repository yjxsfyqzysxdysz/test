import Vue from 'vue';

export interface Item {
  text: string;
  complete: boolean;
}

export declare class TodoItem extends Vue {
  public item: Item
  public index: number
  public edittingIndex: number
  public cancel(): void
}
