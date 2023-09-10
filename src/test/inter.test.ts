import Implements, {getImplements} from "../decorator/Implements";

@Implements("A", "B")
class InterTest {

}

it('interface', function () {
    let strings = getImplements(InterTest);
    expect(strings[0]).toBe("A");
    expect(strings[1]).toBe("B");
});