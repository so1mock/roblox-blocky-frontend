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
      componentType: "Component$StatementInput";
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

export type BlockDefinition = {
  style?: string;
  output?: string;
  inputsInline?: boolean;
  previousStatement?: boolean;
  nextStatement?: boolean;
  components: BlockComponent[];
};

export type ToolboxShadow = {
  type: string;
  fields: Record<string, string | number>;
};

export type ToolboxInputs = {
  [inputName: string]: {
    shadow: ToolboxShadow;
  };
};

export type ToolboxDefinition = {
  kind: "block";
  toolboxInputs: ToolboxInputs;
};

export type BlockWithToolbox = {
  type: string;
  definition: BlockDefinition;
  toolBoxDefinition: ToolboxDefinition;
};

export type BlockWithToolboxList = BlockWithToolbox[];

export type BlockListByCategoryResponse = {
  categoryName:
    | "logic_category"
    | "math_category"
    | "control_category"
    | "control_category"
    | "variable_category";
  blocks: BlockWithToolboxList;
};

export type ConvertedScript = {
  content: string;
};

export type Toolbox = {
  kind: string;
  contents: ToolboxContent[];
};

export type ToolboxContent = {
  kind: "category" | "sep";
  name?: "수식" | "논리" | "제어" | "반복" | "변수" | "이벤트" | "서비스";
  categorystyle?:
    | "logic_category"
    | "math_category"
    | "control_category"
    | "loop_category"
    | "variable_category"
    | "event_category"
    | "service_category";
  contents?: BlockCategory[];
};

export type BlockCategory = {
  kind: "block" | "button" | "sep";
  callbackKey?: string;
  text?: string;
  type?: string;
  inputs?: ToolboxInputs;
};
