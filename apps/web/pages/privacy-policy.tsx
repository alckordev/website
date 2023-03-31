import { UI, CIcon, icon, useColorModeValue } from "@myth/ui";
import { Layout } from "../components";

export default function PrivacyPolicy() {
  const color = useColorModeValue("purple.700", "purple.300");

  return (
    <Layout metadata={{ title: "Políticas de privacidad" }}>
      <UI.Heading fontSize="3xl" mb={8}>
        Políticas de privacidad
      </UI.Heading>

      <UI.Text my={8}>
        En <strong>alckor.dev</strong>, nos tomamos muy en serio la privacidad
        de nuestros usuarios. A continuación, se describen nuestras políticas de
        privacidad:
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
          <UI.VStack spacing={4} ml={6}>
            <UI.Text>
              <strong>Información recopilada:</strong> Recopilamos información
              personal de nuestros usuarios para permitir el acceso y la
              utilización del sitio web, incluyendo su nombre, correo
              electrónico, foto de perfil y cualquier otra información relevante
              que proporcione al iniciar sesión con Google, Facebook, Github o
              Twitter. También podemos recopilar información sobre el uso del
              sitio web, incluyendo la dirección IP, el navegador utilizado y la
              actividad de navegación.
            </UI.Text>
            <UI.Text>
              Tenga en cuenta que al iniciar sesión con Google, Facebook, Github
              o Twitter, también se le pedirá que permita que nuestro sitio web
              acceda a su información de perfil. Esto incluye su nombre, correo
              electrónico y cualquier otra información relevante que proporcione
              a través de la plataforma de inicio de sesión correspondiente. No
              compartimos su información personal con terceros sin su
              consentimiento explícito.
            </UI.Text>
            <UI.Text>
              Además, utilizamos herramientas de análisis web para recopilar
              información sobre el uso del sitio web. Estos incluyen Google
              Analytics y otras herramientas de análisis similares. Esta
              información se utiliza para mejorar el sitio web y optimizar su
              rendimiento.
            </UI.Text>
          </UI.VStack>
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
            <strong>Uso de la información:</strong> Utilizamos la información
            recopilada para proporcionar y mejorar nuestros servicios,
            comunicarnos con nuestros usuarios y personalizar su experiencia en
            el sitio web. No compartimos información personal con terceros,
            excepto cuando sea necesario para proporcionar los servicios
            solicitados o cuando se requiera por ley.
          </UI.Box>
        </UI.ListItem>
        {/* <UI.ListItem pos="relative">
          <UI.Box
            as={CIcon}
            icon={icon.bxTag}
            pos="absolute"
            top="5px"
            color={color}
          />
          <UI.Box ml={6}>
            <strong>Cookies:</strong> Utilizamos cookies y tecnologías similares
            para mejorar la experiencia del usuario y analizar el uso del sitio
            web. Los usuarios pueden optar por desactivar las cookies en su
            navegador, pero esto puede afectar el rendimiento del sitio web.
          </UI.Box>
        </UI.ListItem> */}
        <UI.ListItem pos="relative">
          <UI.Box
            as={CIcon}
            icon={icon.bxTag}
            pos="absolute"
            top="5px"
            color={color}
          />
          <UI.Box ml={6}>
            <strong>Seguridad:</strong> Tomamos medidas razonables para proteger
            la información personal de nuestros usuarios, incluyendo el uso de
            medidas de seguridad técnicas y organizativas adecuadas.
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
            <strong>Menores de edad:</strong> Este sitio web no está dirigido a
            menores de edad y no recopilamos intencionalmente información
            personal de ellos.
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
            <strong>Modificaciones de la política de privacidad:</strong> Nos
            reservamos el derecho de modificar estas políticas
          </UI.Box>
        </UI.ListItem>
      </UI.UnorderedList>
    </Layout>
  );
}
