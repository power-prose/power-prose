import React from "react";
import Chip from "material-ui/Chip";

const SnippetChip = props => {
  const i = props.i;
  const snippet = props.snippet;
  const onClick = props.onClick;
  const onRequestDelete = props.onRequestDelete;
  const style = { margin: 10 };

  // const testSnip = {id: 1, text: 'all the cake over here like I love to eat cake', conversationId: 2, userWatchWordId: 6, word: 'like', index: 23}

  const createSnip = (snip) => {
    let beginning = snip.text.slice(0, snip.index);
    let end = snip.text.slice(snip.index + snip.word.length);
    let middle = snip.text.slice(snip.index, snip.index + snip.word.length)
    return (<span>{beginning}<span style={{ color: "blue", fontWeight: "bold" }}>{middle}</span>{end}</span>)
  }

  return (
    <Chip
      value={`${i + 1}`}
      name="snippetName"
      id={i}
      onClick={onClick}
      onRequestDelete={onRequestDelete(snippet)}
      style={style}
    >
      {createSnip(snippet)}
    </Chip>
  );
};

export default SnippetChip;

// <span style={{ fontWeight: "bold" }}>{snippet.text}</span>
