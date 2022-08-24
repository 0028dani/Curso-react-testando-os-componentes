import { useSetRecoilState, useRecoilValue } from "recoil"
import { erroState, listaParticipantesState } from "../atom"

export const useAdicionarParticipante = () => {
    const setLista = useSetRecoilState(listaParticipantesState)
    const lista = useRecoilValue(listaParticipantesState)
    const setErro = useSetRecoilState(erroState)
    return (nomeDoParticipantes: string) => {
        if (lista.includes(nomeDoParticipantes)) {
           setErro('Nomes duplicados não são permitidos!')
           setTimeout(() => {
                setErro("")
           }, 5000)
           return
        }   
        return setLista(listaAtual => [...listaAtual, nomeDoParticipantes])
    }
}