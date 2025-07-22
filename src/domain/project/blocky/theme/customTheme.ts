import * as Blockly from "blockly";
import { categoryStyles } from "./categoryStyles";
import { componentStyles } from "./componentStyles";
import { blockStyles } from "./blockStyles";

export const customTheme = Blockly.Theme.defineTheme("custom_theme", {
  name: "customTheme",
  componentStyles: componentStyles,
  categoryStyles: categoryStyles,
  blockStyles: blockStyles,
});
