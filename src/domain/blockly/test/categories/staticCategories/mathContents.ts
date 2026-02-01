import type { DefinitionForToolbox } from "@place/types/block";

export const mathContents: DefinitionForToolbox[] = [
  {
    type: "math_number",
    kind: "block",
  },
  {
    type: "plus_block",
    kind: "block",
    inputs: {
      A: {
        shadow: {
          type: "math_number",
          fields: {
            NUM: 0,
          },
        },
      },
      B: {
        shadow: {
          type: "math_number",
          fields: {
            NUM: 0,
          },
        },
      },
    },
  },
  {
    type: "minus_block",
    kind: "block",
    inputs: {
      A: {
        shadow: {
          type: "math_number",
          fields: {
            NUM: 0,
          },
        },
      },
      B: {
        shadow: {
          type: "math_number",
          fields: {
            NUM: 0,
          },
        },
      },
    },
  },
  {
    type: "multify_block",
    kind: "block",
    inputs: {
      A: {
        shadow: {
          type: "math_number",
          fields: {
            NUM: 0,
          },
        },
      },
      B: {
        shadow: {
          type: "math_number",
          fields: {
            NUM: 0,
          },
        },
      },
    },
  },
  {
    type: "divide_block",
    kind: "block",
    inputs: {
      A: {
        shadow: {
          type: "math_number",
          fields: {
            NUM: 0,
          },
        },
      },
      B: {
        shadow: {
          type: "math_number",
          fields: {
            NUM: 0,
          },
        },
      },
    },
  },
  {
    type: "mod_block",
    kind: "block",
    inputs: {
      A: {
        shadow: {
          type: "math_number",
          fields: {
            NUM: 0,
          },
        },
      },
      B: {
        shadow: {
          type: "math_number",
          fields: {
            NUM: 0,
          },
        },
      },
    },
  },
  {
    type: "random_block",
    kind: "block",
    inputs: {
      A: {
        shadow: {
          type: "math_number",
          fields: {
            NUM: 0,
          },
        },
      },
      B: {
        shadow: {
          type: "math_number",
          fields: {
            NUM: 0,
          },
        },
      },
    },
  },
  {
    type: "vector_block",
    kind: "block",
  },
  {
    type: "cframe_block",
    kind: "block",
  },
  {
    type: "look_vector_block",
    kind: "block",
  },
  {
    type: "create_player_variable",
    kind: "block",
  },
];
