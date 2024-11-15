import { useNavigate } from "react-router-dom";
import { MdEmail, MdLock, MdPerson } from 'react-icons/md'
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';
import React from "react"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useForm } from "react-hook-form";


import {
    Container,
    Title,
    Column,
    TitleLogin,
    SubtitleLogin,
    CreateText,
    LoginText,
    Row,
    Wrapper,
    ErrorMessage
} from './styles';

const schema = yup
    .object({
        name: yup.string().required("Campo obrigatório"),
        email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
        password: yup
            .string()
            .min(6, "No minimo 6 caracteres")
            .required("Campo obrigatório"),
    })
    .required();

const CreateAccount = () => {

    const navigate = useNavigate()

    const { control, handleSubmit, formState: { errors, isValid } } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });

    const onSubmit = async (formData) => {

        if (!isValid) {
            return
        }

        try {
            const { data } = await api.post(formData);

            if (data.length && data[0].id) {
                navigate('/login')
                return
            }

        } catch (e) {
            alert('Erro ao salvar usuário')
        }
    };

    return (<>
        <Header />
        <Container>
            <Column>
                <Title>A plataforma para você aprender com experts, dominar as principais tecnologias
                    e entrar mais rápido nas empresas mais desejadas.</Title>
            </Column>
            <Column>
                <Wrapper>
                    <TitleLogin>Comece agora grátis</TitleLogin>
                    <SubtitleLogin>Crie suca conta e make the change._</SubtitleLogin>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input 
                            placeholder="Nome completo" 
                            leftIcon={<MdPerson />} 
                            name="name" 
                            defaultValue=""
                            control={control} />
                        {errors.name ? <ErrorMessage>{errors.name.message}</ErrorMessage> : ''}
                        <Input 
                            placeholder="E-mail" 
                            leftIcon={<MdEmail />} 
                            name="email" 
                            defaultValue=""
                            control={control} />
                        {errors.email && <ErrorMessage>E-mail é obrigatório</ErrorMessage>}
                        <Input 
                            type="password" 
                            placeholder="Senha" 
                            leftIcon={<MdLock />} 
                            name="password" 
                            defaultValue=""
                            control={control} />
                        {errors.password && <ErrorMessage>Senha é obrigatório</ErrorMessage>}
                        <Button title="Criar minha conta" variant="secondary" type="submit" disabled={!isValid} />
                    </form>
                    <Row>
                        <p>Ao clicar em "criar minha conta grátis", declaro que aceito as Políticas de Privacidade e os Termos de Uso da DIO.</p>
                    </Row>
                    <Row>
                        <CreateText>Já tenho conta. </CreateText>
                        <LoginText> Fazer login</LoginText>
                    </Row>
                </Wrapper>
            </Column>
        </Container>
    </>)
}

export { CreateAccount }