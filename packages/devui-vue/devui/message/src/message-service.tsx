import { reactive } from 'vue';
import { isString } from '@vue/shared';
import { MessageOption, VoidFn } from './message-types';
import { instances, initInstance, deleteInstance } from './instance';

const defaultOptions: MessageOption = {
  duration: 3000,
  type: 'normal',
};

const normalizeOptions = (params?: MessageOption | string) => {
  const options: MessageOption =
    !params || isString(params)
      ? { message: params }
      : params;

  const normalized = {
    ...defaultOptions,
    ...options,
  };

  return normalized;
};


let seed = 0;
function open(options: MessageOption): void {
  const originOnClose: VoidFn | null = options.onClose || null;
  const messageContent = options.message;
  // let timer;
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

  seed ++;
  const id = `message_${seed}`;
  props.id = id;
  const messageContext = initInstance(id,props, messageContent);
  instances.push(messageContext);
  props.visible = true;

}

function message(params: MessageOption | string): void {
  const options: MessageOption = normalizeOptions(params);
  open({
    ...options,
  });
}

function success(params: MessageOption | string): void {
  const options: MessageOption = normalizeOptions(params);
  open({
    ...options,
    type:'success'
  });
}

function error(params: MessageOption | string): void {
  const options: MessageOption = normalizeOptions(params);
  open({
    ...options,
    type:'error'
  });
}

function warning(params: MessageOption | string): void {
  const options: MessageOption = normalizeOptions(params);
  open({
    ...options,
    type:'warning'
  });
}

function info(params: MessageOption | string): void {
  const options: MessageOption = normalizeOptions(params);
  open({
    ...options,
    type:'info'
  });
}

const Message = Object.assign(message , {
  success,
  error,
  warning,
  info,
});

export default Message;
