import { UI, CIcon, icon } from "@myth/ui";
import { Layout } from "../components";

export default function Rules() {
  return (
    <Layout metadata={{ title: "Rules" }}>
      <UI.VStack spacing={16} align="flex-start">
        <UI.Box>
          <UI.Heading fontSize="3xl" mb={4}>
            Código de conducta
          </UI.Heading>
          <UI.Text>
            Este código de conducta se aplica a todos los usuarios que deseen
            comentar en nuestro sitio web. Nuestro objetivo es crear una
            comunidad de comentarios respetuosa y constructiva, por lo que todos
            los usuarios deben cumplir con las siguientes normas:
          </UI.Text>
        </UI.Box>
        <UI.VStack spacing={8} align="flex-start">
          <UI.Box>
            <UI.Heading fontSize="xl" mb={4}>
              Regístrese para comentar
            </UI.Heading>
            <UI.Text>
              Todos los usuarios deben registrarse antes de comentar. Esto nos
              ayuda a evitar comentarios de spam y a asegurarnos de que los
              usuarios sean responsables de sus comentarios.
            </UI.Text>
          </UI.Box>
          <UI.Box>
            <UI.Heading fontSize="xl" mb={4}>
              Mantenga los comentarios relacionados con el contenido
            </UI.Heading>
            <UI.Text>
              Los comentarios deben estar relacionados con el contenido de la
              publicación o artículo. Los comentarios que se desvíen del tema o
              que sean inapropiados no serán tolerados.
            </UI.Text>
          </UI.Box>
          <UI.Box>
            <UI.Heading fontSize="xl" mb={4}>
              Sea respetuoso con los demás usuarios
            </UI.Heading>
            <UI.Text>
              Los comentarios no deben ser ofensivos, amenazantes,
              discriminatorios, difamatorios, vulgares o que contengan lenguaje
              inapropiado. Los comentarios que acosen a otros usuarios o
              difundan odio tampoco serán tolerados.
            </UI.Text>
          </UI.Box>
          <UI.Box>
            <UI.Heading fontSize="xl" mb={4}>
              No publique contenido ilegal
            </UI.Heading>
            <UI.Text>
              Los comentarios no deben contener spam, malware o enlaces a sitios
              web maliciosos. El contenido ilegal o que infrinja los derechos de
              autor tampoco será permitido.
            </UI.Text>
          </UI.Box>
          <UI.Box>
            <UI.Heading fontSize="xl" mb={4}>
              Acepte la crítica constructiva
            </UI.Heading>
            <UI.Text>
              Los usuarios pueden dar su opinión y crítica constructiva sobre el
              contenido publicado, pero siempre deben hacerlo de manera
              respetuosa. Los comentarios no deben ser utilizados para difamar o
              denigrar a otros usuarios.
            </UI.Text>
          </UI.Box>
          <UI.Box>
            <UI.Heading fontSize="xl" mb={4}>
              No publique información personal
            </UI.Heading>
            <UI.Text>
              Los comentarios no deben contener información personal, como
              números de teléfono, direcciones o datos de identificación
              personal. Si desea compartir información personal con otros
              usuarios, hágalo a través de un mensaje privado.
            </UI.Text>
          </UI.Box>
          <UI.Box>
            <UI.Heading fontSize="xl" mb={4}>
              No use los comentarios para publicidad
            </UI.Heading>
            <UI.Text>
              Los comentarios no deben ser utilizados para promocionar productos
              o servicios.
            </UI.Text>
          </UI.Box>
        </UI.VStack>

        <UI.Box>
          <UI.Text>
            Al cumplir con estas normas, todos los usuarios pueden contribuir a
            crear una comunidad de comentarios respetuosa y constructiva.
            Agradecemos su cooperación para mantener un espacio seguro y
            amigable para todos los usuarios.
          </UI.Text>
        </UI.Box>

        <UI.Box>
          <UI.Heading fontSize="3xl" mb={4}>
            Aplicación
          </UI.Heading>
          <UI.Text>
            El administrador del sitio web se reserva el derecho de eliminar
            cualquier comentario que no cumpla con estas reglas. Los usuarios
            que violen estas normas pueden ser suspendidos o expulsados del
            sitio web.
          </UI.Text>
        </UI.Box>
      </UI.VStack>
    </Layout>
  );
}
