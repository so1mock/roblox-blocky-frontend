export type Category =
  | "logic_category"
  | "math_category"
  | "control_category"
  | "loop_category"
  | "variable_category"
  | "event_category"
  | "service_category"
  | "roblox_instance_category"
  | "roblox_part_category"
  | "roblox_humanoid_category"
  | "color_category";

export type CategoryName =
  | "수식"
  | "논리"
  | "제어"
  | "반복"
  | "변수"
  | "이벤트"
  | "인스턴스"
  | "색상"
  | "파트"
  | "휴머노이드"
  | "서비스";
export type BlockKind = "block" | "label" | "button" | "sep";

export type BlockComponent =
  | {
      componentType: "ValueInput";
      name: string;
      check?: string | null;
    }
  | {
      componentType: "DummyInput";
      fieldText?: string;
    }
  | {
      componentType: "FieldInput";
      fieldType: string; // 예: "text"
      fieldValue: string;
      name: string;
    }
  | {
      componentType: "FieldNumber";
      value?: number;
      name: string;
    }
  | {
      componentType: "StatementInput";
      name: string;
      fieldText?: string;
    }
  | {
      componentType: "FieldDropdown";
      name: string;
      options: Array<{
        name: string;
        value: string;
      }>;
    };

export type BlockListByCategory = {
  categoryName: Category;
  blocks: Block[];
};

export type Block = {
  type: string;
  blockDefinition: BlockDefinition;
  toolboxDefinition: DefinitionForToolbox;
};

export type BlockDefinition = {
  style?: string;
  output?: string;
  inputsInline?: boolean;
  previousStatement?: boolean;
  nextStatement?: boolean;
  components: BlockComponent[];
};

export type DefinitionForToolbox = {
  kind: BlockKind;
  type?: string;
  inputs?: {
    [inputName: string]: {
      shadow: ShadowValue;
    };
  };
  text?: string;
  callbackKey?: string;
};

export type ShadowValue = {
  type: string;
  fields: Record<string, string | number>;
};

export type Toolbox = {
  kind: "categoryToolbox";
  contents: ToolboxContent[];
};

export type ToolboxContent = {
  kind: "category" | "sep";
  name?: CategoryName;
  categorystyle?: Category;
  contents?: DefinitionForToolbox[];
};
