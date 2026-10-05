import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectsSection from './ProjectsSection';

const projects = [
  { id: 'fixture-a', title: 'Proyecto de prueba A', description: 'Descripción de prueba A', publicUrl: 'https://example.com/a', embedUrl: 'https://example.com/embed/a', coverAlt: 'Alternativa de prueba A' },
  { id: 'fixture-b', title: 'Proyecto de prueba B', description: 'Descripción de prueba B', publicUrl: 'https://example.com/b', coverAlt: 'Alternativa de prueba B' },
  { id: 'fixture-c', title: 'Proyecto de prueba C', description: 'Descripción de prueba C', publicUrl: 'https://example.com/c', embedUrl: 'https://example.com/embed/c', embedSandbox: ['allow-scripts'], embedAllow: [] },
];

const next = () => screen.getByRole('button', { name: 'Proyecto siguiente' });
const activate = () => screen.getByRole('button', { name: 'Activar vista interactiva' });
const carousel = () => screen.getByRole('region', { name: 'Visor de proyectos' });

it('maqueta el carrusel vacío con flechas deshabilitadas y sin iframes', () => {
  const { container } = render(<ProjectsSection projects={[]} />);
  expect(screen.getByRole('heading', { name: 'Proyectos' })).toBeVisible();
  expect(screen.getByRole('status')).toHaveTextContent('0 de 0');
  expect(screen.getByRole('button', { name: 'Proyecto anterior' })).toBeDisabled();
  expect(screen.getByRole('button', { name: 'Proyecto siguiente' })).toBeDisabled();
  expect(screen.getByText('Próximamente, nuestros proyectos')).toBeVisible();
  expect(screen.queryByRole('button', { name: 'Activar vista interactiva' })).toBeNull();
  expect(screen.queryByRole('link')).toBeNull();
  expect(container.querySelector('iframe')).toBeNull();
});

it('resuelve un proyecto no embebible con enlace externo y flechas deshabilitadas', () => {
  render(<ProjectsSection projects={[projects[1]]} />);
  expect(screen.getByRole('status')).toHaveTextContent('1 de 1');
  expect(next()).toBeDisabled();
  expect(screen.getByRole('button', { name: 'Proyecto anterior' })).toBeDisabled();
  expect(screen.queryByRole('button', { name: 'Activar vista interactiva' })).toBeNull();
  expect(screen.getByRole('link', { name: /Abrir proyecto/ })).toHaveAttribute('rel', 'noopener noreferrer');
  expect(screen.getByRole('link', { name: /Abrir proyecto/ })).toHaveAttribute('href', projects[1].publicUrl);
});

it('monta solo al activar y desmonta al salir, restaurando el foco', () => {
  const { container } = render(<ProjectsSection projects={projects} />);
  expect(container.querySelector('iframe')).toBeNull();
  userEvent.click(activate());
  const frame = screen.getByTitle('Vista interactiva de Proyecto de prueba A');
  expect(frame).toHaveAttribute('sandbox', '');
  expect(frame).toHaveAttribute('referrerpolicy', 'no-referrer');
  expect(frame).not.toHaveAttribute('allow');
  const exit = screen.getByRole('button', { name: 'Salir de la vista interactiva' });
  expect(exit).toHaveFocus();
  userEvent.click(exit);
  expect(container.querySelector('iframe')).toBeNull();
  expect(activate()).toHaveFocus();
});

it('mantiene salida, enlace y aviso durante carga lenta, onLoad y error', () => {
  render(<ProjectsSection projects={projects} />);
  userEvent.click(activate());
  const frame = screen.getByTitle('Vista interactiva de Proyecto de prueba A');
  const checkFallbacks = () => {
    expect(screen.getByRole('button', { name: 'Salir de la vista interactiva' })).toBeEnabled();
    expect(screen.getByRole('link', { name: /Abrir proyecto/ })).toBeVisible();
    expect(screen.getByText(/Si el sitio tarda/)).toBeVisible();
  };
  checkFallbacks();
  fireEvent.load(frame);
  checkFallbacks();
  fireEvent.error(frame);
  checkFallbacks();
});

it('navega circularmente, anuncia posición y no reactiva iframes anteriores', () => {
  const { container } = render(<ProjectsSection projects={projects} />);
  userEvent.click(activate());
  userEvent.click(next());
  expect(container.querySelector('iframe')).toBeNull();
  expect(screen.getByRole('status')).toHaveTextContent('2 de 3');
  userEvent.click(next());
  userEvent.click(activate());
  expect(container.querySelectorAll('iframe')).toHaveLength(1);
  expect(screen.getByTitle('Vista interactiva de Proyecto de prueba C')).toHaveAttribute('sandbox', 'allow-scripts');
  userEvent.click(next());
  expect(screen.getByRole('status')).toHaveTextContent('1 de 3');
  expect(container.querySelector('iframe')).toBeNull();
  expect(next()).toHaveFocus();
});

it('limita flechas, Inicio y Fin al foco del carrusel, sin capturar teclas ajenas', () => {
  render(<ProjectsSection projects={projects} />);
  fireEvent.keyDown(document, { key: 'ArrowRight' });
  fireEvent.keyDown(activate(), { key: 'ArrowRight' });
  expect(screen.getByRole('status')).toHaveTextContent('1 de 3');
  carousel().focus();
  fireEvent.keyDown(carousel(), { key: 'ArrowLeft' });
  expect(screen.getByRole('status')).toHaveTextContent('3 de 3');
  fireEvent.keyDown(carousel(), { key: 'Home' });
  expect(screen.getByRole('status')).toHaveTextContent('1 de 3');
  fireEvent.keyDown(carousel(), { key: 'End' });
  expect(screen.getByRole('status')).toHaveTextContent('3 de 3');
  fireEvent.keyDown(carousel(), { key: 'ArrowRight', ctrlKey: true });
  expect(screen.getByRole('status')).toHaveTextContent('3 de 3');
  userEvent.click(activate());
  fireEvent.keyDown(screen.getByTitle('Vista interactiva de Proyecto de prueba C'), { key: 'ArrowRight' });
  expect(screen.getByRole('status')).toHaveTextContent('3 de 3');
});

it('permite deslizamiento horizontal sin cancelar scroll vertical ni gestos múltiples', () => {
  render(<ProjectsSection projects={projects} />);
  const swipe = (target, x, y) => {
    fireEvent.touchStart(target, { touches: [{ clientX: 220, clientY: 100 }] });
    expect(fireEvent.touchMove(target, { touches: [{ clientX: x, clientY: y }] })).toBe(true);
    fireEvent.touchEnd(target, { changedTouches: [{ clientX: x, clientY: y }] });
  };
  swipe(screen.getByLabelText('Vista previa de Proyecto de prueba A'), 100, 110);
  expect(screen.getByRole('status')).toHaveTextContent('2 de 3');
  swipe(screen.getByLabelText('Vista previa de Proyecto de prueba B'), 160, 250);
  expect(screen.getByRole('status')).toHaveTextContent('2 de 3');
  const preview = screen.getByLabelText('Vista previa de Proyecto de prueba B');
  fireEvent.touchStart(preview, { touches: [{ clientX: 220, clientY: 100 }, { clientX: 200, clientY: 100 }] });
  fireEvent.touchEnd(preview, { changedTouches: [{ clientX: 100, clientY: 100 }] });
  expect(screen.getByRole('status')).toHaveTextContent('2 de 3');
  fireEvent.touchStart(preview, { touches: [{ clientX: 220, clientY: 100 }] });
  fireEvent.touchCancel(preview);
  fireEvent.touchEnd(preview, { changedTouches: [{ clientX: 100, clientY: 100 }] });
  expect(screen.getByRole('status')).toHaveTextContent('2 de 3');
});

it('muestra portada con alternativa y recupera placeholder si falla', () => {
  render(<ProjectsSection projects={[{ ...projects[0], coverImage: '/fixture-cover.png' }]} />);
  const cover = screen.getByRole('img', { name: 'Alternativa de prueba A' });
  fireEvent.error(cover);
  expect(screen.queryByRole('img')).toBeNull();
  expect(screen.getByText('Alternativa de prueba A')).toBeVisible();
});

it('se adapta a listas reemplazadas o vaciadas sin retener un iframe', () => {
  const { container, rerender } = render(<ProjectsSection projects={projects} />);
  userEvent.click(next());
  userEvent.click(next());
  userEvent.click(activate());
  rerender(<ProjectsSection projects={[projects[0]]} />);
  expect(container.querySelector('iframe')).toBeNull();
  expect(screen.getByRole('status')).toHaveTextContent('1 de 1');
  rerender(<ProjectsSection projects={[]} />);
  const section = within(screen.getByRole('region', { name: 'Proyectos' }));
  section.getAllByRole('button').forEach((button) => expect(button).toBeDisabled());
});
