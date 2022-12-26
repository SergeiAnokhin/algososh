import { Button } from './button';
import { render, screen, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';

describe('Компонент Button', () => {
    it('отрисовка кнопки с текстом', () => {
        const tree = renderer
            .create(<Button text='text' />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('отрисовка кнопки без текста', () => {
        const tree = renderer
            .create(<Button />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('отрисовка заблокированной кнопки', () => {
        const tree = renderer
            .create(<Button disabled />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('отрисовка кнопки с индикацией загрузки', () => {
        const tree = renderer
            .create(<Button isLoader={true} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('проверка корректности вызова колбека при клике на кнопку', () => {
        const callBack = jest.fn();
        render(<Button onClick={callBack}/>);
        fireEvent.click(screen.getByRole('button'));
        expect(callBack).toHaveBeenCalled();
    });
});