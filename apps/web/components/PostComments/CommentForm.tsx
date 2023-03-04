import { UI } from "@myth/ui";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const CommentForm = ({ ...rest }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields, isSubmitting },
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        message: yup.string().min(2).required(),
        author_name: yup.string().required(),
        author_email: yup
          .string()
          .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i),
      })
    ),
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      console.log(values);
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <UI.Card variant="outline" size="sm" borderColor="transparent" {...rest}>
      <UI.CardBody>
        <UI.HStack spacing={4} align="flex-start">
          <UI.Avatar />
          <UI.VStack
            as="form"
            onSubmit={onSubmit}
            spacing={4}
            w="100%"
            align="flex-start"
          >
            <UI.FormControl isInvalid={errors.message && touchedFields.message}>
              <UI.Textarea
                placeholder="Únete a la conversación..."
                resize="none"
                {...register("message")}
              />
              <UI.FormErrorMessage>
                {errors.message &&
                  "Los comentarios deben tener al menos 2 caractéres."}
              </UI.FormErrorMessage>
            </UI.FormControl>
            <UI.FormControl
              isInvalid={errors.author_name && touchedFields.author_name}
            >
              <UI.Input placeholder="Nombre" {...register("author_name")} />
              <UI.FormErrorMessage>
                {errors.author_name && "Por favor, escribe tu nombre."}
              </UI.FormErrorMessage>
            </UI.FormControl>
            <UI.FormControl
              isInvalid={errors.author_email && touchedFields.author_email}
            >
              <UI.Input
                type="email"
                placeholder="Correo electrónico"
                {...register("author_email")}
              />
              <UI.FormErrorMessage>
                {errors.author_email &&
                  "Por favor, escribe tu correo electrónico."}
              </UI.FormErrorMessage>
            </UI.FormControl>
            <UI.Button
              type="submit"
              colorScheme="purple"
              isLoading={isSubmitting}
            >
              Comentar
            </UI.Button>
          </UI.VStack>
        </UI.HStack>
      </UI.CardBody>
    </UI.Card>
  );
};
