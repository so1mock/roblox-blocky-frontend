import type { BlockListResponse } from "../../../../types/block";

export const makeVariableContents = (blockListResponse: BlockListResponse) => {
  // 서버에서 변수 블록 데이터가 없으면 로컬 변수 블록들을 사용
  if (!blockListResponse.blocks || blockListResponse.blocks.length === 0) {
    return [
      {
        kind: "button",
        text: "변수 생성",
        callbackKey: "CREATE_VARIABLE",
      },
      {
        kind: "block",
        type: "variables_get",
      },
      {
        kind: "block", 
        type: "variables_set",
      },
      {
        kind: "block",
        type: "variables_type_check",
      },
      {
        kind: "block",
        type: "variables_type_convert",
      },
    ];
  }
  
  return blockListResponse.blocks.map((block) => ({
    kind: "block",
    type: block.type,
  }));
};
