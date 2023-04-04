import { UI, CIcon, icons, useColorModeValue } from "@myth/ui";
import { Layout } from "../components";

export default function Rules() {
  const color = useColorModeValue("purple.700", "purple.300");

  return (
    <Layout metadata={{ title: "Código de conducta" }}>
      <UI.Heading fontSize="3xl" mb={4}>
        Código de conducta
      </UI.Heading>

      <UI.Text my={8}>
        Este código de conducta se aplica a todos los usuarios que deseen
        comentar en nuestro sitio web. Nuestro objetivo es crear una comunidad
        de comentarios respetuosa y constructiva, por lo que todos los usuarios
        deben cumplir con las siguientes normas:
      </UI.Text>

      <UI.UnorderedList styleType="none" spacing={4} my={8}>
        <UI.ListItem pos="relative">
          <UI.Box
            as={CIcon}
            icon={icons.bxTag}
            pos="absolute"
            top="5px"
            color={color}
          />
          <UI.Box ml={6}>
            <strong>Iniciar sesión para comentar:</strong> Todos los usuarios
            deben iniciar sesión antes de comentar. Esto nos ayuda a evitar
            comentarios de spam y a asegurarnos de que los usuarios sean
            responsables de sus comentarios.
          </UI.Box>
        </UI.ListItem>
        <UI.ListItem pos="relative">
          <UI.Box
            as={CIcon}
            icon={icons.bxTag}
            pos="absolute"
            top="5px"
            color={color}
          />
          <UI.Box ml={6}>
            <strong>
              Mantenga los comentarios relacionados con el contenido:
            </strong>{" "}
            Los comentarios deben estar relacionados con el contenido de la
            publicación o artículo. Los comentarios que se desvíen del tema o
            que sean inapropiados no serán tolerados.
          </UI.Box>
        </UI.ListItem>
        <UI.ListItem pos="relative">
          <UI.Box
            as={CIcon}
            icon={icons.bxTag}
            pos="absolute"
            top="5px"
            color={color}
          />
          <UI.Box ml={6}>
            <strong>Sea respetuoso con los demás usuarios:</strong> Los
            comentarios no deben ser ofensivos, amenazantes, discriminatorios,
            difamatorios, vulgares o que contengan lenguaje inapropiado. Los
            comentarios que acosen a otros usuarios o difundan odio tampoco
            serán tolerados.
          </UI.Box>
        </UI.ListItem>
        <UI.ListItem pos="relative">
          <UI.Box
            as={CIcon}
            icon={icons.bxTag}
            pos="absolute"
            top="5px"
            color={color}
          />
          <UI.Box ml={6}>
            <strong>No publique contenido ilegal:</strong> Los comentarios no
            deben contener spam, malware o enlaces a sitios web maliciosos. El
            contenido ilegal o que infrinja los derechos de autor tampoco será
            permitido.
          </UI.Box>
        </UI.ListItem>
        <UI.ListItem pos="relative">
          <UI.Box
            as={CIcon}
            icon={icons.bxTag}
            pos="absolute"
            top="5px"
            color={color}
          />
          <UI.Box ml={6}>
            <strong>Acepte la crítica constructiva:</strong> Los usuarios pueden
            dar su opinión y crítica constructiva sobre el contenido publicado,
            pero siempre deben hacerlo de manera respetuosa. Los comentarios no
            deben ser utilizados para difamar o denigrar a otros usuarios.
          </UI.Box>
        </UI.ListItem>
        <UI.ListItem pos="relative">
          <UI.Box
            as={CIcon}
            icon={icons.bxTag}
            pos="absolute"
            top="5px"
            color={color}
          />
          <UI.Box ml={6}>
            <strong>No publique información personal:</strong> Los comentarios
            no deben contener información personal, como números de teléfono,
            direcciones o datos de identificación personal. Si desea compartir
            información personal con otros usuarios, hágalo a través de un
            mensaje privado.
          </UI.Box>
        </UI.ListItem>
        <UI.ListItem pos="relative">
          <UI.Box
            as={CIcon}
            icon={icons.bxTag}
            pos="absolute"
            top="5px"
            color={color}
          />
          <UI.Box ml={6}>
            <strong>No use los comentarios para publicidad:</strong> Los
            comentarios no deben ser utilizados para promocionar productos o
            servicios.
          </UI.Box>
        </UI.ListItem>
      </UI.UnorderedList>

      <UI.Text my={8}>
        Al cumplir con estas normas, todos los usuarios pueden contribuir a
        crear una comunidad de comentarios respetuosa y constructiva.
        Agradecemos su cooperación para mantener un espacio seguro y amigable
        para todos los usuarios.
      </UI.Text>

      <UI.Heading fontSize="2xl" mb={8}>
        Aplicación
      </UI.Heading>

      <UI.Text my={8}>
        El administrador del sitio web se reserva el derecho de eliminar
        cualquier comentario que no cumpla con estas reglas. Los usuarios que
        violen estas normas pueden ser suspendidos o expulsados del sitio web.
      </UI.Text>
    </Layout>
  );
}
