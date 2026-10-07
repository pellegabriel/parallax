import abogadosInicio from './assets/images/abogados/abogados01.png';
import abogadosDashboard from './assets/images/abogados/abogadosdashboard.png';
import abogadosClientes from './assets/images/abogados/abogadoclientes.png';
import abogadosExpediente from './assets/images/abogados/abogadoexpediente.png';
import abogadosNuevoCliente from './assets/images/abogados/abogadosnuevocliente.png';
import dentistaHome from './assets/images/dentista/dentistahome.png';
import dentistaAcceso from './assets/images/dentista/dentista.png';
import dentistaAgenda from './assets/images/dentista/dentistaagenda.png';
import dentistaNuevoTurno from './assets/images/dentista/dentistanuevoturno.png';
import dentistaPacientes from './assets/images/dentista/dentistapacientes.png';
import dentistaProfesionales from './assets/images/dentista/dentistaprofesionales.png';
import tattooHome from './assets/images/tattoo/brix01.png';
import tattooTrabajos from './assets/images/tattoo/brix02.png';
import tattooArtista from './assets/images/tattoo/brix03.png';
import tattooContacto from './assets/images/tattoo/brix04.png';

export const projectTemplate = {
  id: '',
  publicUrl: '',
  images: [],       // [{ src, alt: { es, en } }]
  translations: {}, // { es: { title, problem, work, result }, en: { title, problem, work, result } }
};

const projects = [
  {
    id: 'abogados',
    publicUrl: 'https://frontend-abogados-manager.vercel.app/login',
    images: [
      { src: abogadosInicio, alt: { es: 'Inicio del sistema de gestión', en: 'Management system home' } },
      { src: abogadosDashboard, alt: { es: 'Panel de control', en: 'Dashboard' } },
      { src: abogadosClientes, alt: { es: 'Listado de clientes', en: 'Client list' } },
      { src: abogadosExpediente, alt: { es: 'Detalle de expediente', en: 'Case file detail' } },
      { src: abogadosNuevoCliente, alt: { es: 'Alta de nuevo cliente', en: 'New client form' } },
    ],
    translations: {
      es: {
        title: 'Gestión para estudio jurídico',
        work: 'Plataforma que centraliza la gestión de un estudio jurídico: clientes, expedientes y seguimiento de casos en un solo lugar.',
        problem: 'La información de cada caso suele estar repartida entre archivos, documentos y herramientas distintas.',
        result: 'El estudio accede rápido a cada expediente y deja de depender de herramientas dispersas.',
      },
      en: {
        title: 'Law firm management',
        work: "A platform that centralizes a law firm's operations: clients, case files, and case tracking in one place.",
        problem: 'Case information is usually scattered across files, documents, and different tools.',
        result: 'The firm reaches every case file fast, without juggling multiple tools.',
      },
    },
  },
  {
    id: 'dentista',
    publicUrl: 'https://odontologia-front-bay.vercel.app/login',
    images: [
      { src: dentistaHome, alt: { es: 'Inicio del sitio', en: 'Site home' } },
      { src: dentistaAcceso, alt: { es: 'Acceso al sistema', en: 'System sign-in' } },
      { src: dentistaAgenda, alt: { es: 'Agenda de turnos', en: 'Appointment schedule' } },
      { src: dentistaNuevoTurno, alt: { es: 'Reserva de nuevo turno', en: 'New appointment booking' } },
      { src: dentistaPacientes, alt: { es: 'Listado de pacientes', en: 'Patient list' } },
      { src: dentistaProfesionales, alt: { es: 'Profesionales de la clínica', en: 'Clinic practitioners' } },
    ],
    translations: {
      es: {
        title: 'Gestión para consultorio odontológico',
        work: 'Plataforma que centraliza la operación del consultorio: pacientes, profesionales, turnos e historia clínica en un solo lugar.',
        problem: 'Pacientes, turnos e historia clínica suelen estar repartidos entre agendas y planillas.',
        result: 'El consultorio ordena su agenda y encuentra la información de cada paciente al instante.',
      },
      en: {
        title: 'Dental practice management',
        work: 'A platform that centralizes the practice: patients, practitioners, appointments, and clinical records in one place.',
        problem: 'Patients, appointments, and clinical history are usually spread across calendars and spreadsheets.',
        result: "The practice keeps its schedule organized and finds each patient's info instantly.",
      },
    },
  },
  {
    id: 'tattoo',
    publicUrl: 'https://v0-tattoo-artist-portfolio-ten.vercel.app/',
    images: [
      { src: tattooHome, alt: { es: 'Home del portfolio', en: 'Portfolio home' } },
      { src: tattooTrabajos, alt: { es: 'Galería de trabajos', en: 'Work gallery' } },
      { src: tattooArtista, alt: { es: 'Presentación del artista', en: 'Artist intro' } },
      { src: tattooContacto, alt: { es: 'Sección de contacto y horarios', en: 'Contact and hours section' } },
    ],
    translations: {
      es: {
        title: 'Portfolio para artista de tatuajes',
        work: 'Portfolio con la estética del estudio, que muestra los trabajos del artista en un espacio propio.',
        problem: 'Su trabajo suele quedar disperso entre publicaciones de redes sociales.',
        result: 'El artista tiene presencia propia para exhibir sus piezas, sin depender de las redes.',
      },
      en: {
        title: 'Tattoo artist portfolio',
        work: "A portfolio with the studio's own look, showcasing the artist's work in a space of their own.",
        problem: 'Their work is usually scattered across social media posts.',
        result: 'The artist has their own presence to display the pieces, without relying on social media.',
      },
    },
  },
];

export default projects;
