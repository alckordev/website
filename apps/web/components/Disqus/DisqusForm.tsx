import { UI, useToast } from "@myth/ui";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { formatISO } from "date-fns";
import { ref, set, get, push } from "firebase/database";
import { database } from "../../lib/firebase";

const threadRef = ref(database, "threads");
const postRef = ref(database, "posts");

export const DisqusForm = ({
  config,
  thread,
  parent = null,
  onUpdateThread,
  onUpdatePosts,
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
      author_name: parent ? "Alckor Dev" : "",
      author_email: parent ? "alckor@dev.com" : "",
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

  const addThread = async (data: any) => {
    const newThreadRef = push(threadRef);

    await set(newThreadRef, {
      link: data.url,
      identifier: data.identifier,
      title: data.title,
      likes: 0,
      dislikes: 0,
      posts: 0,
      createdAt: formatISO(new Date()),
      updatedAt: null,
    });

    const threadSnapshot = await get(newThreadRef);

    const threadVal = threadSnapshot.val();

    return { ...threadVal, key: threadSnapshot.key };
  };

  const addPost = async (data: any) => {
    const newPostRef = push(postRef);
    await set(newPostRef, {
      thread: data.thread,
      author: {
        name: data.author_name,
        email: data.author_email,
        picture: null,
        isAnonymous: true,
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
    const postSnapshot = await get(newPostRef);
    const postVal = postSnapshot.val();
    return { ...postVal, key: postSnapshot.key };
  };

  const onSubmit = handleSubmit(async (values) => {
    try {
      let tmpThread = thread;

      if (thread == "") {
        const newThread = await addThread(config);
        tmpThread = newThread.key;
        onUpdateThread(newThread.key);
      }

      const newPost = await addPost({ ...values, thread: tmpThread, parent });
      onUpdatePosts(newPost);

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
          <UI.Avatar size="sm" />
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
