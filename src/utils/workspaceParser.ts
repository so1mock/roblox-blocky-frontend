// Workspace JSON 파싱 유틸리티

interface Variable {
  name: string;
  id: string;
  type?: string;
}

interface Block {
  type: string;
  id: string;
  fields?: {
    [key: string]: {
      id?: string;
      [key: string]: any;
    };
  };
  [key: string]: any;
}

interface WorkspaceData {
  blocks: {
    blocks: Block[];
  };
  variables: Variable[];
}

/**
 * variables_get 또는 variables_set 블록이 참조하는 변수 이름을 찾습니다
 */
export function getVariableNameFromBlock(block: Block, variables: Variable[]): string | null {
  // variables_get 또는 variables_set 블록인지 확인
  if (!block.type.startsWith('variables_')) {
    return null;
  }

  // VAR 필드에서 변수 ID 추출
  const varId = block.fields?.VAR?.id;
  if (!varId) {
    return null;
  }

  // variables 배열에서 해당 ID를 가진 변수 찾기
  const variable = variables.find(v => v.id === varId);
  return variable?.name || null;
}

/**
 * 워크스페이스 JSON을 분석하여 변수 사용 정보를 추출합니다
 */
export function analyzeVariableUsage(workspaceData: WorkspaceData) {
  const { blocks, variables } = workspaceData;
  const variableUsage: Array<{
    blockId: string;
    blockType: string;
    variableName: string;
    variableType?: string;
    position: { x: number; y: number };
  }> = [];

  blocks.blocks.forEach(block => {
    if (block.type.startsWith('variables_')) {
      const variableName = getVariableNameFromBlock(block, variables);
      if (variableName) {
        const variable = variables.find(v => v.name === variableName);
        variableUsage.push({
          blockId: block.id,
          blockType: block.type,
          variableName,
          variableType: variable?.type,
          position: { x: block.x || 0, y: block.y || 0 }
        });
      }
    }
  });

  return variableUsage;
}

/**
 * 특정 변수가 사용된 모든 블록을 찾습니다
 */
export function findBlocksUsingVariable(
  variableName: string, 
  workspaceData: WorkspaceData
): Block[] {
  const { blocks, variables } = workspaceData;
  
  // 변수 이름으로 ID 찾기
  const variable = variables.find(v => v.name === variableName);
  if (!variable) {
    return [];
  }

  // 해당 변수 ID를 참조하는 모든 블록 찾기
  return blocks.blocks.filter(block => {
    if (!block.type.startsWith('variables_')) {
      return false;
    }
    return block.fields?.VAR?.id === variable.id;
  });
}

/**
 * 예시 사용법을 위한 데모 함수
 */
export function demoVariableAnalysis() {
  const exampleData: WorkspaceData = {
    blocks: {
      blocks: [
        {
          type: "variables_get",
          id: "R0PO,|u+J2Qg#P~%5WXw",
          x: 371,
          y: 261,
          fields: {
            VAR: {
              id: "+[%-UMS)0T}~wNOZzV]V"
            }
          }
        }
      ]
    },
    variables: [
      {
        name: "item",
        id: "M$6HKRYOvznN{]zR{Lvo"
      },
      {
        name: "gasgdf", 
        id: "+[%-UMS)0T}~wNOZzV]V",
        type: "String"
      }
    ]
  };

  console.log("=== 변수 사용 분석 ===");
  const usage = analyzeVariableUsage(exampleData);
  console.log(usage);

  console.log("=== 특정 변수 사용처 찾기 ===");
  const blocksUsingGasgdf = findBlocksUsingVariable("gasgdf", exampleData);
  console.log(blocksUsingGasgdf);

  console.log("=== 개별 블록 변수 이름 찾기 ===");
  const block = exampleData.blocks.blocks[0];
  const varName = getVariableNameFromBlock(block, exampleData.variables);
  console.log(`블록 ${block.id}는 변수 "${varName}"을 사용합니다`);
}
