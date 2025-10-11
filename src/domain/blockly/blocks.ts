import * as Blockly from "blockly";
import type { Block } from "@place/types/block";

// ValueInput: 블록이 다른 블록으로부터 값을 입력받을 수 있는 입력 슬롯
// DummyInput: 다른 블록과 연결되지 않는 입력 공간 (단순한 레이블이나 UI 요소)
// StatementInput: 실행 블록들을 담을 수 있는 슬롯
// FieldInput: 텍스트를 입력할 수 있는 블록 (DummyInput의 하위 요소)
// FieldNumber: 숫자를 입력할 수 있는 블록 (DummyInput의 하위 요소)
// FieldDropdown: 드롭다운이 있는 블록을 담을 수 있는 블록 (DummyInput의 하위 요소)

/**
 * 블록 초기화 함수
 *
 * 주어진 블록 정의 리스트(`BlockWithToolboxList`)를 기반으로
 * Blockly에 커스텀 블록을 등록합니다.
 *
 * 각 블록 정의 안의 `components` 배열을 순회하며,
 * ValueInput, DummyInput, StatementInput, FieldInput, FieldNumber, FieldDropdown 등을
 * Blockly 블록 입력 형태로 변환합니다.
 *
 * @param {BlockWithToolboxList} blocks - 등록할 블록들의 정의 리스트
 *
 * @example
 * initBlocks([
 *   {
 *     type: "math_number",
 *     definition: {
 *       components: [
 *         { componentType: "FieldNumber", name: "NUM", value: 10 }
 *       ],
 *       output: "Number",
 *       style: "math_blocks"
 *     }
 *   }
 * ]);
 */
export const initBlocks = (blocks: Block[]) => {
  // 1. 등록
  console.log(blocks);
  blocks.forEach((block) => {
    console.log(block);
    Blockly.Blocks[block.type] = {
      init: function () {
        block.blockDefinition.components.forEach((component) => {
          /**
           * ValueInput:
           * - 다른 블록으로부터 값을 입력받을 수 있는 슬롯을 생성합니다.
           * - 예: 수학 연산 블록의 피연산자 위치
           */
          if (component.componentType === "ValueInput") {
            const input = this.appendValueInput(component.name);
            if (component.check) input.setCheck(component.check);
          } else if (component.componentType === "DummyInput") {
            /**
             * DummyInput:
             * - 다른 블록과 연결되지 않는 단순한 입력 공간
             * - 주로 레이블, 설명 텍스트, UI 요소를 추가할 때 사용
             */
            const dummy = this.appendDummyInput();
            if (component.fieldText) dummy.appendField(component.fieldText);
          } else if (component.componentType === "FieldInput") {
            /**
             * FieldInput:
             * - 사용자가 직접 텍스트를 입력할 수 있는 필드
             * - DummyInput의 하위 요소로 사용됨
             */
            const dummy = this.appendDummyInput();
            dummy.appendField(
              new Blockly.FieldTextInput(component.fieldValue ?? ""),
              component.name,
            );
          } else if (component.componentType === "FieldNumber") {
            /**
             * FieldNumber:
             * - 사용자가 숫자를 입력할 수 있는 필드
             * - DummyInput의 하위 요소로 사용됨
             */
            const dummy = this.appendDummyInput();
            dummy.appendField(
              new Blockly.FieldNumber(component.value ?? 0),
              component.name,
            );
          } else if (component.componentType === "StatementInput") {
            /**
             * StatementInput:
             * - 실행 블록들을 담을 수 있는 슬롯
             * - 보통 if, 반복문, 함수 정의 등 실행 흐름 블록에서 사용
             */
            const input = this.appendStatementInput(component.name);
            if (component.fieldText) input.appendField(component.fieldText);
          } else if (component.componentType === "FieldDropdown") {
            /**
             * FieldDropdown:
             * - 드롭다운 메뉴가 있는 입력 필드
             * - 선택지(이름, 값 쌍)를 기반으로 사용자 입력을 제한
             */
            const dummy = this.appendDummyInput();
            const options = component.options.map(
              (option) => [option.name, option.value] as [string, string],
            );
            dummy.appendField(
              new Blockly.FieldDropdown(options),
              component.name,
            );
          }
        });

        /**
         * 블록 공통 속성 설정
         */
        if (block.blockDefinition.output) {
          // 블록이 타입을 반환하도록 설정 (Expression 블록)
          this.setOutput(true, block.blockDefinition.output);
        }
        if (block.blockDefinition.previousStatement) {
          // 이전 블록과 연결 가능
          this.setPreviousStatement(true, null);
        }
        if (block.blockDefinition.nextStatement) {
          // 다음 블록과 연결 가능
          this.setNextStatement(true, null);
        }
        if (block.blockDefinition.inputsInline !== undefined) {
          // 입력 필드들을 한 줄에 표시할지 여부
          this.setInputsInline(block.blockDefinition.inputsInline);
        }
        if (block.blockDefinition.style) {
          // 블록의 스타일 지정 (색상, 카테고리 등)
          this.setStyle(block.blockDefinition.style);
        }
      },
    };
  });
};

// to do: Blockly타입과 계층 구조 맞추기, 파일 분리를 통해 유지보수에 용이한 구조로 고치기
