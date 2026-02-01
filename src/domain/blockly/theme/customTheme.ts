import * as Blockly from "blockly";
import { categoryStyles } from "./styles/categoryStyles";
import { componentStyles } from "./styles/componentStyles";
import { blockStyles } from "./styles/blockStyles";

export const customTheme = Blockly.Theme.defineTheme("custom_theme", {
  name: "customTheme",
  componentStyles: componentStyles,
  categoryStyles: categoryStyles,
  blockStyles: blockStyles,
});
