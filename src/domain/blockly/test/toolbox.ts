import { controlContents } from "./categories/staticCategories/controlContents";
import { eventContents } from "./categories/staticCategories/eventContents";
import { logicContents } from "./categories/staticCategories/logicContents";
import { loopContents } from "./categories/staticCategories/loopContents";
import { mathContents } from "./categories/staticCategories/mathContents";
import { variableContents } from "../common/categories";
import type { Toolbox } from "@place/types/block";
import { instanceContents } from "./categories/staticCategories/instanceContents";
import { colorContents } from "./categories/staticCategories/colorContents";
import { partContents } from "./categories/staticCategories/partContents";
import { humanoidContents } from "./categories/staticCategories/humanoidContents";

export const toolbox: Toolbox = {
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
      name: "반복",
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
      kind: "category",
      name: "인스턴스",
      categorystyle: "roblox_instance_category",
      contents: instanceContents,
    },
    {
      kind: "category",
      name: "색상",
      categorystyle: "color_category",
      contents: colorContents,
    },
    {
      kind: "category",
      name: "파트",
      categorystyle: "roblox_part_category",
      contents: partContents,
    },
    {
      kind: "category",
      name: "휴머노이드",
      categorystyle: "roblox_humanoid_category",
      contents: humanoidContents,
    },
    {
      kind: "sep",
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
        {
          kind: "block",
          type: "script",
        },
        ...variableContents,
      ],
    },
  ],
};
