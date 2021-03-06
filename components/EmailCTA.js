import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import SuccessMessage from '@/components/SuccessMessage'

const EmailCTA = ({
  title = 'Start your foraging journey today',
  description = `Sign up to receive the first two chapters of 'Introduction to Foraging' delivered straight to your inbox for free.`,
  list = 'monthly',
  cta = 'Sign up',
  embedded = false,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm()

  const subscribe = async ({ email }) => {
    const res = await fetch(`/api/subscribe?email=${email}&list=${list}`)
    return res
  }

  const onSubmit = (data) => subscribe(data)

  return (
    <div className="">
      <div className="mx-auto">
        <div
          className={`${
            embedded ? 'px-4 py-2' : 'px-12 py-12'
          } rounded-xl bg-gray-100 dark:bg-gray-800 lg:flex lg:items-center`}
        >
          {isSubmitSuccessful ? (
            <SuccessMessage handleReset={reset} />
          ) : (
            <>
              <div className="lg:w-0 lg:flex-1">
                <h2 className="text-3xl font-extrabold tracking-tight">{title}</h2>
                <p className="text-md mt-4 max-w-3xl">{description}</p>
              </div>
              <div className="sm:w-full sm:max-w-md lg:ml-8 lg:flex-1">
                <form className="flex-col sm:flex" onSubmit={handleSubmit(onSubmit)}>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full rounded-md border-gray-500 px-5 py-3 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 focus:ring-offset-indigo-700 dark:border-white dark:focus:ring-white"
                    placeholder="Enter your email"
                    {...register('email', {
                      required: 'Email is required.',
                      pattern: {
                        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                      },
                      message: 'Please enter a vaild email.',
                    })}
                    disabled={isSubmitting}
                  />
                  <ErrorMessage errors={errors} name="email" />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-3 flex w-full items-center justify-center rounded-md border border-transparent bg-primary-500 px-5 py-3 text-base font-medium text-white hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700 sm:w-auto sm:flex-shrink-0"
                  >
                    {cta}
                  </button>
                </form>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-100">
                  I won't spam. Promise.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmailCTA
