import AsyncValidator from 'async-validator';

export default {
  created(el, binding, vnode) {
    // console.log('测试指令 created');
    console.log('测试指令 el', el);
    // console.log('测试指令 binding', binding);
    // console.log('测试指令 vnode', vnode);
    // console.log('测试指令 prevVnode', prevVnode);
    const rules = binding.value;
    const modelValue = vnode.children[0].props.value;
    console.log('rules', rules);
    
    console.log('测试指令 input', modelValue);

    const descriptor = {
      name: {
        len: rules[0].maxlength
      }
    };

    const validator = new AsyncValidator(descriptor);
    validator.validate({name: 'AlanLee'}).then(res => {
      console.log('校验通过');
      
    }).catch(({ errors }) => {
      console.log('errors', errors);
      const textNode = document.createTextNode('' + errors[0].message)
      el.parentNode.append(document.createElement('div').appendChild(textNode))
      // document.parentNode
    })
    
  }, // 新增
  beforeMount() {
    console.log('beforeMount');
    
  },
  mounted() {
    console.log('测试指令 mounted');
    
  },
  beforeUpdate() { 
    console.log('beforeMount');

  }, // 新增
  updated() { 
    console.log('updated');

  },
  beforeUnmount() { 
    console.log('beforeUnmount');

  }, // 新增
  unmounted() { 
    console.log('unmounted');

  }
}
