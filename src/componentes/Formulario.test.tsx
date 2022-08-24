import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from 'recoil';
import Formulario from "./Formulario";

// Biblioteca Jest
describe('o comportamento do Formulario.tsx', () => {
    test('quando o input está vazio, novos participantes não podem ser adicionados', () => {
        render( // renderizar o componente
            <RecoilRoot>
                <Formulario />
            </RecoilRoot>)
        // encontrar no DOM o input
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes')  //placeholder é o texto que fica dentro do input
        // encontrar o botão
        const botao = screen.getByRole('button') // encontrado pela responsabilidade do elemento
        // garantir que o input esteja no documento
        expect(input).toBeInTheDocument()
        // garantir que o botão esteja desabilitado 
        expect(botao).toBeDisabled()
    })
     test('Adicionar um participante caso exista um nome preenchido', () => {
        render(
            <RecoilRoot>
                <Formulario />
            </RecoilRoot>)
        // encontrar no DOM o input
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes')  //placeholder é o texto que fica dentro do input
        // encontrar o botão
        const botao = screen.getByRole('button') // encontrado pela responsabilidade do elemento
    
        // inserir um valor no input
        fireEvent.change(input, {
            target: {
                value: 'Ana Catarina'
            }
        })
    
        // clicar no botão de submeter
        fireEvent.click(botao)
    
        // garantir que o input esteja com o foco ativo
        expect(input).toHaveFocus()
        // garantir que o input não tenha um valor
        expect(input).toHaveValue("")
    
     })
    
     test('nomes duplicados não podem ser adicionados na lista', () => {
        render(
            <RecoilRoot>
                <Formulario />
            </RecoilRoot>)
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes')  //placeholder é o texto que fica dentro do input
        const botao = screen.getByRole('button') // encontrar o botão // encontrado pela responsabilidade do elemento
        fireEvent.change(input, { // inserir um valor no input
            target: {
                value: 'Ana Catarina'
            }
        })
        fireEvent.click(botao) // clicar no botão de submeter
        fireEvent.change(input, {
            target: {
                value: 'Ana Catarina'
            }
        })
        fireEvent.click(botao) // clicar no botão de submeter
    
        const mensagemDeErro = screen.getByRole('alert') //mensagem de erro
        expect(mensagemDeErro.textContent).toBe('Nomes duplicados não são permitidos!')
     })
    
     test('a mensagem de erro deve sumir após os timers', () => {
        jest.useFakeTimers()
        render(
            <RecoilRoot>
                <Formulario />
            </RecoilRoot>)
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes')  //placeholder é o texto que fica dentro do input
        const botao = screen.getByRole('button') // encontrar o botão // encontrado pela responsabilidade do elemento
        fireEvent.change(input, { // inserir um valor no input
            target: {
                value: 'Ana Catarina'
            }
        })
        fireEvent.click(botao) // clicar no botão de submeter
        fireEvent.change(input, {
            target: {
                value: 'Ana Catarina'
            }
        })
        fireEvent.click(botao) // clicar no botão de submeter
        let mensagemDeErro = screen.queryByRole('alert') //mensagem de erro
        expect(mensagemDeErro).toBeInTheDocument()
        
        act(() => {
            jest.runAllTimers()
          });
        
        mensagemDeErro = screen.queryByRole('alert')
        expect(mensagemDeErro).toBeNull()
     })
})



 