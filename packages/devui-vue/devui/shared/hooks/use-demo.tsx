import CodeBox from '../devui-codebox/devui-codebox';

interface ExampleItem {
  id: `${string}-${string}`;
  title: string;
  text?: string;
  code: string;
  content: JSX.Element;
}

export function useDemo (exampleList: ExampleItem[]): JSX.Element {
  const resList = exampleList.map(item => {
    const sourceData = [{
      title: 'TSX',
      language: 'TSX',
      code: item.code
    }];

    return (
      <div class="demo-example">
        <div class="demo-title" id={item.id}>{ item.title }</div>
        <div class="demo-text">{ item.text }</div>
        <CodeBox sourceData={sourceData}>
          { item.content }
        </CodeBox>
      </div>
    );
  });

  return (
    <div class="demo-container">
      { resList }
    </div>
  );
}
