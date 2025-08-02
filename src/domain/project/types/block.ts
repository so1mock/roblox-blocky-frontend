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
      componentType: "FieldDropdown";
      name: string;
      options: { name: string; value: string }[];
    }
  | {
      componentType: "Component$StatementInput";
      fieldText: string;
      name: string;
    };

export type BlockDefinition = {
  style?: string | null;
  output?: string;
  nextStatement?: string | null;
  previousStatement?: string | null;
  inputsInline?: boolean;
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

export type BlockListResponse = {
  categoryName: string;
  blocks: BlockWithToolboxList;
};
