import { ActionPanel, Action, List } from "@raycast/api";
import entities from './characters-list.json';

export default function Command() {
  const rendFakeImg = (character: string) => {
    const uri = 'https://fakeimg.pl/350x200/282828/eae0d0/?text=';
    const encoded = encodeURIComponent(character);
    return `![Illustration](${uri}${encoded})`;
  }

  const groupListMap = entities.map((group, i) => {
    return <List.Section title={group.title} key={i}>
      {group.items.map((item, j) => {
        return <List.Item
          key={j}
          title={item.description}
          subtitle={item['entity-name']}
          accessories={[{ text: item['entity-number'] }]}
          actions={
            <ActionPanel title={`Copy '${item["entity-name"]}' to clipboard`}>
              <Action.CopyToClipboard
                title="Copy Pull Request Number"
                content={item['entity-name']}
              />
            </ActionPanel>
          }
          detail={
            <List.Item.Detail
              markdown={rendFakeImg(item.character)}
              metadata={
                <List.Item.Detail.Metadata>
                  <List.Item.Detail.Metadata.Label title="Character" text={item.character} />
                  <List.Item.Detail.Metadata.Separator />
                  <List.Item.Detail.Metadata.Label title="HTML Entity Number" text={item['entity-number']} />
                  <List.Item.Detail.Metadata.Separator />
                  <List.Item.Detail.Metadata.Label title="HTML Entity Name" text={item['entity-name']} />
                  <List.Item.Detail.Metadata.Separator />
                  <List.Item.Detail.Metadata.Label title="Description" text={item.description} />
                  <List.Item.Detail.Metadata.Separator />
                </List.Item.Detail.Metadata>
              }
            />
          }
        />
      })}
    </List.Section>
  });

  return <List isShowingDetail>{groupListMap}</List>;
}
