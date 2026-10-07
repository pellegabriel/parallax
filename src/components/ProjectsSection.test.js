import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectsSection from './ProjectsSection';

const projects = [
  {
    id: 'fixture-a',
    publicUrl: 'https://example.com/a',
    images: [
      { src: 'a1.png', alt: { es: 'Captura A1', en: 'Screenshot A1' } },
      { src: 'a2.png', alt: { es: 'Captura A2', en: 'Screenshot A2' } },
    ],
    translations: {
      es: { title: 'Proyecto de prueba A', description: 'Descripción de prueba A' },
      en: { title: 'Test project A', description: 'Test description A' },
    },
  },
  {
    id: 'fixture-b',
    publicUrl: 'https://example.com/b',
    images: [{ src: 'b1.png', alt: { es: 'Captura B1' } }],
    translations: {
      es: { title: 'Proyecto de prueba B', description: 'Descripción de prueba B' },
      en: { title: 'Test project B', description: 'Test description B' },
    },
  },
  {
    id: 'fixture-c',
    publicUrl: 'https://example.com/c',
    images: [],
    translations: { es: { title: 'Proyecto de prueba C', description: 'Descripción de prueba C' } },
  },
];

beforeEach(() => {
  window.matchMedia.mockImplementation((query) => ({
    matches: false,
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));
});

const next = () => screen.getByRole('button', { name: 'Proyecto siguiente' });
const carousel = () => screen.getByRole('region', { name: 'Visor de proyectos' });

it('maqueta el carrusel vacío con flechas deshabilitadas y sin enlaces', () => {
  const { container } = render(<ProjectsSection projects={[]} />);
  expect(screen.getByRole('heading', { name: 'Proyectos' })).toBeVisible();
  expect(screen.getByRole('status')).toHaveTextContent('0 de 0');
  expect(screen.getByRole('button', { name: 'Proyecto anterior' })).toBeDisabled();
  expect(screen.getByRole('button', { name: 'Proyecto siguiente' })).toBeDisabled();
  expect(screen.getByText('Acá se van a ver las capturas de cada proyecto')).toBeVisible();
  expect(screen.queryByRole('link')).toBeNull();
  expect(container.querySelector('iframe')).toBeNull();
});

it('resuelve un proyecto con enlace externo, capturas y flechas deshabilitadas', () => {
  render(<ProjectsSection projects={[projects[0]]} />);
  expect(screen.getByRole('status')).toHaveTextContent('1 de 1');
  expect(next()).toBeDisabled();
  expect(screen.getByRole('button', { name: 'Proyecto anterior' })).toBeDisabled();
  const link = screen.getByRole('link', { name: /Abrir proyecto/ });
  expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  expect(link).toHaveAttribute('href', 'https://example.com/a');
  expect(link).toHaveAttribute('target', '_blank');
  expect(screen.getByRole('group', { name: 'Capturas de Proyecto de prueba A' })).toBeInTheDocument();
  expect(screen.getAllByRole('img')).toHaveLength(2);
  expect(screen.getByRole('img', { name: 'Captura A1' })).toHaveAttribute('src', 'a1.png');
  expect(screen.getByRole('img', { name: 'Captura A2' })).toHaveAttribute('loading', 'lazy');
  expect(screen.queryByTitle(/Vista interactiva/)).toBeNull();
});

it('navega circularmente, anuncia posición y cambia título y capturas', async () => {
  render(<ProjectsSection projects={projects} />);
  await userEvent.click(next());
  expect(screen.getByRole('status')).toHaveTextContent('2 de 3');
  expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Proyecto de prueba B');
  expect(screen.getByRole('group', { name: 'Capturas de Proyecto de prueba B' })).toBeInTheDocument();
  expect(screen.getAllByRole('img')).toHaveLength(1);
  await userEvent.click(next());
  expect(screen.getByRole('status')).toHaveTextContent('3 de 3');
  await userEvent.click(next());
  expect(screen.getByRole('status')).toHaveTextContent('1 de 3');
  expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Proyecto de prueba A');
  expect(next()).toHaveFocus();
});

it('muestra placeholder cuando el proyecto no tiene capturas', () => {
  render(<ProjectsSection projects={[projects[2]]} />);
  expect(screen.getByText('Capturas no disponibles')).toBeVisible();
  expect(screen.queryByRole('img')).toBeNull();
  expect(screen.queryByRole('button', { name: 'Desplazar capturas hacia adelante' })).toBeNull();
});

it('limita flechas, Inicio y Fin al foco del carrusel, sin capturar teclas ajenas', () => {
  render(<ProjectsSection projects={projects} />);
  fireEvent.keyDown(document, { key: 'ArrowRight' });
  fireEvent.keyDown(screen.getByRole('link', { name: /Abrir proyecto/ }), { key: 'ArrowRight' });
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
});

it('desplaza la galería con sus flechas usando scrollBy suave', async () => {
  const scrollBy = jest.fn();
  Element.prototype.scrollBy = scrollBy;
  render(<ProjectsSection projects={[projects[0]]} />);
  const strip = screen.getByRole('group', { name: 'Capturas de Proyecto de prueba A' });
  Object.defineProperty(strip, 'clientWidth', { configurable: true, value: 600 });
  await userEvent.click(screen.getByRole('button', { name: 'Desplazar capturas hacia adelante' }));
  expect(scrollBy).toHaveBeenCalledWith(expect.objectContaining({ behavior: 'smooth' }));
  expect(scrollBy.mock.calls[0][0].left).toBeGreaterThan(0);
  await userEvent.click(screen.getByRole('button', { name: 'Desplazar capturas hacia atrás' }));
  expect(scrollBy.mock.calls[1][0].left).toBeLessThan(0);
  expect(strip).toHaveAttribute('tabindex', '0');
  delete Element.prototype.scrollBy;
});

it('usa desplazamiento instantáneo con movimiento reducido', async () => {
  window.matchMedia.mockImplementation((query) => ({
    matches: query === '(prefers-reduced-motion: reduce)',
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));
  const scrollBy = jest.fn();
  Element.prototype.scrollBy = scrollBy;
  render(<ProjectsSection projects={[projects[0]]} />);
  await userEvent.click(screen.getByRole('button', { name: 'Desplazar capturas hacia adelante' }));
  expect(scrollBy).toHaveBeenCalledWith(expect.objectContaining({ behavior: 'auto' }));
  delete Element.prototype.scrollBy;
});

it('oculta una captura que falla y muestra placeholder si fallan todas', () => {
  render(<ProjectsSection projects={[projects[0]]} />);
  fireEvent.error(screen.getByRole('img', { name: 'Captura A1' }));
  expect(screen.queryByRole('img', { name: 'Captura A1' })).toBeNull();
  expect(screen.getByRole('img', { name: 'Captura A2' })).toBeInTheDocument();
  fireEvent.error(screen.getByRole('img', { name: 'Captura A2' }));
  expect(screen.queryByRole('img')).toBeNull();
  expect(screen.getByText('Capturas no disponibles')).toBeVisible();
});

it('traduce títulos, descripciones y alternativas al inglés', async () => {
  render(<ProjectsSection projects={projects} language="en" />);
  expect(screen.getByRole('heading', { name: 'Projects' })).toBeVisible();
  expect(screen.getByRole('status')).toHaveTextContent('1 of 3');
  expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Test project A');
  expect(screen.getByText('Test description A')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Open project/ })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: 'Screenshot A1' })).toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: 'Next project' }));
  expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Test project B');
});

it('se adapta a listas reemplazadas o vaciadas', async () => {
  const { rerender } = render(<ProjectsSection projects={projects} />);
  await userEvent.click(next());
  await userEvent.click(next());
  expect(screen.getByRole('status')).toHaveTextContent('3 de 3');
  rerender(<ProjectsSection projects={[projects[0]]} />);
  expect(screen.getByRole('status')).toHaveTextContent('1 de 1');
  expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Proyecto de prueba A');
  rerender(<ProjectsSection projects={[]} />);
  const section = within(screen.getByRole('region', { name: 'Proyectos' }));
  section.getAllByRole('button').forEach((button) => expect(button).toBeDisabled());
  expect(screen.queryByRole('link')).toBeNull();
});
