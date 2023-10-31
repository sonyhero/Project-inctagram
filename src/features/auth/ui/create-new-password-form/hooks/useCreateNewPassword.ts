import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { useNewPasswordMutation } from '@/features/auth'
import { PASSWORD_REGEX } from '@/shared/config/regex'
import { PATH } from '@/shared/config/routes'
import { getZodSchema } from '@/shared/config/zodSchemas'
import { useTranslation } from '@/shared/hooks'
import { LocaleType } from '@/shared/locales'

const getCreateNewPasswordSchema = (t: LocaleType) => {
  const passwordZod = getZodSchema({
    t,
    lengthMin: 6,
    lengthMax: 20,
    regex: PASSWORD_REGEX,
    regexMessage: `${t.zodSchema.passwordRegex} a-z, A-Z,  ! " # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _\` { | } ~`,
  })

  return z
    .object({
      newPassword: passwordZod,
      passwordConfirm: z.string(),
    })
    .refine(data => data.newPassword === data.passwordConfirm, {
      path: ['passwordConfirm'],
      message: t.zodSchema.passwordRefine,
    })
}

type CreateNewPasswordFormShem = z.infer<ReturnType<typeof getCreateNewPasswordSchema>>

export const useCreateNewPassword = (recoveryCode: string) => {
  const [newPassword, { isError, isLoading }] = useNewPasswordMutation()
  const router = useRouter()
  const { t } = useTranslation()

  const createNewPasswordSchema = getCreateNewPasswordSchema(t)

  const { control, handleSubmit, setError } = useForm<CreateNewPasswordFormShem>({
    resolver: zodResolver(createNewPasswordSchema),
    mode: 'onBlur',
  })

  const onSubmit = (data: CreateNewPasswordFormShem) => {
    newPassword({ newPassword: data.newPassword, recoveryCode })
      .unwrap()
      .then(() => {
        toast.success(t.toast.success)
        router.push(PATH.SIGN_IN)
      })
      .catch(err => {
        err.data.messages.map((el: any) => {
          setError(`${err.data.messages[0].field}` as 'root', {
            type: 'server',
            message: el.message,
          })
        })
      })
  }

  isLoading ? NProgress.start() : NProgress.done()
  isError && toast.error(t.toast.fetchError)

  const handleSubmitForm = handleSubmit(onSubmit)

  return { handleSubmitForm, control }
}
