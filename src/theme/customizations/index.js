import Card from "./Card";
import Tabs from "./Tabs";

function customizeComponents(theme) {
  return { ...Tabs(theme), ...Card(theme) };
}

export default customizeComponents;
