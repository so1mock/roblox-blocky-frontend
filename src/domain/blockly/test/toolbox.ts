import { controlContents } from "./categories/staticCategories/controlContents";
import { eventContents } from "./categories/staticCategories/eventContents";
import { logicContents } from "./categories/staticCategories/logicContents";
import { loopContents } from "./categories/staticCategories/loopContents";
import { mathContents } from "./categories/staticCategories/mathContents";
import { serviceContents } from "./categories/staticCategories/serviceContents";
import { variableContents } from "../common/categories";

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
      categorystyle: "variable_category",
      contents: [
        {
          kind: "button",
          text: "새 변수 만들기",
          callbackKey: "CREATE_VARIABLE",
        },
        ...variableContents,
      ],
    },
  ],
};
