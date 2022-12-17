import { ElementStates } from "../../types/element-states";
import { reverseString } from "../string/utils";

describe("Разворот строки", () => {
  it("с четным количеством символов", async () => {
    const initialArr = [
      { chars: "j", state: ElementStates.Default },
      { chars: "e", state: ElementStates.Default },
      { chars: "s", state: ElementStates.Default },
      { chars: "t", state: ElementStates.Default },
    ];
    const resultArr = [
      { chars: "t", state: ElementStates.Modified },
      { chars: "s", state: ElementStates.Modified },
      { chars: "e", state: ElementStates.Modified },
      { chars: "j", state: ElementStates.Modified },
    ];
    expect(await reverseString(initialArr, () => {})).toEqual(resultArr);
  });

  it("с нечетным количеством символов", async () => {
    const initialArr = [
      { chars: "j", state: ElementStates.Default },
      { chars: "e", state: ElementStates.Default },
      { chars: "s", state: ElementStates.Default },
    ];
    const resultArr = [
      { chars: "s", state: ElementStates.Modified },
      { chars: "e", state: ElementStates.Modified },
      { chars: "j", state: ElementStates.Modified },
    ];
    expect(await reverseString(initialArr, () => {})).toEqual(resultArr);
  });

  it("с одним символом", async () => {
    const initialArr = [{ chars: "j", state: ElementStates.Default }];
    const resultArr = [{ chars: "j", state: ElementStates.Modified }];
    expect(await reverseString(initialArr, () => {})).toEqual(resultArr);
  });

  it("с пустой строкой", async () => {
    const array = [];
    expect(await reverseString(array, () => {})).toEqual(array);
  });
});