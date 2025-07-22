export default {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "수식",
      categorystyle: "logic_category",
      contents: [
        {
          type: "math_number",
          blockStyle: "math_number2",
          kind: "block",
          fields: {
            NUM: 123,
          },
        },
      ],
    },
    {
      kind: "category",
      name: "논리",
      categorystyle: "loop_category",
      contents: [
        {
          type: "controls_repeat_ext",
          kind: "block",
          inputs: {
            TIMES: {
              shadow: {
                type: "math_number",
                fields: {
                  NUM: 10,
                },
              },
            },
          },
        },
      ],
    },
    {
      kind: "category",
      name: "제어",
      categorystyle: "math_category",
      contents: [
        {
          type: "controls_if",
          kind: "block",
        },
      ],
    },
    {
      kind: "category",
      name: "반복",
      categorystyle: "text_category",
      contents: [
        {
          type: "text",
          kind: "block",
          fields: {
            TEXT: "",
          },
        },
      ],
    },
    {
      kind: "category",
      name: "이벤트",
      categorystyle: "list_category",
      contents: [
        {
          type: "lists_create_with",
          kind: "block",
        },
      ],
    },
    {
      kind: "sep",
    },
    {
      kind: "category",
      name: "서비스",
      custom: "VARIABLE",
      categorystyle: "variable_category",
    },
    {
      kind: "category",
      name: "변수",
      custom: "PROCEDURE",
      categorystyle: "procedure_category",
    },
  ],
};
