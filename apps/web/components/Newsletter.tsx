import { UI, useToast } from "@myth/ui";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const Newsletter = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields, isSubmitting },
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        email_address: yup
          .string()
          .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i),
      })
    ),
  });

  const toast = useToast({ position: "top" });

  const onSubmit = handleSubmit(async (data) => {
    const res = await fetch("/api/mailchimp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, status: "subscribed" }),
    });

    if (res.status === 200 || res.status === 400) {
      toast({
        description: "¡Genial! Ahora te mantendre informado. 😉",
        status: "success",
        isClosable: true,
      });
      reset();
    } else {
      toast({
        description: "¡Ups! Algo salió mal. 😭",
        status: "error",
        isClosable: true,
      });
    }
  });

  return (
    <UI.VStack as="form" onSubmit={onSubmit} spacing={4}>
      <UI.FormControl
        isInvalid={errors.email_address && touchedFields.email_address}
      >
        <UI.Input
          type="email"
          placeholder="example@gmail.com"
          {...register("email_address")}
        />
        <UI.FormErrorMessage>
          {errors.email_address && "¿Eres un bot? 🤖"}
        </UI.FormErrorMessage>
      </UI.FormControl>
      <UI.Button
        type="submit"
        w="100%"
        colorScheme="purple"
        isLoading={isSubmitting}
      >
        Suscribirme
      </UI.Button>
    </UI.VStack>
  );
};
