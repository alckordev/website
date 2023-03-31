import { UI, CIcon, icon, useColorModeValue } from "@myth/ui";
import { Layout } from "../components";

export default function TermsAndConditions() {
  const color = useColorModeValue("purple.700", "purple.300");

  return (
    <Layout metadata={{ title: "Términos y condiciones del servicio" }}>
      <UI.Heading fontSize="3xl" mb={8}>
        Términos y condiciones del servicio
      </UI.Heading>

      <UI.Text my={8}>
        Bienvenido a <strong>alckor.dev</strong>, un sitio web de contenido
        sobre programación. El uso de este sitio está sujeto a los siguientes
        términos y condiciones:
      </UI.Text>

      <UI.UnorderedList styleType="none" spacing={4} my={8}>
        <UI.ListItem pos="relative">
          <UI.Box
            as={CIcon}
            icon={icon.bxTag}
            pos="absolute"
            top="5px"
            color={color}
          />
          <UI.Box ml={6}>
            <strong>Uso del sitio web:</strong> Al utilizar este sitio web,
            usted acepta cumplir con estos términos y condiciones, así como con
            las leyes y regulaciones aplicables. Si no está de acuerdo con estos
            términos, por favor no utilice este sitio.
          </UI.Box>
        </UI.ListItem>
        <UI.ListItem pos="relative">
          <UI.Box
            as={CIcon}
            icon={icon.bxTag}
            pos="absolute"
            top="5px"
            color={color}
          />
          <UI.Box ml={6}>
            <strong>Contenido del sitio web:</strong> El contenido de este sitio
            web está destinado únicamente a fines informativos y educativos. No
            garantizamos la exactitud, integridad o actualidad del contenido.
          </UI.Box>
        </UI.ListItem>
        <UI.ListItem pos="relative">
          <UI.Box
            as={CIcon}
            icon={icon.bxTag}
            pos="absolute"
            top="5px"
            color={color}
          />
          <UI.Box ml={6}>
            <strong>Registro e inicio de sesión de usuarios:</strong> Al
            registrarse o iniciar sesión en nuestro sitio web utilizando Google,
            Facebook, Github o Twitter, usted acepta compartir su información de
            perfil con nosotros, incluyendo su nombre, correo electrónico y
            cualquier otra información relevante que proporcione. También
            podemos recopilar información sobre su actividad en nuestro sitio
            web, incluyendo las publicaciones que haya visto, los comentarios
            que haya hecho y los votos que haya emitido.
          </UI.Box>
        </UI.ListItem>
        <UI.ListItem pos="relative">
          <UI.Box
            as={CIcon}
            icon={icon.bxTag}
            pos="absolute"
            top="5px"
            color={color}
          />
          <UI.Box ml={6}>
            <strong>Comentarios y opiniones:</strong> Nos reservamos el derecho
            de eliminar cualquier comentario que sea ofensivo, difamatorio,
            ilegal o que infrinja los derechos de propiedad intelectual de
            terceros.
          </UI.Box>
        </UI.ListItem>
        <UI.ListItem pos="relative">
          <UI.Box
            as={CIcon}
            icon={icon.bxTag}
            pos="absolute"
            top="5px"
            color={color}
          />
          <UI.Box ml={6}>
            <strong>Modificaciones del sitio web:</strong> Nos reservamos el
            derecho de modificar, suspender o interrumpir el sitio web en
            cualquier momento y sin previo aviso.
          </UI.Box>
        </UI.ListItem>
        <UI.ListItem pos="relative">
          <UI.Box
            as={CIcon}
            icon={icon.bxTag}
            pos="absolute"
            top="5px"
            color={color}
          />
          <UI.Box ml={6}>
            <strong>Limitación de responsabilidad:</strong> No seremos
            responsables por cualquier daño directo, indirecto, incidental,
            especial o consecuente que surja del uso o la imposibilidad de usar
            este sitio web.
          </UI.Box>
        </UI.ListItem>
      </UI.UnorderedList>
    </Layout>
  );
}
