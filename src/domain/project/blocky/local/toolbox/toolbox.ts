import { controlContents } from "./categories/controlContents";
import { eventContents } from "./categories/eventContents";
import { logicContents } from "./categories/logicContents";
import { loopContents } from "./categories/loopContents";
import { mathContents } from "./categories/mathContents";
import { serviceContents } from "./categories/serviceContents";
import { variableContents } from "./categories/variableContents";

export default {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "수식",
      categorystyle: "math_category",
      contents: mathContents,
    },
    {
      kind: "category",
      name: "논리",
      categorystyle: "logic_category",
      contents: logicContents,
    },
    {
      kind: "category",
      name: "흐름",
      categorystyle: "loop_category",
      contents: loopContents,
    },
    {
      kind: "category",
      name: "제어",
      categorystyle: "control_category",
      contents: controlContents,
    },
    {
      kind: "category",
      name: "이벤트",
      categorystyle: "event_category",
      contents: eventContents,
    },
    {
      kind: "sep",
    },
    {
      kind: "category",
      name: "서비스",
      categorystyle: "service_category",
      contents: serviceContents,
    },
    {
      kind: "category",
      name: "변수",
      custom: "VARIABLE",
      categorystyle: "variable_category",
    },
    {
      kind: "category",
      name: "내 변수",
      categorystyle: "my_variable_category",
      contents: variableContents,
    },
  ],
};
