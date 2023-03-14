import { UI, useToast } from "@myth/ui";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { formatISO } from "date-fns";
import { ref, set, get, push } from "firebase/database";
import { database } from "../../lib/firebase";

export const DisqusForm = ({
  user: currentUser,
  thread,
  parent = null,
  onCancel,
  placeholder = "Únete a la conversación...",
  ...rest
}: any) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields, isSubmitting },
  } = useForm({
    defaultValues: {
      author_name: currentUser ? currentUser?.displayName : "",
      author_email: currentUser ? currentUser?.email : "",
      message: "",
    },
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

  const toast = useToast({ position: "top" });

  const addPost = async (data: any) => {
    const postRef = push(ref(database, "posts"));

    await set(postRef, {
      thread: data.thread,
      author: {
        uid: currentUser ? currentUser.uid : null,
        name: data.author_name,
        email: data.author_email,
        emailVerified: currentUser ? currentUser.emailVerified : false,
        picture: currentUser ? currentUser.photoURL : null,
        isAnonymous: currentUser ? currentUser.isAnonymous : true,
        createdAt: formatISO(new Date()),
        updatedAt: null,
      },
      message: data.message,
      likes: 0,
      dislikes: 0,
      numReports: 0,
      isSpam: false,
      isApproved: true,
      parent: data.parent,
      createdAt: formatISO(new Date()),
      updatedAt: null,
    });

    const snapshot = await get(postRef);

    const post = snapshot.val();

    return { ...post, key: snapshot.key };
  };

  const onSubmit = handleSubmit(async (values) => {
    try {
      await addPost({ ...values, thread, parent });

      reset({ message: "" });

      if (parent && typeof onCancel === "function") onCancel();
    } catch (err) {
      toast({
        description: "¡Ups! Algo salió mal. 😭",
        status: "error",
        isClosable: true,
      });
    }
  });

  return (
    <UI.Card
      variant="outline"
      size="sm"
      bg="transparent"
      borderColor="transparent"
      {...rest}
    >
      <UI.CardBody p={0}>
        <UI.HStack spacing={4} align="flex-start">
          <UI.Avatar size="sm" src={currentUser?.photoURL || undefined} />
          <UI.VStack
            as="form"
            onSubmit={onSubmit}
            spacing={4}
            w="100%"
            align="flex-start"
          >
            <UI.FormControl isInvalid={errors.message && touchedFields.message}>
              <UI.Textarea
                placeholder={placeholder}
                size="sm"
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
              style={{ display: currentUser ? "none" : "block" }}
            >
              <UI.Input
                placeholder="Nombre"
                size="sm"
                {...register("author_name")}
              />
              <UI.FormErrorMessage>
                {errors.author_name && "Por favor, escribe tu nombre."}
              </UI.FormErrorMessage>
            </UI.FormControl>
            <UI.FormControl
              isInvalid={errors.author_email && touchedFields.author_email}
              style={{ display: currentUser ? "none" : "block" }}
            >
              <UI.Input
                type="email"
                placeholder="Correo electrónico"
                size="sm"
                {...register("author_email")}
              />
              <UI.FormErrorMessage>
                {errors.author_email &&
                  "Por favor, escribe tu correo electrónico."}
              </UI.FormErrorMessage>
            </UI.FormControl>

            <UI.HStack>
              {onCancel && typeof onCancel === "function" && (
                <UI.Button onClick={onCancel}>Cancelar</UI.Button>
              )}
              <UI.Button
                type="submit"
                colorScheme="purple"
                isLoading={isSubmitting}
              >
                Comentar
              </UI.Button>
            </UI.HStack>
          </UI.VStack>
        </UI.HStack>
      </UI.CardBody>
    </UI.Card>
  );
};
