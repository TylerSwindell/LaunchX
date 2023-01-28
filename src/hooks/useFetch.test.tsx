import useFetch from './useFetch'
import {act, renderHook} from '@testing-library/react-hooks'
// @ts-ignore
describe("fetch", () => {
    it("fetches public facing apis", () => {
        const { result } = renderHook(useFetch)

        act(() => {
            result.current.useFetch('https://hub.dummyapis.com/employee?noofRecords=10&idStarts=1001')
        })
    })
})