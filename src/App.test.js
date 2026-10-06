import { act, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import HomeScreen from './screens/HomeScreen';
import LiquidFooter from './components/LiquidFooter';
import LiquidSidebar from './components/LiquidSidebar';

beforeEach(() => {
  window.matchMedia.mockImplementation((query) => ({
    matches: query === '(prefers-reduced-motion: reduce)',
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));
});

afterEach(() => {
  localStorage.removeItem('the-cave-language');
  document.documentElement.lang = 'es';
  jest.restoreAllMocks();
  jest.useRealTimers();
});

test('el loader da paso a la app real', async () => {
  jest.useFakeTimers();
  const images = [];
  jest.spyOn(window, 'Image').mockImplementation(() => {
    const image = {};
    images.push(image);
    return image;
  });
  render(<App />);
  expect(screen.getByText(/CARGANDO/)).toBeVisible();
  await act(async () => {
    fireEvent.load(window);
    images.forEach((image) => image.onload());
  });
  act(() => jest.advanceTimersByTime(1100));
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Bienvenidx a.*the cave/);
});

test('el selector ES/EN traduce bienvenida, proyectos, menú, contacto y footer sin recargar', () => {
  jest.useFakeTimers();
  render(<HomeScreen />);
  fireEvent.click(screen.getByRole('button', { name: 'English' }));
  expect(document.documentElement).toHaveAttribute('lang', 'en');
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Welcomx to.*the cave/);
  expect(screen.getByRole('region', { name: 'Projects' })).toHaveTextContent('0 of 0');
  expect(screen.getByRole('button', { name: 'Schedule a call' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Explore our services' })).toBeInTheDocument();
  expect(screen.getByRole('region', { name: 'Our Team' })).toHaveTextContent('We get involved in what moves your business forward.');
  expect(screen.getByRole('contentinfo')).toHaveTextContent('All rights reserved');
  expect(screen.getByRole('navigation', { name: 'Explore' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'English, selected' })).toHaveAttribute('aria-pressed', 'true');
  fireEvent.click(screen.getByRole('button', { name: 'Menu' }));
  fireEvent.click(screen.getByRole('button', { name: 'Contact' }));
  expect(screen.getByRole('dialog', { name: 'Contact' })).toHaveTextContent('Have a project or a question? Get in touch.');
  act(() => jest.advanceTimersByTime(850));
  expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Your email')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Español' }));
  expect(document.documentElement).toHaveAttribute('lang', 'es');
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Bienvenidx a.*the cave/);
  expect(screen.getByRole('dialog', { name: 'Contacto' })).toBeInTheDocument();
});

test('App recupera el idioma guardado y lo conserva al volver a cargar', async () => {
  jest.useFakeTimers();
  localStorage.setItem('the-cave-language', 'en');
  const images = [];
  jest.spyOn(window, 'Image').mockImplementation(() => {
    const image = {};
    images.push(image);
    return image;
  });
  const { unmount } = render(<App />);
  expect(screen.getByText(/LOADING/)).toBeInTheDocument();
  await act(async () => {
    fireEvent.load(window);
    images.forEach((image) => image.onload());
  });
  act(() => jest.advanceTimersByTime(1100));
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Welcomx to/);
  fireEvent.click(screen.getByRole('button', { name: 'Español' }));
  expect(localStorage.getItem('the-cave-language')).toBe('es');
  unmount();
  render(<App />);
  expect(screen.getByText(/CARGANDO/)).toBeInTheDocument();
});

test('integra a Gabriel y Tomas antes de proyectos sin duplicar perfiles ni el logo', () => {
  const { container } = render(<HomeScreen />);
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  expect(screen.getAllByAltText('The Cave Logo')).toHaveLength(1);
  const sections = container.querySelectorAll('main > section');
  expect(sections).toHaveLength(3);
  expect(sections[1]).toHaveAttribute('id', 'equipo');
  expect(sections[2]).toHaveAttribute('id', 'proyectos');
  const team = within(screen.getByRole('region', { name: 'Nuestro Equipo' }));
  expect(team.getByRole('heading', { level: 2 })).toHaveTextContent('Nos involucramos en lo que hace avanzar a tu negocio.');
  expect(team.getAllByRole('heading', { level: 3 }).map((element) => element.textContent)).toEqual(['Gabriel Pelle', 'Tomas Montesinos']);
  expect(screen.getAllByText('Gabriel Pelle')).toHaveLength(1);
  expect(screen.getAllByText('Tomas Montesinos')).toHaveLength(1);
  expect(team.getByAltText('Gabriel Pelle - CEO')).toHaveAttribute('src', 'gabi.jpg');
  expect(team.getByAltText('Tomas Montesinos - CTO')).toHaveAttribute('src', 'tomy.jpg');
  expect(team.getByAltText('Nuestra misión')).toBeInTheDocument();
  expect(team.getByText('CEO')).toBeInTheDocument();
  expect(team.getByText('CTO')).toBeInTheDocument();
  expect(screen.queryByText(/Lucas/)).not.toBeInTheDocument();
  expect(team.queryByRole('button')).not.toBeInTheDocument();
});

test('agrupa las dos acciones bajo el nuevo texto de bienvenida y conserva sus destinos', () => {
  const open = jest.spyOn(window, 'open').mockImplementation(() => {});
  render(<HomeScreen />);
  const intro = screen.getByRole('heading', { level: 1 }).closest('section');
  expect(within(intro).getByText(/Tu negocio necesita soluciones que trabajen juntas/)).toBeInTheDocument();
  const call = screen.getByRole('button', { name: 'Agendá una llamada' });
  const services = screen.getByRole('button', { name: 'Conocé nuestros servicios' });
  expect(intro).toContainElement(call);
  expect(call).toHaveClass('primaryAction');
  expect(services).toHaveClass('secondaryAction');
  expect(call.parentElement).toBe(services.parentElement);
  expect(within(intro).getAllByRole('button')).toEqual([call, services]);
  userEvent.click(call);
  expect(open).toHaveBeenNthCalledWith(1, 'https://wa.me/542966305853?text=Hola%21%20Tengo%20inter%C3%A9s%20en%20trabajar%20con%20ustedes%20y%20quer%C3%ADa%20saber%20c%C3%B3mo%20podemos%20avanzar.', '_blank', 'noopener,noreferrer');
  userEvent.click(services);
  expect(open).toHaveBeenNthCalledWith(2, '/servicios.pdf', '_blank', 'noopener,noreferrer');
});

test.each([
  ['Proyectos', 'Proyectos'],
  ['Equipo', 'Nuestro Equipo'],
])('navega a %s, enfoca la sección y respeta movimiento reducido', (label, region) => {
  const scrollIntoView = jest.fn();
  Element.prototype.scrollIntoView = scrollIntoView;
  render(<HomeScreen />);
  expect(screen.queryByRole('navigation', { name: 'Navegación' })).toBeNull();
  act(() => userEvent.click(screen.getByRole('button', { name: 'Menú' })));
  act(() => userEvent.click(screen.getByRole('button', { name: label })));
  expect(screen.getByRole('region', { name: region })).toHaveFocus();
  expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'auto' });
  expect(screen.queryByRole('navigation', { name: 'Navegación' })).toBeNull();
  delete Element.prototype.scrollIntoView;
});

test('no inicia bucles de animación con movimiento reducido y conserva el líquido estático', () => {
  const requestFrame = jest.spyOn(window, 'requestAnimationFrame');
  const { container } = render(<HomeScreen />);
  expect(requestFrame).not.toHaveBeenCalled();
  expect(container.querySelector('[class*="liquidRing"]')).not.toHaveAttribute('d', 'M 0 0 Z');
  act(() => userEvent.click(screen.getByRole('button', { name: 'Menú' })));
  act(() => userEvent.click(screen.getByRole('button', { name: 'Contacto' })));
  expect(requestFrame).not.toHaveBeenCalled();
  expect(screen.getByRole('dialog')).toBeVisible();
});

function expectRotatedLiquid(container) {
  const sidebar = container.querySelector('svg[class*="blobSvg"]');
  const footer = container.querySelector('footer svg');
  const curves = (svg) => svg.querySelector('path').getAttribute('d').match(/C[^CLZ]+/g)
    .map((curve) => curve.slice(1).trim().split(/[\s,]+/).map(Number));
  const sidebarCurves = curves(sidebar).slice(1, -1);
  const footerCurves = curves(footer);
  expect(footerCurves).toHaveLength(sidebarCurves.length);
  sidebarCurves.forEach((curve, i) => {
    for (let j = 0; j < curve.length; j += 2) {
      expect(footerCurves[i][j]).toBeCloseTo(curve[j + 1], 8);
      expect(footerCurves[i][j + 1]).toBeCloseTo(396 - curve[j], 8);
    }
  });
  const sidebarDrips = sidebar.querySelectorAll('ellipse');
  const footerDrips = footer.querySelectorAll('ellipse');
  expect(footerDrips).toHaveLength(sidebarDrips.length);
  sidebarDrips.forEach((drip, i) => {
    const number = (el, attr) => Number(el.getAttribute(attr));
    expect(number(footerDrips[i], 'cx')).toBeCloseTo(number(drip, 'cy'), 8);
    expect(number(footerDrips[i], 'cy')).toBeCloseTo(396 - number(drip, 'cx'), 8);
    expect(number(footerDrips[i], 'rx')).toBeCloseTo(number(drip, 'ry'), 8);
    expect(number(footerDrips[i], 'ry')).toBeCloseTo(number(drip, 'rx'), 8);
  });
  const sidebarFilter = sidebar.querySelector('filter');
  const footerFilter = footer.querySelector('filter');
  expect(footerFilter.innerHTML).toBe(sidebarFilter.innerHTML);
}

test('el footer replica el sidebar rotado y se redibuja sin animar con movimiento reducido', () => {
  const width = jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(window.innerHeight);
  jest.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(220);
  const requestFrame = jest.spyOn(window, 'requestAnimationFrame');
  const { container } = render(<><LiquidSidebar initialOpen /><LiquidFooter /></>);
  expectRotatedLiquid(container);
  expect(requestFrame).not.toHaveBeenCalled();
  const svg = container.querySelector('footer svg');
  const previousPath = svg.querySelector('path').getAttribute('d');
  width.mockReturnValue(390);
  fireEvent.resize(window);
  expect(svg).toHaveAttribute('viewBox', '0 0 390 220');
  expect(svg.querySelector('path').getAttribute('d')).not.toBe(previousPath);
  expect(svg.querySelector('ellipse')).toHaveAttribute('cx', '97.5');
  expect(requestFrame).not.toHaveBeenCalled();
});

test('el footer conserva las ondas y pulsaciones del sidebar durante la animación y cancela sus frames', () => {
  window.matchMedia.mockImplementation((query) => ({
    matches: false,
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));
  jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(window.innerHeight);
  jest.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(220);
  let id = 0;
  const frames = new Map();
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
    frames.set(++id, callback);
    return id;
  });
  jest.spyOn(window, 'cancelAnimationFrame').mockImplementation((frame) => frames.delete(frame));
  const { container, unmount } = render(<><LiquidSidebar initialOpen /><LiquidFooter /></>);
  [100, 850, 1700, 3400, 6500].forEach((time) => {
    const callbacks = [...frames.values()];
    frames.clear();
    act(() => callbacks.forEach((callback) => callback(time)));
    expectRotatedLiquid(container);
  });
  unmount();
  expect(frames.size).toBe(0);
});

test.each([900, 901])('monta un solo logo y ubica las redes correctamente a %ipx', (width) => {
  window.matchMedia.mockImplementation((query) => ({
    matches: query === '(prefers-reduced-motion: reduce)' || (query === '(min-width: 901px)' && width >= 901) || (query === '(min-width: 1280px)' && width >= 1280) || (query === '(max-width: 900px)' && width <= 900),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));
  const { container } = render(<HomeScreen />);
  const logos = screen.getAllByAltText('The Cave Logo');
  expect(logos).toHaveLength(1);
  expect(logos[0].parentElement).toHaveStyle({ width: width === 900 ? '130px' : '280px' });
  const footer = screen.getByRole('contentinfo');
  expect(within(footer).getAllByRole('link')).toHaveLength(6);
  expect(footer).toContainElement(container.querySelector('.social-buttons'));
  expect(within(footer).getByRole('navigation', { name: 'Explorá' })).toBeInTheDocument();
  expect(footer).toHaveTextContent('© 2026 The Cave');
});

test.each([[1279, '280px'], [1280, '210px']])('prepara la bienvenida para la columna desktop a %ipx sin duplicar proyectos', (width, logoSize) => {
  window.matchMedia.mockImplementation((query) => ({
    matches: query === '(prefers-reduced-motion: reduce)' || query === '(min-width: 901px)' || (query === '(min-width: 1280px)' && width >= 1280),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));
  const { container } = render(<HomeScreen />);
  expect(screen.getByAltText('The Cave Logo').parentElement).toHaveStyle({ width: logoSize });
  expect(container.querySelectorAll('main > section')).toHaveLength(3);
  expect(screen.getAllByRole('region', { name: 'Proyectos' })).toHaveLength(1);
  expect(screen.getAllByRole('button', { name: 'Agendá una llamada' })).toHaveLength(1);
});

test('en mobile el footer es estático, muestra todo el contenido y no responde al scroll', () => {
  window.matchMedia.mockImplementation((query) => ({
    matches: query === '(max-width: 900px)' || query === '(prefers-reduced-motion: reduce)',
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));
  const requestFrame = jest.spyOn(window, 'requestAnimationFrame');
  const scrollIntoView = jest.fn();
  Element.prototype.scrollIntoView = scrollIntoView;
  render(<HomeScreen />);
  const footer = screen.getByRole('contentinfo');
  const surface = footer.querySelector('.liquidArea');
  expect(footer).toContainElement(footer.querySelector('.social-buttons'));
  expect(within(footer).getAllByRole('link')).toHaveLength(6);
  expect(within(footer).getByRole('navigation', { name: 'Explorá' })).toBeInTheDocument();
  expect(footer.querySelector('[inert]')).toBeNull();
  fireEvent.scroll(window);
  fireEvent.resize(window);
  expect(surface.style.getPropertyValue('--sheet-offset')).toBe('');
  expect(footer.style.getPropertyValue('--footer-height')).toBe('');
  fireEvent.click(within(footer).getByRole('link', { name: 'Equipo' }));
  expect(screen.getByRole('region', { name: 'Nuestro Equipo' })).toHaveFocus();
  expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'auto' });
  expect(requestFrame).not.toHaveBeenCalled();
  delete Element.prototype.scrollIntoView;
});
