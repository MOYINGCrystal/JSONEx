export {}

const SpeciesDecorator: PropertyDecorator = (target, name) => {
    console.log({target, name});
    target["123"] = "abc";
    debugger;
}

class Human {
    @SpeciesDecorator
    species = 'Human';
}

it('test', function () {
    console.log(new Human().species);
    debugger;
});