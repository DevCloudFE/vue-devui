import { SetupContext, Ref } from 'vue';
interface userInputReturnType {
  handleInput: (event: Event) => void;
}

export function useInput(inputValue: Ref<string>, ctx: SetupContext): userInputReturnType {
  const onInputChange = (value: string) => {
    ctx.emit('search', value);
  };

  const handleInput = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    inputValue.value = value;
    onInputChange(value);
  };

  return {
    handleInput,
  };
}
