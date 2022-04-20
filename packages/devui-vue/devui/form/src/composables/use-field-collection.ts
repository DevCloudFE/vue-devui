import { FormContext, UseFieldCollection } from '../form-types';
import { FormItemContext } from '../components/form-item/form-item-types';

export default function useFieldCollection(): UseFieldCollection {
  const itemContexts: FormItemContext[] = [];

  const addItemContext: FormContext['addItemContext'] = (field) => {
    itemContexts.push(field);
  };

  const removeItemContext: FormContext['removeItemContext'] = (field) => {
    itemContexts.splice(itemContexts.indexOf(field), 1);
  };

  return { itemContexts, addItemContext, removeItemContext };
}
