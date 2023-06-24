import { useForm } from "react-hook-form"
import styleUtils from "../styles/utils.module.css"
import { User } from "../models/user"
import { LoginCredentials } from "../network/notes_api"
import * as NotesApi from "../network/notes_api"
import { Alert, Button, Form, Modal } from "react-bootstrap"
import TextInputField from "./form/TextInputField"
import { useState } from "react"
import { UnauthorizedError } from "../errors/http_errors"

interface LoginModelProps{
    onDismiss: ()=>void,
    onLoginSuccessfull: (user: User)=> void
}

const LoginModel = ({onDismiss,onLoginSuccessfull}:LoginModelProps) => {
    const [errorText, setErrorText] = useState<string|null>(null)

    const { register, handleSubmit, formState:{errors,isSubmitting}} = useForm<LoginCredentials>();

    async function onSubmit(credentials: LoginCredentials) {
        try {
            const user = await NotesApi.login(credentials);
            onLoginSuccessfull(user);
        } catch (error) {
            if(error instanceof UnauthorizedError){
                setErrorText(error.message)
            }else{
                alert(error);
        }
        console.error(error);
        }
    }

    return (
    <Modal show onHide={onDismiss}>
        <Modal.Header closeButton>
            <Modal.Title>
                Log In
            </Modal.Title>
        </Modal.Header>

        <Modal.Body>
            {errorText &&
                <Alert variant="danger">
                    {errorText}
                </Alert>
            }
            <Form onSubmit={handleSubmit(onSubmit)}>
                <TextInputField
                    name="username"
                    label="Username"
                    placeholder="Username"
                    type="text"
                    register={register}
                    registerOptions={{required: "Required"}}
                    error={errors.username}
                />
                <TextInputField
                    name="password"
                    label="Password"
                    placeholder="Password"
                    type="password"
                    register={register}
                    registerOptions={{required: "Required"}}
                    error={errors.password}
                />
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={styleUtils.width100}
                >
                    Log In
                </Button>
            </Form>
        </Modal.Body>
    </Modal>
  )
}

export default LoginModel