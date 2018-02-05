import React from "react";
import Chip from "material-ui/Chip";

const SnippetChip = props => {
  const i = props.i;
  const snippet = props.snippet;
  const onClick = props.onClick;
  const onRequestDelete = props.onRequestDelete;
  const style = { marginBottom: 10, border: "0.5px solid #0e254c"};

  const createSnip = (snip) => {
    let beginning = snip.text.slice(0, snip.index);
    let end = snip.text.slice(snip.index + snip.word.length);
    let middle = snip.text.slice(snip.index, snip.index + snip.word.length)
    return (<span>{beginning}<span style={{ color: "blue", fontWeight: "bold" }}>{middle}</span>{end}</span>)
  }

  return (
    <Chip
      value={`${i + 1}`}
      labelStyle={{color: "#0e254c"}}
      backgroundColor="#FFFFFF"
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
