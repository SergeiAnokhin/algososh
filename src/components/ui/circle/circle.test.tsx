import { Circle } from './circle';
import renderer from 'react-test-renderer';
import { ElementStates } from '../../../types/element-states';

describe('Компонент Circle', () => {
    it("отрисовка без буквы", () => {
        const tree = renderer
            .create(<Circle />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("отрисовка с буквами", () => {
        const tree = renderer
            .create(<Circle letter="test"/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("отрисовка с head", () => {
        const tree = renderer
            .create(<Circle head="1"/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("отрисовка с react-элементом в head", () => {
        const tree = renderer
            .create(<Circle head={<Circle />}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("отрисовка с tail", () => {
        const tree = renderer
            .create(<Circle tail="1"/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("отрисовка с react-элементом в tail", () => {
        const tree = renderer
            .create(<Circle tail={<Circle />}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("отрисовка с index", () => {
        const tree = renderer
            .create(<Circle index={1}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("отрисовка с пропом isSmall === true", () => {
        const tree = renderer
            .create(<Circle isSmall={true} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("отрисовка в состоянии default", () => {
        const tree = renderer
            .create(<Circle state={ElementStates.Default} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("отрисовка в состоянии changing", () => {
        const tree = renderer
            .create(<Circle state={ElementStates.Changing} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("отрисовка в состоянии modified", () => {
        const tree = renderer
            .create(<Circle state={ElementStates.Modified} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});