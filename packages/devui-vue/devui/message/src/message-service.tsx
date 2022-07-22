import { reactive } from 'vue';
import { MessageOption, VoidFn } from './message-types';
import { instances, initInstance, deleteInstance } from './instance';

const defaultOptions: MessageOption = {
  duration: 3000,
  type: 'normal',
};

export default class MessageService {

  static seed = 0;

  static open(options: MessageOption): void{
    const originOnClose: VoidFn | null = options.onClose || null;
    const message = options.message;
    let timer;
    delete options.message;

    const props = reactive({
      ...defaultOptions,
      ...options,
      onClose: () => {
        props.visible = false;
        deleteInstance(props.id);
        originOnClose?.();
      },
    });

    this.seed ++;
    const id = `message_${this.seed}`;
    props.id = id;
    const messageContext = initInstance(id,props, message);
    props.visible = true;
    instances.push(messageContext);
    clearTimeout(timer);
    if (options.duration && props.onClose) {
      timer = setTimeout(props.onClose, options.duration);
    }
  }

  static success(options: MessageOption): void{
    this.open({
      ...options,
      type:'success'
    });
  }
  static error(options: MessageOption): void{
    this.open({
      ...options,
      type:'error'
    });
  }
  static warning(options: MessageOption): void{
    this.open({
      ...options,
      type:'warning'
    });
  }
  static info(options: MessageOption): void{
    this.open({
      ...options,
      type:'info'
    });
  }
}
