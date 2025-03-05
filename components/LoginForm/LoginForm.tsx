'use client';

import { useActionState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from '@/actions';
import { loginSchema, TLoginForm } from "@/schema/auth.schema";
import { FormLoginState } from "@/actions/auth";

export default function LoginForm() {
  const {
    register,
    trigger,
    formState: { errors }
  } = useForm<TLoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onAction = async (formState: FormLoginState, formData: FormData) => {
    const result = await trigger();
    if (!result) {
      return {
        errors: {
          _form: ['Please fill all required fields']
        }
      };
    }
    return await login(formState, formData);
  }

  const [formState, action, isPending] = useActionState(onAction, { errors: {} });

  useEffect(() => {
    if (formState.success) {
      console.log('success')
    }
  }, [formState.success]);

  return (
    <form action={action} className="flex flex-col space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" {...register('email')} type="email" />
        {(errors.email || formState.errors.email) && (
          <p className="text-sm text-red-500">{errors.email?.message || formState.errors.email?.join(", ")}</p>
        )}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" {...register('password')} />
        {(errors.password || formState.errors.password) && (
          <p className="text-sm text-red-500">{errors.password?.message || formState.errors.password?.join(", ")}</p>
        )}
      </div>

      {formState.errors._form ? (
        <div className="p-2 bg-red-200 border rounded border-red-400">
          {formState.errors._form?.join(", ")}
        </div>
      ) : null}

      {isPending ? (
        <Button className="mt-4 flex" disabled><Loader2 className="animate-spin m-auto" /></Button>
      ) : (
        <Button type="submit" className="mt-4">Login</Button>
      )}
    </form>

  )
}
