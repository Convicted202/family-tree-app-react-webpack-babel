import {World} from '../src/js/hello.jsx';

describe("test", () => {

    it("should return true", () => {
        // Assert
        expect(true).toBe(true);
    });

    it("should add two numbers", () => {
        let world = new World(),
            sum = world.add(2, 3);

        expect(sum).toBe(5);
    })
});
